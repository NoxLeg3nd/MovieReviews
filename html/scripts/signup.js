document.getElementById('signupForm').addEventListener('submit', async function (e) {
    e.preventDefault(); // Prevent default form submission

    // Get form data
    const email = document.getElementById('email').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('user_password').value;
    const confirmPassword = document.getElementById('confirm_password').value;

    // Basic form validation
    if (password !== confirmPassword) {
        showError('Passwords do not match.');
        return;
    }

    // Prepare data for POST request
    const data = {
        email,
        username,
        password
    };

    try {
        // Send the POST request
        const response = await fetch('/api/v1/signUp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        // Handle the response
        const result = await response.json();

        if (response.status === 201) {
            // Account created successfully, you can redirect or display a success message
            window.location.href = '../login.html'; // Redirect to homepage or login page
        } else {
            // Show error message if any
            showError(result.error || 'Something went wrong, please try again.');
        }
    } catch (e) {
        console.error(e);
        showError('An unexpected error occurred. Please try again later.');
    }
});

// Function to show error messages
function showError(message) {
    const errorMessageElement = document.getElementById('error-message');
    if (errorMessageElement) {
        errorMessageElement.textContent = message; // Set the error message
        errorMessageElement.style.display = 'block'; // Show error message
    }
}
