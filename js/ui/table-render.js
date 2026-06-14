import { getVehicles } from '../crud/storage.js';

export function renderVehicleList(
    editCallback,
    deleteCallback
) {

    try {

        const vehicles =
            getVehicles();

        const tbody =
            document.getElementById(
                'vehicle-list'
            );

        tbody.innerHTML = '';

        vehicles.forEach(vehicle => {

            const tr =
                document.createElement(
                    'tr'
                );

            tr.innerHTML = `
                <td>${vehicle.brand}</td>
                <td>${vehicle.model}</td>
                <td>${vehicle.year}</td>
                <td>${vehicle.fuel}</td>
                <td>
                    <button class="btn-edit" data-id="${vehicle.id}">
                        Editar
                    </button>

                    <button class="btn-delete" data-id="${vehicle.id}">
                        Eliminar
                    </button>
                </td>
            `;

            tbody.appendChild(
                tr
            );
        });

        document
            .querySelectorAll(
                '.btn-edit'
            )
            .forEach(button => {

                button.addEventListener(
                    'click',
                    () => {
                        editCallback(
                            button.dataset.id
                        );
                    }
                );
            });

        document
            .querySelectorAll(
                '.btn-delete'
            )
            .forEach(button => {

                button.addEventListener(
                    'click',
                    () => {
                        deleteCallback(
                            button.dataset.id
                        );
                    }
                );
            });

    } catch (error) {

        console.error(
            'Render error:',
            error
        );
    }
}