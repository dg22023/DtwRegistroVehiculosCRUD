/**
 * Logica de la aplicación principal para el registro de vehículos DTW
 */

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
});

/**
 * Inicialización de la navegación lateral y el cambio de vistas
 */
function initNavigation() {
    const navLinks = document.querySelectorAll('.sidebar nav a');
    const sections = document.querySelectorAll('.view-section');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            //Remueve la clase activa de todos los enlaces
            navLinks.forEach(l => l.classList.remove('active'));
            //Agrega la clase activa al enlace clickeado
            link.classList.add('active');

            // Oculta todas las secciones
            sections.forEach(section => {
                section.style.display = 'none';
            });

            // Muestra la sección correspondiente al enlace clickeado
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.style.display = 'block';
            }
        });
    });
}
