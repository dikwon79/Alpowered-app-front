
function sendDataToServer() {
    // 폼 데이터 가져오기
    const formData = {
        email: document.querySelector('#email').value,
        username: document.querySelector('#username').value,
        password: document.querySelector('#password').value,
        password2: document.querySelector('#password2').value
    };

    // JSON으로 변환
    const jsonData = JSON.stringify(formData);

    // XMLHttpRequest 객체 생성
    const xhr = new XMLHttpRequest();

    // HTTP POST 요청 설정
    xhr.open("POST", "https://oyster-app-qgcwb.ondigitalocean.app/signup", true);
    xhr.setRequestHeader("Content-Type", "application/json");

    // 요청 완료 시 실행되는 함수
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                // 성공 시 서버 응답 처리
                console.log("Response from server:", xhr.responseText);
            } else {
                // 실패 시 오류 처리
                console.error("There was a problem with the request:", xhr.status);
            }
        }
    };

    // 요청 보내기
    xhr.send(jsonData);
}

// 폼 제출 이벤트 리스너 추가
document.querySelector('.post-form').addEventListener('submit', function (event) {
    event.preventDefault(); // 기본 제출 동작 방지
    sendDataToServer(); // 폼 데이터 서버에 JSON 형식으로 전송
});
