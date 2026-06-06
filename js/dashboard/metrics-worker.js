/**
 * Web Worker para el procesamiento de métricas de vehículos en segundo plano.
 * Recibe la lista completa de vehículos y devuelve un objeto con las estadísticas calculadas.
 */

self.onmessage = function(e) {
    const vehicles = e.data;
    
    if (!Array.isArray(vehicles)) {
        self.postMessage({ error: 'Data is not an array' });
        return;
    }

    // Procesamiento pesado simulado si fuera necesario, 
    // aunque con pocos datos es instantáneo.
    const metrics = {
        total: vehicles.length,
        gasolina: vehicles.filter(v => v.fuel === 'Gasolina').length,
        electrico: vehicles.filter(v => v.fuel === 'Electrico').length,
        diesel: vehicles.filter(v => v.fuel === 'Diesel').length,
        hibrido: vehicles.filter(v => v.fuel === 'Hibrido').length,
        // Ejemplo de métrica extra: promedio de años
        avgYear: vehicles.length > 0 
            ? Math.round(vehicles.reduce((acc, v) => acc + parseInt(v.year), 0) / vehicles.length) 
            : 0
    };

    // Devolvemos los resultados al hilo principal
    self.postMessage(metrics);
};
