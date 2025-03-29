document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("signupForm").addEventListener("submit", async function (e) {
        e.preventDefault(); // Prevent normal form submission

        // Get user input values
        const email = document.getElementById("email").value;
        const username = document.getElementById("username").value;
        const password = document.getElementById("user_password").value;
        const confirmPassword = document.getElementById("confirm_password").value;

        // Validate if the passwords match
        if (password !== confirmPassword) {
            showError("Passwords do not match.");
            return;
        }

        // Clear previous error messages (if any)
        clearError();

        // Create the data object to send in the request body
        const data = { email, username, password };

        try {
            // Send the POST request to the server
            const response = await fetch("/api/v1/signUp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            // Parse the response from the server
            const result = await response.json();

            // Handle server responses based on the status code
            if (response.status === 201) {
                // Redirect to the login page if sign-up is successful
                window.location.href = "../html/login.html";
            } else {
                // Show the error message from the server
                showError(result.error || "Something went wrong, please try again.");
            }
        } catch (e) {
            // Handle any errors during the fetch request
            console.error("Error:", e);
            showError("An unexpected error occurred. Please try again later.");
        }
    });

    // Function to display the error message in red text
    function showError(message) {
        const errorMessageElement = document.getElementById("error-message");
        errorMessageElement.textContent = message;  // Set the error message text
        errorMessageElement.style.display = "block"; // Show the error message div
    }

    // Function to clear the error message
    function clearError() {
        const errorMessageElement = document.getElementById("error-message");
        errorMessageElement.style.display = "none"; // Hide the error message div
        errorMessageElement.textContent = '';  // Clear the text content
    }
});
