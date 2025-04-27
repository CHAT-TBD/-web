function sendMessage() {
  const userInput = document.getElementById('user-input').value;
  if (userInput.trim() !== "") {
    displayMessage(userInput, "user");
    document.getElementById('user-input').value = "";
    setTimeout(() => {
      generateBotResponse(userInput);
    }, 1000);
  }
}

function displayMessage(message, sender) {
  const chatBox = document.getElementById('chat-box');
  const messageDiv = document.createElement('div');
  messageDiv.classList.add('message', sender);
  messageDiv.textContent = message;
  chatBox.appendChild(messageDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function generateBotResponse(userMessage) {
  let botResponse = "ขอโทษ, ฉันไม่เข้าใจข้อความของคุณ.";  // Default response
  
  // Basic responses
  if (userMessage.toLowerCase().includes("สวัสดี")) {
    botResponse = "สวัสดีค่ะ! มีอะไรให้ฉันช่วยไหม?";
  } else if (userMessage.toLowerCase().includes("คุณชื่ออะไร")) {
    botResponse = "ฉันคือแชทบอทค่ะ!";
  }

  // Display bot response
  displayMessage(botResponse, "bot");
}
