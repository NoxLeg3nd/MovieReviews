document.getElementById('loginForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const data = {
        email,
        password
    };
    try {
        const response = await fetch('/api/v1/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        const result = await response.json();
        if (response.status === 201) {
            window.location.href = 'index.html';
        } else {
            showError(result.error || 'Something went wrong, please try again.');
        }
    } catch (e) {
        console.error(e);
        showError('An unexpected error occurred. Please try again later.');
    }
});

function showError(message) {
    const errorMessageElement = document.getElementById('error-message');
    errorMessageElement.textContent = message;
    errorMessageElement.style.display = 'block'; // Show error message
}