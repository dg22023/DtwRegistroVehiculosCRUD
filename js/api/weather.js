/**
 * Obtiene el clima actual desde Open-Meteo
 */

export async function fetchWeather(lat, lon) {

    const weatherWidget =
        document.getElementById(
            'weather-info'
        );

    try {

        const response =
            await fetch(
                `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m`
            );

        if (!response.ok) {
            throw new Error(
                'Error al obtener clima'
            );
        }

        const data =
            await response.json();

        const temperature =
            Math.round(
                data.current.temperature_2m
            );

        weatherWidget.innerHTML = `
            <i class="fas fa-cloud-sun"></i>
            <span>${temperature}°C</span>
        `;

    } catch (error) {

        console.error(
            'Weather error:',
            error
        );

        weatherWidget.innerHTML = `
            <i class="fas fa-exclamation-triangle"></i>
            <span>Clima no disponible</span>
        `;
    }
}