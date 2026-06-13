// =====================================================
// Archivo: DestinoCard.jsx
// Proyecto: Conociendo.com - Frontend React
// Descripcion: Tarjeta reutilizable para mostrar
//              la informacion resumida de un destino
// Evidencia: GA7-220501096-AA4-EV03
// =====================================================

import { Link } from 'react-router-dom'

/**
 * Componente de tarjeta de destino.
 * Recibe los datos del destino como "props" (propiedades)
 * y los muestra en una tarjeta Bootstrap.
 *
 * @param {Object} props.destino - Objeto con datos del destino
 */
function DestinoCard({ destino }) {

  /**
   * Determina el color del badge segun la categoria.
   * @param {string} categoria - categoria del destino
   * @returns clase CSS de Bootstrap para el color
   */
  const colorCategoria = (categoria) => {
    const colores = {
      'PLAYA':      'bg-info',
      'MONTANA':    'bg-success',
      'CIUDAD':     'bg-warning text-dark',
      'CULTURAL':   'bg-primary',
      'AVENTURA':   'bg-danger',
      'ECOTURISMO': 'bg-success',
    }
    return colores[categoria] || 'bg-secondary'
  }

  /**
   * Formatea el precio con separadores de miles colombianos.
   * Ejemplo: 850000 → $850.000
   */
  const formatearPrecio = (precio) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(precio)
  }

  /**
   * Retorna una imagen por defecto segun la categoria
   * si el destino no tiene imagen propia.
   */
  const imagenPorDefecto = (categoria) => {
    const imagenes = {
      'PLAYA':      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=250&fit=crop',
      'MONTANA':    'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&h=250&fit=crop',
      'CIUDAD':     'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=400&h=250&fit=crop',
      'CULTURAL':   'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400&h=250&fit=crop',
      'AVENTURA':   'https://images.unsplash.com/photo-1551632811-561732d1e306?w=400&h=250&fit=crop',
      'ECOTURISMO': 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=250&fit=crop',
    }
    return imagenes[categoria] || 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=400&h=250&fit=crop'
  }

  return (
    <div className="card h-100 shadow-sm border-0 rounded-3 overflow-hidden">

      {/* Imagen del destino */}
      <img
        src={destino.imagenUrl || imagenPorDefecto(destino.categoria)}
        className="card-img-top"
        alt={destino.nombre}
        style={{ height: '200px', objectFit: 'cover' }}
        onError={(e) => {
          // Si la imagen falla, usar imagen por defecto
          e.target.src = imagenPorDefecto(destino.categoria)
        }}
      />

      <div className="card-body d-flex flex-column">

        {/* Badge de categoria */}
        <span className={`badge ${colorCategoria(destino.categoria)} mb-2 align-self-start`}>
          {destino.categoria}
        </span>

        {/* Nombre del destino */}
        <h5 className="card-title fw-bold">{destino.nombre}</h5>

        {/* Ubicacion */}
        <p className="text-muted small mb-2">
          📍 {destino.ciudad}, {destino.pais}
        </p>

        {/* Descripcion truncada a 100 caracteres */}
        <p className="card-text text-muted small flex-grow-1">
          {destino.descripcion?.length > 100
            ? destino.descripcion.substring(0, 100) + '...'
            : destino.descripcion}
        </p>

        {/* Precio y boton */}
        <div className="d-flex justify-content-between align-items-center mt-auto pt-2 border-top">
          <div>
            <span className="text-success fw-bold fs-5">
              {formatearPrecio(destino.precio)}
            </span>
            <small className="text-muted d-block">por persona</small>
          </div>
          {/* Link al detalle del destino */}
          <Link
            to={`/destinos/${destino.id}`}
            className="btn btn-primary btn-sm"
          >
            Ver más →
          </Link>
        </div>
      </div>
    </div>
  )
}

export default DestinoCard