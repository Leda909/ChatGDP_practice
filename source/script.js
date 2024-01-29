let apiKey = "";  // APIkey stored in global variable
let userQuestion = "";   // userQuestion stored in global variable
let chatGdpRespond = "";

function submitApiKey(){
    // Get the value of the API key input
    apiKey = document.getElementById("apiKeyInput").value;
        console.log("API Key:", apiKey);

    // Remove the API key input form from the UI
    const apiKeyForm = document.getElementById("apiKeyForm");
    apiKeyForm.parentNode.removeChild(apiKeyForm);
}
// DOM to stop submit button from reloading page//
document.getElementById("submitApiKeyBtn").addEventListener('click', (event) =>{
    event.preventDefault()
}) 

// Function to handle user input
function UserInput() {
    // Get the value of the user input
    userQuestion = document.getElementById("userInput").value;
        console.log("User Input:", userQuestion);

    // Display the user input in the chat output section
    //document.getElementById("chatOutput").textContent = userQuestion;

    // Send the user input to the OpenAI API
    sendToOpenAI(apiKey, userQuestion);
}

// DOM to stop submit button from reloading page//
document.getElementById("submitUserInputBtn").addEventListener('click', (event) =>{
    event.preventDefault()
})

// Function to send user input to OpenAI API
function sendToOpenAI(apiKey, userQuestion) {
    // If there is no input
    if (apiKey === '') {
        console.log('Password Error');
        return; 
    }
    if (userQuestion === '' ){
        console.log('user input error');
        return;
    } 

    fetch("https://api.openai.com/v1/chat/completions", {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: [{role: 'user', content: userQuestion}]
        })
    })
    .then((response) => {
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        return response.json();
    })
    // .then((json) => console.log(json))
    .then((data) => {
        chatGdpRespond = data.choices[0].message.content;
        console.log(chatGdpRespond);
        return chatGdpRespond;
    })
    .then((chatResponse) => document.getElementById('chatOutput').innerHTML = chatResponse)

    .catch((error) => {
        console.error("Error sending request to OpenAI API:", error.message);
        if (error.response) {
            console.error("Response status:", error.response.status);
            console.error("Response data:", error.response.data);
        }
        alert("Error sending request to OpenAI API. Check console for details.");
    });
};

