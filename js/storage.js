/**
 * Modulo de almacenamiento para gestionar los datos de vehículos en localStorage
 * Proporciona funciones para obtener y guardar vehículos, con manejo de errores básico.
 */

const STORAGE_KEY = 'dtw_vehicles';

/**
 * Recupera la lista de vehículos desde localStorage
 * @returns {Array} Lista de vehiculos
 */
export function getVehicles() {
    try {
        const data = localStorage.getItem(STORAGE_KEY);
        return data ? JSON.parse(data) : [];
    } catch (error) {
        console.error('Error reading from localStorage:', error);
        return [];
    }
}

/**
 * Guarda la lista de vehículos en localStorage
 * @param {Array} vehicles Lista de vehículos a guardar
 */
export function saveVehicles(vehicles) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(vehicles));
    } catch (error) {
        console.error('Error saving to localStorage:', error);
        throw new Error('No se pudo guardar la información en el almacenamiento local.');
    }
}
