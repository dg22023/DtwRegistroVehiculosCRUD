# Registro de Vehículos — DTW135

> **Grupo #6** | Proyecto Final · Materia DTW135

---

## Integrantes del Equipo

| Nombre | Carnet |
|--------|--------|
| Ricardo Adan Patiño Hernandez | PH23011 |
| Alexandra Quinteros Carcamo | QC23006 |
| Gabriel Ernesto Diaz Galdamez | DG22023 |
| Victor Noe Rodas Rivera | RR23027 |

---

## Descripción del Proyecto

Aplicación web de **gestión y registro de vehículos** desarrollada íntegramente con tecnologías web estándar (JavaScript Vanilla, CSS personalizado y Web Workers). Permite realizar operaciones CRUD completas sobre un inventario de vehículos, visualizar métricas calculadas en segundo plano mediante un Web Worker dedicado, consultar el clima en tiempo real a través de la API pública Open-Meteo, y detectar la ubicación geográfica del usuario con la Geolocation API del navegador.

---

## Estructura del Proyecto

```
DtwRegistroVehiculosCRUD/
│
├── index.html                  # Punto de entrada único (SPA sin router de framework)
│
├── css/
│   └── styles.css              # Hoja de estilos principal (variables, layout, componentes)
│
├── js/
│   │
│   ├── app/
│   │   └── main.js             # Orquestador central — inicializa todos los módulos
│   │
│   ├── ui/
│   │   ├── navigation.js       # Control de vistas (SPA sin recarga de página)
│   │   ├── form-handler.js     # Captura, validación y envío del formulario de vehículos
│   │   └── table-render.js     # Generación dinámica de filas en el DOM (inventario)
│   │
│   ├── crud/
│   │   ├── crud.js             # Operaciones create / read / update / delete
│   │   └── storage.js          # Capa de abstracción sobre localStorage
│   │
│   ├── api/
│   │   ├── geolocation.js      # Geolocation API del navegador + fallback
│   │   └── weather.js          # Consumo asíncrono de la API Open-Meteo
│   │
│   ├── dashboard/
│   │   ├── dashboard.js        # Coordinador: envía datos al Worker y actualiza el DOM
│   │   └── metrics-worker.js   # Web Worker — calcula métricas fuera del hilo principal
│   │
│   └── utils/
│       ├── session.js          # Gestión de sessionStorage + contador de tiempo de sesión
│       └── validations.js      # Funciones puras de validación del formulario
│
└── README.md
```

---

## Instrucciones para Ejecutar el Proyecto

### Requisitos Previos

- Un servidor HTTP local (el proyecto usa módulos ES6 con `type="module"`, por lo que **no puede abrirse directamente como archivo** `file://`).

### Opción 1 — VS Code + Live Server (Recomendado)

1. Instala la extensión **Live Server** en Visual Studio Code.
2. Abre la carpeta raíz del proyecto en VS Code.
3. Haz clic derecho sobre `index.html` → **"Open with Live Server"**.
4. La aplicación se abrirá en `http://127.0.0.1:5500`.

### Opción 2 — Python HTTP Server

```bash
# Desde la carpeta raíz del proyecto
python -m http.server 8080
```
Luego navega a `http://localhost:8080`.

### Opción 3 — Node.js http-server

```bash
npx http-server . -p 8080
```

> **Importante:** El archivo `js/dashboard/metrics-worker.js` es instanciado como `new Worker('./js/dashboard/metrics-worker.js')`. El servidor debe servir los archivos desde la **raíz del proyecto** para que la ruta del Worker se resuelva correctamente.

---

## Ciclo de Vida de la Aplicación

El punto de entrada es `index.html`, que carga el módulo `js/app/main.js` mediante `<script type="module">`. Este módulo actúa como **orquestador central** y sigue el siguiente orden de inicialización al dispararse el evento `DOMContentLoaded`:

```
DOMContentLoaded
│
├── initNavigation()          → js/ui/navigation.js
│   └── Registra listeners en los enlaces del sidebar.
│       Controla qué sección (.view-section) es visible.
│
├── initMetricsWorker()       → js/dashboard/dashboard.js
│   └── Instancia el Web Worker (metrics-worker.js).
│       Escucha mensajes del Worker y actualiza las tarjetas del dashboard.
│
├── initWeatherAndGeo()       → js/api/geolocation.js → js/api/weather.js
│   └── Solicita coordenadas con navigator.geolocation.
│       Llama a fetchWeather() con las coordenadas.
│       Consulta https://api.open-meteo.com y renderiza la temperatura en el header.
│
├── initSession()             → js/utils/session.js
│   └── Registra el timestamp de inicio en sessionStorage.
│       Inicia un setInterval() de 1s para mostrar el tiempo de sesión activa.
│
├── refreshList()             → js/ui/table-render.js + js/crud/storage.js
│   └── Lee vehículos de localStorage.
│       Genera dinámicamente las filas <tr> del inventario con botones Editar/Eliminar.
│
├── initForm(refreshList, updateDashboard)  → js/ui/form-handler.js
│   └── Escucha el evento submit del formulario.
│       Valida con validateVehicle() → js/utils/validations.js.
│       Llama a processVehicle() → js/crud/crud.js → js/crud/storage.js.
│       Tras guardar: resetea el form, llama a refreshList() y updateDashboard().
│
└── updateDashboard()         → js/dashboard/dashboard.js
    └── Lee vehículos y los envía al Worker con postMessage().
        El Worker calcula métricas (total, gasolina, eléctrico, diésel, híbrido, año promedio)
        y responde con onmessage → el DOM se actualiza sin bloquear el hilo principal.
```

---

## Tecnologías Utilizadas

| Tecnología | Rol |
|---|---|
| **JavaScript Vanilla (ES6+)** | Lógica completa: módulos, async/await, arrow functions |
| **Web Workers API** | Procesamiento de métricas en hilo secundario (`metrics-worker.js`) |
| **Geolocation API** | Detección de coordenadas del usuario (`navigator.geolocation`) |
| **Fetch API** | Consumo de la API REST Open-Meteo (clima en tiempo real) |
| **localStorage** | Persistencia de vehículos entre sesiones (`dtw_vehicles`) |
| **sessionStorage** | Almacenamiento del timestamp de inicio de sesión |
| **HTML5 Semántico** | Estructura: `<aside>`, `<header>`, `<main>`, `<section>`, `<footer>` |
| **CSS Custom Properties** | Variables de diseño reutilizables (`--color-*`, `--spacing-*`) |
| **Font Awesome 6** | Iconografía (`fas fa-car`, `fas fa-bolt`, etc.) |

---

## Historial de Ramas

| Rama | Propósito |
|------|-----------|
| `main` | Rama de producción, código estable |
| `feat/ui-app` | Desarrollo de la interfaz de usuario modular |
| `feature/interfaz-ui` | Exploración inicial de la interfaz |
| `feature/logica-crud` | Implementación de operaciones CRUD |
| `feature/testing` | Integración, pruebas y refactorización de módulos (rama archivada) |

---

## Licencia

Proyecto académico desarrollado para la materia **DTW135** · Universidad de El Salvador · 2026.
