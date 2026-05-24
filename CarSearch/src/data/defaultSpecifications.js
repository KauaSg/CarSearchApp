export const DEFAULT_SPECIFICATIONS = [
  "motor",
  "potência",
  "torque",
  "transmissão",
  "tração",
  "aceleração 0-100 km/h",
  "modos de condução",
  "faróis",
  "rodas e pneus",
  "preço"
];

export const QUICK_VEHICLES = [
  {
    label: "Ford Ranger Raptor",
    marca: "Ford",
    modelo: "Ranger",
    versao: "Raptor"
  },
  {
    label: "Ford Mustang GT",
    marca: "Ford",
    modelo: "Mustang",
    versao: "GT"
  },
  {
    label: "Toyota Hilux SRX",
    marca: "Toyota",
    modelo: "Hilux",
    versao: "SRX"
  },
  {
    label: "Chevrolet S10 High Country",
    marca: "Chevrolet",
    modelo: "S10",
    versao: "High Country"
  }
];

export const RANGER_RAPTOR_FALLBACK = {
  marca: "Ford",
  modelo: "Ranger",
  versao: "Raptor",
  fonte: "fallback-local",
  especificacoes: [
    { nome: "motor", valor: "V6 3.0L Nano bi-turbo" },
    { nome: "potência", valor: "397 cv @ 5650 rpm" },
    { nome: "torque", valor: "583 Nm @ 3500 rpm" },
    { nome: "transmissão", valor: "Automática de 10 velocidades com paddle shifters" },
    { nome: "tração", valor: "4WD" },
    { nome: "aceleração 0-100 km/h", valor: "5,8 s" },
    { nome: "modos de condução", valor: "Normal, Sport, Escorregadio, Lama, Areia, Rock Crawl e Baja" },
    { nome: "faróis", valor: "Matrix LED" },
    { nome: "rodas e pneus", valor: "Rodas 17\" com pneus 285/70 R17 AT" },
    { nome: "preço", valor: "R$ 499.000" }
  ]
};
