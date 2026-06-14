import {
    processVehicle,
    deleteVehicle,
    getVehicleById
} from '../crud/crud.js';

import {
    validateVehicle
} from '../utils/validations.js';

let editingId = null;

export function initForm(
    refreshList,
    refreshDashboard
) {

    const form =
        document.getElementById(
            'vehicle-form'
        );

    form.addEventListener(
        'submit',
        event => {

            try {

                event.preventDefault();

                const formData =
                    new FormData(form);

                const vehicle = {

                    brand:
                        formData.get(
                            'brand'
                        ),

                    model:
                        formData.get(
                            'model'
                        ),

                    year:
                        formData.get(
                            'year'
                        ),

                    fuel:
                        formData.get(
                            'fuel'
                        )
                };

                validateVehicle(
                    vehicle
                );

                const isEditing = editingId !== null;

                processVehicle(
                    vehicle,
                    editingId
                );

                editingId = null;

                form.reset();

                form.querySelector(
                    'button'
                ).textContent =
                    'Registrar Vehículo';

                refreshList();
                refreshDashboard();

                alert(
                    isEditing 
                        ? 'se ha actualizado correctamente' 
                        : 'Vehículo guardado correctamente'
                );

            } catch (error) {

                alert(
                    error.message
                );
            }
        }
    );
}

export function handleEdit(id) {

    try {

        const vehicle =
            getVehicleById(id);

        if (!vehicle) return;

        editingId = id;

        const form =
            document.getElementById(
                'vehicle-form'
            );

        form.brand.value =
            vehicle.brand;

        form.model.value =
            vehicle.model;

        form.year.value =
            vehicle.year;

        form.fuel.value =
            vehicle.fuel;

        form.querySelector(
            'button'
        ).textContent =
            'Actualizar Vehículo';

        document
            .querySelector(
                'a[href="#registration"]'
            )
            .click();

    } catch (error) {

        console.error(
            error
        );
    }
}

export function handleDelete(
    id,
    refreshList,
    refreshDashboard
) {

    try {

        if (
            confirm(
                '¿Eliminar vehículo?'
            )
        ) {

            deleteVehicle(id);

            refreshList();

            refreshDashboard();
        }

    } catch (error) {

        alert(
            error.message
        );
    }
}