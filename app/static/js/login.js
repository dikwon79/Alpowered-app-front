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
             
                console.log("Login successful:", xhr.response);
              
            } else {
                // 로그인 실패 시 오류 처리
                console.error("Login failed:", xhr.status, xhr.response);
               
            }
        }
    };

    // 요청 보내기
    xhr.send(jsonData);
}

// 로그인 폼 제출 이벤트 리스너 추가
document.querySelector('#login-in').addEventListener('submit', function (event) {
    event.preventDefault();
    sendLoginRequest();
});
