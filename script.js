const materias = [
  { id: "mat1", nombre: "Química I", creditos: 8, requisitos: [] },
  { id: "mat2", nombre: "Química II", creditos: 8, requisitos: ["mat1"] },
  { id: "mat3", nombre: "Bioquímica", creditos: 10, requisitos: ["mat2"] },
  { id: "mat4", nombre: "Física", creditos: 7, requisitos: [] }
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
