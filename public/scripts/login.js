const loginButton = document.querySelector('.loginButton')

const loginForm = document.querySelector('.loginForm')

loginForm.addEventListener('submit', async function (e) {
    e.preventDefault();
    const status = document.querySelector('#statusMessage')

    status.classList.add("checking")
    status.textContent = "Login-gegevens verifiëren..."

        let loginFormData = new FormData(loginForm)

        const loginName = await document.querySelector('#name').value
        const loginPassword = await document.querySelector('#password').value

        if (loginName == "admin" && loginPassword == "admin") {
            const response = await fetch(loginForm.action, {
                method: loginForm.method,
                body: loginFormData
            })
            if (response.redirected) {
                window.location.href = response.url
            }
        } else {
            setTimeout(() => {
                status.textContent = "Ongeldige combinatie van naam en wachtwoord! Controleer je ingevoerde gegevens."
            }, 2000);
        }
})