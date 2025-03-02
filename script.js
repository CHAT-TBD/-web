document.addEventListener("DOMContentLoaded", function () {
    const chatBox = document.getElementById("chat-box");
    const userInput = document.getElementById("user-input");
    const sendButton = document.getElementById("send-button");

    function appendMessage(sender, message) {
        let msgDiv = document.createElement("div");
        msgDiv.classList.add("message", sender);
        msgDiv.innerHTML = `<strong>${sender}:</strong> ${message}`;
        chatBox.appendChild(msgDiv);
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    function sendMessage() {
        let userText = userInput.value.trim();
        if (userText === "") return;

        appendMessage("คุณ", userText);
        userInput.value = "";

        // ส่งข้อความไปที่ Flask API
        fetch("/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: userText })
        })
        .then(response => response.json())
        .then(data => {
            if (data.response === "ขอโทษ ฉันไม่เข้าใจ") {
                // ถามผู้ใช้ให้สอนคำตอบใหม่
                let newResponse = prompt("ฉันไม่เข้าใจคำถามนี้ คุณสามารถสอนฉันได้ไหม?");
                if (newResponse) {
                    fetch("/train", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ input: userText, response: newResponse })
                    })
                    .then(res => res.json())
                    .then(data => alert(data.message));
                }
            } else {
                appendMessage("บอท", data.response);
            }
        })
        .catch(error => console.error("Error:", error));
    }

    sendButton.addEventListener("click", sendMessage);
    userInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") sendMessage();
    });
});
