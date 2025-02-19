const OPENAI_API_KEY = "https://api.openai.com/v1/chat/completions";  // Replace with your OpenAI API key

async function sendMessage() {
    let userInput = document.getElementById("user-input").value.trim();
    if (userInput === "") return;

    appendMessage(userInput, "user");
    document.getElementById("user-input").value = "";

    let response = await getChatbotResponse(userInput);
    appendMessage(response, "bot");
}

function appendMessage(text, sender) {
    let chatBox = document.getElementById("chat-box");
    let messageDiv = document.createElement("div");
    messageDiv.className = `chat-message ${sender}`;
    messageDiv.innerText = text;
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}

async function getChatbotResponse(userMessage) {
    let prompt = `Based on Harrison’s Principles of Internal Medicine, provide a response to: ${userMessage}`;
    
    let response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${OPENAI_API_KEY}`
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{ role: "system", content: "You are a medical assistant trained on Harrison's Principles of Internal Medicine." }, 
                       { role: "user", content: prompt }]
        })
    });

    let data = await response.json();
    return data.choices[0].message.content;
}
