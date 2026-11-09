document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("#maincriar form");
    if (!form) return;

    form.noValidate = true;

    const nome = document.getElementById("nome");
    const email = document.getElementById("email");
    const senha = document.getElementById("senha");
    const nascimento = document.getElementById("nascimento");
    const telefone = document.getElementById("telefone");
    const termos = document.getElementById("termos");
    const generos = form.querySelectorAll('input[name="genero"]');
    const rotuloFeminino = form.querySelector('label[for="feminino"]');
    const rotuloTermos = form.querySelector('label[for="termos"]');

    function hojeISO() {
        const d = new Date();
        const mes = String(d.getMonth() + 1).padStart(2, "0");
        const dia = String(d.getDate()).padStart(2, "0");
        return d.getFullYear() + "-" + mes + "-" + dia;
    }

    nascimento.max = hojeISO();

    function limparErro(chave) {
        const antigo = form.querySelector('.erro[data-campo="' + chave + '"]');
        if (antigo) antigo.remove();
    }

    function mostrarErro(chave, ancora, mensagem) {
        limparErro(chave);
        const aviso = document.createElement("span");
        aviso.className = "erro";
        aviso.dataset.campo = chave;
        aviso.setAttribute("role", "alert");
        aviso.textContent = mensagem;
        ancora.insertAdjacentElement("afterend", aviso);
    }

    function removerSucesso() {
        const antigo = document.getElementById("conta-sucesso");
        if (antigo) antigo.remove();
    }

    const rotuloSenha = document.createElement("label");
    rotuloSenha.setAttribute("for", "mostrar-senha");
    rotuloSenha.style.cssText = "display:block;margin-top:6px;font-size:14px;cursor:pointer;color:#003A1C;";

    const caixaSenha = document.createElement("input");
    caixaSenha.type = "checkbox";
    caixaSenha.id = "mostrar-senha";
    caixaSenha.style.marginRight = "6px";

    rotuloSenha.appendChild(caixaSenha);
    rotuloSenha.appendChild(document.createTextNode("Mostrar senha"));
    senha.insertAdjacentElement("afterend", rotuloSenha);

    caixaSenha.addEventListener("change", function () {
        senha.type = caixaSenha.checked ? "text" : "password";
    });

    telefone.addEventListener("input", function () {
        telefone.value = telefone.value.replace(/\D/g, "");
        limparErro("telefone");
    });

    nome.addEventListener("input", function () { limparErro("nome"); });
    email.addEventListener("input", function () { limparErro("email"); });
    senha.addEventListener("input", function () { limparErro("senha"); });
    nascimento.addEventListener("input", function () { limparErro("nascimento"); });
    termos.addEventListener("change", function () { limparErro("termos"); });
    generos.forEach(function (g) {
        g.addEventListener("change", function () { limparErro("genero"); });
    });

    form.addEventListener("submit", function (e) {
        e.preventDefault();
        removerSucesso();

        let primeiroErro = null;

        function falhou(chave, campo, ancora, mensagem) {
            mostrarErro(chave, ancora, mensagem);
            if (!primeiroErro) primeiroErro = campo;
        }

        ["nome", "email", "senha", "nascimento", "telefone", "genero", "termos"].forEach(limparErro);

        const textoNome = nome.value.trim();
        const palavras = textoNome.split(/\s+/).filter(Boolean);
        if (palavras.length < 2 || textoNome.length < 5) {
            falhou("nome", nome, nome, "Digite seu nome e sobrenome.");
        }

        const padraoEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!padraoEmail.test(email.value.trim())) {
            falhou("email", email, email, "Digite um e-mail válido, como nome@exemplo.com.");
        }

        if (senha.value.length !== 8) {
            falhou("senha", senha, senha, "A senha deve ter exatamente 8 caracteres.");
        }

        if (!nascimento.value) {
            falhou("nascimento", nascimento, nascimento, "Informe sua data de nascimento.");
        } else if (nascimento.value > hojeISO()) {
            falhou("nascimento", nascimento, nascimento, "A data de nascimento não pode ser no futuro.");
        } else if (nascimento.value < "1900-01-01") {
            falhou("nascimento", nascimento, nascimento, "Data de nascimento inválida.");
        }

        if (!/^\d{11}$/.test(telefone.value)) {
            falhou("telefone", telefone, telefone, "Digite o telefone com DDD e 9 dígitos, só números (11 dígitos).");
        }

        if (!form.querySelector('input[name="genero"]:checked')) {
            falhou("genero", generos[0], rotuloFeminino, "Escolha uma opção de gênero.");
        }

        if (!termos.checked) {
            falhou("termos", termos, rotuloTermos, "É preciso aceitar os termos e condições.");
        }

        if (primeiroErro) {
            primeiroErro.focus();
            return;
        }

        const sucesso = document.createElement("div");
        sucesso.id = "conta-sucesso";
        sucesso.setAttribute("role", "status");
        sucesso.style.cssText =
            "margin:12px auto;padding:12px 16px;max-width:420px;border-radius:8px;" +
            "background:#eef7ef;border:1px solid #6fd58c;color:#1f5c2f;font-weight:600;";
        sucesso.textContent =
            "Dados conferidos! A criação da conta será liberada quando o site tiver um servidor.";
        form.appendChild(sucesso);
    });
});