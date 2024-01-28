// APIkey stored in global variable
let apiKey = "";

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
    const userInputValue = document.getElementById("userInput").value;
        console.log("User Input:", userInputValue);

    // Display the user input in the chat output section
    document.getElementById("chatOutput").textContent = userInputValue;

    // Send the user input to the OpenAI API
    // sendToOpenAI(userInputValue);
}

// DOM to stop submit button from reloading page//
document.getElementById("submitUserInputBtn").addEventListener('click', (event) =>{
    event.preventDefault()
}) 