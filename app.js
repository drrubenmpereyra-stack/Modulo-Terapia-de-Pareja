// Importación unificada de Firebase SDK y Firestore
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// Configuración de Firebase provista
const firebaseConfig = {
    apiKey: "AIzaSyDv1wgWGICsvfrJHZV1s2HVXdsAvIRAOuI",
    authDomain: "terapia-de-pareja-3bb81.firebaseapp.com",
    projectId: "terapia-de-pareja-3bb81",
    storageBucket: "terapia-de-pareja-3bb81.firebasestorage.app",
    messagingSenderId: "173599055420",
    appId: "1:173599055420:web:5b36414cc3b4c7a90b6d39"
};

// Inicialización segura de Firebase Firestore
let db;
try {
    const app = initializeApp(firebaseConfig);
    db = getFirestore(app);
} catch (e) {
    console.error("Error al inicializar Firebase:", e);
}

// Control Estricto de Login
document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const user = document.getElementById('user').value.trim().toUpperCase();
    const pass = document.getElementById('password').value.trim();
    const errorMsg = document.getElementById('login-error');

    if (user === "DRPEREYRA" && pass === "235689") {
        document.getElementById('login-container').style.display = 'none';
        document.getElementById('app-container').style.display = 'flex';
    } else {
        errorMsg.style.display = 'block';
    }
});

// Función de Cierre de Sesión
window.logout = function() {
    document.getElementById('app-container').style.display = 'none';
    document.getElementById('login-container').style.display = 'flex';
    document.getElementById('login-form').reset();
    document.getElementById('login-error').style.display = 'none';
};
