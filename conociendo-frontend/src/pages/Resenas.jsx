// =====================================================
// Archivo: Resenas.jsx
// Proyecto: Conociendo.com - Frontend React
// Descripcion: Resenas y calificaciones de viajeros
// Evidencia: GA7-220501096-AA4-EV03
// =====================================================

import { useState } from 'react'

// Datos iniciales de reseñas
const RESENAS_INICIALES = [
  {
    id: 1,
    nombre: 'Carlos Rodríguez',
    ciudad: 'Bogotá',
    destino: 'Cartagena de Indias',
    calificacion: 5,
    comentario: 'Experiencia increíble. La Ciudad Amurallada superó todas mis expectativas. Las calles coloridas, la gastronomía y el ambiente nocturno son espectaculares. Definitivamente volvería.',
    fecha: 'Marzo 2026'
  },
  {
    id: 2,
    nombre: 'María González',
    ciudad: 'Medellín',
    destino: 'Parque Nacional Tayrona',
    calificacion: 5,
    comentario: 'El Tayrona es un paraíso en la tierra. Playas cristalinas rodeadas de selva tropical. El senderismo hasta Cabo San Juan es agotador pero vale cada paso. Conociendo.com hizo todo perfecto.',
    fecha: 'Abril 2026'
  },
  {
    id: 3,
    nombre: 'Andrés Martínez',
    ciudad: 'Cali',
    destino: 'Valle del Cocora',
    calificacion: 4,
    comentario: 'Las palmas de cera son majestuosas. El paisaje entre la niebla es algo que nunca olvidaré. El proceso de reserva en la plataforma fue muy sencillo y el precio muy justo.',
    fecha: 'Mayo 2026'
  },
  {
    id: 4,
    nombre: 'Laura Sánchez',
    ciudad: 'Barranquilla',
    destino: 'San Andrés Isla',
    calificacion: 5,
    comentario: 'San Andrés es el caribe colombiano en su máxima expresión. El Mar de los Siete Colores es real, no exagerado. El snorkel en el arrecife fue la mejor actividad de mi vida.',
    fecha: 'Mayo 2026'
  },
  {
    id: 5,
    nombre: 'Diego Vargas',
    ciudad: 'Pereira',
    destino: 'Caño Cristales',
    calificacion: 5,
    comentario: 'Ver Caño Cristales es una experiencia única en el mundo. Los colores del río son alucinantes. Es un poco costoso llegar pero vale absolutamente cada peso invertido.',
    fecha: 'Abril 2026'
  },
  {
    id: 6,
    nombre: 'Sofía Herrera',
    ciudad: 'Manizales',
    destino: 'Medellín',
    calificacion: 4,
    comentario: 'Medellín me sorprendió positivamente. La transformación de la ciudad es impresionante. El metrocable, los murales de las comunas y la gastronomía son imperdibles.',
    fecha: 'Junio 2026'
  }
]

