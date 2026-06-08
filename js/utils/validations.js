/**
 * Validaciones del formulario
 */

export function validateVehicle(vehicle) {

    if (!vehicle.brand || vehicle.brand.trim() === '') {
        throw new Error('La marca es obligatoria');
    }

    if (!vehicle.model || vehicle.model.trim() === '') {
        throw new Error('El modelo es obligatorio');
    }

    if (!vehicle.year) {
        throw new Error('El año es obligatorio');
    }

    const year = parseInt(vehicle.year);

    if (year < 1900 || year > 2027) {
        throw new Error('Año inválido');
    }

    if (!vehicle.fuel) {
        throw new Error('Debe seleccionar combustible');
    }

    return true;
}
