import { getVehicles } from '../crud/storage.js';

let metricsWorker = null;

export function initMetricsWorker() {

    if (window.Worker) {

        metricsWorker = new Worker(
            './js/dashboard/metrics-worker.js'
        );

        metricsWorker.onmessage = function (e) {

            const metrics = e.data;

            if (metrics.error) {
                console.error(metrics.error);
                return;
            }

            document.getElementById(
                'total-vehicles'
            ).textContent = metrics.total;

            document.getElementById(
                'gas-vehicles'
            ).textContent = metrics.gasolina;

            document.getElementById(
                'electric-vehicles'
            ).textContent = metrics.electrico;
        };
    }
}

export function updateDashboard() {

    try {

        const vehicles = getVehicles();

        if (metricsWorker) {

            metricsWorker.postMessage(
                vehicles
            );

        } else {

            document.getElementById(
                'total-vehicles'
            ).textContent = vehicles.length;

            document.getElementById(
                'gas-vehicles'
            ).textContent =
                vehicles.filter(
                    vehicle => vehicle.fuel === 'Gasolina'
                ).length;

            document.getElementById(
                'electric-vehicles'
            ).textContent =
                vehicles.filter(
                    vehicle => vehicle.fuel === 'Electrico'
                ).length;
        }

    } catch (error) {

        console.error(
            'Dashboard error:',
            error
        );
    }
}