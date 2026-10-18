// ==========================================
// APP.JS - Núcleo de Enrutamiento y Gestión
// Clínica de la Convergencia
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    inicializarNavegacion();
    verificarAutenticacion();
});

// Sistema de enrutamiento dinámico hacia el iframe central
window.cargarModulo = function(urlPagina) {
    const iframe = document.getElementById('main-iframe');
    if (!iframe) {
        console.error("No se encontró el contenedor principal (main-iframe).");
        return;
    }

    // Efecto visual de transición sutil al cambiar de módulo clínico
    iframe.style.opacity = '0.4';
    iframe.src = urlPagina;
    
    iframe.onload = () => {
        iframe.style.opacity = '1';
        // Ajuste automático de altura según contenido si es necesario
    };
};

function inicializarNavegacion() {
    // Manejador global para los enlaces del menú institucional
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

function verificarAutenticacion() {
    // Control de sesión institucional para Dr. y Mgter. Rubén M. Pereyra (DRPEREYRA)
    const sesionActiva = sessionStorage.getItem('clnica_convergencia_auth');
    // Si manejas un login previo en index.html, aquí validas las credenciales (235689)
    console.log("Sistema de Terapia de Pareja inicializado correctamente.");
}