function Resenas() {
  const [resenas, setResenas]       = useState(RESENAS_INICIALES)
  const [nombre, setNombre]         = useState('')
  const [destino, setDestino]       = useState('')
  const [ciudad, setCiudad]         = useState('')
  const [comentario, setComentario] = useState('')
  const [calificacion, setCalif]    = useState(5)
  const [enviado, setEnviado]       = useState(false)

  // Calcular promedio de calificaciones
  const promedio = (resenas.reduce((a, r) => a + r.calificacion, 0) / resenas.length).toFixed(1)

  const handleEnviar = (e) => {
    e.preventDefault()
    const nueva = {
      id: Date.now(),
      nombre,
      ciudad: ciudad || 'Colombia',
      destino,
      calificacion,
      comentario,
      fecha: 'Junio 2026'
    }
    setResenas([nueva, ...resenas])
    setEnviado(true)
    setNombre('')
    setDestino('')
    setCiudad('')
    setComentario('')
    setCalif(5)
    setTimeout(() => setEnviado(false), 4000)
  }

  const estrellas = (n) => '⭐'.repeat(n)

  return (
    <div>

      {/* ===== BANNER ===== */}
      <header
        className="text-white text-center"
        style={{
          background: 'linear-gradient(rgba(0,0,0,0.6),rgba(0,0,0,0.6)), url(https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1600&fit=crop)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '40vh',
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <div className="container py-5">
          <h1 className="display-3 fw-bold mb-3">Reseñas</h1>
          <p className="lead fs-4">
            Experiencias reales de nuestros viajeros colombianos
          </p>
        </div>
      </header>

      <div className="container py-5">

        {/* ===== ESTADÍSTICAS ===== */}
        <div className="row g-4 mb-5 text-center">
          <div className="col-md-4">
            <div className="card border-0 shadow-sm p-4">
              <div className="fw-bold text-warning" style={{ fontSize: '3.5rem' }}>
                {promedio}
              </div>
              <div className="text-warning mb-2" style={{ fontSize: '1.5rem' }}>
                {estrellas(Math.round(parseFloat(promedio)))}
              </div>
              <p className="text-muted fw-bold mb-0">Calificación promedio</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card border-0 shadow-sm p-4">
              <div className="fw-bold text-primary" style={{ fontSize: '3.5rem' }}>
                {resenas.length}
              </div>
              <p className="text-muted fw-bold mt-2 mb-0">Reseñas publicadas</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card border-0 shadow-sm p-4">
              <div className="fw-bold text-success" style={{ fontSize: '3.5rem' }}>
                98%
              </div>
              <p className="text-muted fw-bold mt-2 mb-0">Viajeros satisfechos</p>
            </div>
          </div>
        </div>

        {/* ===== CONTENIDO PRINCIPAL ===== */}
        <div className="row g-5">

          {/* LISTA DE RESEÑAS */}
          <div className="col-lg-7">
            <h4 className="fw-bold mb-4">
              Lo que dicen nuestros viajeros
              <span className="badge bg-primary ms-2 fs-6">{resenas.length}</span>
            </h4>

            {resenas.map(r => (
              <div key={r.id} className="card border-0 shadow-sm mb-4 p-4">
                <div className="d-flex justify-content-between align-items-start mb-3">

                  {/* Avatar + nombre */}
                  <div className="d-flex align-items-center gap-3">
                    <div
                      className="text-white rounded-circle d-flex align-items-center justify-content-center fw-bold flex-shrink-0"
                      style={{
                        width: '50px', height: '50px', fontSize: '1.3rem',
                        background: 'linear-gradient(135deg, #1a73e8, #0d47a1)'
                      }}
                    >
                      {r.nombre.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h6 className="fw-bold mb-0">{r.nombre}</h6>
                      <small className="text-muted">
                        {r.ciudad} — visitó {r.destino}
                      </small>
                    </div>
                  </div>

                  {/* Estrellas y fecha */}
                  <div className="text-end flex-shrink-0 ms-2">
                    <div style={{ fontSize: '1rem' }}>{estrellas(r.calificacion)}</div>
                    <small className="text-muted">{r.fecha}</small>
                  </div>
                </div>

                {/* Comentario */}
                <p className="text-muted fst-italic mb-0">
                  "{r.comentario}"
                </p>
              </div>
            ))}
          </div>

          {/* FORMULARIO */}
          <div className="col-lg-5">
            <div
              className="card border-0 shadow p-4 sticky-top"
              style={{ top: '80px' }}
            >
              <h5 className="fw-bold mb-4">Deja tu reseña</h5>

              {enviado && (
                <div className="alert alert-success d-flex align-items-center gap-2">
                  <span>✅</span>
                  <div>
                    <strong>¡Gracias!</strong> Tu reseña fue publicada.
                  </div>
                </div>
              )}

              <form onSubmit={handleEnviar}>

                <div className="mb-3">
                  <label className="form-label fw-bold small text-muted">
                    TU NOMBRE *
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Ej: Carlos Rodríguez"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-bold small text-muted">
                    TU CIUDAD
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Ej: Bogotá"
                    value={ciudad}
                    onChange={(e) => setCiudad(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-bold small text-muted">
                    DESTINO VISITADO *
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Ej: Cartagena de Indias"
                    value={destino}
                    onChange={(e) => setDestino(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-bold small text-muted">
                    CALIFICACIÓN *
                  </label>
                  <div className="d-flex align-items-center gap-2 flex-wrap">
                    {[1, 2, 3, 4, 5].map(n => (
                      <button
                        key={n}
                        type="button"
                        className={`btn btn-sm px-3 ${calificacion >= n ? 'btn-warning' : 'btn-outline-secondary'}`}
                        onClick={() => setCalif(n)}
                      >
                        ⭐
                      </button>
                    ))}
                    <span className="fw-bold text-warning ms-1">
                      {calificacion}/5
                    </span>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="form-label fw-bold small text-muted">
                    TU COMENTARIO *
                  </label>
                  <textarea
                    className="form-control"
                    rows="5"
                    placeholder="Cuéntanos cómo fue tu experiencia en el destino. Tu opinión ayuda a otros viajeros."
                    value={comentario}
                    onChange={(e) => setComentario(e.target.value)}
                    required
                  />
                  <small className="text-muted">{comentario.length}/500 caracteres</small>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100 fw-bold py-2"
                >
                  Publicar mi reseña
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Resenas