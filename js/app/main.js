/**
 * Aplicación de registro de vehículos - Lógica principal
 */
import { getVehicles } from './storage.js';
import { processVehicle, deleteVehicle, getVehicleById } from './crud.js';

let editingId = null;
let metricsWorker = null;
const WEATHER_API_KEY = 'YOUR_API_KEY_HERE'; // Reemplazar con una clave real de OpenWeather

document.addEventListener('DOMContentLoaded', () => {
    try {
        initNavigation();
        initForm();
        initSession();
        initMetricsWorker();
        initWeatherAndGeo();
        renderVehicleList();
        updateDashboard();
    } catch (error) {
        console.error('Error initializing application:', error);
        alert('Ocurrió un error al cargar la aplicación.');
    }
});

/**
 * Inicializa el clima y la geolocalización
 */
function initWeatherAndGeo() {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const { latitude, longitude } = position.coords;

            // Actualizar pie de página con coordenadas
            document.getElementById('geo-location').textContent = 
                `Localización: Lat ${latitude.toFixed(2)}, Lon ${longitude.toFixed(2)}`;

            // Obtener clima
            fetchWeather(latitude, longitude);
        }, (error) => {
            console.warn('Geolocation error:', error);
            document.getElementById('geo-location').textContent = 'Localización: Permiso denegado';
            // Clima por defecto (ej: Madrid) si falla la geo
            fetchWeather(40.4168, -3.7038);
        });
    } else {
        document.getElementById('geo-location').textContent = 'Localización: No soportada';
        fetchWeather(40.4168, -3.7038);
    }
}

/**
 * Obtiene el clima desde OpenWeather API
 */
async function fetchWeather(lat, lon) {
    const weatherWidget = document.getElementById('weather-info');
    try {
        if (WEATHER_API_KEY === 'YOUR_API_KEY_HERE') {
            weatherWidget.innerHTML = '<i class="fas fa-sun"></i> <span>22°C (Simulado)</span>';
            return;
        }

        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${WEATHER_API_KEY}&lang=es`
        );

        if (!response.ok) throw new Error('Error en la API de clima');

        const data = await response.json();
        const temp = Math.round(data.main.temp);
        const description = data.weather[0].description;
        const icon = data.weather[0].icon;

        weatherWidget.innerHTML = `
            <img src="http://openweathermap.org/img/wn/${icon}.png" alt="${description}" style="width: 30px; height: 30px;">
            <span>${temp}°C, ${data.name}</span>
        `;
    } catch (error) {
        console.error('Weather error:', error);
        weatherWidget.innerHTML = '<i class="fas fa-exclamation-triangle"></i> <span>Clima no disponible</span>';
    }
}

/**
 * Inicializa el Web Worker para las métricas
 */
function initMetricsWorker() {
    if (window.Worker) {
        metricsWorker = new Worker('js/metrics-worker.js');
        
        metricsWorker.onmessage = function(e) {
            const metrics = e.data;
            if (metrics.error) {
                console.error('Worker error:', metrics.error);
                return;
            }
            
            // Actualizamos la UI con los resultados del worker
            document.getElementById('total-vehicles').textContent = metrics.total;
            document.getElementById('gas-vehicles').textContent = metrics.gasolina;
            document.getElementById('electric-vehicles').textContent = metrics.electrico;
            
            console.log('Metrics updated via Web Worker:', metrics);
        };
    } else {
        console.warn('Web Workers are not supported in this browser.');
    }
}

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
            
            // Actualizamos el dashboard y vamos al inventario
            updateDashboard();
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

        // Actualizamos el dashboard cada vez que cambia la lista
        updateDashboard();
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
        
        if (metricsWorker) {
            // Usamos el Web Worker para el procesamiento pesado
            metricsWorker.postMessage(vehicles);
        } else {
            // Fallback síncrono si el worker no está disponible
            document.getElementById('total-vehicles').textContent = vehicles.length;
            document.getElementById('gas-vehicles').textContent = vehicles.filter(v => v.fuel === 'Gasolina').length;
            document.getElementById('electric-vehicles').textContent = vehicles.filter(v => v.fuel === 'Electrico').length;
        }
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
