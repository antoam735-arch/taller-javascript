// =============================================================
//  PROYECTO FINAL · Tu portfolio
//
//  1. npm start  →  http://localhost:3000/proyecto-final/
//  2. Ve paso a paso: completa una función, guarda, recarga (F5) y mira.
//  3. Ten la consola abierta (F12) para ver los errores.
//
//  Lee proyecto-final/README.md para ver la lista completa de pasos.
// =============================================================

import { perfil, habilidades } from './datos.js';

// Atajo para no escribir document.querySelector todo el rato:  $('#perfil-nombre')
const $ = (selector) => document.querySelector(selector);

// Todo lo que puede cambiar mientras alguien usa la web
const estado = {
  proyectos: [], // todos los proyectos (se cargan de data/proyectos.json)
  filtro: 'Todos', // tecnología seleccionada en los filtros
  busqueda: '', // texto escrito en el buscador
};

// =============================================================
//  NIVEL 1 · Lo básico (obligatorio)
// =============================================================

// 1.1 · Abre js/datos.js y pon TUS datos. Abre data/proyectos.json y
//       cambia los proyectos de ejemplo por los tuyos (¡los ejercicios del taller cuentan!).

// -------------------------------------------------------------
// 1.2 · Calentamiento: pon el año actual en el pie de página (#anio).
// Pista: new Date().getFullYear()
// -------------------------------------------------------------
function pintarAnio() {
  $('#anio').textContent = new Date().getFullYear();
}

// -------------------------------------------------------------
// 1.3 · Pinta tus datos principales usando el objeto `perfil`:
//   #perfil-nombre y #pie-nombre → perfil.nombre
//   #perfil-rol                 → perfil.rol
//   #perfil-intro               → perfil.intro
//   #logo                       → tus iniciales: 'Alex García' → 'AG'
//                                 (pista: split(' ') + map + join)
//   document.title              → 'Alex García · Portfolio'
// -------------------------------------------------------------
function pintarPerfil() {
  $('#perfil-nombre').textContent = perfil.nombre;
  $('#pie-nombre').textContent = perfil.nombre;
  $('#perfil-rol').textContent = perfil.rol;
  $('#perfil-intro').textContent = perfil.intro;

  $('#logo').textContent = perfil.nombre
    .split(' ')
    .filter((palabra) => palabra !== '')
    .map((palabra) => palabra[0])
    .join('')
    .toUpperCase();

  document.title = `${perfil.nombre} · Portfolio`;
}

// -------------------------------------------------------------
// 1.4 · Sección "Sobre mí" y contacto:
//   #perfil-sobre-mi → un <p> por cada texto de perfil.sobreMi
//                      (vacía antes el contenedor)
//   #perfil-email    → que el enlace apunte a "mailto:tu@email" y muestre el email
//   #perfil-redes    → un <li><a href="url" target="_blank" rel="noopener">Nombre</a></li>
//                      por cada red de perfil.redes
// -------------------------------------------------------------
function pintarSobreMi() {
  const contenedor = $('#perfil-sobre-mi');
  contenedor.replaceChildren();

  for (const texto of perfil.sobreMi) {
    const parrafo = document.createElement('p');
    parrafo.textContent = texto;
    contenedor.append(parrafo);
  }

  const email = $('#perfil-email');
  email.textContent = perfil.email;
  email.href = `mailto:${perfil.email}`;

  const redes = $('#perfil-redes');
  redes.replaceChildren();

  for (const red of perfil.redes) {
    const li = document.createElement('li');
    const enlace = document.createElement('a');

    enlace.textContent = red.nombre;
    enlace.href = red.url;
    enlace.target = '_blank';
    enlace.rel = 'noopener';

    li.append(enlace);
    redes.append(li);
  }
}

