let seleccionadas = new Set();

function agruparPorSemestre(materias) {
  const agrupado = {};
  materias.forEach(m => {
    if (!agrupado[m.semestre]) {
      agrupado[m.semestre] = [];
    }
    agrupado[m.semestre].push(m);
  });
  return agrupado;
}

function actualizarMapa() {
  const mapa = document.getElementById("mapaMaterias");
  mapa.innerHTML = "";

  const materiasPorSemestre = agruparPorSemestre(materias);

  Object.keys(materiasPorSemestre).sort((a, b) => a - b).forEach(semestre => {
    const header = document.createElement("h2");
    header.textContent = `Semestre ${semestre}`;
    mapa.appendChild(header);

    const contenedor = document.createElement("div");
    contenedor.classList.add("fila-materias");

    materiasPorSemestre[semestre].forEach(m => {
      const div = document.createElement("div");
      div.classList.add("materia");

      const requisitosCumplidos = m.requisitos.every(r => seleccionadas.has(r));
      const minCreditosCumplidos = !m.minCreditos || calcularCreditos() >= m.minCreditos;

      if (!requisitosCumplidos || !minCreditosCumplidos) {
        div.classList.add("inactiva");
      }

      if (seleccionadas.has(m.id)) {
        div.classList.add("seleccionada");
      }

      div.textContent = `${m.nombre} (${m.creditos})`;

      div.addEventListener("click", () => {
        if (!requisitosCumplidos || !minCreditosCumplidos) return;

        if (seleccionadas.has(m.id)) {
          seleccionadas.delete(m.id);
        } else {
          seleccionadas.add(m.id);
        }

        actualizarMapa();
        actualizarCreditos();
      });

      contenedor.appendChild(div);
    });

    mapa.appendChild(contenedor);
  });
}

function calcularCreditos() {
  let total = 0;
  materias.forEach(m => {
    if (seleccionadas.has(m.id)) total += m.creditos;
  });
  return total;
}

function actualizarCreditos() {
  document.getElementById("creditosTotales").textContent = calcularCreditos();
}

actualizarMapa();
