/**
 * Manejo de Session Storage
 */

export function initSession() {

    try {

        if (!sessionStorage.getItem('session_start')) {

            sessionStorage.setItem(
                'session_start',
                Date.now()
            );
        }

        setInterval(() => {

            const start =
                sessionStorage.getItem(
                    'session_start'
                );

            const elapsed =
                Math.floor(
                    (Date.now() - start) / 1000
                );

            const minutes =
                Math.floor(
                    elapsed / 60
                )
                    .toString()
                    .padStart(2, '0');

            const seconds =
                (elapsed % 60)
                    .toString()
                    .padStart(2, '0');

            document.getElementById(
                'session-timer'
            ).textContent =
                `Sesión: ${minutes}:${seconds}`;

        }, 1000);

    } catch (error) {

        console.error(
            'Session error:',
            error
        );
    }
}