// -------------------------------------------------------------
// 1.5 · Habilidades: por cada elemento del array `habilidades`,
// añade a #habilidades un elemento con esta forma:
//
//   <li class="habilidad">
//     <span>JavaScript</span>
//     <span class="nivel" style="--nivel: 3"></span>
//   </li>
//
// (La barra la dibuja el CSS a partir de --nivel, que va de 1 a 5)
// -------------------------------------------------------------
function pintarHabilidades() {
  const lista = $('#habilidades');
  lista.replaceChildren();

  for (const habilidad of habilidades) {
    const li = document.createElement('li');
    li.classList.add('habilidad');

    const nombre = document.createElement('span');
    nombre.textContent = habilidad.nombre;

    const nivel = document.createElement('span');
    nivel.classList.add('nivel');
    nivel.style.setProperty('--nivel', habilidad.nivel);

    li.append(nombre, nivel);
    lista.append(li);
  }
}

// -------------------------------------------------------------
// 1.6 · Carga los proyectos de 'data/proyectos.json' con fetch
// y devuelve el array.
// Si algo falla: muéstralo en la consola (console.error) y devuelve [].
// Pista: el ejemplo de fetch del README del módulo 08 es casi igual.
//        Cópialo, adáptalo y rodéalo de un try / catch (como el ejercicio 2 del módulo 08).
// -------------------------------------------------------------
async function cargarProyectos() {
  try {
    const respuesta = await fetch('data/proyectos.json');

    if (!respuesta.ok) {
      throw new Error(`Error ${respuesta.status}`);
    }

    return await respuesta.json();
  } catch (error) {
    console.error('No se pudieron cargar los proyectos:', error);
    return [];
  }
}

// -------------------------------------------------------------
// 1.7 · Crea y DEVUELVE la tarjeta de un proyecto (no la metas en la página aún).
// Debe ser un <article class="tarjeta"> con esta estructura:
//
//   <article class="tarjeta">
//     <div class="tarjeta-cuerpo">
//       <h3>Lista de tareas</h3>                                ← proyecto.titulo
//       <p>Añade, tacha y gestiona…</p>                         ← proyecto.descripcion
//       <ul class="etiquetas"><li>HTML</li><li>CSS</li></ul>    ← proyecto.tecnologias
//       <div class="tarjeta-enlaces">
//         <a href="…" target="_blank" rel="noopener">Ver demo</a>   ← solo si hay proyecto.demo
//         <a href="…" target="_blank" rel="noopener">Código</a>     ← solo si hay proyecto.codigo
//       </div>
//     </div>
//   </article>
//
// Extra: si proyecto.destacado es true, añade la clase "destacada" al article
//        y un <span class="insignia">Destacado</span> antes del <h3>.
//
// Pista: crea el <article> con createElement y rellénalo con innerHTML
// y una plantilla `...`. (innerHTML es seguro aquí porque los datos son tuyos;
// nunca lo uses con texto que escriba un usuario).
// Pista: las etiquetas salen de convertir el array en texto:
//        proyecto.tecnologias.map((tecnologia) => `<li>${tecnologia}</li>`).join('')
// Pista: para poner algo solo si existe, usa el ternario dentro de la plantilla:
//        ${proyecto.demo ? `<a href="${proyecto.demo}">Ver demo</a>` : ''}
// -------------------------------------------------------------
function crearTarjetaProyecto(proyecto) {
  const tarjeta = document.createElement('article');
  tarjeta.dataset.proyecto = String(proyecto.id);
  tarjeta.classList.add('tarjeta');

  if (proyecto.destacado) {
    tarjeta.classList.add('destacada');
  }

  tarjeta.innerHTML = `
    <div class="tarjeta-cuerpo">
      ${proyecto.destacado
        ? '<span class="insignia">Destacado</span>'
        : ''}

      <h3>${proyecto.titulo}</h3>
      <p>${proyecto.descripcion}</p>

      <ul class="etiquetas">
        ${proyecto.tecnologias
          .map((tecnologia) => `<li>${tecnologia}</li>`)
          .join('')}
      </ul>

      <div class="tarjeta-enlaces">
        ${proyecto.demo
          ? `<a href="${proyecto.demo}" target="_blank" rel="noopener">Ver demo</a>`
          : ''}

        ${proyecto.codigo
          ? `<a href="${proyecto.codigo}" target="_blank" rel="noopener">Código</a>`
          : ''}
      </div>
    </div>
  `;
const boton = document.createElement('button');
boton.type = 'button';
boton.classList.add('enlace-boton');
boton.textContent = 'Ver más';

boton.addEventListener('click', () => {
  abrirDetalle(proyecto);
});

tarjeta.querySelector('.tarjeta-enlaces').append(boton);
  return tarjeta;
}

