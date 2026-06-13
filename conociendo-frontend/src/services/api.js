// =====================================================
// Archivo: api.js
// Proyecto: Conociendo.com - Modulos Integrados
// Descripcion: Conexion real con el API REST Laravel
//              Backend: http://localhost:8000/api
// =====================================================

import axios from 'axios'

// Instancia de Axios apuntando al backend Laravel
const API = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: { 'Content-Type': 'application/json' }
})

// ── AUTENTICACION ─────────────────────────────────
export const registrarUsuario = (datos) =>
  API.post('/auth/registro', datos)

export const loginUsuario = (credenciales) =>
  API.post('/auth/login', credenciales)

// ── DESTINOS ──────────────────────────────────────
export const obtenerDestinos = () =>
  API.get('/destinos')

export const obtenerDestinoPorId = (id) =>
  API.get(`/destinos/${id}`)

// ── RESERVAS ──────────────────────────────────────
export const crearReserva = (datos) =>
  API.post('/reservas', datos)

export const obtenerReservasPorUsuario = (email) =>
  API.get(`/reservas/usuario/${email}`)

export const cancelarReserva = (id) =>
  API.put(`/reservas/${id}/estado`, { estado: 'CANCELADA' })