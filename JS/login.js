document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("#loginmain form");
    if (!form) return;

    const email = document.getElementById("email");
    const senha = document.getElementById("senha");

    form.noValidate = true;

    function limparErro(campo) {
        const proximo = campo.nextElementSibling;
        if (proximo && proximo.classList.contains("erro")) proximo.remove();
    }

    function mostrarErro(campo, mensagem) {
        limparErro(campo);
        const aviso = document.createElement("span");
        aviso.className = "erro";
        aviso.setAttribute("role", "alert");
        aviso.textContent = mensagem;
        campo.insertAdjacentElement("afterend", aviso);
    }

    function removerSucesso() {
        const antigo = document.getElementById("login-sucesso");
        if (antigo) antigo.remove();
    }

    const rotulo = document.createElement("label");
    rotulo.setAttribute("for", "mostrar-senha");
    rotulo.style.cssText = "display:block;margin-top:6px;font-size:14px;cursor:pointer;color:#003A1C;";

    const caixa = document.createElement("input");
    caixa.type = "checkbox";
    caixa.id = "mostrar-senha";
    caixa.style.marginRight = "6px";

    rotulo.appendChild(caixa);
    rotulo.appendChild(document.createTextNode("Mostrar senha"));
    senha.insertAdjacentElement("afterend", rotulo);

    caixa.addEventListener("change", function () {
        senha.type = caixa.checked ? "text" : "password";
    });

    email.addEventListener("input", function () {
        limparErro(email);
    });

    senha.addEventListener("input", function () {
        limparErro(senha);
    });

    form.addEventListener("submit", function (e) {
        e.preventDefault();
        removerSucesso();
        limparErro(email);
        limparErro(senha);

        let primeiroErro = null;
        const padraoEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!padraoEmail.test(email.value.trim())) {
            mostrarErro(email, "Digite um e-mail válido, como nome@exemplo.com.");
            primeiroErro = email;
        }

        if (senha.value.length !== 8) {
            mostrarErro(senha, "A senha deve ter exatamente 8 caracteres.");
            if (!primeiroErro) primeiroErro = senha;
        }

        if (primeiroErro) {
            primeiroErro.focus();
            return;
        }

        const sucesso = document.createElement("div");
        sucesso.id = "login-sucesso";
        sucesso.setAttribute("role", "status");
        sucesso.style.cssText =
            "margin:12px auto;padding:12px 16px;max-width:420px;border-radius:8px;" +
            "background:#eef7ef;border:1px solid #6fd58c;color:#1f5c2f;font-weight:600;";
        sucesso.textContent =
            "Dados conferidos! O acesso à conta será liberado quando o site tiver um servidor.";
        form.appendChild(sucesso);
    });
});