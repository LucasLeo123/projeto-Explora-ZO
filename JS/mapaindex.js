const map=L.map('map').setView([-23.064076881637494, -43.56376760768081],14)

const layer= L.tileLayer('https://tile.openstreetmap.bzh/ca/{z}/{x}/{y}.png', {
	maxZoom: 19,
	
});

layer.addTo(map)

const icone = L.divIcon({
    className: "marcador-personalizado",
    html: '<i class="fa-solid fa-location-dot"></i>',
    iconSize: [30, 40],
    iconAnchor: [15, 40]
});

const marker = L.marker(
    [-23.06696758762021, -43.56446464239179],
    { icon: icone }
);

marker.addTo(map);

marker.bindTooltip("pedra do telégrafo", {
    permanent: true,
    direction: "bottom",
    offset: [0, 5],
    className: "legenda-marcador"
});

const marker2 = L.marker(
    [-22.82908766968137, -43.55052284297421],
    { icon: icone }
);

marker2.addTo(map);

marker2.bindTooltip("Mendanha", {
    permanent: true,
    direction: "bottom",
    offset: [0, 5],
    className: "legenda-marcador"
});

const marker3 = L.marker(
    [-23.073239002989034, -43.56581231772981],
    { icon: icone }
);

marker3.addTo(map);

marker3.bindTooltip("Praias selvagens", {
    permanent: true,
    direction: "bottom",
    offset: [0, 5],
    className: "legenda-marcador"
});

// PEDRA DA TARTARUGA

const marker4 = L.marker(
    [-23.072099274593196, -43.55044032319903], // COORDENADAS
    { icon: icone }
);

marker4.addTo(map);

marker4.bindTooltip("Pedra da Tartaruga", {
    permanent: true,
    direction: "bottom",
    offset: [0, 5],
    className: "legenda-marcador"
});

// PICO DA PEDRA BRANCA

const marker5 = L.marker(
    [-22.930246086596952, -43.47321490793196], // COORDENADAS
    { icon: icone }
);

marker5.addTo(map);

marker5.bindTooltip("Pico da Pedra Branca", {
    permanent: true,
    direction: "bottom",
    offset: [0, 5],
    className: "legenda-marcador"
});

// PEDRA DO QUILOMBO

const marker6 = L.marker(
    [-22.94391267728657, -43.436645471565136], // COORDENADAS
    { icon: icone }
);

marker6.addTo(map);

marker6.bindTooltip("Pedra do Quilombo", {
    permanent: true,
    direction: "bottom",
    offset: [0, 5],
    className: "legenda-marcador"
});

// PEDRA DO OSSO

const marker7 = L.marker(
    [-22.907005666743153, -43.44704454037965], // COORDENADAS
    { icon: icone }
);

marker7.addTo(map);

marker7.bindTooltip("Pedra do Osso", {
    permanent: true,
    direction: "bottom",
    offset: [0, 5],
    className: "legenda-marcador"
});



// Abre a janela do destino correspondente ao clicar em cada marcador.
window.marcadoresDeDestino = {
    "pedra-do-telegrafo": marker,
    "mendanha": marker2,
    "praias-selvagens": marker3,
    "pedra-da-tartaruga": marker4,
    "pico-da-pedra-branca": marker5,
    "pedra-do-quilombo": marker6,
    "pedra-do-osso": marker7
};

Object.entries(window.marcadoresDeDestino).forEach(([destino, marcador]) => {
    marcador.on("click", () => window.abrirJanelaDestino(destino));
});
