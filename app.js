// Importación de Firebase SDK y Firestore
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase.app.js";
import { getFirestore, collection, addDoc, getDocs, query, orderBy } from "https://www.gstatic.com/firebasejs/10.8.0/firebase.firestore.js";

// Configuración de Firebase provista
const firebaseConfig = {
    apiKey: "AIzaSyDv1wgWGICsvfrJHZV1s2HVXdsAvIRAOuI",
    authDomain: "terapia-de-pareja-3bb81.firebaseapp.com",
    projectId: "terapia-de-pareja-3bb81",
    storageBucket: "terapia-de-pareja-3bb81.firebasestorage.app",
    messagingSenderId: "173599055420",
    appId: "1:173599055420:web:5b36414cc3b4c7a90b6d39"
};

// Inicializar Firebase y Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Gestión de Vistas (Navegación)
window.switchView = function(viewId) {
    document.querySelectorAll('.view-section').forEach(section => {
        section.classList.remove('active');
    });
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    const target = document.getElementById(viewId);
    if (target) {
        target.classList.add('active');
    }
};

// Sistema de Login Estricto
document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const user = document.getElementById('user').value.trim();
    const pass = document.getElementById('password').value.trim();
    const errorMsg = document.getElementById('login-error');

    if (user === "DRPEREYRA" && pass === "235689") {
        document.getElementById('login-container').style.display = 'none';
        document.getElementById('app-container').style.display = 'flex';
        cargarDatosGenerales();
    } else {
        errorMsg.style.display = 'block';
    }
});

window.logout = function() {
    document.getElementById('app-container').style.display = 'none';
    document.getElementById('login-container').style.display = 'flex';
    document.getElementById('login-form').reset();
    document.getElementById('login-error').style.display = 'none';
};

// ================= FUNCIONES DE PERSISTENCIA EN FIRESTORE =================

// 1. Pacientes
window.guardarPaciente = async function() {
    const nombres = document.getElementById('pac-nombres').value;
    const contacto = document.getElementById('pac-contacto').value;
    const motivo = document.getElementById('pac-motivo').value;

    if (!nombres) {
        alert("Por favor ingrese el nombre de la pareja.");
        return;
    }

    try {
        await addDoc(collection(db, "pacientes"), { nombres, contacto, motivo, fecha: new Date() });
        alert("Pareja registrada con éxito en Firestore.");
        document.getElementById('pac-nombres').value = '';
        document.getElementById('pac-contacto').value = '';
        document.getElementById('pac-motivo').value = '';
        cargarPacientes();
    } catch (e) {
        console.error("Error al guardar paciente: ", e);
    }
};

async function cargarPacientes() {
    const tbody = document.querySelector('#tabla-pacientes tbody');
    tbody.innerHTML = '';
    try {
        const querySnapshot = await getDocs(collection(db, "pacientes"));
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            tbody.innerHTML += `<tr><td>${data.nombres}</td><td>${data.contacto}</td><td>${data.motivo}</td><td><button class="btn-action" style="padding:0.2rem 0.5rem">Ver</button></td></tr>`;
        });
    } catch (e) {
        console.error("Error al cargar pacientes:", e);
    }
}

// 2. Agenda
window.guardarAgenda = async function() {
    const pareja = document.getElementById('agenda-pareja').value;
    const fechaHora = document.getElementById('agenda-fecha').value;

    if (!pareja || !fechaHora) {
        alert("Complete todos los campos de agenda.");
        return;
    }

    try {
        await addDoc(collection(db, "agenda"), { pareja, fechaHora, estado: "Programada" });
        alert("Sesión agendada con éxito.");
        document.getElementById('agenda-pareja').value = '';
        document.getElementById('agenda-fecha').value = '';
        cargarAgenda();
    } catch (e) {
        console.error("Error al agendar: ", e);
    }
};

async function cargarAgenda() {
    const tbody = document.querySelector('#tabla-agenda tbody');
    tbody.innerHTML = '';
    try {
        const querySnapshot = await getDocs(collection(db, "agenda"));
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            tbody.innerHTML += `<tr><td>${data.pareja}</td><td>${data.fechaHora}</td><td>${data.estado}</td></tr>`;
        });
    } catch (e) {
        console.error("Error al cargar agenda:", e);
    }
}

