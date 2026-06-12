import { fetchWeather } from './weather.js';

export function initWeatherAndGeo() {

    if ("geolocation" in navigator) {

        navigator.geolocation.getCurrentPosition(

            position => {

                const {
                    latitude,
                    longitude
                } = position.coords;

                document.getElementById(
                    'geo-location'
                ).textContent =
                    `Lat ${latitude.toFixed(2)} | Lon ${longitude.toFixed(2)}`;

                fetchWeather(
                    latitude,
                    longitude
                );
            },

            () => {

                document.getElementById(
                    'geo-location'
                ).textContent =
                    'Permiso denegado';

                fetchWeather(
                    40.4168,
                    -3.7038
                );
            }
        );

    } else {

        document.getElementById(
            'geo-location'
        ).textContent =
            'No soportado';
    }
}