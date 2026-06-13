// =====================================================
// Archivo: Registro.jsx
// Proyecto: Conociendo.com - Frontend React
// Descripcion: Pagina de registro de nuevos usuarios
// Evidencia: GA7-220501096-AA4-EV03
// =====================================================

import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { registrarUsuario } from '../services/api'

/**
 * Pagina de registro de Conociendo.com.
 * Permite crear una nueva cuenta de usuario.
 */
function Registro() {
  const navigate = useNavigate()

  const [nombre, setNombre]         = useState('')
  const [email, setEmail]           = useState('')
  const [password, setPassword]     = useState('')
  const [confirmar, setConfirmar]   = useState('')
  const [cargando, setCargando]     = useState(false)
  const [error, setError]           = useState(null)
  const [exito, setExito]           = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setExito(null)

    // Validar que las contrasenas coincidan
    if (password !== confirmar) {
      setError('❌ Las contraseñas no coinciden.')
      return
    }

    // Validar longitud minima de contrasena
    if (password.length < 6) {
      setError('❌ La contraseña debe tener al menos 6 caracteres.')
      return
    }

    try {
      setCargando(true)
      const resp = await registrarUsuario({ nombre, email, password })
      const datos = resp.data

      if (datos.exitoso) {
        setExito('✅ ' + datos.mensaje + ' Redirigiendo al login...')
        setTimeout(() => navigate('/login'), 2000)
      } else {
        setError('❌ ' + datos.mensaje)
      }

    } catch (err) {
      if (err.response?.status === 409) {
        setError('❌ El correo electrónico ya está registrado.')
      } else {
        setError('❌ No se pudo conectar con el servidor.')
      }
    } finally {
      setCargando(false)
    }
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6">

          <div className="text-center mb-4">
            <div style={{ fontSize: '3rem' }}>🌍</div>
            <h2 className="fw-bold text-primary">Conociendo.com</h2>
            <p className="text-muted">Crea tu cuenta y empieza a explorar</p>
          </div>

          <div className="card border-0 shadow-sm rounded-3">
            <div className="card-body p-4">
              <h4 className="fw-bold mb-4 text-center">📝 Crear Cuenta</h4>

              {error && <div className="alert alert-danger small">{error}</div>}
              {exito && <div className="alert alert-success small">{exito}</div>}

              <form onSubmit={handleSubmit}>

                {/* Nombre */}
                <div className="mb-3">
                  <label className="form-label fw-bold">👤 Nombre Completo</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Ej: Nancy Mosquera"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    required
                    autoFocus
                  />
                </div>

                {/* Email */}
                <div className="mb-3">
                  <label className="form-label fw-bold">📧 Correo Electrónico</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="correo@ejemplo.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                {/* Contrasena */}
                <div className="mb-3">
                  <label className="form-label fw-bold">🔑 Contraseña</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Mínimo 6 caracteres"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                {/* Confirmar contrasena */}
                <div className="mb-4">
                  <label className="form-label fw-bold">🔑 Confirmar Contraseña</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Repite tu contraseña"
                    value={confirmar}
                    onChange={(e) => setConfirmar(e.target.value)}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100 btn-lg fw-bold"
                  disabled={cargando}
                >
                  {cargando ? '⏳ Registrando...' : 'Crear Mi Cuenta'}
                </button>
              </form>

              <hr />
              <p className="text-center mb-0">
                ¿Ya tienes cuenta?{' '}
                <Link to="/login" className="text-primary fw-bold">
                  Inicia sesión
                </Link>
              </p>
            </div>
          </div>

          <div className="text-center mt-3">
            <Link to="/" className="text-muted small">← Volver al inicio</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Registro