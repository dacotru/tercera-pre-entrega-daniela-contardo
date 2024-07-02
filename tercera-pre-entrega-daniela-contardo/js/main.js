// Declaro la variable tareas como un array de objetos
let tareas = JSON.parse(localStorage.getItem('tareas')) || [];

const mostrarMensaje = (mensaje) => {
    const mensajesDiv = document.getElementById('mensajes');
    mensajesDiv.textContent = mensaje;
    setTimeout(() => {
        mensajesDiv.textContent = '';
    }, 3000);
};

const guardarEnLocalStorage = () => {
    localStorage.setItem('tareas', JSON.stringify(tareas));
};

const renderizarTareas = () => {
    const tareasDiv = document.getElementById('tareas');
    tareasDiv.innerHTML = '';
    if (tareas.length === 0) {
        tareasDiv.innerHTML = '<p>No hay tareas, comienza a listar tus tareas!</p>';
    } else {
        tareas.forEach((tarea, index) => {
            const tareaDiv = document.createElement('div');
            tareaDiv.className = `tarea ${tarea.completada ? 'completada' : ''}`;
            tareaDiv.textContent = `${index + 1}. ${tarea.nombre} - ${tarea.completada ? 'Completada' : 'Pendiente'}`;
            tareasDiv.appendChild(tareaDiv);
        });
    }
};

const agregarTarea = () => {
    const formulario = document.getElementById('formulario');
    formulario.classList.remove('hidden');
    const guardarBtn = document.getElementById('guardar-tarea');
    guardarBtn.onclick = () => {
        const nombreTarea = document.getElementById('nombre-tarea').value.trim();
        const estadoTarea = document.getElementById('estado-tarea').value;

        if (nombreTarea === "") {
            mostrarMensaje('Por favor, ingrese un nombre válido para la tarea.');
            return;
        } else if (tareas.find(task => task.nombre.toLowerCase() === nombreTarea.toLowerCase())) {
            mostrarMensaje('Esta tarea ya existe. Por favor, ingrese una tarea diferente.');
            return;
        }

        const nuevaTarea = {
            nombre: nombreTarea.charAt(0).toUpperCase() + nombreTarea.slice(1).toLowerCase(),
            completada: (estadoTarea === 'si')
        };

        tareas.push(nuevaTarea);
        guardarEnLocalStorage();
        mostrarMensaje(`Tarea "${nuevaTarea.nombre}" agregada correctamente.`);
        formulario.classList.add('hidden');
        renderizarTareas();
    };
};

const eliminarTarea = () => {
    const eliminarForm = document.getElementById('eliminar-form');
    eliminarForm.classList.remove('hidden');
    const confirmarEliminarBtn = document.getElementById('confirmar-eliminar');
    confirmarEliminarBtn.onclick = () => {
        const index = parseInt(document.getElementById('numero-eliminar').value);

        if (isNaN(index) || index < 1 || index > tareas.length) {
            mostrarMensaje('Debe ingresar un número válido de tarea a eliminar.');
        } else {
            const deletedTask = tareas.splice(index - 1, 1);
            guardarEnLocalStorage();
            mostrarMensaje(`Tarea "${deletedTask[0].nombre}" eliminada correctamente.`);
            renderizarTareas();
            eliminarForm.classList.add('hidden');
        }
    };
};

const modificarEstadoTarea = () => {
    const modificarForm = document.getElementById('modificar-form');
    modificarForm.classList.remove('hidden');
    const confirmarModificarBtn = document.getElementById('confirmar-modificar');
    confirmarModificarBtn.onclick = () => {
        const index = parseInt(document.getElementById('numero-modificar').value);
        const nuevoEstado = document.getElementById('nuevo-estado-tarea').value;

        if (isNaN(index) || index < 1 || index > tareas.length) {
            mostrarMensaje('Debe ingresar un número válido de tarea a modificar.');
        } else {
            tareas[index - 1].completada = (nuevoEstado === 'si');
            guardarEnLocalStorage();
            mostrarMensaje(`Tarea "${tareas[index - 1].nombre}" actualizada correctamente.`);
            renderizarTareas();
            modificarForm.classList.add('hidden');
        }
    };
};

document.getElementById('agregar-btn').addEventListener('click', agregarTarea);
document.getElementById('eliminar-btn').addEventListener('click', eliminarTarea);
document.getElementById('modificar-btn').addEventListener('click', modificarEstadoTarea);

// Renderizar tareas al cargar la página
renderizarTareas();
