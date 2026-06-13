// =====================================================
// Archivo: main.jsx
// Proyecto: Conociendo.com - Frontend React
// Descripcion: Punto de entrada de la aplicacion React
// Evidencia: GA7-220501096-AA4-EV03
// =====================================================

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// Importar Bootstrap para estilos globales
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

import App from './App.jsx'

// Montar la aplicacion React en el elemento con id="root" del index.html
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)