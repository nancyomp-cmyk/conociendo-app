// =====================================================
// Archivo: MisReservas.jsx
// Proyecto: Conociendo.com - Frontend React
// Descripcion: Pagina con las reservas del usuario
//              autenticado. Permite cancelarlas.
// Evidencia: GA7-220501096-AA4-EV03
// =====================================================

import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { obtenerReservasPorUsuario, cancelarReserva } from '../services/api'

/**
 * Pagina de reservas personales del usuario autenticado.
 * Si no hay sesion iniciada, redirige al login.
 */
function MisReservas() {
  const navigate = useNavigate()

  const [reservas, setReservas]   = useState([])
  const [cargando, setCargando]   = useState(true)
  const [error, setError]         = useState(null)
  const [mensaje, setMensaje]     = useState(null)

  // Obtener usuario autenticado
  const usuarioGuardado = localStorage.getItem('usuario')
  const usuario = usuarioGuardado ? JSON.parse(usuarioGuardado) : null

  // Si no hay usuario, redirigir al login
  useEffect(() => {
    if (!usuario) {
      navigate('/login')
      return
    }

    // Cargar reservas del usuario
    const cargar = async () => {
      try {
        const resp = await obtenerReservasPorUsuario(usuario.email)
        setReservas(resp.data)
      } catch {
        setError('No se pudieron cargar tus reservas.')
      } finally {
        setCargando(false)
      }
    }
    cargar()
  }, [])

  /**
   * Formatea precio como pesos colombianos.
   */
  const formatPrecio = (v) => new Intl.NumberFormat('es-CO', {
    style: 'currency', currency: 'COP', minimumFractionDigits: 0
  }).format(v)

  /**
   * Formatea fecha en formato legible en espanol.
   */
  const formatFecha = (fecha) => {
    if (!fecha) return '-'
    return new Date(fecha + 'T00:00:00').toLocaleDateString('es-CO', {
      year: 'numeric', month: 'long', day: 'numeric'
    })
  }

  /**
   * Cancela una reserva y actualiza la lista.
   */
  const handleCancelar = async (id, codigo) => {
    if (!window.confirm(`¿Estás seguro de cancelar la reserva ${codigo}?`)) return

    try {
      await cancelarReserva(id)
      // Actualizar el estado de la reserva localmente
      setReservas(prev =>
        prev.map(r => r.id === id ? { ...r, estado: 'CANCELADA' } : r)
      )
      setMensaje({ tipo: 'success', texto: `✅ Reserva ${codigo} cancelada.` })
    } catch {
      setMensaje({ tipo: 'danger', texto: '❌ Error al cancelar la reserva.' })
    }
  }

  /**
   * Retorna el color del badge segun el estado de la reserva.
   */
  const colorEstado = (estado) => {
    const colores = {
      'PENDIENTE':  'bg-warning text-dark',
      'CONFIRMADA': 'bg-success',
      'COMPLETADA': 'bg-primary',
      'CANCELADA':  'bg-danger',
    }
    return colores[estado] || 'bg-secondary'
  }

  return (
    <div className="container py-5">

      {/* Encabezado */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="fw-bold mb-1">📅 Mis Reservas</h1>
          {usuario && (
            <p className="text-muted mb-0">
              Hola, <strong>{usuario.nombre}</strong> — aquí están tus reservas
            </p>
          )}
        </div>
        <Link to="/destinos" className="btn btn-primary">
          + Nueva Reserva
        </Link>
      </div>

      {/* Mensaje de operacion */}
      {mensaje && (
        <div className={`alert alert-${mensaje.tipo} alert-dismissible`}>
          {mensaje.texto}
          <button
            type="button"
            className="btn-close"
            onClick={() => setMensaje(null)}
          />
        </div>
      )}

      {/* Indicador de carga */}
      {cargando && (
        <div className="text-center py-5">
          <div className="spinner-border text-primary"></div>
          <p className="mt-2 text-muted">Cargando tus reservas...</p>
        </div>
      )}

      {/* Error */}
      {error && <div className="alert alert-warning">{error}</div>}

      {/* Sin reservas */}
      {!cargando && !error && reservas.length === 0 && (
        <div className="text-center py-5">
          <div style={{ fontSize: '4rem' }}>🗺️</div>
          <h4 className="text-muted mt-3">No tienes reservas aún</h4>
          <p className="text-muted">¡Explora los destinos y haz tu primera reserva!</p>
          <Link to="/destinos" className="btn btn-primary btn-lg">
            Explorar Destinos
          </Link>
        </div>
      )}

      {/* Lista de reservas */}
      {!cargando && !error && reservas.length > 0 && (
        <div className="row g-3">
          {reservas.map(reserva => (
            <div className="col-12" key={reserva.id}>
              <div className="card border-0 shadow-sm rounded-3">
                <div className="card-body">
                  <div className="row align-items-center">

                    {/* Codigo y estado */}
                    <div className="col-md-2">
                      <small className="text-muted d-block">Código</small>
                      <strong className="text-primary">{reserva.codigoReserva}</strong>
                      <br />
                      <span className={`badge ${colorEstado(reserva.estado)} mt-1`}>
                        {reserva.estado}
                      </span>
                    </div>

                    {/* Destino */}
                    <div className="col-md-3">
                      <small className="text-muted d-block">Destino</small>
                      <strong>{reserva.destino?.nombre}</strong>
                      <br />
                      <small className="text-muted">
                        📍 {reserva.destino?.ciudad}, {reserva.destino?.pais}
                      </small>
                    </div>

                    {/* Fecha de viaje */}
                    <div className="col-md-2">
                      <small className="text-muted d-block">Fecha de Viaje</small>
                      <strong>{formatFecha(reserva.fechaViaje)}</strong>
                    </div>

                    {/* Personas */}
                    <div className="col-md-1 text-center">
                      <small className="text-muted d-block">Personas</small>
                      <strong>👥 {reserva.cantidadPersonas}</strong>
                    </div>

                    {/* Total */}
                    <div className="col-md-2 text-end">
                      <small className="text-muted d-block">Total</small>
                      <strong className="text-success fs-5">
                        {formatPrecio(reserva.valorTotal)}
                      </strong>
                    </div>

                    {/* Acciones */}
                    <div className="col-md-2 text-end">
                      {/* Boton cancelar solo para reservas no terminadas */}
                      {(reserva.estado === 'PENDIENTE' ||
                        reserva.estado === 'CONFIRMADA') && (
                        <button
                          className="btn btn-outline-danger btn-sm"
                          onClick={() =>
                            handleCancelar(reserva.id, reserva.codigoReserva)}
                        >
                          Cancelar
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Observaciones si las hay */}
                  {reserva.observaciones && (
                    <div className="mt-2 pt-2 border-top">
                      <small className="text-muted">
                        💬 <em>{reserva.observaciones}</em>
                      </small>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default MisReservas