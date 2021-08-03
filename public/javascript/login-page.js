async function loginHandler(event) {
    event.preventDefault();
    const username = document.querySelector('input[name="username-login"]').value;
    const password = document.querySelector('input[name="password-login"]').value;

    console.log(username, password);
}

async function newUserHandler(event) {
    event.preventDefault();
    const username = document.querySelector('input[name="username-register"]').value;
    const password = document.querySelector('input[name="password-register"]').value;

    const response = await fetch('/api/user', {
        method: 'POST',
        body: JSON.stringify({
            username,
            password
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (response.ok) {
        document.location.reload();
    } else {
        alert(response.statusText);
    }

    console.log(username, password);
}

document.getElementById('btn-register').addEventListener('click', newUserHandler);
document.getElementById('btn-login').addEventListener('click', loginHandler);