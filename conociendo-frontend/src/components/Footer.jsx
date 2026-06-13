// =====================================================
// Archivo: Footer.jsx
// Proyecto: Conociendo.com - Frontend React
// Evidencia: GA7-220501096-AA4-EV03
// =====================================================

import { Link } from 'react-router-dom'

function Footer() {
  const anio = new Date().getFullYear()

  return (
    <footer className="bg-dark text-white py-5 mt-5">
      <div className="container">
        <div className="row g-4">

          <div className="col-md-4">
            <h5 className="text-warning fw-bold mb-3">Conociendo.com</h5>
            <p className="text-muted small">
              Tu guía de viajes en Colombia. Descubre destinos increíbles
              y crea experiencias inolvidables con nosotros.
            </p>
          </div>

          <div className="col-md-4">
            <h5 className="text-warning fw-bold mb-3">Enlaces rápidos</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/" className="text-white-50 text-decoration-none">
                  Inicio
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/destinos" className="text-white-50 text-decoration-none">
                  Destinos
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/promociones" className="text-white-50 text-decoration-none">
                  Promociones
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/registro" className="text-white-50 text-decoration-none">
                  Registrarse
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-md-4">
            <h5 className="text-warning fw-bold mb-3">Proyecto Formativo</h5>
            <p className="text-muted small mb-1">
              Programa: Análisis y Desarrollo de Software
            </p>
            <p className="text-muted small mb-1">
              Aprendiz: Nancy Mosquera
            </p>
            <p className="text-muted small mb-1">
              Institución: SENA
            </p>
            <p className="text-muted small">
              Evidencia: GA7-220501096-AA4-EV03
            </p>
          </div>

        </div>
        <hr className="border-secondary my-4" />
        <p className="text-center text-muted small mb-0">
          © {anio} Conociendo.com — Proyecto Formativo SENA
        </p>
      </div>
    </footer>
  )
}

export default Footer