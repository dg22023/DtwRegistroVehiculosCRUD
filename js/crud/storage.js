/**
 * Modulo de almacenamiento para gestionar los datos de vehículos en localStorage
 */

const STORAGE_KEY = 'dtw_vehicles';

export function getVehicles() {
    try {
        const data = localStorage.getItem(STORAGE_KEY);
        return data ? JSON.parse(data) : [];
    } catch (error) {
        console.error('Error reading from localStorage:', error);
        return [];
    }
}

export function saveVehicles(vehicles) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(vehicles));
    } catch (error) {
        console.error('Error saving to localStorage:', error);
        throw new Error('No se pudo guardar la información.');
    }
}