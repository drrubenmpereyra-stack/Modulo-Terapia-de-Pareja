// ==========================================
// APP.JS - Núcleo de Enrutamiento y Login Blindado
// Clínica de la Convergencia
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    inicializarLogin();
    inicializarNavegacion();
});

// Sistema de Login Institucional con validación estricta de nulidad
function inicializarLogin() {
    const loginForm = document.getElementById('login-form');
    if (!loginForm) return; // Sale limpiamente si no hay formulario de login en la vista actual

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const inputUser = document.getElementById('username');
        const inputPass = document.getElementById('password');

        // Validación defensiva para evitar cualquier TypeError si el elemento no existe
        const usuario = inputUser ? inputUser.value.trim() : '';
        const clave = inputPass ? inputPass.value.trim() : '';

        if (usuario === 'DRPEREYRA' && clave === '235689') {
            sessionStorage.setItem('clinica_auth', 'true');
            const loginOverlay = document.getElementById('login-overlay');
            const appContainer = document.getElementById('app-container');
            if (loginOverlay) loginOverlay.style.display = 'none';
            if (appContainer) appContainer.style.display = 'flex';
        } else {
            alert('Credenciales incorrectas. Verifique usuario y contraseña.');
        }
    });

    // Comprobación de sesión activa
    if (sessionStorage.getItem('clinica_auth') === 'true') {
        const loginOverlay = document.getElementById('login-overlay');
        const appContainer = document.getElementById('app-container');
        if (loginOverlay) loginOverlay.style.display = 'none';
        if (appContainer) appContainer.style.display = 'flex';
    }
}

// Sistema de enrutamiento dinámico hacia el iframe central
window.cargarModulo = function(urlPagina) {
    const iframe = document.getElementById('main-iframe');
    if (!iframe) {
        console.error("No se encontró el contenedor principal (main-iframe).");
        return;
    }
    iframe.src = urlPagina;
};

function inicializarNavegacion() {
    const navLinks = document.querySelectorAll('[data-module]');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const modulo = link.getAttribute('data-module');
            if (modulo) {
                cargarModulo(modulo);
            }
        });
    });
}
