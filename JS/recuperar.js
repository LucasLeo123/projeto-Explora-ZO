document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("#esqueceumain form");
    if (!form) return;

    const email = document.getElementById("email");

    form.noValidate = true;

    function limparErro() {
        const aviso = form.querySelector(".erro");
        if (aviso) aviso.remove();
    }

    function removerSucesso() {
        const antigo = document.getElementById("recuperar-sucesso");
        if (antigo) antigo.remove();
    }

    function mostrarErro(mensagem) {
        limparErro();
        const aviso = document.createElement("span");
        aviso.className = "erro";
        aviso.setAttribute("role", "alert");
        aviso.textContent = mensagem;
        email.insertAdjacentElement("afterend", aviso);
    }

    email.addEventListener("input", limparErro);

    form.addEventListener("submit", function (e) {
        e.preventDefault();
        removerSucesso();
        limparErro();

        const valor = email.value.trim();
        const padraoEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!padraoEmail.test(valor)) {
            mostrarErro("Digite um e-mail válido, como nome@exemplo.com.");
            email.focus();
            return;
        }

        const sucesso = document.createElement("div");
        sucesso.id = "recuperar-sucesso";
        sucesso.setAttribute("role", "status");
        sucesso.style.cssText =
            "margin:16px auto 0;padding:12px 16px;max-width:420px;border-radius:8px;" +
            "background:#eef7ef;border:1px solid #6fd58c;color:#1f5c2f;font-weight:600;";
        sucesso.textContent =
            "E-mail conferido! O envio das instruções será liberado quando o site tiver um servidor.";
        form.appendChild(sucesso);
    });
});