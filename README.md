# 🌍 Conociendo.com

Plataforma turística web colombiana desarrollada como proyecto formativo SENA.

## 📋 Información del Proyecto

| Campo | Detalle |
|-------|---------|
| **Programa** | Tecnología en Análisis y Desarrollo de Software |
| **Institución** | SENA |
| **Aprendiz** | Nancy Oliva Mosquera Palacios |
| **Instructor** | Ing. Fabián García Martínez |


---

## 🏗️ Arquitectura del Proyecto

conociendo-app/

├── conociendo-api/        ← Backend Laravel 11 (API REST)

└── conociendo-frontend/   ← Frontend React 18 + Vite

---

## 🛠️ Tecnologías Utilizadas

### Backend
- PHP 8.2
- Laravel 11
- MySQL 8.4 (Laragon)
- Eloquent ORM

### Frontend
- React 18
- Vite
- React Router DOM 6
- Bootstrap 5
- Axios

---

## 📦 Módulos Desarrollados

### Backend API REST
| Módulo | Endpoints |
|--------|-----------|
| Autenticación | POST /registro, POST /login, GET /estado |
| Destinos | GET, GET /{id}, POST, PUT /{id}, DELETE /{id} |
| Reservas | GET, GET /{id}, GET /usuario/{email}, POST, PUT /{id}/estado, DELETE /{id} |

### Frontend React
| Página | Ruta |
|--------|------|
| Inicio | / |
| Destinos | /destinos |
| Detalle Destino | /destinos/:id |
| Promociones | /promociones |
| Fidelidad | /fidelidad |
| Reseñas | /resenas |
| Login | /login |
| Registro | /registro |
| Mis Reservas | /mis-reservas |

---

## ⚙️ Instalación y Configuración

### Requisitos previos
- PHP 8.2+
- Composer 2.x
- Node.js 18+
- MySQL 8.x (Laragon)

### Backend (Laravel)

```bash
# 1. Entrar a la carpeta del backend
cd conociendo-api

# 2. Instalar dependencias PHP
composer install

# 3. Copiar archivo de configuración
cp .env.example .env

# 4. Configurar la base de datos en .env
DB_DATABASE=conociendo_db_laravel
DB_USERNAME=root
DB_PASSWORD=

# 5. Generar clave de aplicación
php artisan key:generate

# 6. Crear tablas en la base de datos
php artisan migrate

# 7. Insertar datos de prueba
php artisan db:seed

# 8. Iniciar el servidor
php artisan serve
```

El API estará disponible en: `http://localhost:8000/api`

### Frontend (React)

```bash
# 1. Entrar a la carpeta del frontend
cd conociendo-frontend

# 2. Instalar dependencias
npm install

# 3. Iniciar el servidor de desarrollo
npm run dev
```

El frontend estará disponible en: `http://localhost:5173`

---

## 🧪 Pruebas del API

GET  http://localhost:8000/api/auth/estado

POST http://localhost:8000/api/auth/registro

POST http://localhost:8000/api/auth/login

GET  http://localhost:8000/api/destinos

POST http://localhost:8000/api/reservas

---

## 📁 Estructura del Backend
conociendo-api/

├── app/

│   ├── Http/Controllers/Api/

│   │   ├── AuthController.php

│   │   ├── DestinoController.php

│   │   └── ReservaController.php

│   └── Models/

│       ├── Usuario.php

│       ├── Destino.php

│       └── Reserva.php

├── database/

│   ├── migrations/

│   └── seeders/

└── routes/

└── api.php

---

## 📁 Estructura del Frontend

conociendo-frontend/

├── src/

│   ├── components/

│   │   ├── Navbar.jsx

│   │   ├── Footer.jsx

│   │   └── DestinoCard.jsx

│   ├── pages/

│   │   ├── Home.jsx

│   │   ├── Destinos.jsx

│   │   ├── Promociones.jsx

│   │   ├── Fidelidad.jsx

│   │   ├── Resenas.jsx

│   │   ├── Login.jsx

│   │   ├── Registro.jsx

│   │   └── MisReservas.jsx

│   ├── services/

│   │   └── api.js

│   └── data/

│       └── mockData.js

└── public/

---

## 👩‍💻 Autora

**Nancy Oliva Mosquera Palacios**
Aprendiz SENA — Tecnología en Análisis y Desarrollo de Software
Medellín, Colombia — 2026