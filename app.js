// ==========================================
// APP.JS - Autenticación y Enrutamiento Principal
// Clínica de la Convergencia
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    inicializarLogin();
    inicializarNavegacion();
});

// Sistema de Login Institucional
function inicializarLogin() {
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const usuario = document.getElementById('username').value.trim();
            const clave = document.getElementById('password').value.trim();

            if (usuario === 'DRPEREYRA' && clave === '235689') {
                sessionStorage.setItem('clinica_auth', 'true');
                document.getElementById('login-overlay').style.display = 'none';
                document.getElementById('app-container').style.display = 'flex';
            } else {
                alert('Credenciales incorrectas. Verifique usuario y contraseña.');
            }
        });
    }

    // Verificar si ya hay sesión activa
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
