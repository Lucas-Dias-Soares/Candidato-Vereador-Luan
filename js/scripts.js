document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Previne o comportamento padrão do formulário

    var form = event.target;
    var formData = new FormData(form);

    // Verifica se o formulário é válido
    if (!form.checkValidity()) {
        showMessage('Por favor, preencha todos os campos obrigatórios.', 'error');
        return;
    }

    fetch(form.action, {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (response.ok) {
            // Redireciona para a página principal com o status de sucesso
            window.location.href = window.location.pathname + '?status=success';
        } else {
            // Redireciona para a página principal com o status de erro
            window.location.href = window.location.pathname + '?status=error';
        }
    })
    .catch(() => {
        // Redireciona para a página principal com o status de erro em caso de falha na requisição
        window.location.href = window.location.pathname + '?status=error';
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // Obtém o parâmetro de status da URL
    const urlParams = new URLSearchParams(window.location.search);
    const status = urlParams.get('status');

    if (status === 'success') {
        showMessage('Mensagem enviada com sucesso!', 'success');
    } else if (status === 'error') {
        showMessage('Erro ao enviar mensagem. Tente novamente.', 'error');
    }

    // Remove o parâmetro status da URL após exibir a mensagem
    if (status) {
        const newUrl = window.location.pathname;
        window.history.replaceState({}, document.title, newUrl);
    }
});

function showMessage(message, type) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type} show`;
    messageDiv.textContent = message;
    document.body.prepend(messageDiv);
    
    // Remove a mensagem após alguns segundos
    setTimeout(() => {
        messageDiv.classList.remove('show');
        setTimeout(() => messageDiv.remove(), 300); 
    }, 3000);
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});