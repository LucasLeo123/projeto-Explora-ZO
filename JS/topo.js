/* Parte do Brian */
(function () {

    const botao = document.createElement('button');
    botao.id = 'botao-topo';
    botao.type = 'button';
    botao.setAttribute('aria-label', 'Voltar ao topo da página');
    botao.innerHTML = '<i class="fa-solid fa-chevron-up" aria-hidden="true"></i>';
    document.body.appendChild(botao);

    botao.addEventListener('click', function () {
        window.scrollTo({ top: 0});
    });

    const cabecalho = document.querySelector('header');
    const DISTANCIA_BOTAO = 200;

    function atualizar() {
        const rolado = window.scrollY;
        const alturaCabecalho = cabecalho ? cabecalho.offsetHeight : 120;

        botao.classList.toggle('visivel', rolado > DISTANCIA_BOTAO);

        document.body.classList.toggle('rolou', rolado > alturaCabecalho);
    }

    window.addEventListener('scroll', atualizar, { passive: true });
    window.addEventListener('resize', atualizar);

    atualizar();
})();