// -------------------------------------------------------------
// 1.8 · Pinta una lista de proyectos en #rejilla-proyectos:
//   - Vacía la rejilla.
//   - Si la lista está vacía, pon dentro: <p class="aviso">No hay proyectos que coincidan.</p>
//   - Si no, añade la tarjeta de cada proyecto (usa crearTarjetaProyecto).
// -------------------------------------------------------------
function pintarProyectos(lista) {
  const rejilla = $('#rejilla-proyectos');
  rejilla.replaceChildren();

  if (lista.length === 0) {
    const aviso = document.createElement('p');
    aviso.classList.add('aviso');
    aviso.textContent = 'No hay proyectos que coincidan.';
    rejilla.append(aviso);
    return;
  }

  for (const proyecto of lista) {
    rejilla.append(crearTarjetaProyecto(proyecto));
  }
}

// Ya hecha: vuelve a pintar los proyectos teniendo en cuenta filtro y búsqueda.
// Mientras no hagas el Nivel 2, pinta todos.
function actualizarProyectos() {
  const visibles = filtrarProyectos(estado.proyectos) ?? estado.proyectos;
  pintarProyectos(visibles);
  pintarContador(visibles.length, estado.proyectos.length);
}

// =============================================================
//  NIVEL 2 · Interactividad
// =============================================================

// -------------------------------------------------------------
// 2.1 · Devuelve todas las tecnologías de los proyectos, sin repetir
// y ordenadas. ¡Es el ejercicio 7 del módulo 06!
//   ['CSS', 'HTML', 'JSON', 'JavaScript', 'Node']
// -------------------------------------------------------------
function obtenerTecnologias(proyectos) {
  const tecnologias = proyectos.flatMap(
    (proyecto) => proyecto.tecnologias
  );

  return [...new Set(tecnologias)].sort();
}
// -------------------------------------------------------------
// 2.2 · Devuelve SOLO los proyectos que cumplen a la vez:
//   - el filtro: estado.filtro es 'Todos' o el proyecto usa esa tecnología
//   - la búsqueda: el título o la descripción contienen estado.busqueda
//     (sin distinguir mayúsculas de minúsculas)
// -------------------------------------------------------------
function filtrarProyectos(proyectos) {
  const busqueda = estado.busqueda.trim().toLowerCase();

  return proyectos.filter((proyecto) => {
    const cumpleFiltro =
      estado.filtro === 'Todos' ||
      proyecto.tecnologias.includes(estado.filtro);

    const cumpleBusqueda =
      proyecto.titulo.toLowerCase().includes(busqueda) ||
      proyecto.descripcion.toLowerCase().includes(busqueda);

    return cumpleFiltro && cumpleBusqueda;
  });
}

// -------------------------------------------------------------
// 2.3 · Crea un botón de filtro en #filtros por cada opción:
// 'Todos' + cada tecnología (usa obtenerTecnologias(estado.proyectos)).
//
//   <button class="filtro activo" type="button">Todos</button>
//   <button class="filtro" type="button">CSS</button> …
//
// Al hacer clic en un botón:
//   - guarda su tecnología en estado.filtro
//   - quita la clase "activo" a todos los botones y pónsela al pulsado
//   - llama a actualizarProyectos()
// -------------------------------------------------------------
function pintarFiltros() {
  const contenedor = $('#filtros');
  contenedor.replaceChildren();

  const opciones = [
    'Todos',
    ...obtenerTecnologias(estado.proyectos)
  ];

  for (const tecnologia of opciones) {
    const boton = document.createElement('button');
    boton.type = 'button';
    boton.textContent = tecnologia;
    boton.classList.add('filtro');
    boton.classList.toggle('activo', tecnologia === estado.filtro);

    boton.addEventListener('click', () => {
      estado.filtro = tecnologia;

      for (const filtro of contenedor.querySelectorAll('button')) {
        filtro.classList.remove('activo');
      }

      boton.classList.add('activo');
      actualizarProyectos();
    });

    contenedor.append(boton);
  }
}

