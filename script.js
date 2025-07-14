// ===============================
// Script principal de Hobby Tracker - Versión mejorada
// ===============================

window.addEventListener('DOMContentLoaded', () => {
  const MAX_ITEMS = 5;

  const forms = {
    lectura: document.getElementById('form-lectura'),
    visualizacion: document.getElementById('form-visualizacion'),
    juegos: document.getElementById('form-juegos')
  };
  forms.lectura.addEventListener('submit', e => {
  e.preventDefault();
  const item = {
    nombre: value('nombre-lectura'),
    autor: value('autor'),
    tipo: value('tipo-lectura'),
    estado: value('estado-lectura'),
    genero: value('genero-lectura'),
    calificacion: value('calificacion-lectura'),
    capituloActual: value('capitulo-actual'),
    capitulosTotales: value('capitulos-totales'),
    anio: value('anio-lectura'),
    fechaTerminacion: value('fecha-terminacion-lectura')
  };
  procesarFormulario('lectura', item);
  forms.lectura.reset(); // opcional: limpia el formulario
  });

  forms.visualizacion.addEventListener('submit', e => {
  e.preventDefault();
  const item = {
    nombre: value('nombre-visualizacion'),
    tipo: value('tipo-visualizacion'),
    estado: value('estado-visualizacion'),
    genero: value('genero-visualizacion'),
    calificacion: value('calificacion-visualizacion'),
    temporadaActual: value('temporada-actual'),
    episodioActual: value('episodio-actual'),
    episodiosTotales: value('episodios-totales'),
    horasVistas: value('horas-vistas'),
    anio: value('anio-visualizacion'),
    fechaTerminacion: value('fecha-terminacion-visualizacion')
  };
  procesarFormulario('visualizacion', item);
  forms.visualizacion.reset();
  });

  forms.juegos.addEventListener('submit', e => {
  e.preventDefault();
  const item = {
    nombre: value('nombre-juego'),
    estado: value('estado-juego'),
    genero: value('genero-juego'),
    calificacion: value('calificacion-juego'),
    horasJugadas: value('horas-jugadas'),
    logrosObtenidos: value('logros-obtenidos'),
    logrosTotales: value('logros-totales'),
    platino: value('Platino'),
    anio: value('anio-juego'),
    fechaTerminacion: value('fecha-terminacion-juego')
  };
  procesarFormulario('juegos', item);
  forms.juegos.reset();
  });

  const listas = {
    lectura: document.getElementById('lista-lectura'),
    visualizacion: document.getElementById('lista-visualizacion'),
    juegos: document.getElementById('lista-juegos')
  };

  const resumenEstadisticas = document.getElementById('resumen-estadisticas');

  const botonesVerMas = {
    lectura: document.getElementById('ver-mas-lectura'),
    visualizacion: document.getElementById('ver-mas-visualizacion'),
    juegos: document.getElementById('ver-mas-juegos')
  };

  const mostrarCompleto = { lectura: false, visualizacion: false, juegos: false };

  let editando = { tipo: null, index: null };

  // Botones exportar/importar
  const exportarJSON = document.createElement('button');
  exportarJSON.textContent = 'Exportar JSON';
  exportarJSON.style.margin = '5px';
  exportarJSON.onclick = () => {
    const data = {
      lectura: JSON.parse(localStorage.getItem('lectura') || '[]'),
      visualizacion: JSON.parse(localStorage.getItem('visualizacion') || '[]'),
      juegos: JSON.parse(localStorage.getItem('juegos') || '[]')
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'hobby_tracker_datos.json';
    a.click();
  };

  const exportarTXT = document.createElement('button');
  exportarTXT.textContent = 'Exportar TXT';
  exportarTXT.style.margin = '5px';
  exportarTXT.onclick = () => {
  const data = {
    lectura: JSON.parse(localStorage.getItem('lectura') || '[]'),
    visualizacion: JSON.parse(localStorage.getItem('visualizacion') || '[]'),
    juegos: JSON.parse(localStorage.getItem('juegos') || '[]')
  };

  function filtrarTerminados(items) {
    return items.filter(item => item.estado === 'terminado' && item.fechaTerminacion);
  }

  function agruparPorMes(items) {
    const agrupado = {};
    items.forEach(item => {
      if (!item.fechaTerminacion) return;
      const parts = item.fechaTerminacion.split('-');
      if (parts.length < 2) return;
      const mes = parts[1];
      const anio = parts[0].slice(2);
      const mesAnio = `${mes}/${anio}`;
      if (!agrupado[mesAnio]) agrupado[mesAnio] = [];
      agrupado[mesAnio].push(item);
    });
    return agrupado;
  }

  let texto = '';

  // 1️⃣ TODOS LOS DATOS
  texto += '📋 TOTAL POR SECCIÓN:\n';

  texto += '\n📚 Lecturas:\n';
  data.lectura.forEach(l => {
    texto += `- ${l.nombre} (${l.tipo}) - ${l.genero} - ${l.autor} - Estado: ${l.estado} - Año: ${l.anio}\n`;
  });

  texto += '\n🎬 Visualizaciones:\n';
  data.visualizacion.forEach(v => {
    texto += `- ${v.nombre} (${v.tipo}) - ${v.genero} - Estado: ${v.estado} - Año: ${v.anio}\n`;
  });

  texto += '\n🎮 Juegos:\n';
  data.juegos.forEach(j => {
    texto += `- ${j.nombre} - ${j.genero} - Estado: ${j.estado} - Año: ${j.anio}\n`;
  });

  texto += '\n-----------------------------\n';

  // 2️⃣ SOLO TERMINADOS
  texto += '\n✅ TERMINADOS:\n';

  const terminadosLectura = filtrarTerminados(data.lectura);
  texto += `\n📚 Lecturas Terminadas (${terminadosLectura.length}):\n`;
  terminadosLectura.forEach(l => {
    texto += `- ${l.nombre} (${l.tipo}) - ${l.genero} - ${l.autor} - Año: ${l.anio}\n`;
  });

  const terminadosVisual = filtrarTerminados(data.visualizacion);
  texto += `\n🎬 Visualizaciones Terminadas (${terminadosVisual.length}):\n`;
  terminadosVisual.forEach(v => {
    texto += `- ${v.nombre} (${v.tipo}) - ${v.genero} - Año: ${v.anio}\n`;
  });

  const terminadosJuegos = filtrarTerminados(data.juegos);
  texto += `\n🎮 Juegos Terminados (${terminadosJuegos.length}):\n`;
  terminadosJuegos.forEach(j => {
    texto += `- ${j.nombre} - ${j.genero} - Año: ${j.anio}\n`;
  });

  texto += '\n-----------------------------\n';

  // 3️⃣ TERMINADOS AGRUPADOS POR MES
  texto += '\n🗓️ TERMINADOS POR MES:\n';

  const lecturasPorMes = agruparPorMes(terminadosLectura);
  texto += '\n📚 Lecturas por mes:\n';
  for (const mes in lecturasPorMes) {
    texto += `\nMes ${mes}:\n`;
    lecturasPorMes[mes].forEach(l => {
      texto += `- ${l.nombre} (${l.tipo}) - ${l.genero} - ${l.autor} - Año: ${l.anio}\n`;
    });
  }

  const visualesPorMes = agruparPorMes(terminadosVisual);
  texto += '\n🎬 Visualizaciones por mes:\n';
  for (const mes in visualesPorMes) {
    texto += `\nMes ${mes}:\n`;
    visualesPorMes[mes].forEach(v => {
      texto += `- ${v.nombre} (${v.tipo}) - ${v.genero} - Año: ${v.anio}\n`;
    });
  }

  const juegosPorMes = agruparPorMes(terminadosJuegos);
  texto += '\n🎮 Juegos por mes:\n';
  for (const mes in juegosPorMes) {
    texto += `\nMes ${mes}:\n`;
    juegosPorMes[mes].forEach(j => {
      texto += `- ${j.nombre} - ${j.genero} - Año: ${j.anio}\n`;
    });
  }

  const blob = new Blob([texto], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'resumen_hobby_tracker.txt';
  a.click();
};

  const importarJSON = document.createElement('button');
  importarJSON.textContent = 'Importar JSON';
  importarJSON.style.margin = '5px';
  importarJSON.onclick = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = e => {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = evt => {
        try {
          const data = JSON.parse(evt.target.result);
          if (data.lectura) localStorage.setItem('lectura', JSON.stringify(data.lectura));
          if (data.visualizacion) localStorage.setItem('visualizacion', JSON.stringify(data.visualizacion));
          if (data.juegos) localStorage.setItem('juegos', JSON.stringify(data.juegos));
          cargarDatos();
          alert('Datos importados correctamente.');
        } catch (e) {
          alert('Error al importar archivo.');
        }
      };
      reader.readAsText(file);
    };
    input.click();
  };

  const controles = document.createElement('div');
  controles.style.display = 'flex';
  controles.style.gap = '10px';
  controles.style.marginLeft = 'auto';
  controles.appendChild(exportarJSON);
  controles.appendChild(exportarTXT);
  controles.appendChild(importarJSON);
  
  const header = document.querySelector('header');
  header.appendChild(controles);


  // Funcionalidad principal luego de botones adicionales

  document.querySelectorAll('input[type="text"]').forEach(input => {
    input.addEventListener('input', () => {
      input.value = input.value.charAt(0).toUpperCase() + input.value.slice(1);
    });
  });

  cargarDatos();

  Object.keys(botonesVerMas).forEach(tipo => {
    botonesVerMas[tipo].addEventListener('click', () => {
      mostrarCompleto[tipo] = !mostrarCompleto[tipo];
      mostrarItems(tipo);
    });
  });

  function value(id) {
    return document.getElementById(id).value.trim();
  }

  function setValue(id, valor) {
    document.getElementById(id).value = valor;
  }

  function procesarFormulario(tipo, item) {
    if (tipo === 'lectura') {
  item.fechaTerminacion = document.getElementById('fecha-terminacion-lectura').value;
  const hl = document.getElementById('horas-leidas').value.trim();
  item.horasLeidas = hl === '' ? 0 : parseInt(hl);
  } else if (tipo === 'visualizacion') {
  item.fechaTerminacion = document.getElementById('fecha-terminacion-visualizacion').value;
  const hv = document.getElementById('horas-vistas').value.trim();
  item.horasVistas = hv === '' ? 0 : parseInt(hv);
  } else if (tipo === 'juegos') {
  item.fechaTerminacion = document.getElementById('fecha-terminacion-juego').value;
  const hj = document.getElementById('horas-jugadas').value.trim();
  item.horasJugadas = hj === '' ? 0 : parseInt(hj);
  }
    let items = JSON.parse(localStorage.getItem(tipo)) || [];
    if (editando.tipo === tipo && editando.index !== null) {
      items[editando.index] = item;
      editando = { tipo: null, index: null };
    } else {
      items.push(item);
    }
    localStorage.setItem(tipo, JSON.stringify(items));
    mostrarItems(tipo);
    mostrarEstadisticas();
  }

  function mostrarItems(tipo) {
    const items = JSON.parse(localStorage.getItem(tipo)) || [];
    const lista = listas[tipo];
    lista.innerHTML = '';

    const ordenados = [...items].sort((a, b) => a.nombre.localeCompare(b.nombre));
    const visibles = mostrarCompleto[tipo] ? ordenados : ordenados.slice(0, MAX_ITEMS);

    visibles.forEach((item, realIndex) => {
      const index = items.findIndex(x => x.nombre === item.nombre && x.anio === item.anio);

      const card = document.createElement('div');
      card.className = 'card';
      card.draggable = true;
      card.dataset.index = index;

      card.innerHTML = `
        <div class="card-content">
          <strong>${item.nombre}</strong> - ${item.genero} - ${item.anio} - ${item.estado}<br>
          ${formatearDetalle(tipo, item)}
        </div>
        <div class="card-buttons">
          <button onclick="editarItem('${tipo}', ${index})">Editar</button>
          <button onclick="eliminarItem('${tipo}', ${index})">Eliminar</button>
        </div>
      `;

      card.addEventListener('dragstart', e => {
        e.dataTransfer.setData('text/plain', index);
      });

      card.addEventListener('dragover', e => e.preventDefault());
      card.addEventListener('drop', e => {
        e.preventDefault();
        const desde = +e.dataTransfer.getData('text/plain');
        moverItem(tipo, desde, index);
      });

      lista.appendChild(card);
    });

    botonesVerMas[tipo].style.display = items.length > MAX_ITEMS ? 'block' : 'none';
    botonesVerMas[tipo].textContent = mostrarCompleto[tipo] ? 'Ver menos' : 'Ver más';
  }

  function formatearDetalle(tipo, item) {
    if (tipo === 'lectura') {
    return `Autor: ${item.autor} | Calificación: ${item.calificacion} | Horas leídas: ${item.horasLeidas || 0}`;
    } else if (tipo === 'visualizacion') {
      return `Horas vistas: ${item.horasVistas} | Calificación: ${item.calificacion}`;
    } else if (tipo === 'juegos') {
      return `Horas jugadas: ${item.horasJugadas} | Logros: ${item.logrosObtenidos}/${item.logrosTotales} | Platino: ${item.platino}`;
    }
    return '';
  }

  window.eliminarItem = function (tipo, index) {
    const items = JSON.parse(localStorage.getItem(tipo)) || [];
    items.splice(index, 1);
    localStorage.setItem(tipo, JSON.stringify(items));
    mostrarItems(tipo);
    mostrarEstadisticas();
  }

  window.editarItem = function (tipo, index) {
    const items = JSON.parse(localStorage.getItem(tipo)) || [];
    const item = items[index];

    editando = { tipo, index };

    if (tipo === 'lectura') {
      setValue('nombre-lectura', item.nombre);
      setValue('autor', item.autor);
      setValue('tipo-lectura', item.tipo);
      setValue('estado-lectura', item.estado);
      setValue('genero-lectura', item.genero);
      setValue('calificacion-lectura', item.calificacion);
      setValue('horas-leidas', item.horasLeidas || 0);
      setValue('capitulo-actual', item.capituloActual);
      setValue('capitulos-totales', item.capitulosTotales);
      setValue('anio-lectura', item.anio);
      setValue('fecha-terminacion-lectura', item.fechaTerminacion || '');
    } else if (tipo === 'visualizacion') {
      setValue('nombre-visualizacion', item.nombre);
      setValue('tipo-visualizacion', item.tipo);
      setValue('estado-visualizacion', item.estado);
      setValue('genero-visualizacion', item.genero);
      setValue('calificacion-visualizacion', item.calificacion);
      setValue('horas-vistas', item.horasVistas || 0);
      setValue('temporada-actual', item.temporadaActual);
      setValue('episodio-actual', item.episodioActual);
      setValue('episodios-totales', item.episodiosTotales);
      setValue('anio-visualizacion', item.anio);
      setValue('fecha-terminacion-visualizacion', item.fechaTerminacion || '');
    } else if (tipo === 'juegos') {
      setValue('nombre-juego', item.nombre);
      setValue('estado-juego', item.estado);
      setValue('genero-juego', item.genero);
      setValue('calificacion-juego', item.calificacion);
      setValue('horas-jugadas', item.horasJugadas || 0);
      setValue('logros-obtenidos', item.logrosObtenidos);
      setValue('logros-totales', item.logrosTotales);
      setValue('Platino', item.platino);
      setValue('anio-juego', item.anio);
      setValue('fecha-terminacion-juego', item.fechaTerminacion || '');
  }
};

  function moverItem(tipo, desde, hacia) {
    const items = JSON.parse(localStorage.getItem(tipo)) || [];
    const [item] = items.splice(desde, 1);
    items.splice(hacia, 0, item);
    localStorage.setItem(tipo, JSON.stringify(items));
    mostrarItems(tipo);
  }

  function mostrarEstadisticas() {
    const lecturas = JSON.parse(localStorage.getItem('lectura')) || [];
    const visualizaciones = JSON.parse(localStorage.getItem('visualizacion')) || [];
    const juegos = JSON.parse(localStorage.getItem('juegos')) || [];

    const totalLecturas = lecturas.length;
    const completasLectura = lecturas.filter(i => i.estado === 'terminado').length;
    const libros = lecturas.filter(i => i.tipo === 'libro').length;
    const novelas = lecturas.filter(i => i.tipo === 'novela').length;
    const mangas = lecturas.filter(i => i.tipo === 'manga').length;
    const manwhas = lecturas.filter(i => i.tipo === 'manhwa').length;
    const horasLectura = lecturas.reduce((acc, i) => acc + parseInt(i.horasLeidas || 0), 0);

    const totalVisualizaciones = visualizaciones.length;
    const completasVisual = visualizaciones.filter(i => i.estado === 'terminado').length;
    const pelis = visualizaciones.filter(i => i.tipo === 'pelicula').length;
    const series = visualizaciones.filter(i => i.tipo === 'serie').length;
    const animes = visualizaciones.filter(i => i.tipo === 'anime').length;
    const horasVistas = visualizaciones.reduce((acc, i) => acc + parseInt(i.horasVistas || 0), 0);

    const totalJuegos = juegos.length;
    const logrosTotales = juegos.reduce((acc, i) => acc + parseInt(i.logrosTotales || 0), 0);
    const platinos = juegos.filter(j => j.platino === 'Si').length;
    const horasJugadas = juegos.reduce((acc, i) => acc + parseInt(i.horasJugadas || 0), 0);

    resumenEstadisticas.innerHTML = `
      <p><strong>Total Lecturas:</strong> ${totalLecturas} | Completadas: ${completasLectura} | Libros: ${libros} | Novelas: ${novelas} | Mangas: ${mangas} | Manwhas: ${manwhas} | Horas leídas: ${horasLectura}</p>
      <p><strong>Total Visualizaciones:</strong> ${totalVisualizaciones} | Completadas: ${completasVisual} | Películas: ${pelis} | Series: ${series} | Animes: ${animes} | Horas vistas: ${horasVistas}</p>
      <p><strong>Total Juegos:</strong> ${totalJuegos} | Logros Totales: ${logrosTotales} | Platinados: ${platinos} | Horas jugadas: ${horasJugadas}</p>
    `;
  }

  function cargarDatos() {
    ['lectura', 'visualizacion', 'juegos'].forEach(mostrarItems);
    mostrarEstadisticas();
  }
});