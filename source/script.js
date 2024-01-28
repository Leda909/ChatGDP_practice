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

