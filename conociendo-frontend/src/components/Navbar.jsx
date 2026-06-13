// =====================================================
// Archivo: Navbar.jsx
// Proyecto: Conociendo.com - Frontend React
// Descripcion: Barra de navegacion con todos los enlaces
// Evidencia: GA7-220501096-AA4-EV03
// =====================================================

import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'

function Navbar() {
  const location = useLocation()
  const [menuAbierto, setMenuAbierto] = useState(false)

  const usuarioGuardado = localStorage.getItem('usuario')
  const usuario = usuarioGuardado ? JSON.parse(usuarioGuardado) : null

  // Verificar si el link esta activo para resaltarlo
  const esActivo = (ruta) => location.pathname === ruta ? 'nav-link active fw-bold' : 'nav-link'

  const cerrarSesion = () => {
    localStorage.removeItem('usuario')
    window.location.href = '/'
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
      <div className="container-fluid px-4">

        {/* Logo */}
        <Link className="navbar-brand fw-bold text-primary fs-4" to="/">
          🌍 Conociendo.com
        </Link>

        {/* Boton hamburguesa */}
        <button
          className="navbar-toggler border-0"
          type="button"
          onClick={() => setMenuAbierto(!menuAbierto)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Menu */}
        <div className={`collapse navbar-collapse ${menuAbierto ? 'show' : ''}`}>
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <Link className={esActivo('/')} to="/" onClick={() => setMenuAbierto(false)}>
                Inicio
              </Link>
            </li>
            <li className="nav-item">
              <Link className={esActivo('/destinos')} to="/destinos" onClick={() => setMenuAbierto(false)}>
                Destinos
              </Link>
            </li>
            <li className="nav-item">
              <Link className={esActivo('/promociones')} to="/promociones" onClick={() => setMenuAbierto(false)}>
                Promociones
              </Link>
            </li>
            <li className="nav-item">
              <Link className={esActivo('/fidelidad')} to="/fidelidad" onClick={() => setMenuAbierto(false)}>
                Fidelidad
              </Link>
            </li>
            <li className="nav-item">
              <Link className={esActivo('/resenas')} to="/resenas" onClick={() => setMenuAbierto(false)}>
                Reseñas
              </Link>
            </li>
            {usuario && (
              <li className="nav-item">
                <Link className={esActivo('/mis-reservas')} to="/mis-reservas" onClick={() => setMenuAbierto(false)}>
                  Mis Reservas
                </Link>
              </li>
            )}
          </ul>

          {/* Botones sesion */}
          <ul className="navbar-nav ms-auto gap-2">
            {usuario ? (
              <>
                <li className="nav-item">
                  <span className="nav-link text-primary fw-bold">
                    👤 {usuario.nombre}
                  </span>
                </li>
                <li className="nav-item">
                  <button className="btn btn-outline-danger btn-sm fw-bold px-3" onClick={cerrarSesion}>
                    Cerrar Sesión
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="btn btn-outline-primary fw-bold px-3" to="/login" onClick={() => setMenuAbierto(false)}>
                    Iniciar sesión
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="btn btn-primary text-white fw-bold px-3" to="/registro" onClick={() => setMenuAbierto(false)}>
                    Registrarse
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar