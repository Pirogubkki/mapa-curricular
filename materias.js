const materias = [
  // 1er semestre
  { id: "qgb", nombre: "Química general y bioinorgánica", creditos: 8, requisitos: [], semestre: 1 },
  { id: "fisica", nombre: "Física e introducción a la fisicoquímica", creditos: 8, requisitos: [], semestre: 1 },
  { id: "mates", nombre: "Matemáticas para químicos", creditos: 8, requisitos: [], semestre: 1 },
  { id: "normas", nombre: "Normatividad y legislación", creditos: 6, requisitos: [], semestre: 1 },
  { id: "contexto", nombre: "Contexto de la profesión", creditos: 4, requisitos: [], semestre: 1 },
  { id: "rsu", nombre: "Responsabilidad social universitaria", creditos: 6, requisitos: [], semestre: 1 },

  // 2do semestre
  { id: "qos", nombre: "Química orgánica en la salud", creditos: 10, requisitos: ["qgb"], semestre: 2 },
  { id: "fisicoq", nombre: "Fisicoquímica aplicada a la salud", creditos: 10, requisitos: ["mates"], semestre: 2 },
  { id: "labqb", nombre: "Laboratorio de química básica", creditos: 8, requisitos: ["qgb"], semestre: 2 },
  { id: "maya", nombre: "Cultura maya", creditos: 6, requisitos: ["rsu"], semestre: 2 },
  { id: "estadistica", nombre: "Estadística", creditos: 6, requisitos: [], semestre: 2 },

  // 3er semestre
  { id: "qbioorg", nombre: "Química bioorgánica", creditos: 6, requisitos: ["qos"], semestre: 3 },
  { id: "analisisq", nombre: "Análisis químico", creditos: 9, requisitos: [], semestre: 3 },
  { id: "labqbio", nombre: "Laboratorio de química biológica", creditos: 7, requisitos: [], semestre: 3 },
  { id: "biocel", nombre: "Biología celular y molecular", creditos: 6, requisitos: [], semestre: 3 },
  { id: "gestion", nombre: "Administración y gestión en ciencias de la salud", creditos: 5, requisitos: [], semestre: 3 },
  { id: "calidad", nombre: "Control y aseguramiento de la Calidad", creditos: 6, requisitos: [], semestre: 3 },
  { id: "opt1", nombre: "Optativa 1 / Libre", creditos: 6, requisitos: [], minCreditos: 80, semestre: 3 },

  // 4to semestre
  { id: "labanalq", nombre: "Laboratorio de análisis químico", creditos: 8, requisitos: ["analisisq"], semestre: 4 },
  { id: "epidemiologia", nombre: "Salud pública y epidemiología", creditos: 5, requisitos: [], semestre: 4 },
  { id: "farmacognosia", nombre: "Farmacognosia", creditos: 6, requisitos: [], semestre: 4 },
  { id: "bioquimica", nombre: "Bioquímica estructural y metabólica", creditos: 6, requisitos: [], semestre: 4 },
  { id: "farmacoq", nombre: "Farmacoquímica", creditos: 6, requisitos: ["qbioorg"], semestre: 4 },
  { id: "anatomia", nombre: "Anatomía para químicos", creditos: 6, requisitos: [], semestre: 4 },

  // 5to semestre
  { id: "analisisinst", nombre: "Análisis instrumental", creditos: 9, requisitos: ["analisisq"], semestre: 5 },
  { id: "farmacob", nombre: "Farmacología básica", creditos: 6, requisitos: [], semestre: 5 },
  { id: "fisiopat", nombre: "Fisiología y patología humana", creditos: 8, requisitos: ["anatomia"], semestre: 5 },
  { id: "genetica", nombre: "Genética", creditos: 6, requisitos: [], semestre: 5 },
  { id: "labfisicoq", nombre: "Laboratorio de análisis fisicoquímicos", creditos: 6, requisitos: [], semestre: 5 },
  { id: "filosofia", nombre: "Filosofía y metodología de las ciencias", creditos: 4, requisitos: ["estadistica"], semestre: 5 },

  // 6to semestre
  { id: "labinst", nombre: "Laboratorio de análisis instrumental", creditos: 8, requisitos: ["analisisinst"], semestre: 6 },
  { id: "farmacoa", nombre: "Farmacología aplicada", creditos: 8, requisitos: ["farmacob"], semestre: 6 },
  { id: "hematologia", nombre: "Hematología", creditos: 6, requisitos: [], semestre: 6 },
  { id: "bacterio", nombre: "Bacteriología", creditos: 6, requisitos: [], semestre: 6 },
  { id: "labmicro", nombre: "Laboratorio de microbiología general", creditos: 8, requisitos: [], semestre: 6 },
  { id: "opt2", nombre: "Optativa 2 / Libre", creditos: 6, requisitos: [], minCreditos: 80, semestre: 6 },

  // 7mo semestre
  { id: "labfarmaco", nombre: "Laboratorio de análisis farmacéutico", creditos: 6, requisitos: ["labinst"], semestre: 7 },
  { id: "mico", nombre: "Micología y Virología", creditos: 6, requisitos: [], semestre: 7 },
  { id: "toxico", nombre: "Toxicología", creditos: 5, requisitos: [], semestre: 7 },
  { id: "parasito", nombre: "Parasitología", creditos: 6, requisitos: [], semestre: 7 },
  { id: "inmuno", nombre: "Inmunología", creditos: 6, requisitos: [], semestre: 7 },
  { id: "labmicro2", nombre: "Laboratorio de análisis microbiológicos", creditos: 10, requisitos: ["labmicro"], semestre: 7 },

  // 8vo semestre
  { id: "tecfarma", nombre: "Tecnología farmacéutica", creditos: 6, requisitos: [], semestre: 8 },
  { id: "labbios", nombre: "Laboratorio de biociencias", creditos: 6, requisitos: [], semestre: 8 },
  { id: "labquimclin", nombre: "Laboratorio de química clínica", creditos: 10, requisitos: [], semestre: 8 },
  { id: "atencionf", nombre: "Atención farmacéutica", creditos: 6, requisitos: [], semestre: 8 },

  // 9no semestre
  { id: "practica", nombre: "Práctica profesional", creditos: 5, requisitos: [], minCreditos: 298, semestre: 9 },
  { id: "emprende", nombre: "Taller de emprendedores", creditos: 5, requisitos: [], semestre: 9 },

  // 10mo semestre
  { id: "servicio", nombre: "Servicio social", creditos: 12, requisitos: [], minCreditos: 303, semestre: 10 }
];
