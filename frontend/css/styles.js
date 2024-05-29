//styles.js

function showMessage(message) {
  console.log('showMessage 함수가 호출되었습니다.');
  const messageSlider = document.createElement('div');
  messageSlider.classList.add('message-slider');
  messageSlider.textContent = message;
  document.body.appendChild(messageSlider);

  // 메시지를 3초 후에 숨김
  setTimeout(() => {
    messageSlider.classList.add('hide');
    // 0.5초 후에 메시지를 삭제
    setTimeout(() => {
      document.body.removeChild(messageSlider);
    }, 500);
  }, 3000);
}
