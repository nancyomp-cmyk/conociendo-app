// =====================================================
// Archivo: Destinos.jsx
// Proyecto: Conociendo.com - Modulos Integrados
// Descripcion: Lista de destinos conectada al API REST
//              Laravel. Carga destinos desde MySQL.
// =====================================================

import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import DestinoCard from '../components/DestinoCard'
import { obtenerDestinos } from '../services/api'

function Destinos() {
  // Estado base: todos los destinos del API
  const [destinos, setDestinos]       = useState([])
  // Estado filtrado: lo que se muestra en pantalla
  const [filtrados, setFiltrados]     = useState([])
  const [busqueda, setBusqueda]       = useState('')
  const [categoria, setCategoria]     = useState('TODAS')
  const [cargando, setCargando]       = useState(true)
  const [error, setError]             = useState(null)
  const [searchParams]                = useSearchParams()

  /**
   * Al montar el componente: llama al API de Laravel
   * GET http://localhost:8000/api/destinos
   * y guarda los destinos en el estado
   */
  useEffect(() => {
    const cargar = async () => {
      try {
        setCargando(true)
        const respuesta = await obtenerDestinos()
        setDestinos(respuesta.data)
        setFiltrados(respuesta.data)
      } catch (err) {
        console.error('Error al cargar destinos:', err)
        setError('No se pudo cargar los destinos. Verifica que el backend esté corriendo.')
      } finally {
        setCargando(false)
      }
    }
    cargar()
  }, [])

  /**
   * Leer parametros de la URL al cargar
   * Ejemplo: /destinos?categoria=PLAYA&busqueda=cartagena
   */
  useEffect(() => {
    const cat = searchParams.get('categoria')
    const bus = searchParams.get('busqueda')
    if (cat) setCategoria(cat)
    if (bus) setBusqueda(bus)
  }, [searchParams])

  /**
   * Aplicar filtros cada vez que cambia busqueda,
   * categoria o la lista base de destinos
   */
  useEffect(() => {
    let resultado = destinos

    // Filtrar por categoria
    if (categoria !== 'TODAS') {
      resultado = resultado.filter(d => d.categoria === categoria)
    }

    // Filtrar por texto (nombre, ciudad, pais, descripcion)
    if (busqueda.trim()) {
      const txt = busqueda.toLowerCase()
      resultado = resultado.filter(d =>
        d.nombre.toLowerCase().includes(txt) ||
        d.ciudad.toLowerCase().includes(txt) ||
        d.pais.toLowerCase().includes(txt) ||
        d.descripcion.toLowerCase().includes(txt)
      )
    }

    setFiltrados(resultado)
  }, [busqueda, categoria, destinos])

  const categorias = ['TODAS','PLAYA','AVENTURA','CIUDAD','CULTURAL','ECOTURISMO']

  return (
    <div>

      {/* ===== BANNER ===== */}
      <header
        className="text-white text-center py-5"
        style={{
          background: 'linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5)), url(https://images.unsplash.com/photo-1488085061387-422e29b40080?w=1600&fit=crop)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="container">
          <h1 className="display-4 fw-bold mb-2">🗺️ Destinos Turísticos</h1>
          <p className="lead">Descubre los mejores lugares de Colombia para visitar</p>
        </div>
      </header>

      <div className="container py-5">

        {/* ===== FILTROS ===== */}
        <div className="card border-0 shadow-sm p-4 mb-5">
          <div className="row g-3 align-items-center">

            {/* Campo de busqueda */}
            <div className="col-md-6">
              <div className="input-group">
                <span className="input-group-text bg-white border-end-0">🔍</span>
                <input
                  type="text"
                  className="form-control border-start-0"
                  placeholder="Buscar por nombre, ciudad o país..."
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                />
                {busqueda && (
                  <button
                    className="btn btn-outline-secondary"
                    onClick={() => setBusqueda('')}
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>

            {/* Selector de categoria */}
            <div className="col-md-4">
              <select
                className="form-select"
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
              >
                {categorias.map(c => (
                  <option key={c} value={c}>
                    {c === 'TODAS' ? 'Todas las categorías' : c}
                  </option>
                ))}
              </select>
            </div>

            {/* Contador de resultados */}
            <div className="col-md-2 text-end">
              {cargando ? (
                <span className="badge bg-secondary fs-6 px-3 py-2">
                  Cargando...
                </span>
              ) : (
                <span className="badge bg-primary fs-6 px-3 py-2">
                  {filtrados.length} resultado(s)
                </span>
              )}
            </div>
          </div>

          {/* Botones rapidos de categoria */}
          <div className="mt-3 d-flex flex-wrap gap-2">
            {categorias.map(c => (
              <button
                key={c}
                className={`btn btn-sm ${categoria === c ? 'btn-primary' : 'btn-outline-primary'}`}
                onClick={() => setCategoria(c)}
              >
                {c === 'TODAS' ? 'Todos' : c}
              </button>
            ))}
          </div>
        </div>

        {/* ===== INDICADOR DE CARGA ===== */}
        {cargando && (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Cargando...</span>
            </div>
            <p className="mt-2 text-muted">Cargando destinos desde el servidor...</p>
          </div>
        )}

        {/* ===== MENSAJE DE ERROR ===== */}
        {error && !cargando && (
          <div className="alert alert-warning text-center">
            <strong>⚠️ {error}</strong>
            <br />
            <small>
              Asegúrate de que el backend Laravel esté corriendo con:
              <code className="ms-1">php artisan serve</code>
            </small>
            <br />
            <button
              className="btn btn-sm btn-outline-warning mt-2"
              onClick={() => window.location.reload()}
            >
              Reintentar
            </button>
          </div>
        )}

        {/* ===== GRILLA DE DESTINOS ===== */}
        {!cargando && !error && (
          <>
            {filtrados.length > 0 ? (
              <div className="row row-cols-1 row-cols-md-3 g-4">
                {filtrados.map(d => (
                  <div className="col" key={d.id}>
                    <DestinoCard destino={d} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-5">
                <div style={{ fontSize: '4rem' }}>😕</div>
                <h4 className="text-muted mt-3">No se encontraron destinos</h4>
                <p className="text-muted">Intenta con otro término o categoría</p>
                <button
                  className="btn btn-primary"
                  onClick={() => { setBusqueda(''); setCategoria('TODAS') }}
                >
                  Limpiar filtros
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default Destinos