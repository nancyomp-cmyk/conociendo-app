// =====================================================
// Archivo: DestinoDetalle.jsx
// Proyecto: Conociendo.com - Modulos Integrados
// Descripcion: Detalle de destino conectado al API REST
//              Carga destino desde MySQL y envia reserva
//              al backend Laravel.
// Evidencia: GA8-220501096-AA1-EV02
// =====================================================

import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { obtenerDestinoPorId, crearReserva } from '../services/api'

function DestinoDetalle() {
  const { id }      = useParams()
  const navigate    = useNavigate()

  // Estado del destino cargado desde el API
  const [destino, setDestino]       = useState(null)
  const [cargando, setCargando]     = useState(true)
  const [error, setError]           = useState(null)

  // Estado del formulario de reserva
  const [fechaViaje, setFecha]      = useState('')
  const [personas, setPersonas]     = useState(1)
  const [obs, setObs]               = useState('')
  const [reservando, setReservando] = useState(false)
  const [reservado, setReservado]   = useState(false)
  const [codigoReserva, setCodigo]  = useState('')
  const [errorReserva, setErrorRes] = useState(null)

  // Obtener usuario autenticado del localStorage
  const usuario = JSON.parse(localStorage.getItem('usuario') || 'null')

  /**
   * Al montar el componente: llama al API de Laravel
   * GET http://localhost:8000/api/destinos/{id}
   * y guarda el destino en el estado
   */
  useEffect(() => {
    const cargar = async () => {
      try {
        setCargando(true)
        const respuesta = await obtenerDestinoPorId(id)
        setDestino(respuesta.data)
      } catch (err) {
        console.error('Error al cargar destino:', err)
        if (err.response?.status === 404) {
          setError('Destino no encontrado.')
        } else {
          setError('No se pudo conectar con el servidor.')
        }
      } finally {
        setCargando(false)
      }
    }
    cargar()
  }, [id])

  /**
   * Formatea un numero como precio en pesos colombianos
   * Ejemplo: 850000 → $850.000
   */
  const formatPrecio = (v) => new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0
  }).format(v)

  /**
   * Procesa el formulario de reserva.
   * Llama al API Laravel:
   * POST http://localhost:8000/api/reservas
   * con los datos del usuario y el destino seleccionado
   */
  const hacerReserva = async (e) => {
    e.preventDefault()

    // Si no hay sesion, redirigir al login
    if (!usuario) {
      navigate('/login')
      return
    }

    try {
      setReservando(true)
      setErrorRes(null)

      const respuesta = await crearReserva({
        email_usuario:     usuario.email,
        nombre_usuario:    usuario.nombre,
        destino_id:        parseInt(id),
        fecha_viaje:       fechaViaje,
        cantidad_personas: parseInt(personas),
        observaciones:     obs
      })

      // Guardar el codigo de reserva generado por el backend
      setCodigo(respuesta.data.codigo_reserva)
      setReservado(true)

    } catch (err) {
      console.error('Error al crear reserva:', err)
      setErrorRes(
        err.response?.data?.error ||
        'No se pudo crear la reserva. Intenta nuevamente.'
      )
    } finally {
      setReservando(false)
    }
  }

  // Fecha minima: manana
  const fechaMin = new Date()
  fechaMin.setDate(fechaMin.getDate() + 1)
  const fechaMinStr = fechaMin.toISOString().split('T')[0]

  // ── ESTADOS DE CARGA ──────────────────────────────

  if (cargando) return (
    <div className="container py-5 text-center">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Cargando...</span>
      </div>
      <p className="mt-2 text-muted">Cargando destino...</p>
    </div>
  )

  if (error) return (
    <div className="container py-5 text-center">
      <div className="alert alert-warning d-inline-block">
        <strong>⚠️ {error}</strong>
      </div>
      <br />
      <Link to="/destinos" className="btn btn-primary mt-3">
        ← Volver a destinos
      </Link>
    </div>
  )

  return (
    <div className="container py-5">

      {/* Boton volver */}
      <Link to="/destinos" className="btn btn-outline-secondary mb-4">
        ← Volver a destinos
      </Link>

      <div className="row g-4">

        {/* ── COLUMNA IZQUIERDA: Info del destino ── */}
        <div className="col-lg-8">
          <div className="card border-0 shadow-sm rounded-3 overflow-hidden">

            {/* Imagen del destino */}
            <img
              src={destino.imagen_url ||
                'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&h=400&fit=crop'}
              alt={destino.nombre}
              className="card-img-top"
              style={{ height: '380px', objectFit: 'cover' }}
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&h=400&fit=crop'
              }}
            />

            <div className="card-body p-4">
              {/* Badge categoria */}
              <span className="badge bg-primary mb-2">{destino.categoria}</span>

              {/* Nombre */}
              <h1 className="fw-bold">{destino.nombre}</h1>

              {/* Ubicacion */}
              <p className="text-muted fs-5 mb-3">
                📍 {destino.ciudad}, {destino.pais}
              </p>

              <hr />

              {/* Descripcion */}
              <h5 className="fw-bold">Sobre este destino</h5>
              <p className="lead">{destino.descripcion}</p>

              {/* Precio */}
              <div className="bg-light rounded-3 p-3 mt-3">
                <span className="text-success fw-bold fs-3">
                  {formatPrecio(destino.precio)}
                </span>
                <span className="text-muted ms-2">por persona</span>
              </div>

              {/* Estado del destino */}
              {!destino.activo && (
                <div className="alert alert-warning mt-3">
                  ⚠️ Este destino no está disponible para reservas actualmente.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ── COLUMNA DERECHA: Formulario reserva ── */}
        <div className="col-lg-4">
          <div
            className="card border-0 shadow rounded-3 p-4 sticky-top"
            style={{ top: '80px' }}
          >
            <h4 className="fw-bold mb-3">📅 Reservar</h4>

            {/* Reserva exitosa */}
            {reservado && (
              <div className="alert alert-success text-center">
                <h5>✅ ¡Reserva confirmada!</h5>
                <p className="small mb-1">Tu reserva fue registrada correctamente.</p>
                <p className="fw-bold text-success small mb-3">
                  Código: {codigoReserva}
                </p>
                <Link to="/mis-reservas" className="btn btn-success btn-sm w-100">
                  Ver mis reservas
                </Link>
              </div>
            )}

            {/* Error en la reserva */}
            {errorReserva && (
              <div className="alert alert-danger small">
                ❌ {errorReserva}
              </div>
            )}

            {/* Sin sesion iniciada */}
            {!reservado && !usuario && (
              <div className="text-center">
                <p className="text-muted">
                  Inicia sesión para hacer tu reserva.
                </p>
                <Link to="/login" className="btn btn-primary w-100 mb-2">
                  Iniciar Sesión
                </Link>
                <Link to="/registro" className="btn btn-outline-primary w-100">
                  Crear Cuenta
                </Link>
              </div>
            )}

            {/* Destino no disponible */}
            {!reservado && usuario && !destino.activo && (
              <div className="alert alert-warning text-center">
                Este destino no está disponible para reservas.
              </div>
            )}

            {/* Formulario de reserva */}
            {!reservado && usuario && destino.activo && (
              <form onSubmit={hacerReserva}>

                {/* Usuario autenticado */}
                <p className="text-primary fw-bold small mb-3">
                  👤 {usuario.nombre}
                </p>

                {/* Fecha de viaje */}
                <div className="mb-3">
                  <label className="form-label fw-bold small">
                    📅 Fecha de viaje *
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    min={fechaMinStr}
                    value={fechaViaje}
                    onChange={(e) => setFecha(e.target.value)}
                    required
                  />
                </div>

                {/* Cantidad de personas */}
                <div className="mb-3">
                  <label className="form-label fw-bold small">
                    👥 Personas *
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    min="1"
                    max="20"
                    value={personas}
                    onChange={(e) => setPersonas(e.target.value)}
                    required
                  />
                </div>

                {/* Total calculado */}
                <div className="bg-light rounded p-3 mb-3">
                  <div className="d-flex justify-content-between">
                    <span className="text-muted small">Precio/persona:</span>
                    <span className="small">{formatPrecio(destino.precio)}</span>
                  </div>
                  <div className="d-flex justify-content-between fw-bold text-success fs-5 mt-1">
                    <span>Total:</span>
                    <span>{formatPrecio(destino.precio * personas)}</span>
                  </div>
                </div>

                {/* Observaciones */}
                <div className="mb-3">
                  <label className="form-label fw-bold small">
                    💬 Observaciones
                  </label>
                  <textarea
                    className="form-control"
                    rows="2"
                    value={obs}
                    onChange={(e) => setObs(e.target.value)}
                    placeholder="Requerimientos especiales..."
                  />
                </div>

                {/* Boton confirmar */}
                <button
                  type="submit"
                  className="btn btn-primary w-100 fw-bold"
                  disabled={reservando}
                >
                  {reservando ? '⏳ Procesando...' : '✅ Confirmar Reserva'}
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