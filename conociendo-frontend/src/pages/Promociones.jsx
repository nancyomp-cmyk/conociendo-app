// =====================================================
// Archivo: Promociones.jsx
// Proyecto: Conociendo.com - Frontend React
// Descripcion: Pagina de promociones y ofertas especiales
// Evidencia: GA7-220501096-AA4-EV03
// =====================================================

import { Link } from 'react-router-dom'

// Datos de promociones definidos directamente en el componente
const PROMOCIONES = [
  {
    id: 1,
    titulo: "Escapada a Cartagena",
    descripcion: "3 noches en hotel 4 estrellas + tours por la Ciudad Amurallada + traslados incluidos desde el aeropuerto.",
    precio: "desde $1.200.000",
    descuento: "30% OFF",
    vigencia: "Hasta 31 Dic 2026",
    imagen: "https://images.unsplash.com/photo-1583997052301-de2c88e5e67a?w=600&h=400&fit=crop"
  },
  {
    id: 2,
    titulo: "Aventura Eje Cafetero",
    descripcion: "4 noches en finca cafetera + desayunos diarios + tour al Valle del Cocora + degustación de café.",
    precio: "desde $890.000",
    descuento: "25% OFF",
    vigencia: "Hasta 28 Feb 2027",
    imagen: "https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?w=600&h=400&fit=crop"
  },
  {
    id: 3,
    titulo: "San Andrés Todo Incluido",
    descripcion: "5 noches en resort frente al mar + vuelos ida y vuelta + actividades acuáticas ilimitadas.",
    precio: "desde $2.100.000",
    descuento: "20% OFF",
    vigencia: "Hasta 15 Mar 2027",
    imagen: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&h=400&fit=crop"
  },
  {
    id: 4,
    titulo: "Bogotá Cultural",
    descripcion: "2 noches en hotel boutique + entrada a 5 museos + tour gastronómico por La Candelaria.",
    precio: "desde $560.000",
    descuento: "15% OFF",
    vigencia: "Hasta 30 Jun 2026",
    imagen: "https://images.unsplash.com/photo-1582466695090-2a26b8a70e84?w=600&h=400&fit=crop"
  },
  {
    id: 5,
    titulo: "Medellín Innovadora",
    descripcion: "3 noches + tour en metrocable + visita a Guatapé + experiencia de realidad virtual.",
    precio: "desde $720.000",
    descuento: "18% OFF",
    vigencia: "Hasta 31 Ago 2026",
    imagen: "https://images.unsplash.com/photo-1599946347371-68eb71b16afc?w=600&h=400&fit=crop"
  },
  {
    id: 6,
    titulo: "Caño Cristales Mágico",
    descripcion: "4 noches + vuelos + guía especializado + tours por el río de los cinco colores.",
    precio: "desde $1.850.000",
    descuento: "10% OFF",
    vigencia: "Hasta 30 Nov 2026",
    imagen: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=600&h=400&fit=crop"
  }
]

function Promociones() {
  return (
    <div>

      {/* ===== BANNER ===== */}
      <header
        className="text-white text-center"
        style={{
          background: 'linear-gradient(rgba(0,0,0,0.6),rgba(0,0,0,0.6)), url(https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1600&fit=crop)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '45vh',
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <div className="container py-5">
          <p className="text-warning fw-bold mb-2" style={{ fontSize: '1rem', letterSpacing: '3px' }}>
            OFERTAS ESPECIALES
          </p>
          <h1 className="display-3 fw-bold mb-3">Promociones</h1>
          <p className="lead fs-4 mb-0">
            Las mejores ofertas para tu próximo viaje por Colombia
          </p>
        </div>
      </header>

      {/* ===== ALERTA URGENCIA ===== */}
      <div className="bg-danger text-white text-center py-3">
        <div className="container">
          <strong>Ofertas por tiempo limitado.</strong> Reserva ahora antes de que se agoten los cupos disponibles.
        </div>
      </div>

      <div className="container py-5">

        {/* ===== TARJETAS DE PROMOCIONES ===== */}
        <div className="row g-4 mb-5">
          {PROMOCIONES.map(p => (
            <div className="col-md-6 col-lg-4" key={p.id}>
              <div className="card border-0 shadow-sm h-100 overflow-hidden">

                {/* Imagen con badge */}
                <div className="position-relative">
                  <img
                    src={p.imagen}
                    alt={p.titulo}
                    className="card-img-top"
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                  <span
                    className="badge bg-danger position-absolute top-0 end-0 m-3 fs-6 px-3 py-2"
                    style={{ borderRadius: '20px' }}
                  >
                    {p.descuento}
                  </span>
                </div>

                {/* Contenido */}
                <div className="card-body p-4 d-flex flex-column">
                  <h5 className="fw-bold mb-2">{p.titulo}</h5>
                  <p className="text-muted small mb-3 flex-grow-1">{p.descripcion}</p>

                  <div className="border-top pt-3 mt-auto">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <span className="text-success fw-bold fs-5">{p.precio}</span>
                      <small className="text-muted">
                        Hasta: {p.vigencia}
                      </small>
                    </div>
                    <Link to="/destinos" className="btn btn-primary w-100 fw-bold">
                      Reservar ahora
                    </Link>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* ===== SECCION EXTRA ===== */}
        <div className="row g-4">

          {/* Grupos */}
          <div className="col-md-6">
            <div className="card border-0 h-100 text-white p-4"
              style={{ background: 'linear-gradient(135deg, #1a73e8, #0d47a1)' }}>
              <div style={{ fontSize: '2.5rem' }} className="mb-3">🏢</div>
              <h4 className="fw-bold mb-3">Grupos y Empresas</h4>
              <p className="mb-4" style={{ opacity: 0.9 }}>
                ¿Planeas un viaje corporativo o familiar para más de 10 personas?
                Obten descuentos especiales y servicio personalizado.
              </p>
              <Link to="/registro" className="btn btn-light fw-bold align-self-start px-4">
                Solicitar cotización
              </Link>
            </div>
          </div>

          {/* Newsletter */}
          <div className="col-md-6">
            <div className="card border-0 h-100 p-4"
              style={{ background: 'linear-gradient(135deg, #f6d365, #fda085)' }}>
              <div style={{ fontSize: '2.5rem' }} className="mb-3">📧</div>
              <h4 className="fw-bold mb-3">Alertas de Ofertas</h4>
              <p className="mb-4">
                Suscríbete y recibe las mejores promociones en tu correo
                antes que nadie. ¡Gratis!
              </p>
              <div className="input-group">
                <input
                  type="email"
                  className="form-control border-0 shadow-sm"
                  placeholder="tu@correo.com"
                />
                <button className="btn btn-dark fw-bold">
                  Suscribirme
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Promociones