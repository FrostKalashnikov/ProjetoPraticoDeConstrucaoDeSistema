document.getElementById('Cadastrar').addEventListener('click', function() {
    // Ação ao clicar no botão "Entrar"
    window.location.href = 'cadastro.html'; // Substitua 'cadastro.html' pela URL da sua página de cadastro
});

document.getElementById('forgot-password-link').addEventListener('click', function(event) {
    event.preventDefault();
    // Ação ao clicar no link "Esqueceu sua senha?"
    alert('Redirecionar para a página de recuperação de senha.');
});