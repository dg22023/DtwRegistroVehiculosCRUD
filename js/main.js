/**
 * Aplicación de registro de vehículos - Lógica principal
 */
import { getVehicles } from './storage.js';
import { processVehicle, deleteVehicle, getVehicleById } from './crud.js';

let editingId = null;

document.addEventListener('DOMContentLoaded', () => {
    try {
        initNavigation();
        initForm();
        initSession();
        renderVehicleList();
        updateDashboard();
    } catch (error) {
        console.error('Error initializing application:', error);
        alert('Ocurrió un error al cargar la aplicación.');
    }
});

/**
 * Inicializa la navegación entre secciones del dashboard
 */
function initNavigation() {
    const navLinks = document.querySelectorAll('.sidebar nav a');
    const sections = document.querySelectorAll('.view-section');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            try {
                e.preventDefault();
                
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');

                sections.forEach(section => {
                    section.style.display = 'none';
                });

                const targetId = link.getAttribute('href').substring(1);
                const targetSection = document.getElementById(targetId);
                if (targetSection) {
                    targetSection.style.display = 'block';
                    
                    // Logica especifica para cada sección
                    if (targetId === 'inventory') renderVehicleList();
                    if (targetId === 'dashboard') updateDashboard();
                }
            } catch (err) {
                console.error('Navigation error:', err);
            }
        });
    });
}

/**
 * Inicializa el formulario de registro/actualización de vehículos
 */
function initForm() {
    const form = document.getElementById('vehicle-form');
    form.addEventListener('submit', (e) => {
        try {
            e.preventDefault();
            const formData = new FormData(form);
            const vehicleData = {
                brand: formData.get('brand'),
                model: formData.get('model'),
                year: formData.get('year'),
                fuel: formData.get('fuel')
            };

            processVehicle(vehicleData, editingId);
            
            form.reset();
            editingId = null;
            form.querySelector('button').textContent = 'Registrar Vehículo';
            
            alert('Vehículo procesado correctamente.');
            
            // Va al formulario de inventario para ver los cambios
            document.querySelector('a[href="#inventory"]').click();
        } catch (error) {
            alert('Error: ' + error.message);
        }
    });
}

/**
 * Renderiza la lista de vehículos en el inventario
 */
function renderVehicleList() {
    try {
        const vehicles = getVehicles();
        const tbody = document.getElementById('vehicle-list');
        tbody.innerHTML = '';

        vehicles.forEach(vehicle => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${vehicle.brand}</td>
                <td>${vehicle.model}</td>
                <td>${vehicle.year}</td>
                <td>${vehicle.fuel}</td>
                <td>
                    <button class="btn-edit" data-id="${vehicle.id}"><i class="fas fa-edit"></i></button>
                    <button class="btn-delete" data-id="${vehicle.id}"><i class="fas fa-trash"></i></button>
                </td>
            `;
            tbody.appendChild(tr);
        });

        //Agrega eventos a los botones de editar y eliminar
        document.querySelectorAll('.btn-edit').forEach(btn => {
            btn.addEventListener('click', () => handleEdit(btn.dataset.id));
        });
        document.querySelectorAll('.btn-delete').forEach(btn => {
            btn.addEventListener('click', () => handleDelete(btn.dataset.id));
        });
    } catch (error) {
        console.error('Error rendering list:', error);
    }
}

/**
 * Maneja la edición de un vehículo existente
 */
function handleEdit(id) {
    try {
        const vehicle = getVehicleById(id);
        if (vehicle) {
            editingId = id;
            const form = document.getElementById('vehicle-form');
            form.brand.value = vehicle.brand;
            form.model.value = vehicle.model;
            form.year.value = vehicle.year;
            form.fuel.value = vehicle.fuel;
            
            form.querySelector('button').textContent = 'Actualizar Vehículo';
            
            // Cambia a la vista de registro para editar
            document.querySelector('a[href="#registration"]').click();
        }
    } catch (error) {
        console.error('Error in handleEdit:', error);
    }
}

/**
 * Maneja la eliminación de un vehículo por ID
 */
function handleDelete(id) {
    try {
        if (confirm('¿Está seguro de que desea eliminar este vehículo?')) {
            deleteVehicle(id);
            renderVehicleList();
        }
    } catch (error) {
        alert('Error al eliminar: ' + error.message);
    }
}

/**
 * Actualiza las estadísticas del dashboard
 */
export function updateDashboard() {
    try {
        const vehicles = getVehicles();
        document.getElementById('total-vehicles').textContent = vehicles.length;
        document.getElementById('gas-vehicles').textContent = vehicles.filter(v => v.fuel === 'Gasolina').length;
        document.getElementById('electric-vehicles').textContent = vehicles.filter(v => v.fuel === 'Electrico').length;
    } catch (error) {
        console.error('Error updating dashboard:', error);
    }
}

/**
 * Manejo de sesión simple para mostrar el tiempo transcurrido desde que se abrió la aplicación
 */
function initSession() {
    try {
        if (!sessionStorage.getItem('session_start')) {
            sessionStorage.setItem('session_start', Date.now());
        }
        
        setInterval(() => {
            const start = sessionStorage.getItem('session_start');
            const elapsed = Math.floor((Date.now() - start) / 1000);
            const minutes = Math.floor(elapsed / 60).toString().padStart(2, '0');
            const seconds = (elapsed % 60).toString().padStart(2, '0');
            document.getElementById('session-timer').textContent = `Sesión: ${minutes}:${seconds}`;
        }, 1000);
    } catch (error) {
        console.error('Session error:', error);
    }
}
