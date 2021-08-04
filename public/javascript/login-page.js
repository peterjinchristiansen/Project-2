async function loginHandler(event) {
    event.preventDefault();
    const username = document.querySelector('input[name="username-login"]').value;
    const password = document.querySelector('input[name="password-login"]').value;

    const response = await fetch('/api/user/auth', {
        method: 'GET',
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
}

async function newUserHandler(event) {
    event.preventDefault();
    const username = document.querySelector('input[name="username-register"]').value;
    const password = document.querySelector('input[name="password-register"]').value;

    if (username && password) {
        const usernameValidate = await fetch('/api/user/' + username)
            .then(res => res.json())

        if (usernameValidate === null) {
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
        } else {
            alert('Username already exists.')
        }
    } else {
        alert('Enter your username and password.');
    }
}

    document.getElementById('btn-register').addEventListener('click', newUserHandler);
    document.getElementById('btn-login').addEventListener('click', loginHandler);