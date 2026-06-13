// =====================================================
// Archivo: DestinoDetalle.jsx
// Proyecto: Conociendo.com - Frontend React
// Descripcion: Detalle de destino con datos estaticos
// Evidencia: GA7-220501096-AA4-EV03
// =====================================================

import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { destinos } from '../data/mockData'

function DestinoDetalle() {
  const { id } = useParams()
  const navigate = useNavigate()

  // Buscar el destino en los datos estaticos
  const destino = destinos.find(d => d.id === parseInt(id))

  const [fechaViaje, setFecha]   = useState('')
  const [personas, setPersonas]  = useState(1)
  const [obs, setObs]            = useState('')
  const [reservado, setReservado] = useState(false)

  const usuario = JSON.parse(localStorage.getItem('usuario') || 'null')

  const formatPrecio = (v) => new Intl.NumberFormat('es-CO', {
    style: 'currency', currency: 'COP', minimumFractionDigits: 0
  }).format(v)

  const hacerReserva = (e) => {
    e.preventDefault()
    if (!usuario) { navigate('/login'); return }
    setReservado(true)
  }

  const fechaMin = new Date()
  fechaMin.setDate(fechaMin.getDate() + 1)
  const fechaMinStr = fechaMin.toISOString().split('T')[0]

  if (!destino) return (
    <div className="container py-5 text-center">
      <h3>Destino no encontrado</h3>
      <Link to="/destinos" className="btn btn-primary mt-3">← Volver</Link>
    </div>
  )

  return (
    <div className="container py-5">
      <Link to="/destinos" className="btn btn-outline-secondary mb-4">
        ← Volver a destinos
      </Link>

      <div className="row g-4">
        <div className="col-lg-8">
          <div className="card border-0 shadow-sm rounded-3 overflow-hidden">
            <img src={destino.imagenUrl} alt={destino.nombre}
              className="card-img-top" style={{ height: '380px', objectFit: 'cover' }} />
            <div className="card-body p-4">
              <span className="badge bg-primary mb-2">{destino.categoria}</span>
              <h1 className="fw-bold">{destino.nombre}</h1>
              <p className="text-muted fs-5 mb-3">📍 {destino.ciudad}, {destino.pais}</p>
              <hr />
              <h5 className="fw-bold">Sobre este destino</h5>
              <p className="lead">{destino.descripcion}</p>
              <div className="bg-light rounded-3 p-3 mt-3">
                <span className="text-success fw-bold fs-3">{formatPrecio(destino.precio)}</span>
                <span className="text-muted ms-2">por persona</span>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="card border-0 shadow rounded-3 p-4 sticky-top" style={{ top: '80px' }}>
            <h4 className="fw-bold mb-3">📅 Reservar</h4>

            {reservado ? (
              <div className="alert alert-success text-center">
                <h5>✅ ¡Reserva enviada!</h5>
                <p className="small mb-3">Tu solicitud fue registrada correctamente.</p>
                <Link to="/mis-reservas" className="btn btn-success btn-sm">
                  Ver mis reservas
                </Link>
              </div>
            ) : !usuario ? (
              <div className="text-center">
                <p className="text-muted">Inicia sesión para hacer tu reserva.</p>
                <Link to="/login" className="btn btn-primary w-100 mb-2">Iniciar Sesión</Link>
                <Link to="/registro" className="btn btn-outline-primary w-100">Crear Cuenta</Link>
              </div>
            ) : (
              <form onSubmit={hacerReserva}>
                <p className="text-primary fw-bold small mb-3">👤 {usuario.nombre}</p>
                <div className="mb-3">
                  <label className="form-label fw-bold small">📅 Fecha de viaje *</label>
                  <input type="date" className="form-control" min={fechaMinStr}
                    value={fechaViaje} onChange={(e) => setFecha(e.target.value)} required />
                </div>
                <div className="mb-3">
                  <label className="form-label fw-bold small">👥 Personas *</label>
                  <input type="number" className="form-control" min="1" max="20"
                    value={personas} onChange={(e) => setPersonas(e.target.value)} required />
                </div>
                <div className="bg-light rounded p-3 mb-3">
                  <div className="d-flex justify-content-between fw-bold text-success fs-5">
                    <span>Total:</span>
                    <span>{formatPrecio(destino.precio * personas)}</span>
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label fw-bold small">💬 Observaciones</label>
                  <textarea className="form-control" rows="2"
                    value={obs} onChange={(e) => setObs(e.target.value)}
                    placeholder="Requerimientos especiales..." />
                </div>
                <button type="submit" className="btn btn-primary w-100 fw-bold">
                  ✅ Confirmar Reserva
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default DestinoDetalle