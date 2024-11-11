<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Coleta e sanitiza os dados do formulário
    $nome = htmlspecialchars(trim($_POST['name']));
    $email = htmlspecialchars(trim($_POST['email']));
    $mensagem = htmlspecialchars(trim($_POST['mensagem']));

    // Valida o e-mail
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        header('Content-Type: text/plain; charset=utf-8');
        header('Location: /index.html?status=error');
        exit();
    }

    // Valida se nome e mensagem não estão vazios
    if (empty($nome) || empty($mensagem)) {
        header('Content-Type: text/plain; charset=utf-8');
        header('Location: /index.html?status=error');
        exit();
    }

    // Configurações do e-mail
    $para = 'luanmenezes@luanmenezes70777.criarsite.online';
    $assunto = 'Mensagem da população';
    $conteudo = "<p><strong>Nome:</strong> $nome</p><p><strong>Email:</strong> $email</p><p><strong>Mensagem:</strong><br>$mensagem</p>";

    $headers  = "MIME-Version: 1.0\r\n";
    $headers .= "Content-type: text/html; charset=UTF-8\r\n";
    $headers .= "From: $nome <$email>\r\n";

    // Envia o e-mail e redireciona com base no resultado
    if (mail($para, $assunto, $conteudo, $headers)) {
        header('Content-Type: text/plain; charset=utf-8');
        header('Location: /index.html?status=success');
    } else {
        header('Content-Type: text/plain; charset=utf-8');
        header('Location: /index.html?status=error');
    }
    exit();
} else {
    // Redireciona se a requisição não for POST
    header('Content-Type: text/plain; charset=utf-8');
    header('Location: /index.html');
    exit();
}
?>