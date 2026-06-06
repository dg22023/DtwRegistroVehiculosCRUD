/**
 * CRUD operaciones para vehículos 
 */
import { getVehicles, saveVehicles } from './storage.js';

/**
 * Agrega un nuevo vehículo o actualiza uno existente
 * @param {Object} vehicleData Data para el formulario del vehículo
 * @param {string|null} id ID del vehículo a actualizar, o null para crear uno nuevo
 */
export function processVehicle(vehicleData, id = null) {
    try {
        const vehicles = getVehicles();
        
        if (id) {
            // Atualizar existente
            const index = vehicles.findIndex(v => v.id === id);
            if (index !== -1) {
                vehicles[index] = { ...vehicleData, id };
            }
        } else {
            // Crear nuevo
            const newVehicle = {
                ...vehicleData,
                id: Date.now().toString() // ID unico basado en timestamp
            };
            vehicles.push(newVehicle);
        }
        
        saveVehicles(vehicles);
        return true;
    } catch (error) {
        console.error('Error processing vehicle:', error);
        throw error;
    }
}

/**
 * Elimina un vehículo por ID
 * @param {string} id 
 */
export function deleteVehicle(id) {
    try {
        const vehicles = getVehicles();
        const filteredVehicles = vehicles.filter(v => v.id !== id);
        saveVehicles(filteredVehicles);
        return true;
    } catch (error) {
        console.error('Error deleting vehicle:', error);
        throw error;
    }
}

/**
 * Obtenemos un vehículo por su ID
 * @param {string} id 
 * @returns {Object|null}
 */
export function getVehicleById(id) {
    try {
        const vehicles = getVehicles();
        return vehicles.find(v => v.id === id) || null;
    } catch (error) {
        console.error('Error fetching vehicle:', error);
        return null;
    }
}
