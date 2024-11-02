# Meli Search Page

Este proyecto es una página de búsqueda de productos inspirada en Mercado Libre, construida con React y TypeScript. Su propósito es permitir a los usuarios buscar productos y obtener una interfaz intuitiva y optimizada para la navegación de resultados.

## Tecnologías y Librerías Utilizadas (Frontend)

- **React**: Biblioteca para la construcción de interfaces de usuario.
- **TypeScript**: Añade tipado estático a JavaScript, mejorando la mantenibilidad y escalabilidad del proyecto.
- **Vite**: Herramienta de desarrollo rápida y ligera para construir el proyecto, que incluye soporte para hot-module replacement.
- **SCSS (SASS)**: Preprocesador CSS que permite una mejor organización y reusabilidad de estilos.
- **Axios**: Cliente HTTP utilizado para realizar peticiones a APIs.
- **Zustand**: Biblioteca de gestión de estado ligera para React, útil para manejar el estado global de la aplicación.
- **React Router DOM**: Facilita la navegación entre diferentes páginas y vistas de la aplicación.
- **React Loader Spinner**: Componente para mostrar una animación de carga mientras los datos están en proceso de carga.

### Dependencias de Desarrollo 

- **Vite + Plugin React SWC**: Configura Vite para usar SWC como compilador, acelerando la compilación de TypeScript y JSX.
- **ESLint y Prettier**: Configurados para mantener la consistencia de estilo y calidad del código.
- **Types**: Tipos para React (`@types/react`) y ReactDOM (`@types/react-dom`), proporcionando un entorno de desarrollo estrictamente tipado.

## Tecnologías y Librerías Utilizadas (Backend)

- **Node.js:** Entorno de ejecución para JavaScript en el lado del servidor.
- **TypeScript:** Añade tipado estático a JavaScript, mejorando la mantenibilidad y escalabilidad del proyecto.
- **Express:** Framework web para construir APIs y manejar rutas.
- **SWC:** Compilador para TypeScript que permite una construcción rápida.
- **Nodemon:** Herramienta que reinicia automáticamente la aplicación al detectar cambios en el código.
- **dotenv:** Carga variables de entorno desde un archivo `.env` para gestionar configuraciones de forma segura.
- **Helmet:** Middleware que ayuda a proteger la aplicación configurando varios encabezados HTTP.
- **CORS:** Middleware que habilita el acceso a recursos desde diferentes dominios.
- **cookie-parser:** Middleware para manejar cookies en las solicitudes HTTP.
- **express-validator:** Middleware que proporciona validación de datos en las solicitudes.

## Estructura del Proyecto

La estructura del proyecto está organizada en dos carpetas principales: `frontend` y `backend`, cada una con su propio conjunto de archivos y directorios para facilitar el mantenimiento y la escalabilidad.

```plaintext
meli-search-component/
│
├── backend/
│   ├── src/
│   │   ├── api/               # Definición de rutas y controladores
│   │   ├── bin/               # Scripts de inicialización de la aplicación
│   │   ├── consts/            # Constantes globales de la aplicación
│   │   ├── contracts/         # Interfaces y tipos compartidos
│   │   ├── controllers/       # Controladores para manejar la lógica de cada ruta
│   │   ├── core/              # Módulos centrales de la aplicación
│   │   ├── errors/            # Gestión y definición de errores personalizados
│   │   ├── middlewares/       # Middlewares personalizados
│   │   ├── utils/             # Utilidades y funciones auxiliares
│   │   └── main.ts            # Archivo principal para iniciar la aplicación
│   ├── .commitlintrc.json     # Configuración para linting de mensajes de commit
│   ├── .env                   # Variables de entorno
│   ├── .eslintignore          # Archivos ignorados por ESLint
│   ├── .eslintrc.json         # Configuración de ESLint
│   ├── .swcrc                 # Configuración de SWC
│   ├── commitlint.config.js   # Configuración adicional para linting de commits
│   ├── package.json           # Dependencias y scripts del backend
│   ├── tsconfig.json          # Configuración de TypeScript
│   └── package-lock.json      # Información de bloqueo de dependencias
│
└── frontend/
    ├── public/                # Archivos públicos accesibles en la raíz del proyecto
    ├── src/
    │   ├── assets/            # Archivos estáticos como imágenes y logos
    │   ├── components/        # Componentes reutilizables de la UI
    │   ├── config/            # Configuraciones específicas del frontend
    │   ├── consts/            # Constantes globales del frontend
    │   ├── contracts/         # Interfaces y tipos compartidos
    │   ├── layouts/           # Componentes de layout para las páginas
    │   ├── modules/           # Módulos específicos de funcionalidad
    │   ├── routes/            # Configuración de rutas y navegación
    │   ├── services/          # Módulos para interactuar con APIs o servicios externos
    │   ├── store/             # Estado global de la aplicación, manejado con Zustand
    │   ├── styles/            # Archivos SCSS para los estilos globales
    │   ├── utils/             # Utilidades y helpers generales
    │   ├── App.scss           # Estilos principales de la aplicación
    │   ├── App.tsx            # Componente principal de la aplicación
    │   └── main.tsx           # Punto de entrada del frontend
    ├── .eslintrc.cjs          # Configuración de ESLint para el frontend
    ├── .prettierrc            # Configuración de Prettier
    ├── .env                   # Variables de entorno para el frontend
    ├── eslint.config.js       # Configuración adicional de ESLint
    ├── vite-env.d.ts          # Declaraciones de tipos específicos para Vite
    ├── package.json           # Dependencias y scripts del frontend
    ├── package-lock.json      # Información de bloqueo de dependencias
    └── tsconfig.json          # Configuración de TypeScript para el frontend

```

## Instalación y Configuración Local

Para levantar la aplicación de forma local, sigue estos pasos:

### Backend

1. **Instalación de Dependencias:**
   - Navega a la carpeta del backend:
     ```bash
     cd backend
     ```
   - Instala las dependencias del backend:
     ```bash
     npm install
     ```

2. **Agregar Variables de Entorno:**
   - Crea un archivo `.env` en la carpeta del backend y agrega las variables de entorno necesarias. Aquí tienes un ejemplo de cómo podría verse tu archivo `.env`:
     ```env
     DEBUG = 'backend-meli-search-page:*'
     PORT = '8000'
     NODE_ENV = 'dev'
     BASE_URL = 'https://api.mercadolibre.com/'
     ```

3. **Ejecutar la Aplicación:**
   - Una vez que todas las dependencias estén instaladas y las variables de entorno configuradas, ejecuta el siguiente comando para iniciar la aplicación en modo desarrollo:
     ```bash
     npm run dev
     ```

### Frontend

1. **Instalación de Dependencias:**
   - Navega a la carpeta del frontend:
     ```bash
     cd frontend
     ```
   - Instala las dependencias del frontend:
     ```bash
     npm install
     ```

2. **Agregar Variables de Entorno:**
   - Crea un archivo `.env` en la carpeta del frontend y agrega las variables de entorno necesarias. Aquí tienes un ejemplo de cómo podría verse tu archivo `.env`:
     ```env
     VITE_API_BASE_URL ='http://localhost:8000/api'
     ```

3. **Ejecutar la Aplicación:**
   - Una vez que todas las dependencias estén instaladas y las variables de entorno configuradas, ejecuta el siguiente comando para iniciar la aplicación en modo desarrollo:
     ```bash
     npm run dev
     ```

Una vez llevados a cabo todos estos pasos, debería levantarse el frontend en la url http://localhost:5173/ y podrás probar las funcionalidades.

Developed By @LuisFJjojoa
