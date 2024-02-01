const modal = document.getElementById("modal");
const submitApiKeyBtn = document.getElementById("submitApiKeyBtn");

let apiKey = "";  // APIkey stored in global variable
let userQuestion = "";   // userQuestion stored in global variable
let chatGdpRespond = "";  //  chatGdpRespond stored in global variable

// Display the modal when the page is loaded
document.addEventListener("DOMContentLoaded", () => {
    modal.style.display = "block"; // display modal  
});

function submitApiKey(){
    // Get the value of the API key input
    apiKey = document.getElementById("apiKeyInput").value;
        
    if (apiKey === '') {
        // If apiKey is empty, show an alert
        alert("API key cannot be empty!");
    } else {
        // If apiKey is not empty, hide the modal
        modal.style.display = "none";
    }
}

// DOM to stop submit button from reloading page//
submitApiKeyBtn.addEventListener('click', (event) => {
    event.preventDefault();
    submitApiKey();
        console.log("API Key:", apiKey);
});



// Function to handle user input
function UserInput() {
    // Get the value of the user input
    userQuestion = document.getElementById("userInput").value;
        console.log("User Input:", userQuestion);

    // Send the user input to the OpenAI API
    sendToOpenAI(apiKey, userQuestion);
}

// DOM to stop submit button from reloading page//
document.getElementById("submitUserInputBtn").addEventListener('click', (event) =>{
    event.preventDefault()
})

// Function to send user input to OpenAI API
// function sendToOpenAI(apiKey, userQuestion) {
//     // If there is no input
//     if (apiKey === '') {
//         console.log('Password Error');
//         return; 
//     }
//     if (userQuestion === '' ){
//         console.log('user input error');
//         return;
//     } 


const sendToOpenAI = () => {
    userQuestion = document.getElementById("userInput").value;
        console.log("User Input:", userQuestion);
    try {
        fetch("https://api.openai.com/v1/chat/completions", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: [{role: 'user', content: userQuestion}],
                max_tokens: 100,
            }),
        })
        .then((response) => {
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            return response.json();
        })
        //.then((response) => response.json())
        .then((json) => console.log(json))
        .then((data) => {
            chatGdpRespond = data.choices[0].message.content;
                console.log(chatGdpRespond);
            
            return chatGdpRespond;

            // document.getElementById("chatOutput").innerHTML += 
            //         `<span>You:<span>${userQuestion}</span></span>
            //         <p>${chatGdpRespond}</p><br>`;

        })
        .then((chatResponse) => document.getElementById('chatOutput').innerHTML = chatResponse)
    } catch (error) {
        console.error("Error sending request to OpenAI API:", error.message);
        if (error.response) {
            console.error("Response status:", error.response.status);
            console.error("Response data:", error.response.data);
        }
        alert("Error sending request to OpenAI API. Check console for details.");
    };
}
