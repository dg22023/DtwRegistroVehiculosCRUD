import { initNavigation }
from '../ui/navigation.js';

import {
    renderVehicleList
}
from '../ui/table-render.js';

import {
    initForm,
    handleEdit,
    handleDelete
}
from '../ui/form-handler.js';

import {
    initMetricsWorker,
    updateDashboard
}
from '../dashboard/dashboard.js';

import {
    initWeatherAndGeo
}
from '../api/geolocation.js';

import {
    initSession
}
from '../utils/session.js';

document.addEventListener(
    'DOMContentLoaded',
    () => {

        try {

            initNavigation();

            initMetricsWorker();

            initWeatherAndGeo();

            initSession();

            const refreshList = () => {

                renderVehicleList(
                    handleEdit,
                    (id) => handleDelete(
                        id,
                        refreshList,
                        updateDashboard
                    )
                );
            };

            initForm(
                refreshList,
                updateDashboard
            );

            refreshList();

            updateDashboard();

        } catch (error) {

            console.error(
                'Initialization error:',
                error
            );

            alert(
                'Ocurrió un error al iniciar la aplicación.'
            );
        }
    }
);