// ==========================================
// APP.JS - Núcleo de Enrutamiento y Login Ultra-Blindado
// Clínica de la Convergencia
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    inicializarLoginSeguro();
    inicializarNavegacion();
});

function inicializarLoginSeguro() {
    // Buscamos el formulario por ID, por tag 'form' o por cualquier clase relacionada al login
    const loginForm = document.getElementById('login-form') || document.querySelector('form');
    if (!loginForm) return;

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Capturamos los campos por ID o por su posición/tipo dentro del formulario
        const inputUser = document.getElementById('username') || loginForm.querySelector('input[type="text"]') || loginForm.querySelectorAll('input')[0];
        const inputPass = document.getElementById('password') || loginForm.querySelector('input[type="password"]') || loginForm.querySelectorAll('input')[1];

        const usuario = inputUser ? inputUser.value.trim() : '';
        const clave = inputPass ? inputPass.value.trim() : '';

        if (usuario === 'DRPEREYRA' && clave === '235689') {
            sessionStorage.setItem('clinica_auth', 'true');
            
            // Ocultamos el login y mostramos la app buscando contenedores comunes
            const loginOverlay = document.getElementById('login-overlay') || loginForm.closest('div');
            const appContainer = document.getElementById('app-container');
            
            if (loginOverlay) loginOverlay.style.display = 'none';
            if (appContainer) {
                appContainer.style.display = 'flex';
            } else {
                // Si el contenedor principal no usa ese ID exacto, recargamos o mostramos el body
                location.reload();
            }
        } else {
            alert('Credenciales incorrectas. Verifique usuario y contraseña.');
        }
    });

    // Comprobación de sesión activa previa
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
