document.addEventListener("DOMContentLoaded", function () {
    const chatBody = document.getElementById("chat-body");
    const userInput = document.getElementById("user-input");
    const sendButton = document.getElementById("send-button");

    function appendMessage(sender, message) {
        let msgDiv = document.createElement("div");
        msgDiv.classList.add("message", sender);
        msgDiv.innerHTML = `<strong>${sender}:</strong> ${message}`;
        chatBody.appendChild(msgDiv);
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    async function sendMessage() {
        let userText = userInput.value.trim();
        if (userText === "") return;

        appendMessage("คุณ", userText);
        userInput.value = "";

        try {
            let response = await fetch("/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: userText })
            });

            let data = await response.json();

            if (data.response === "ขอโทษ ฉันไม่เข้าใจ") {
                let newResponse = prompt("ฉันไม่เข้าใจคำถามนี้ คุณสามารถสอนฉันได้ไหม?");
                if (newResponse) {
                    let trainResponse = await fetch("/train", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ input: userText, response: newResponse })
                    });

                    let trainData = await trainResponse.json();
                    alert(trainData.message);
                }
            } else {
                appendMessage("บอท", data.response);
            }
        } catch (error) {
            console.error("เกิดข้อผิดพลาด:", error);
            appendMessage("บอท", "ขอโทษ, ระบบมีปัญหา โปรดลองอีกครั้ง!");
        }
    }

    sendButton.addEventListener("click", sendMessage);
    userInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") sendMessage();
    });
});
