const form = document.getElementById("form")
const username = document.getElementById("username")
const email = document.getElementById("email")
const password = document.getElementById("password")
const passwordConfimation = document.getElementById("password-confirmation");


form.addEventListener("submit", (event) => {

    event.preventDefault();
    checkform();

})

function checkInputUsername() {

    const usernameValue = username.value;

    if (usernameValue === "") {
        errorInput(username, "Preencha um nome")
    }
    else {
        const formItem = username.parentElement;
        formItem.className = "form-content"
    }
}
function checkInputEmail() {
    const emailValue = email.value;

    if (emailValue === "") {
        errorInput(email, "DIGITE UM EMAIL")
    } else {
        const formItem = email.parentElement;
        formItem.className = "form-content"

    }
}
function checkInputPassword() {
    const passwordValue = password.value;
    if (passwordValue === "") {
        errorInput(password, "digite uma senha")
    } else if (passwordValue.length < 8) {
        errorInput(password, "Digite mais de 8 caracteres...")

    } else {
        const formItem = password.parentElement;
        formItem.className = "form-content"
    }

}
function checkInputPasswordConfirmation() {
    const passwordValue = password.value;
    const confirmationPasswordValue = passwordConfimation.value;
    if (confirmationPasswordValue === "") {
        errorInput(confirmationPasswordValue, "A confirmação é necessária.")
    } else if (confirmationPasswordValue !== passwordValue) {
        errorInput(passwordConfimation, "As senhas não são iguais")
    } else {
        const formItem = passwordConfimation.parentElement;
        formItem.className = "form-content"
    }

}
function checkform() {
    checkInputUsername();
    checkInputEmail();
    checkInputPassword();
    checkInputPasswordConfirmation();

    const formItems = form.querySelectorAll(".form-content")

    const isValid = [...formItems].every((item) => {
        return item.className === "form-content"
    });
    if (isValid) {

        fetch('/cadastro', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nome: username.value, email: email.value, senha: password.value })
        })
            .then(response => response.text())
            .then(data => {
                console.log(data);
                alert('Cadastro realizado com sucesso!')
                window.location.href = '/'
            })
            .catch(error => {
                console.error('Erro ao cadastrar:', error)
                alert('Erro ao cadastrar.')
            });

    }
}

function errorInput(input, message) {
    const formItem = input.parentElement;
    const textMessage = formItem.querySelector("a")

    textMessage.innerText = message;

    formItem.className = "form-content error"

}
