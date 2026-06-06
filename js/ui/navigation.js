/**
 * Navegación entre vistas
 */

export function initNavigation() {

    const navLinks =
        document.querySelectorAll(
            '.sidebar nav a'
        );

    const sections =
        document.querySelectorAll(
            '.view-section'
        );

    navLinks.forEach(link => {

        link.addEventListener(
            'click',
            event => {

                try {

                    event.preventDefault();

                    navLinks.forEach(
                        nav =>
                            nav.classList.remove(
                                'active'
                            )
                    );

                    link.classList.add(
                        'active'
                    );

                    sections.forEach(
                        section =>
                            section.style.display =
                                'none'
                    );

                    const targetId =
                        link
                            .getAttribute('href')
                            .substring(1);

                    const targetSection =
                        document.getElementById(
                            targetId
                        );

                    if (targetSection) {

                        targetSection.style.display =
                            'block';
                    }

                } catch (error) {

                    console.error(
                        'Navigation error:',
                        error
                    );
                }
            }
        );
    });
}