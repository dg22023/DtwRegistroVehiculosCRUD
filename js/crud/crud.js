/**
 * CRUD operaciones para vehículos
 */

import { getVehicles, saveVehicles } from './storage.js';

export function processVehicle(vehicleData, id = null) {
    try {
        const vehicles = getVehicles();

        if (id) {
            const index = vehicles.findIndex(v => v.id === id);

            if (index !== -1) {
                vehicles[index] = {
                    ...vehicleData,
                    id
                };
            }
        } else {
            const newVehicle = {
                ...vehicleData,
                id: Date.now().toString()
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

export function deleteVehicle(id) {
    try {
        const vehicles = getVehicles();

        const filteredVehicles = vehicles.filter(
            vehicle => vehicle.id !== id
        );

        saveVehicles(filteredVehicles);

        return true;
    } catch (error) {
        console.error('Error deleting vehicle:', error);
        throw error;
    }
}

export function getVehicleById(id) {
    try {
        const vehicles = getVehicles();

        return vehicles.find(
            vehicle => vehicle.id === id
        ) || null;

    } catch (error) {
        console.error('Error fetching vehicle:', error);
        return null;
    }
}

