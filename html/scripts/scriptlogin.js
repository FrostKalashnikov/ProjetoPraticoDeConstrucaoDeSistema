document.getElementById('entrar-button').addEventListener('click', function (event) {
    event.preventDefault();

    const email = document.getElementById('email-input').value
    const password = document.getElementById('password-input').value

    fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email, password: password })
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Login realizado com sucesso!')
                window.location.href = '/meufinanceiro'
            } else {
                alert('Email ou senha incorretos.')
            }
        })
        .catch(error => {
            console.error('Erro ao fazer login:', error)
            alert('Erro ao fazer login.')
        })

})

document.getElementById('cadastro').addEventListener('click', function () {
    window.location.href = '/cadastro';
});