// 3. Pagos
window.guardarPago = async function() {
    const pareja = document.getElementById('pago-pareja').value;
    const monto = document.getElementById('pago-monto').value;
    const metodo = document.getElementById('pago-metodo').value;

    try {
        await addDoc(collection(db, "pagos"), { pareja, monto, metodo, fecha: new Date().toLocaleDateString() });
        alert("Pago registrado correctamente (Sin intermediarios corporativos).");
        document.getElementById('pago-pareja').value = '';
        cargarPagos();
    } catch (e) {
        console.error("Error al guardar pago: ", e);
    }
};

async function cargarPagos() {
    const tbody = document.querySelector('#tabla-pagos tbody');
    tbody.innerHTML = '';
    try {
        const querySnapshot = await getDocs(collection(db, "pagos"));
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            tbody.innerHTML += `<tr><td>${data.pareja}</td><td>$ ${data.monto} ARS</td><td>${data.metodo}</td><td>${data.fecha}</td></tr>`;
        });
    } catch (e) {
        console.error("Error al cargar pagos:", e);
    }
}

// 4. Primera Entrevista
window.guardarPrimeraEntrevista = async function() {
    const pareja = document.getElementById('pe-pareja').value;
    const genograma = document.getElementById('pe-genograma').value;
    const hipotesis = document.getElementById('pe-hipotesis').value;

    try {
        await addDoc(collection(db, "primera_entrevista"), { pareja, genograma, hipotesis, fecha: new Date() });
        alert("Primera entrevista guardada exitosamente.");
    } catch (e) {
        console.error("Error: ", e);
    }
};

// 5. Genograma Vincular
window.guardarGenograma = async function() {
    const pareja = document.getElementById('gv-pareja').value;
    const analisis = document.getElementById('gv-analisis').value;
    try {
        await addDoc(collection(db, "genograma_vincular"), { pareja, analisis, fecha: new Date() });
        alert("Genograma dinámico vincular guardado.");
    } catch (e) { console.error(e); }
};

// 6. Foco Vincular
window.guardarFoco = async function() {
    const pareja = document.getElementById('fp-pareja').value;
    const foco = document.getElementById('fp-foco').value;
    try {
        await addDoc(collection(db, "foco_vincular"), { pareja, foco, fecha: new Date() });
        alert("Foco vincular establecido.");
    } catch (e) { console.error(e); }
};

// 7. Objetivos
window.guardarObjetivos = async function() {
    const pareja = document.getElementById('obj-pareja').value;
    const metas = document.getElementById('obj-metas').value;
    try {
        await addDoc(collection(db, "objetivos"), { pareja, metas, fecha: new Date() });
        alert("Objetivos terapéuticos guardados.");
    } catch (e) { console.error(e); }
};

// 8. Tareas Asignadas
window.guardarTarea = async function() {
    const pareja = document.getElementById('tar-pareja').value;
    const detalle = document.getElementById('tar-detalle').value;
    try {
        await addDoc(collection(db, "tareas"), { pareja, detalle, fecha: new Date() });
        alert("Tarea asignada correctamente.");
    } catch (e) { console.error(e); }
};

// 9. Evaluación Inmediata 1
window.guardarEval1 = async function() {
    const pareja = document.getElementById('ev1-pareja').value;
    const puntaje = document.getElementById('ev1-puntaje').value;
    const obs = document.getElementById('ev1-obs').value;
    try {
        await addDoc(collection(db, "evaluacion_1"), { pareja, puntaje, obs, fecha: new Date() });
        alert("Evaluación 1 guardada.");
    } catch (e) { console.error(e); }
};

// 10. Evaluación Inmediata 2
window.guardarEval2 = async function() {
    const pareja = document.getElementById('ev2-pareja').value;
    const puntaje = document.getElementById('ev2-puntaje').value;
    const obs = document.getElementById('ev2-obs').value;
    try {
        await addDoc(collection(db, "evaluacion_2"), { pareja, puntaje, obs, fecha: new Date() });
        alert("Evaluación 2 guardada.");
    } catch (e) { console.error(e); }
};

// 11. Follow Up
window.guardarFollowUp = async function() {
    const pareja = document.getElementById('fu-pareja').value;
    const evolucion = document.getElementById('fu-evolucion').value;
    try {
        await addDoc(collection(db, "follow_up"), { pareja, evolucion, fecha: new Date() });
        alert("Follow up registrado con éxito.");
    } catch (e) { console.error(e); }
};

// Cargar datos al iniciar sesión exitosa
function cargarDatosGenerales() {
    cargarPacientes();
    cargarAgenda();
    cargarPagos();
}