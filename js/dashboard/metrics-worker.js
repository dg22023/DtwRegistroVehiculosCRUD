/**
 * Web Worker para procesar métricas en segundo plano
 */

self.onmessage = function (e) {

    const vehicles = e.data;

    if (!Array.isArray(vehicles)) {
        self.postMessage({
            error: 'Data is not an array'
        });

        return;
    }

    const metrics = {
        total: vehicles.length,

        gasolina: vehicles.filter(
            vehicle => vehicle.fuel === 'Gasolina'
        ).length,

        electrico: vehicles.filter(
            vehicle => vehicle.fuel === 'Electrico'
        ).length,

        diesel: vehicles.filter(
            vehicle => vehicle.fuel === 'Diesel'
        ).length,

        hibrido: vehicles.filter(
            vehicle => vehicle.fuel === 'Hibrido'
        ).length,

        avgYear: vehicles.length > 0
            ? Math.round(
                vehicles.reduce(
                    (acc, vehicle) =>
                        acc + parseInt(vehicle.year),
                    0
                ) / vehicles.length
            )
            : 0
    };

    self.postMessage(metrics);
};