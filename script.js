let language = "en"; // Default language is English

// Mock profiles
const userName = "You";
const botName = "Chatbot";
const userAvatar = "https://via.placeholder.com/40?text=U";
const botAvatar = "https://via.placeholder.com/40?text=B";

// Replies
const predefinedReplies = {
  en: {
    "hello": "Hi there! How can I assist you today?",
    "how are you?": "I'm just a bot, but I'm here to help you!",
    "what is your name?": "I'm Chatbot, your virtual assistant."
  },
  th: {
    "สวัสดี": "สวัสดี! มีอะไรให้ช่วยไหม?",
    "คุณเป็นใคร": "ฉันเป็นแชทบอท พร้อมช่วยคุณ!",
    "คุณชื่ออะไร": "ฉันชื่อแชทบอท ยินดีที่ได้รู้จัก"
  }
};

// Default random replies
const defaultReplies = {
  en: [
    "I'm not sure I understand that.",
    "Could you rephrase?",
    "Interesting, tell me more!",
    "Sorry, I don't have an answer for that.",
    "That's a good question!"
  ],
  th: [
    "ฉันไม่แน่ใจว่าคุณหมายถึงอะไร",
    "ช่วยพิมพ์ใหม่ได้ไหม?",
    "น่าสนใจนะ! เล่าเพิ่มเติมสิ",
    "ขอโทษ ฉันไม่มีคำตอบสำหรับคำถามนี้",
    "คำถามดีมากเลย!"
  ]
};

// Elements
const chatBody = document.getElementById("chat-body");
const userInput = document.getElementById("user-input");
const sendButton = document.getElementById("send-button");
const langEnButton = document.getElementById("lang-en");
const langThButton = document.getElementById("lang-th");

// Calculate Levenshtein Distance (string similarity)
function levenshteinDistance(a, b) {
  const matrix = [];
  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }
  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }
  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // substitution
          matrix[i][j - 1] + 1, // insertion
          matrix[i - 1][j] + 1 // deletion
        );
      }
    }
  }
  return matrix[b.length][a.length];
}

// Get best match for the user input
function getBestMatch(userMessage, predefined) {
  const keys = Object.keys(predefined);
  let bestMatch = null;
  let bestDistance = Infinity;

  keys.forEach((key) => {
    const distance = levenshteinDistance(userMessage, key.toLowerCase());
    if (distance < bestDistance) {
      bestDistance = distance;
      bestMatch = key;
    }
  });

  // Consider it a match only if the distance is reasonable
  return bestDistance <= 3 ? bestMatch : null; // Adjust threshold if needed
}

// Get bot reply
function getBotReply(userMessage) {
  const normalizedMessage = userMessage.toLowerCase().trim();
  const predefined = predefinedReplies[language];

  // Find the best match in predefined replies
  const bestMatch = getBestMatch(normalizedMessage, predefined);

  if (bestMatch) {
    return predefined[bestMatch];
  }

  // Return a random reply if no match is found
  return defaultReplies[language][Math.floor(Math.random() * defaultReplies[language].length)];
}

// Add message to chat
function addMessage(sender, text, avatar) {
  const messageDiv = document.createElement("div");
  messageDiv.classList.add("message", sender);

  const avatarImg = document.createElement("img");
  avatarImg.src = avatar;

  const textDiv = document.createElement("div");
  textDiv.textContent = text;

  messageDiv.appendChild(avatarImg);
  messageDiv.appendChild(textDiv);
  chatBody.appendChild(messageDiv);

  chatBody.scrollTop = chatBody.scrollHeight;
}

// Add thinking animation
function addThinkingAnimation() {
  const thinkingDiv = document.createElement("div");
  thinkingDiv.classList.add("thinking");
  thinkingDiv.innerHTML = `
    <img src="${botAvatar}" alt="Bot">
    <div class="dots">
      <span>.</span>
      <span>.</span>
      <span>.</span>
    </div>
  `;
  chatBody.appendChild(thinkingDiv);
  chatBody.scrollTop = chatBody.scrollHeight;
  return thinkingDiv;
}

// Remove thinking animation
function removeThinkingAnimation(thinkingDiv) {
  if (thinkingDiv) {
    thinkingDiv.remove();
  }
}

// Send message
function sendMessage() {
  const userMessage = userInput.value.trim();
  if (userMessage) {
    addMessage("user", userMessage, userAvatar);
    userInput.value = "";

    // Show thinking animation
    const thinkingDiv = addThinkingAnimation();

    setTimeout(() => {
      // Remove thinking animation and add bot reply
      const botReply = getBotReply(userMessage);
      removeThinkingAnimation(thinkingDiv);
      addMessage("bot", botReply, botAvatar);
    }, 1500); // Simulate delay for bot response
  }
}

// Switch language
function switchLanguage(lang) {
  language = lang;
  if (lang === "en") {
    langEnButton.classList.add("active");
    langThButton.classList.remove("active");
    userInput.placeholder = "Type a message...";
  } else if (lang === "th") {
    langEnButton.classList.remove("active");
    langThButton.classList.add("active");
    userInput.placeholder = "พิมพ์ข้อความ...";
  }
}

// Event listeners
sendButton.addEventListener("click", sendMessage);
userInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    sendMessage();
  }
});
langEnButton.addEventListener("click", () => switchLanguage("en"));
langThButton.addEventListener("click", () => switchLanguage("th"));