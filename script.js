document.addEventListener("DOMContentLoaded", function () {
    const chatBody = document.getElementById("chat-body");
    const userInput = document.getElementById("user-input");
    const sendButton = document.getElementById("send-button");
    const startButton = document.getElementById("startButton");
    const loadingScreen = document.getElementById("loadingScreen");

    // ฟังก์ชันเพิ่มข้อความลงในหน้าจอแชท
    function appendMessage(sender, message) {
        let msgDiv = document.createElement("div");
        msgDiv.classList.add("message", sender);
        msgDiv.innerHTML = `<strong>${sender}:</strong> ${message}`;
        chatBody.appendChild(msgDiv);
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    // ฟังก์ชันส่งข้อความ
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

    // กดปุ่มส่งข้อความ
    sendButton.addEventListener("click", sendMessage);
    
    // กด Enter เพื่อส่งข้อความ
    userInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") sendMessage();
    });

    // ฟังก์ชันโหลดหน้าแชท
    function startLoading() {
        if (startButton) {
            startButton.style.display = 'none'; // ซ่อนปุ่ม
            loadingScreen.classList.add('visible'); // แสดงหน้าจอโหลด

            setTimeout(() => {
                window.location.href = 'chat.html'; // เปลี่ยนหน้าไปยัง chat.html
            }, 2500); // แสดงหน้าจอโหลดเป็นเวลา 2.5 วินาที
        }
    }

    // เชื่อมปุ่ม OPEN CHAT กับฟังก์ชันโหลด
    if (startButton) {
        startButton.addEventListener("click", startLoading);
    }
});
