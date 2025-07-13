const materias = [
  { id: "qgb", nombre: "Química general y bioinorgánica", creditos: 8, requisitos: [] },
  { id: "fisica", nombre: "Física e introducción a la fisicoquímica", creditos: 8, requisitos: [] },
  { id: "mates", nombre: "Matemáticas para químicos", creditos: 8, requisitos: [] },
  { id: "normas", nombre: "Normatividad y legislación", creditos: 6, requisitos: [] },
  { id: "contexto", nombre: "Contexto de la profesión", creditos: 4, requisitos: [] },
  { id: "rsu", nombre: "Responsabilidad social universitaria", creditos: 6, requisitos: [] },
  { id: "qos", nombre: "Química orgánica en la salud", creditos: 10, requisitos: ['qgb'] },
  { id: "fisicoq", nombre: "Fisicoquímica aplicada a la salud", creditos: 10, requisitos: ['mates'] },
  { id: "labqb", nombre: "Laboratorio de química básica", creditos: 8, requisitos: ['qgb'] },
  { id: "maya", nombre: "Cultura maya", creditos: 6, requisitos: ['rsu'] },
  { id: "estadistica", nombre: "Estadística", creditos: 6, requisitos: [] },
  { id: "qbioorg", nombre: "Química bioorgánica", creditos: 6, requisitos: ['qos'] },
  { id: "analisisq", nombre: "Análisis químico", creditos: 9, requisitos: [] },
  { id: "labqbio", nombre: "Laboratorio de química biológica", creditos: 7, requisitos: [] },
  { id: "biocel", nombre: "Biología celular y molecular", creditos: 6, requisitos: [] },
  { id: "gestion", nombre: "Administración y gestión en ciencias de la salud", creditos: 5, requisitos: [] },
  { id: "calidad", nombre: "Control y aseguramiento de la Calidad", creditos: 6, requisitos: [] },
  { id: "opt1", nombre: "Optativa 1 / Libre", creditos: 6, requisitos: [], minCreditos: 80 },
  { id: "labanalq", nombre: "Laboratorio de análisis químico", creditos: 8, requisitos: ['analisisq'] },
  { id: "epidemiologia", nombre: "Salud pública y epidemiología", creditos: 5, requisitos: [] },
  { id: "farmacognosia", nombre: "Farmacognosia", creditos: 6, requisitos: [] },
  { id: "bioquimica", nombre: "Bioquímica estructural y metabólica", creditos: 6, requisitos: [] },
  { id: "farmacoq", nombre: "Farmacoquímica", creditos: 6, requisitos: ['qbioorg'] },
  { id: "anatomia", nombre: "Anatomía para químicos", creditos: 6, requisitos: [] },
  { id: "analisisinst", nombre: "Análisis instrumental", creditos: 9, requisitos: ['analisisq'] },
  { id: "farmacob", nombre: "Farmacología básica", creditos: 6, requisitos: [] },
  { id: "fisiopat", nombre: "Fisiología y patología humana", creditos: 8, requisitos: ['anatomia'] },
  { id: "genetica", nombre: "Genética", creditos: 6, requisitos: [] },
  { id: "labfisicoq", nombre: "Laboratorio de análisis fisicoquímicos", creditos: 6, requisitos: [] },
  { id: "filosofia", nombre: "Filosofía y metodología de las ciencias", creditos: 4, requisitos: ['estadistica'] },
  { id: "labinst", nombre: "Laboratorio de análisis instrumental", creditos: 8, requisitos: ['analisisinst'] },
  { id: "farmacoa", nombre: "Farmacología aplicada", creditos: 8, requisitos: ['farmacob'] },
  { id: "hematologia", nombre: "Hematología", creditos: 6, requisitos: [] },
  { id: "bacterio", nombre: "Bacteriología", creditos: 6, requisitos: [] },
  { id: "labmicro", nombre: "Laboratorio de microbiología general", creditos: 8, requisitos: [] },
  { id: "opt2", nombre: "Optativa 2 / Libre", creditos: 6, requisitos: [], minCreditos: 80 },
  { id: "labfarmaco", nombre: "Laboratorio de análisis farmacéutico", creditos: 6, requisitos: ['labinst'] },
  { id: "mico", nombre: "Micología y Virología", creditos: 6, requisitos: [] },
  { id: "toxico", nombre: "Toxicología", creditos: 5, requisitos: [] },
  { id: "parasito", nombre: "Parasitología", creditos: 6, requisitos: [] },
  { id: "inmuno", nombre: "Inmunología", creditos: 6, requisitos: [] },
  { id: "labmicro2", nombre: "Laboratorio de análisis microbiológicos", creditos: 10, requisitos: ['labmicro'] },
  { id: "tecfarma", nombre: "Tecnología farmacéutica", creditos: 6, requisitos: [] },
  { id: "labbios", nombre: "Laboratorio de biociencias", creditos: 6, requisitos: [] },
  { id: "labquimclin", nombre: "Laboratorio de química clínica", creditos: 10, requisitos: [] },
  { id: "atencionf", nombre: "Atención farmacéutica", creditos: 6, requisitos: [] },
  { id: "practica", nombre: "Práctica profesional", creditos: 5, requisitos: [], minCreditos: 298 },
  { id: "emprende", nombre: "Taller de emprendedores", creditos: 5, requisitos: [] },
  { id: "servicio", nombre: "Servicio social", creditos: 12, requisitos: [], minCreditos: 303 },
];

let seleccionadas = new Set();

function actualizarMapa() {
  const mapa = document.getElementById("mapaMaterias");
  mapa.innerHTML = "";

  materias.forEach(m => {
    const div = document.createElement("div");
    div.classList.add("materia");

    const requisitosCumplidos = m.requisitos.every(r => seleccionadas.has(r));
    if (!requisitosCumplidos) {
      div.classList.add("inactiva");
    }

    if (seleccionadas.has(m.id)) {
      div.classList.add("seleccionada");
    }

    div.textContent = `${m.nombre} (${m.creditos})`;
    div.addEventListener("click", () => {
      if (!requisitosCumplidos) return;

      if (seleccionadas.has(m.id)) {
        seleccionadas.delete(m.id);
      } else {
        seleccionadas.add(m.id);
      }
      actualizarMapa();
      actualizarCreditos();
    });

    mapa.appendChild(div);
  });
}

function actualizarCreditos() {
  let total = 0;
  materias.forEach(m => {
    if (seleccionadas.has(m.id)) {
      total += m.creditos;
    }
  });
  document.getElementById("creditosTotales").textContent = total;
}

actualizarMapa();
