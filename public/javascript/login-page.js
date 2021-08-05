async function loginHandler(event) {
    event.preventDefault();
    const username = document.querySelector('input[name="username-login"]').value;
    const password = document.querySelector('input[name="password-login"]').value;

    if (username && password) {
        const usernameValidate = await fetch('/api/user/' + username)
            .then(res => res.json())

        if (usernameValidate != null) {
            const userHash = usernameValidate.password;
            
            const response = await fetch('/api/user/auth', {
                method: 'POST',
                body: JSON.stringify({
                    username,
                    password,
                    userHash
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.ok) {
                validateSession(username);
            } else {
                alert(response.statusText);
            }
        } else {
            alert('Incorrect username or password.')
        }
    } else {
        alert('Enter your username and password.');
    }
}

async function validateSession(username) {
    const response = await fetch('/api/user/auth/login', {
        method: 'POST',
        body: JSON.stringify({
            username
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (response.ok) {
        document.location.replace('/');
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
                document.location.replace('/');
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