// -------------------------------------------------------------
// 2.4 · Buscador: mientras se escribe en #buscador, guarda el texto en
// estado.busqueda y llama a actualizarProyectos().
// -------------------------------------------------------------
function activarBuscador() {
  $('#buscador').addEventListener('input', (evento) => {
    estado.busqueda = evento.target.value;
    actualizarProyectos();
  });
}

// -------------------------------------------------------------
// 2.5 · Escribe en #contador-proyectos: 'Mostrando 3 de 5 proyectos'
// -------------------------------------------------------------
function pintarContador(visibles, total) {
  $('#contador-proyectos').textContent =
    `Mostrando ${visibles} de ${total} proyectos`;
}

// -------------------------------------------------------------
// 2.6 · Valida los datos del formulario de contacto.
// Recibe { nombre, email, mensaje } y devuelve un objeto con los errores:
//   - nombre:  al menos 2 caracteres (sin contar espacios de los lados)
//   - email:   que parezca un email. Puedes usar esta expresión regular:
//              /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
//   - mensaje: al menos 10 caracteres
//
//   validarContacto({ nombre: 'A', email: 'hola', mensaje: 'Hola' })
//   → { nombre: 'Escribe tu nombre…', email: 'Ese email…', mensaje: 'El mensaje…' }
//   validarContacto({ nombre: 'Ada', email: 'ada@ej.com', mensaje: 'Hola, ¿qué tal estás?' })
//   → {}   (sin errores)
// -------------------------------------------------------------
function validarContacto({ nombre, email, mensaje }) {
  const errores = {};

  if (nombre.trim().length < 2) {
    errores.nombre = 'Escribe un nombre de al menos 2 caracteres.';
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    errores.email = 'Escribe un email válido.';
  }

  if (mensaje.trim().length < 10) {
    errores.mensaje = 'Escribe un mensaje de al menos 10 caracteres.';
  }

  return errores;
}

// -------------------------------------------------------------
// 2.7 · Al enviar #form-contacto:
//   1. Evita que se recargue la página.
//   2. Lee los datos. Pista: Object.fromEntries(new FormData(formulario))
//      te da { nombre, email, mensaje }.
//   3. Valídalos con validarContacto.
//   4. Escribe cada error en su párrafo (#error-nombre, #error-email, #error-mensaje)
//      o déjalo vacío si ese campo está bien.
//      Bonus: añade la clase "invalido" a los campos con error.
//   5. Si no hay errores: muestra #form-exito (hidden = false) y vacía el formulario (reset()).
//      Si hay errores: oculta #form-exito.
// -------------------------------------------------------------
function activarFormulario() {
  const formulario = $('#form-contacto');

  formulario.addEventListener('submit', (evento) => {
    evento.preventDefault();

    const datos = Object.fromEntries(new FormData(formulario));
    const errores = validarContacto(datos);

    for (const campo of ['nombre', 'email', 'mensaje']) {
      $(`#error-${campo}`).textContent = errores[campo] || '';

      $(`#campo-${campo}`).classList.toggle(
        'invalido',
        Boolean(errores[campo])
      );
    }

    const valido = Object.keys(errores).length === 0;
    $('#form-exito').hidden = !valido;

    if (valido) {
      formulario.reset();
    }
  });
}

// =============================================================
//  NIVEL 3 · Extras (elige los que quieras)
// =============================================================

