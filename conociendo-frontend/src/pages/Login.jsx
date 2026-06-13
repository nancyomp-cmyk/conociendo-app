// =====================================================
// Archivo: Login.jsx
// Proyecto: Conociendo.com - Frontend React
// Descripcion: Pagina de inicio de sesion
// Evidencia: GA7-220501096-AA4-EV03
// =====================================================

import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { loginUsuario } from '../services/api'

/**
 * Pagina de inicio de sesion de Conociendo.com.
 * Permite al usuario autenticarse con email y contrasena.
 * Si la autenticacion es exitosa, guarda los datos en
 * localStorage y redirige al inicio.
 */
function Login() {
  const navigate = useNavigate()

  // Estado del formulario
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')

  // Estado de la peticion
  const [cargando, setCargando] = useState(false)
  const [error, setError]       = useState(null)
  const [exito, setExito]       = useState(null)

  /**
   * Maneja el envio del formulario de login.
   * Llama al API y guarda los datos del usuario si es exitoso.
   */
  const handleSubmit = async (e) => {
    // Evitar que el formulario recargue la pagina
    e.preventDefault()
    setError(null)
    setExito(null)

    try {
      setCargando(true)
      const respuesta = await loginUsuario({ email, password })
      const datos = respuesta.data

      if (datos.exitoso) {
        // Guardar datos del usuario en localStorage para mantener sesion
        localStorage.setItem('usuario', JSON.stringify({
          nombre: datos.nombre,
          email:  datos.email
        }))

        setExito('✅ ' + datos.mensaje)

        // Redirigir al inicio despues de 1.5 segundos
        setTimeout(() => {
          navigate('/')
          window.location.reload()
        }, 1500)

      } else {
        setError('❌ ' + datos.mensaje)
      }

    } catch (err) {
      if (err.response?.status === 401) {
        setError('❌ Error en la autenticación: credenciales incorrectas.')
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
        <div className="col-md-5">

          {/* Encabezado */}
          <div className="text-center mb-4">
            <div style={{ fontSize: '3rem' }}>🌍</div>
            <h2 className="fw-bold text-primary">Conociendo.com</h2>
            <p className="text-muted">Inicia sesión para continuar</p>
          </div>

          {/* Tarjeta del formulario */}
          <div className="card border-0 shadow-sm rounded-3">
            <div className="card-body p-4">
              <h4 className="fw-bold mb-4 text-center">
                🔐 Iniciar Sesión
              </h4>

              {/* Mensajes de alerta */}
              {error && (
                <div className="alert alert-danger small">{error}</div>
              )}
              {exito && (
                <div className="alert alert-success small">{exito}</div>
              )}

              {/* Formulario */}
              <form onSubmit={handleSubmit}>

                {/* Campo Email */}
                <div className="mb-3">
                  <label className="form-label fw-bold">
                    📧 Correo Electrónico
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="correo@ejemplo.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoFocus
                  />
                </div>

                {/* Campo Contrasena */}
                <div className="mb-4">
                  <label className="form-label fw-bold">
                    🔑 Contraseña
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                {/* Boton de envio */}
                <button
                  type="submit"
                  className="btn btn-primary w-100 btn-lg fw-bold"
                  disabled={cargando}
                >
                  {cargando ? '⏳ Verificando...' : 'Ingresar'}
                </button>
              </form>

              <hr />

              {/* Link a registro */}
              <p className="text-center mb-0">
                ¿No tienes cuenta?{' '}
                <Link to="/registro" className="text-primary fw-bold">
                  Regístrate gratis
                </Link>
              </p>
            </div>
          </div>

          {/* Link volver */}
          <div className="text-center mt-3">
            <Link to="/" className="text-muted small">
              ← Volver al inicio
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login