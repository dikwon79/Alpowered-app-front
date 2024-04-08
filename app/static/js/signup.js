function sendDataToServer() {
    // 폼 데이터 가져오기
    const formData = {
        email: document.querySelector('#email').value,
        username: document.querySelector('#username').value,
        password: document.querySelector('#password').value,
        password2: document.querySelector('#password2').value
    };
    const messageElement = document.querySelector('.alert');

    // JSON으로 변환
    const jsonData = JSON.stringify(formData);

    // XMLHttpRequest 객체 생성
    const xhr = new XMLHttpRequest();

    // HTTP POST 요청 설정
    xhr.open("POST", "http://127.0.0.1:5000/signup/", true);
    xhr.setRequestHeader("Content-Type", "application/json");


    // 요소를 찾은 후에만 실행되는 코드
    if (messageElement) {
        // 요청 완료 시 실행되는 함수
        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    // 성공 시 서버 응답 처리
                    // 가져온 요소의 내용을 변경하여 메시지를 표시합니다.
                    let responseData = JSON.parse(xhr.responseText);
                    messageElement.innerHTML = '<button type="button" class="close" data-dismiss="alert">&times;</button>' + responseData.message;
                    
                    console.log(responseData.success);
                    if (responseData.success === true){
                        window.location.href = "/login";
                    }

                } else {
                    // 실패 시 오류 처리
                    messageElement.innerHTML = '<button type="button" class="close" data-dismiss="alert">&times;</button>' + responseData.message;
                }
            }
        };
    } else {
        console.error("메시지 요소를 찾을 수 없습니다.");
    }


    

    // 요청 보내기
    xhr.send(jsonData);
}


document.querySelector('.post-form').addEventListener('submit', function (event) {
    event.preventDefault(); // 기본 제출 동작 방지
    sendDataToServer(); // 폼 데이터 서버에 JSON 형식으로 전송
});
