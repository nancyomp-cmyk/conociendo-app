// =====================================================
// Archivo: Home.jsx
// Proyecto: Conociendo.com - Frontend React
// Descripcion: Pagina de inicio con datos estaticos
// Evidencia: GA7-220501096-AA4-EV03
// =====================================================

import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import DestinoCard from '../components/DestinoCard'
import { destinos, resenas } from '../data/mockData'

function Home() {
  const [busqueda, setBusqueda] = useState('')
  const navigate = useNavigate()

  const handleBuscar = (e) => {
    e.preventDefault()
    navigate(`/destinos?busqueda=${busqueda}`)
  }

  // Mostrar solo 6 destinos en el inicio
  const destinosDestacados = destinos.slice(0, 6)

  return (
    <div>
      {/* ===== HERO ===== */}
      <header
        className="text-white text-center"
        style={{
          background: 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1600&q=80&fit=crop)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '85vh',
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <div className="container py-5">
          <h1 className="display-3 fw-bold mb-3">
            Descubre Colombia 🇨🇴
          </h1>
          <p className="lead fs-4 mb-5">
            Encuentra los destinos más increíbles y crea experiencias que duran toda la vida
          </p>

          {/* Buscador */}
          <form onSubmit={handleBuscar} className="row justify-content-center">
            <div className="col-md-6">
              <div className="input-group input-group-lg shadow-lg">
                <input
                  type="text"
                  className="form-control border-0 py-3"
                  placeholder="¿A dónde quieres ir?"
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                />
                <button className="btn btn-warning fw-bold px-4" type="submit">
                  🔍 Buscar
                </button>
              </div>
            </div>
          </form>

          {/* Estadisticas */}
          <div className="row justify-content-center mt-5 g-4">
            {[
              { num: `${destinos.length}+`, label: 'Destinos' },
              { num: '5★',  label: 'Calificación' },
              { num: '24/7', label: 'Soporte' },
              { num: '100%', label: 'Seguro' },
            ].map((s) => (
              <div className="col-6 col-md-2" key={s.label}>
                <div className="bg-white bg-opacity-10 rounded-3 p-3">
                  <h3 className="fw-bold mb-0">{s.num}</h3>
                  <small>{s.label}</small>
                </div>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* ===== CATEGORIAS ===== */}
      <section className="py-5 bg-light">
        <div className="container">
          <h2 className="text-center fw-bold mb-4">Explora por Categoría</h2>
          <div className="row g-3 justify-content-center">
            {[
              { nombre: 'Playa',      emoji: '🏖️', cat: 'PLAYA',      color: 'info' },
              { nombre: 'Aventura',   emoji: '🧗',  cat: 'AVENTURA',   color: 'danger' },
              { nombre: 'Ciudad',     emoji: '🏙️', cat: 'CIUDAD',     color: 'warning' },
              { nombre: 'Cultural',   emoji: '🏛️', cat: 'CULTURAL',   color: 'primary' },
              { nombre: 'Ecoturismo', emoji: '🌿', cat: 'ECOTURISMO', color: 'success' },
            ].map((c) => (
              <div className="col-6 col-md-2" key={c.cat}>
                <Link to={`/destinos?categoria=${c.cat}`} className="text-decoration-none">
                  <div className={`card border-0 shadow-sm text-center p-3 h-100 border-top border-3 border-${c.color}`}>
                    <div style={{ fontSize: '2.5rem' }}>{c.emoji}</div>
                    <small className="fw-bold text-dark mt-2">{c.nombre}</small>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== DESTINOS DESTACADOS ===== */}
      <section className="py-5">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h2 className="fw-bold mb-1">✨ Destinos Destacados</h2>
              <p className="text-muted mb-0">Los lugares más visitados de Colombia</p>
            </div>
            <Link to="/destinos" className="btn btn-outline-primary fw-bold">
              Ver todos →
            </Link>
          </div>
          <div className="row row-cols-1 row-cols-md-3 g-4">
            {destinosDestacados.map(d => (
              <div className="col" key={d.id}>
                <DestinoCard destino={d} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PROMOCIONES BANNER ===== */}
      <section className="py-5 bg-primary text-white">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-8">
              <h2 className="fw-bold mb-2">🎉 Ofertas Especiales</h2>
              <p className="lead mb-0">
                Descuentos de hasta el 30% en destinos seleccionados.
                ¡Reserva hoy y ahorra!
              </p>
            </div>
            <div className="col-md-4 text-md-end mt-3 mt-md-0">
              <Link to="/promociones" className="btn btn-warning btn-lg fw-bold px-4">
                Ver Promociones →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== RESEÑAS ===== */}
      <section className="py-5 bg-light">
        <div className="container">
          <h2 className="text-center fw-bold mb-2">💬 Lo que dicen nuestros viajeros</h2>
          <p className="text-center text-muted mb-5">Opiniones reales de personas que ya viajaron con nosotros</p>
          <div className="row g-4">
            {resenas.map(r => (
              <div className="col-md-4" key={r.id}>
                <div className="card border-0 shadow-sm h-100 p-4">
                  <div className="text-warning mb-2">
                    {'⭐'.repeat(r.calificacion)}
                  </div>
                  <p className="fst-italic text-muted mb-3">"{r.comentario}"</p>
                  <div className="mt-auto">
                    <strong>{r.nombre}</strong>
                    <br />
                    <small className="text-muted">📍 {r.ciudad} — {r.destino}</small>
                    <br />
                    <small className="text-muted">{r.fecha}</small>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-4">
            <Link to="/resenas" className="btn btn-outline-primary">
              Ver todas las reseñas →
            </Link>
          </div>
        </div>
      </section>

      {/* ===== CTA FINAL ===== */}
      <section
        className="py-5 text-white text-center"
        style={{
          background: 'linear-gradient(135deg, #1a73e8, #0d47a1)'
        }}
      >
        <div className="container">
          <h2 className="fw-bold mb-3">¿Listo para tu próxima aventura?</h2>
          <p className="lead mb-4">
            Únete a miles de viajeros que ya descubrieron Colombia con Conociendo.com
          </p>
          <Link to="/registro" className="btn btn-warning btn-lg fw-bold me-3 px-4">
            Crear Cuenta Gratis
          </Link>
          <Link to="/destinos" className="btn btn-outline-light btn-lg px-4">
            Explorar Destinos
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Home