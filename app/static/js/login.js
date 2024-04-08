function sendLoginRequest() {
    // 폼 데이터 가져오기
    const formData = {
        email: document.querySelector('#email').value,
        password: document.querySelector('#password').value
    };

    // JSON으로 변환
    const jsonData = JSON.stringify(formData);

    // XMLHttpRequest 객체 생성
    const xhr = new XMLHttpRequest();

    // HTTP POST 요청 설정
    xhr.open("POST", "http://127.0.0.1:5000/login", true);
    xhr.setRequestHeader("Content-Type", "application/json");

    // 요청 완료 시 실행되는 함수
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                // 로그인 성공한 경우
                console.log("Login successful:", xhr.response);
    
                // 서버에서 받은 응답을 파싱하여 JWT 토큰 추출
                const responseData = JSON.parse(xhr.response);
                const jwt_token = responseData.jwt_token;
    
                // JWT 토큰을 쿠키에 저장
                document.cookie = `jwtToken=${jwt_token}; path=/`;
    
                // 로그인 후 페이지 리로드 또는 다른 작업 수행
                location.reload();
            } else {
                // 로그인 실패 시 오류 처리
                console.error("Login failed:", xhr.status, xhr.response);
            }
        }
    };
    
    // 요청 보내기
    xhr.send(jsonData);
}



// 로그아웃 함수
function logout() {
    // JWT 쿠키 삭제
    document.cookie = 'jwtToken=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;';

    // 로그아웃 후 페이지 리로드
    location.reload();
}

// 페이지 로드 시 JWT 토큰 확인
window.onload = function () {
    const jwtToken = getCookie('jwtToken');

    if (jwtToken) {
        // 토큰이 있으면 로그인 상태로 간주하고 필요한 작업 수행
        console.log("User is logged in");

        // 토큰 해독
        const decodedToken = decodeJWT(jwtToken);
        if (decodedToken) {
            // role 가져오기
            const role = decodedToken.role;

            // role이 admin이면 admin 페이지로 이동
            if (role === '0') {
                window.location.href = "/admin";
            } else {
                // role이 user면 main 페이지로 이동
                window.location.href = "/";
            }
        } else {
            // 토큰 해독 실패
            console.error("Failed to decode JWT token");
        }
    } else {
        // 토큰이 없으면 로그아웃 상태로 간주하고 필요한 작업 수행
        console.log("User is logged out");
    }
};

// JWT 토큰 해독 함수
function decodeJWT(token) {
    try {
        // 토큰 디코딩
        const decodedPayload = atob(token.split('.')[1]);
        return JSON.parse(decodedPayload);
    } catch (error) {
        // 디코딩 실패 시 에러 처리
        console.error("Error decoding JWT token:", error);
        return null;
    }
}

// 쿠키에서 특정 이름의 쿠키 값을 가져오는 함수
function getCookie(name) {
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
        const [cookieName, cookieValue] = cookie.trim().split('=');
        if (cookieName === name) {
            return cookieValue;
        }
    }
    return null;
}

// 로그인 폼 제출 이벤트 리스너 추가
document.querySelector('#login-in').addEventListener('submit', function (event) {
    event.preventDefault();
    sendLoginRequest();
});
