// Importación unificada y directa del SDK de Firebase (versión estable y global)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// Configuración de Firebase provista
const firebaseConfig = {
    apiKey: "AIzaSyDv1wgWGICsvfrJHZV1s2HVXdsAvIRAOuI",
    authDomain: "terapia-de-pareja-3bb81.firebaseapp.com",
    projectId: "terapia-de-pareja-3bb81",
    storageBucket: "terapia-de-pareja-3bb81.firebasestorage.app",
    messagingSenderId: "173599055420",
    appId: "1:173599055420:web:5b36414cc3b4c7a90b6d39"
};

// Inicializar Firebase y Firestore de forma segura
let db;
try {
    const app = initializeApp(firebaseConfig);
    db = getFirestore(app);
} catch (e) {
    console.error("Error al inicializar Firebase:", e);
}

// Gestión de Vistas (Navegación)
window.switchView = function(viewId) {
    document.querySelectorAll('.view-section').forEach(section => {
        section.classList.remove('active');
    });
    const target = document.getElementById(viewId);
    if (target) {
        target.classList.add('active');
    }
};

// Control de Login Inmediato
document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const user = document.getElementById('user').value.trim().toUpperCase();
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

window.guardarPaciente = async function() {
    const nombres = document.getElementById('pac-nombres').value;
    const contacto = document.getElementById('pac-contacto').value;
    const motivo = document.getElementById('pac-motivo').value;

    if (!nombres) { alert("Ingrese el nombre de la pareja."); return; }

    try {
        if (db) {
            await addDoc(collection(db, "pacientes"), { nombres, contacto, motivo, fecha: new Date() });
        }
        alert("Pareja registrada con éxito.");
        document.getElementById('pac-nombres').value = '';
        document.getElementById('pac-contacto').value = '';
        document.getElementById('pac-motivo').value = '';
        cargarPacientes();
    } catch (e) {
        console.error("Error al guardar paciente: ", e);
        alert("Error en Firestore: " + e.message);
    }
};

async function cargarPacientes() {
    const tbody = document.querySelector('#tabla-pacientes tbody');
    if (!tbody) return;
    tbody.innerHTML = '';
    try {
        if (db) {
            const querySnapshot = await getDocs(collection(db, "pacientes"));
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                tbody.innerHTML += `<tr><td>${data.nombres || ''}</td><td>${data.contacto || ''}</td><td>${data.motivo || ''}</td></tr>`;
            });
        }
    } catch (e) {
        console.error("Error al cargar pacientes:", e);
    }
}

window.guardarAgenda = async function() {
    const pareja = document.getElementById('agenda-pareja').value;
    const fechaHora = document.getElementById('agenda-fecha').value;
    if (!pareja || !fechaHora) { alert("Complete los campos."); return; }
    try {
        if (db) await addDoc(collection(db, "agenda"), { pareja, fechaHora, estado: "Programada" });
        alert("Sesión agendada.");
        cargarAgenda();
    } catch (e) { console.error(e); }
};

async function cargarAgenda() {
    const tbody = document.querySelector('#tabla-agenda tbody');
    if (!tbody) return;
    tbody.innerHTML = '';
    try {
        if (db) {
            const querySnapshot = await getDocs(collection(db, "agenda"));
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                tbody.innerHTML += `<tr><td>${data.pareja || ''}</td><td>${data.fechaHora || ''}</td><td>${data.estado || ''}</td></tr>`;
            });
        }
    } catch (e) { console.error(e); }
}

window.guardarPago = async function() {
    const pareja = document.getElementById('pago-pareja').value;
    const monto = document.getElementById('pago-monto').value;
    const metodo = document.getElementById('pago-metodo').value;
    try {
        if (db) await addDoc(collection(db, "pagos"), { pareja, monto, metodo, fecha: new Date().toLocaleDateString() });
        alert("Pago registrado.");
        cargarPagos();
    } catch (e) { console.error(e); }
};

async function cargarPagos() {
    const tbody = document.querySelector('#tabla-pagos tbody');
    if (!tbody) return;
    tbody.innerHTML = '';
    try {
        if (db) {
            const querySnapshot = await getDocs(collection(db, "pagos"));
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                tbody.innerHTML += `<tr><td>${data.pareja || ''}</td><td>$ ${data.monto || ''} ARS</td><td>${data.metodo || ''}</td><td>${data.fecha || ''}</td></tr>`;
            });
        }
    } catch (e) { console.error(e); }
}

window.guardarPrimeraEntrevista = async function() {
    const pareja = document.getElementById('pe-pareja').value;
    const genograma = document.getElementById('pe-genograma').value;
    const hipotesis = document.getElementById('pe-hipotesis').value;
    try {
        if (db) await addDoc(collection(db, "primera_entrevista"), { pareja, genograma, hipotesis });
        alert("Primera entrevista guardada.");
    } catch (e) { console.error(e); }
};

window.guardarGenograma = async function() {
    const pareja = document.getElementById('gv-pareja').value;
    const analisis = document.getElementById('gv-analisis').value;
    try {
        if (db) await addDoc(collection(db, "genograma_vincular"), { pareja, analisis });
        alert("Genograma guardado.");
    } catch (e) { console.error(e); }
};

window.guardarFoco = async function() {
    const pareja = document.getElementById('fp-pareja').value;
    const foco = document.getElementById('fp-foco').value;
    try {
        if (db) await addDoc(collection(db, "foco_vincular"), { pareja, foco });
        alert("Foco vincular establecido.");
    } catch (e) { console.error(e); }
};

window.guardarObjetivos = async function() {
    const pareja = document.getElementById('obj-pareja').value;
    const metas = document.getElementById('obj-metas').value;
    try {
        if (db) await addDoc(collection(db, "objetivos"), { pareja, metas });
        alert("Objetivos guardados.");
    } catch (e) { console.error(e); }
};

window.guardarTarea = async function() {
    const pareja = document.getElementById('tar-pareja').value;
    const detalle = document.getElementById('tar-detalle').value;
    try {
        if (db) await addDoc(collection(db, "tareas"), { pareja, detalle });
        alert("Tarea asignada.");
    } catch (e) { console.error(e); }
};

window.guardarEval1 = async function() {
    const pareja = document.getElementById('ev1-pareja').value;
    const puntaje = document.getElementById('ev1-puntaje').value;
    const obs = document.getElementById('ev1-obs').value;
    try {
        if (db) await addDoc(collection(db, "evaluacion_1"), { pareja, puntaje, obs });
        alert("Evaluación 1 guardada.");
    } catch (e) { console.error(e); }
};

window.guardarEval2 = async function() {
    const pareja = document.getElementById('ev2-pareja').value;
    const puntaje = document.getElementById('ev2-puntaje').value;
    const obs = document.getElementById('ev2-obs').value;
    try {
        if (db) await addDoc(collection(db, "evaluacion_2"), { pareja, puntaje, obs });
        alert("Evaluación 2 guardada.");
    } catch (e) { console.error(e); }
};

window.guardarFollowUp = async function() {
    const pareja = document.getElementById('fu-pareja').value;
    const evolucion = document.getElementById('fu-evolucion').value;
    try {
        if (db) await addDoc(collection(db, "follow_up"), { pareja, evolucion });
        alert("Follow up registrado.");
    } catch (e) { console.error(e); }
};

function cargarDatosGenerales() {
    cargarPacientes();
    cargarAgenda();
    cargarPagos();
}
