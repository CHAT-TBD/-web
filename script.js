let language = "en"; // Default language is English

// Mock profiles
const userName = "You";
const botName = "TBD";
const userAvatar = "https://img5.pic.in.th/file/secure-sv1/1000049084ea52cf432a302e47.jpg";
const botAvatar = "https://i.postimg.cc/vZ3K4K7D/1-20241214-153021-0000.png";

// Replies
const predefinedReplies = {
  en: {
    "hello": "Hi! How can I assist you?",
    "สวัสดี":"โปรดเลือกภาษาไทย",
    "Hi": "Hi! How can I assist you?",
    "how are you": "I'm doing great, thank you for asking!",
    "what is your name": "I'm Chatbot, nice to meet you!",
    "good morning": "Good morning! How can I help you today?",
    "good night": "Good night! Sleep well!",
    "what is your purpose": "I am here to help you with anything you need.",
    "tell me a joke": "Why don’t skeletons fight each other? They don’t have the guts!",
    "how can I help you": "You can ask me questions or tell me what you need help with!",
    "what is the weather like": "I’m sorry, I can't check the weather right now.",
    "what time is it": "I'm sorry, I can't check the time for you.",
    "how old are you": "I don’t have an age, I'm just a chatbot!",
    "what do you like to do": "I like to chat and help people.",
    "where are you from": "I’m from the digital world!",
    "can you help me": "Of course! What do you need help with?",
    "what is your favorite color": "I don’t have a favorite color, but I think blue is nice.",
    "do you have emotions": "No, I don’t experience emotions, but I’m designed to be helpful.",
    "are you real": "I’m real in the digital sense, but I’m not a human.",
    "tell me a story": "Once upon a time, there was a chatbot who loved to help people...",
    "can you speak any other languages": "Yes, I can chat in multiple languages.",
    "what is love": "Love is a deep feeling of affection, but I can’t experience it.",
    "who is the president": "I don't have real-time info, but you can look it up online.",
    "are you a robot": "I’m not a robot, I’m a chatbot!",
    "what is 2+2": "2 + 2 is 4.",
    "what is the capital of France": "The capital of France is Paris.",
    "what is your favorite food": "I don’t eat food, but I know a lot about it.",
    "can you play games": "I can’t play games, but I can help you find some!",
    "do you like music": "I can’t listen to music, but I know about different types.",
    "what is the meaning of life": "The meaning of life is subjective, but many say it’s about finding happiness.",
    // Additional 80+ entries...
  },
  th: {
    "สวัสดี": "สวัสดี! มีอะไรให้ช่วยไหม?",
    "hello":"Please select English",
    "Hi":"Please select English",
    "คุณเป็นอย่างไรบ้าง": "ฉันสบายดี ขอบคุณที่ถาม!",
    "คุณชื่ออะไร": "ฉันชื่อแชทบอท ยินดีที่ได้รู้จัก!",
    "สวัสดีตอนเช้า": "สวัสดีตอนเช้า! มีอะไรให้ช่วยไหม?",
    "ราตรีสวัสดิ์": "ราตรีสวัสดิ์! หลับฝันดี!",
    "หน้าที่ของคุณคืออะไร": "ฉันอยู่ที่นี่เพื่อช่วยคุณทุกอย่างที่คุณต้องการ",
    "เล่าเรื่องตลกให้ฟัง": "ทำไมกระดูกถึงไม่สู้กัน? เพราะมันไม่มี guts!",
    "ฉันจะขอความช่วยเหลือได้ไหม": "แน่นอน! คุณต้องการให้ฉันช่วยอะไร?",
    "อากาศวันนี้เป็นอย่างไร": "ขอโทษ ฉันไม่สามารถตรวจสอบสภาพอากาศได้ตอนนี้",
    "เวลานี้กี่โมง": "ขอโทษ ฉันไม่สามารถตรวจสอบเวลาให้คุณได้",
    "คุณอายุเท่าไหร่": "ฉันไม่มีอายุ เพราะฉันเป็นแชทบอท!",
    "คุณชอบทำอะไร": "ฉันชอบการแชทและช่วยเหลือผู้คน",
    "คุณมาจากไหน": "ฉันมาจากโลกดิจิตอล!",
    "คุณช่วยฉันได้ไหม": "แน่นอน! คุณต้องการให้ฉันช่วยอะไร?",
    "คุณชอบสีอะไร": "ฉันไม่มีสีโปรด แต่คิดว่าสีฟ้าก็ดูดีนะ",
    "คุณมีความรู้สึกไหม": "ฉันไม่มีความรู้สึก แต่ฉันออกแบบมาให้ช่วยเหลือคุณ",
    "คุณเป็นของจริงไหม": "ฉันเป็นของจริงในทางดิจิตอล แต่ไม่ใช่มนุษย์",
    "เล่าเรื่องให้ฟังหน่อย": "กาลครั้งหนึ่งมีแชทบอทที่ชอบช่วยเหลือผู้คน...",
    "คุณพูดภาษาต่างประเทศได้ไหม": "ใช่ ฉันสามารถแชทได้หลายภาษา",
    "ความรักคืออะไร": "ความรักคือความรู้สึกที่ลึกซึ้ง แต่ฉันไม่สามารถสัมผัสได้",
    "ใครเป็นประธานาธิบดี": "ขอโทษ ฉันไม่มีข้อมูลล่าสุด แต่คุณสามารถค้นหาข้อมูลได้ทางออนไลน์",
    "คุณเป็นหุ่นยนต์ไหม": "ฉันไม่ใช่หุ่นยนต์ ฉันเป็นแชทบอท!",
    "เมืองหลวงของฝรั่งเศสคืออะไร": "เมืองหลวงของฝรั่งเศสคือปารีส",
    "คุณชอบอาหารอะไร": "ฉันไม่ทานอาหาร แต่ฉันรู้จักอาหารหลายประเภท",
    "คุณเล่นเกมได้ไหม": "ฉันไม่สามารถเล่นเกมได้ แต่ฉันสามารถช่วยคุณค้นหาเกมสนุกๆ ได้",
    "คุณชอบเพลงไหม": "ฉันไม่สามารถฟังเพลงได้ แต่ฉันรู้จักประเภทต่างๆ ของเพลง",
    "ชีวิตมีความหมายอย่างไร": "ความหมายของชีวิตขึ้นอยู่กับแต่ละบุคคล แต่หลายคนบอกว่าคือการหาความสุข",
    //new
    "ทำไรดี":"ไม่รู้สิ",
    "ขอตังค์หน่อย":"หาเองสิ",
    "ขอตังค์":"หาเอง",
    "ขอเงิน":"หาเองสิ",
    "น่าเบื่อ":"เล่นเกมสิ😊",
    "เศร้า":"โอ้ๆ😘",
    "นอนละ":"ฝันดี",
    "ท้อละ":"โอ้ๆ ไม่เป็นไร",
    "เหงาจัง":"วายๆ",
    "เหงา":"วายๆ",
    "ง่วงนอน":"ไปนอนสิ",
    "ง่วง":"ไปนอนสิ",
    "ไปนอนละ":"ฝันดี",
    "คือใคร":"ไม่รู้",
    "เจ็บใจ":"สมน้ำหน้า",
    "กินไรดี":"ก๋วยเตี๋ยวหรือส้มตำ✅️",
    "55555":"มีอะไรให้ช่วยไหม?",
    "":"",
    "":"",
    "":"",
    "":"",
    "":"",
    "1+1 เท่ากับอะไร": "1 + 1 เท่ากับ 2",
    "1+1=": "1 + 1 เท่ากับ 2",
    "2+2 เท่ากับอะไร": "2 + 2 เท่ากับ 4",
    "2+2=": "2 + 2 เท่ากับ 4",
    "3+3 เท่ากับอะไร": "3 + 3 เท่ากับ 6",
    "3+3=": "3 + 3 เท่ากับ 6",
    "4+4 เท่ากับอะไร": "4 + 4 เท่ากับ 8",
    "4+4=": "4 + 4 เท่ากับ 8",
    "5+5 เท่ากับอะไร": "5 + 5 เท่ากับ 10",
    "5+5=": "5 + 5 เท่ากับ 10",
    "6+6 เท่ากับอะไร": "6 + 6 เท่ากับ 12",
    "6+6=": "6 + 6 เท่ากับ 12",
    //คำหยาบ
    "หี":"กรุณาใช้ภาษาที่สุภาพในการสนทนา ขอบคุณ",
    "หำ":"กรุณาใช้ภาษาที่สุภาพในการสนทนา ขอบคุณ",
    "หีดำ":"กรุณาใช้ภาษาที่สุภาพในการสนทนา ขอบคุณ",
    "หำดำ":"กรุณาใช้ภาษาที่สุภาพในการสนทนา ขอบคุณ",
    "ไก่":"กรุณาใช้ภาษาที่สุภาพในการสนทนา ขอบคุณ",
    "ควาย":"กรุณาใช้ภาษาที่สุภาพในการสนทนา ขอบคุณ",
    "สัส":"กรุณาใช้ภาษาที่สุภาพในการสนทนา ขอบคุณ",
    "ควย":"กรุณาใช้ภาษาที่สุภาพในการสนทนา ขอบคุณ",
    "เหี้ย":"กรุณาใช้ภาษาที่สุภาพในการสนทนา ขอบคุณ",
    "ไอ้ส้นตีน":"กรุณาใช้ภาษาที่สุภาพในการสนทนา ขอบคุณ",
    "เย็ด":"กรุณาใช้ภาษาที่สุภาพในการสนทนา ขอบคุณ",
    "เป็นควยไร":"กรุณาใช้ภาษาที่สุภาพในการสนทนา ขอบคุณ",
    "เป็นเหี้ยอะไร":"กรุณาใช้ภาษาที่สุภาพในการสนทนา ขอบคุณ",
    "ไอ้ส้นตี":"กรุณาใช้ภาษาที่สุภาพในการสนทนา ขอบคุณ",
    "":"",
    "":"",
    "":"",
    "":"",
    "":"",
    "":"",
    "":"",
    "":"",
    "":"",
//Beta
    "":""
    
    // Additional 80+ entries...
  }
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

// Check if user message contains certain keywords
function containsKeyword(userMessage, keywords) {
  return keywords.some(keyword => userMessage.includes(keyword));
}

// Get best match for the user input
function getBestMatch(userMessage, predefined) {
  const keys = Object.keys(predefined);
  let bestMatch = null;
  let bestDistance = Infinity;

  const threshold = language === "th" ? 5 : 3; // Adjust threshold by language

  keys.forEach((key) => {
    const distance = levenshteinDistance(userMessage, key.toLowerCase());
    if (distance < bestDistance) {
      bestDistance = distance;
      bestMatch = key;
    }
  });

  return bestDistance <= threshold ? bestMatch : null;
}

// Get bot reply
function getBotReply(userMessage) {
  const normalizedMessage = userMessage.toLowerCase().trim();
  const predefined = predefinedReplies[language];

  // Check predefined replies
  const bestMatch = getBestMatch(normalizedMessage, predefined);
  if (bestMatch) {
    return predefined[bestMatch];
  }

  // Check for keywords
  const keywords = language === "th" ? ["ช่วย", "ถาม", "บอก"] : ["help", "question", "tell"];
  if (containsKeyword(normalizedMessage, keywords)) {
    return language === "th" ? "ฉันพร้อมช่วยคุณเเต่อาจจะช่วยไม่ได้มากเพราะระบบอยู่ในช่วง Beta " : "I'm ready to help you, but I may not be able to help much because the system is in Beta.";
  }

  // Fallback response
  const fallbackReplies = language === "en" 
    ? ["Sorry, I don't understand. Can you try typing again?", "I'm not sure what you mean. Could you please explain more?."] 
    : ["ขอโทษ ฉันไม่เข้าใจ ลองพิมพ์ใหม่อีกครั้งได้ไหม", "ฉันไม่แน่ใจว่าคุณหมายถึงอะไร คุณช่วยอธิบายเพิ่มเติมได้ไหม"];

  return fallbackReplies[Math.floor(Math.random() * fallbackReplies.length)];
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