// -------------------------------------------------------------
// 3.1 · Modo oscuro que se recuerda.
//   - Para cambiar de tema: document.documentElement.dataset.tema = 'oscuro' (o 'claro')
//     (el CSS ya tiene los colores del tema oscuro)
//   - Al pulsar #btn-tema, cambia de tema y guárdalo: localStorage.setItem('tema', …)
//   - Al cargar la página, usa el tema guardado (localStorage.getItem('tema')).
//     Si no hay ninguno, usa el del sistema:
//     window.matchMedia('(prefers-color-scheme: dark)').matches → true si es oscuro
// -------------------------------------------------------------
function iniciarTema() {
  const guardado = localStorage.getItem('tema');
  const oscuroSistema = window.matchMedia(
    '(prefers-color-scheme: dark)'
  ).matches;

  document.documentElement.dataset.tema =
    guardado || (oscuroSistema ? 'oscuro' : 'claro');

  $('#btn-tema').addEventListener('click', () => {
    const nuevoTema =
      document.documentElement.dataset.tema === 'oscuro'
        ? 'claro'
        : 'oscuro';

    document.documentElement.dataset.tema = nuevoTema;
    localStorage.setItem('tema', nuevoTema);
  });
}

// -------------------------------------------------------------
// 3.2 · Animaciones al hacer scroll.
//   - Añade la clase "animaciones" al <html> (document.documentElement).
//   - Con un IntersectionObserver, añade la clase "visible" a cada elemento
//     con clase "revelar" cuando aparezca en pantalla.
//   Busca "IntersectionObserver" en MDN: tiene un ejemplo casi igual.
// -------------------------------------------------------------
function iniciarAnimaciones() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  const observador = new IntersectionObserver((entradas) => {
    for (const entrada of entradas) {
      if (entrada.isIntersecting) {
        entrada.target.classList.add('visible');
        observador.unobserve(entrada.target);
      }
    }
  });

  document.documentElement.classList.add('animaciones');

  for (const elemento of document.querySelectorAll('.revelar')) {
    observador.observe(elemento);
  }
}

// -------------------------------------------------------------
// 3.3 · Ventana de detalle de un proyecto.
//   - En crearTarjetaProyecto, añade un <button class="enlace-boton" type="button">Ver más</button>
//     dentro de .tarjeta-enlaces que, al pulsarlo, llame a abrirDetalle(proyecto).
//   - abrirDetalle: rellena #modal-contenido con el título, proyecto.detalle
//     y las tecnologías, y abre la ventana: $('#modal-proyecto').showModal()
//   - activarModal: #modal-cerrar cierra la ventana (.close()).
//     Bonus: que también se cierre al hacer clic fuera del contenido.
// -------------------------------------------------------------
function abrirDetalle(proyecto) {
  const contenido = $('#modal-contenido');
  contenido.replaceChildren();

  const titulo = document.createElement('h2');
  titulo.textContent = proyecto.titulo;

  const detalle = document.createElement('p');
  detalle.textContent = proyecto.detalle;

  const tecnologias = document.createElement('ul');
  tecnologias.classList.add('etiquetas');

  for (const tecnologia of proyecto.tecnologias) {
    const li = document.createElement('li');
    li.textContent = tecnologia;
    tecnologias.append(li);
  }

  contenido.append(titulo, detalle, tecnologias);
  $('#modal-proyecto').showModal();
}

function activarModal() {
  $('#modal-cerrar').addEventListener('click', () => {
    $('#modal-proyecto').close();
  });
}

// 3.4 · ¡Publícalo en internet con GitHub Pages! Mira el README del proyecto.

// =============================================================
//  ARRANQUE · Ya está hecho: llama a tus funciones en orden.
// =============================================================
async function iniciar() {
  // Nivel 1
  pintarAnio();
  pintarPerfil();
  pintarSobreMi();
  pintarHabilidades();
  estado.proyectos = (await cargarProyectos()) ?? [];
  actualizarProyectos();

  // Nivel 2
  pintarFiltros();
  activarBuscador();
  activarFormulario();

  // Nivel 3
  iniciarTema();
  iniciarAnimaciones();
  activarModal();
}

iniciar();
