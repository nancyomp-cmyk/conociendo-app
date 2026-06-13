// =====================================================
// Archivo: api.js
// Proyecto: Conociendo.com - Frontend React
// Descripcion: Funciones de autenticacion con localStorage
//              No requiere conexion con el backend
// Evidencia: GA7-220501096-AA4-EV03
// =====================================================

/**
 * Simula el registro de un usuario guardando en localStorage.
 * En produccion se conectaria al API REST del backend.
 */
export const registrarUsuario = (datos) => {
  return new Promise((resolve, reject) => {
    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]')
    const existe = usuarios.find(u => u.email === datos.email)

    if (existe) {
      reject({ response: { status: 409 } })
      return
    }

    const nuevoUsuario = { ...datos, id: Date.now() }
    usuarios.push(nuevoUsuario)
    localStorage.setItem('usuarios', JSON.stringify(usuarios))

    resolve({ data: { exitoso: true, mensaje: 'Registro exitoso. ¡Bienvenida a Conociendo.com!', nombre: datos.nombre, email: datos.email } })
  })
}

/**
 * Simula el inicio de sesion verificando en localStorage.
 */
export const loginUsuario = (credenciales) => {
  return new Promise((resolve, reject) => {
    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]')
    const usuario = usuarios.find(
      u => u.email === credenciales.email && u.password === credenciales.password
    )

    if (usuario) {
      resolve({ data: { exitoso: true, mensaje: 'Autenticación satisfactoria. ¡Bienvenida!', nombre: usuario.nombre, email: usuario.email } })
    } else {
      reject({ response: { status: 401 } })
    }
  })
}

/**
 * Simula crear una reserva guardando en localStorage.
 */
export const crearReserva = (datos) => {
  return new Promise((resolve) => {
    const reservas = JSON.parse(localStorage.getItem('reservas') || '[]')
    const nuevaReserva = {
      ...datos,
      id: Date.now(),
      codigoReserva: 'RES-' + Date.now(),
      estado: 'PENDIENTE',
      fechaReserva: new Date().toISOString()
    }
    reservas.push(nuevaReserva)
    localStorage.setItem('reservas', JSON.stringify(reservas))
    resolve({ data: nuevaReserva })
  })
}

/**
 * Obtiene las reservas de un usuario desde localStorage.
 */
export const obtenerReservasPorUsuario = (email) => {
  return new Promise((resolve) => {
    const reservas = JSON.parse(localStorage.getItem('reservas') || '[]')
    const misReservas = reservas.filter(r => r.emailUsuario === email)
    resolve({ data: misReservas })
  })
}

/**
 * Cancela una reserva actualizando su estado en localStorage.
 */
export const cancelarReserva = (id) => {
  return new Promise((resolve) => {
    const reservas = JSON.parse(localStorage.getItem('reservas') || '[]')
    const actualizadas = reservas.map(r =>
      r.id === id ? { ...r, estado: 'CANCELADA' } : r
    )
    localStorage.setItem('reservas', JSON.stringify(actualizadas))
    resolve({ data: { estado: 'CANCELADA' } })
  })
}