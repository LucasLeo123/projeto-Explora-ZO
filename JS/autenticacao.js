window.ExploraZOAuth = (function () {
    const CHAVE_USUARIOS = "explorazoUsuarios";
    const CHAVE_SESSAO = "explorazoSessao";
    const CHAVE_DESTINO = "redirecionarAposLogin";

    const paginasPermitidas = [
        "index.html",
        "sobre.html",
        "orçamento.html"
    ];

    function buscarUsuarios() {
        try {
            const usuarios = JSON.parse(
                localStorage.getItem(CHAVE_USUARIOS)
            );

            return Array.isArray(usuarios) ? usuarios : [];
        } catch (erro) {
            return [];
        }
    }

    function cadastrarUsuario(dados) {
        const usuarios = buscarUsuarios();
        const login = dados.login.trim();

        if (!/^[a-zA-Z]{6}$/.test(login)) {
            throw new Error("O login deve ter exatamente 6 letras.");
        }

        if (!/^[a-zA-Z]{8}$/.test(dados.senha)) {
            throw new Error("A senha deve ter exatamente 8 letras.");
        }

        const existe = usuarios.some(function (usuario) {
            return usuario &&
                typeof usuario.login === "string" &&
                usuario.login.toLowerCase() === login.toLowerCase();
        });

        if (existe) {
            throw new Error("Esse login já está cadastrado.");
        }

        const usuario = {
            id: Date.now().toString(),
            nome: dados.nome.trim(),
            email: dados.email.trim().toLowerCase(),
            nascimento: dados.nascimento,
            sexo: dados.sexo,
            nomeMaterno: dados.nomeMaterno.trim(),
            cpf: dados.cpf.replace(/\D/g, ""),
            telefoneCelular: dados.telefoneCelular,
            telefoneFixo: dados.telefoneFixo,
            endereco: dados.endereco.trim(),
            login: login,
            senha: dados.senha
        };

        usuarios.push(usuario);

        localStorage.setItem(
            CHAVE_USUARIOS,
            JSON.stringify(usuarios)
        );

        return {
            id: usuario.id,
            nome: usuario.nome,
            login: usuario.login,
            email: usuario.email
        };
    }

    function entrar(identificador, senha) {
        const usuarios = buscarUsuarios();
        const busca = identificador.trim().toLowerCase();

        const usuario = usuarios.find(function (item) {
            return item && (
                (
                    typeof item.email === "string" &&
                    item.email.trim().toLowerCase() === busca
                ) ||
                (
                    typeof item.login === "string" &&
                    item.login.trim().toLowerCase() === busca
                )
            );
        });

        if (!usuario || usuario.senha !== senha) {
            throw new Error("E-mail, login ou senha incorretos.");
        }

        const sessao = {
            id: usuario.id,
            nome: usuario.nome,
            login: usuario.login,
            email: usuario.email
        };

        localStorage.setItem(
            CHAVE_SESSAO,
            JSON.stringify(sessao)
        );

        return sessao;
    }

    function obterUsuario() {
        try {
            return JSON.parse(
                localStorage.getItem(CHAVE_SESSAO)
            );
        } catch (erro) {
            return null;
        }
    }

    function estaLogado() {
        return obterUsuario() !== null;
    }

    function sair() {
        localStorage.removeItem(CHAVE_SESSAO);
    }

    function definirDestino(destino) {
        if (paginasPermitidas.includes(destino)) {
            localStorage.setItem(CHAVE_DESTINO, destino);
        }
    }

    function obterDestino() {
        const destino = localStorage.getItem(CHAVE_DESTINO);

        localStorage.removeItem(CHAVE_DESTINO);

        if (paginasPermitidas.includes(destino)) {
            return destino;
        }

        return "index.html";
    }

    return {
        cadastrarUsuario: cadastrarUsuario,
        entrar: entrar,
        obterUsuario: obterUsuario,
        estaLogado: estaLogado,
        sair: sair,
        definirDestino: definirDestino,
        obterDestino: obterDestino
    };
})();