// =====================================================
// Archivo: Fidelidad.jsx
// Proyecto: Conociendo.com - Frontend React
// Descripcion: Programa de puntos y beneficios exclusivos
// Evidencia: GA7-220501096-AA4-EV03
// =====================================================

import { Link } from 'react-router-dom'

function Fidelidad() {
  return (
    <div>

      {/* ===== BANNER ===== */}
      <header
        className="text-white text-center"
        style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          minHeight: '45vh',
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <div className="container py-5">
          <div style={{ fontSize: '4rem' }} className="mb-3">👑</div>
          <h1 className="display-3 fw-bold mb-3">Programa de Fidelidad</h1>
          <p className="lead fs-4 mb-4">
            Viaja más, acumula puntos y disfruta de beneficios exclusivos
          </p>
          <Link to="/registro" className="btn btn-warning btn-lg fw-bold px-5">
            Unirme gratis
          </Link>
        </div>
      </header>

      <div className="container py-5">

        {/* ===== COMO FUNCIONA ===== */}
        <section className="mb-5">
          <h2 className="text-center fw-bold mb-2">¿Cómo funciona?</h2>
          <p className="text-center text-muted mb-5 fs-5">
            4 pasos simples para empezar a ganar beneficios
          </p>
          <div className="row g-4">
            {[
              { num: '1', emoji: '📝', color: '#1a73e8',
                titulo: 'Regístrate gratis',
                desc: 'Crea tu cuenta en Conociendo.com sin ningún costo ni tarjeta de crédito.' },
              { num: '2', emoji: '✈️', color: '#34a853',
                titulo: 'Reserva y viaja',
                desc: 'Elige tu destino favorito y reserva tu viaje a través de nuestra plataforma.' },
              { num: '3', emoji: '⭐', color: '#fbbc04',
                titulo: 'Acumula puntos',
                desc: 'Gana 100 puntos por cada $100.000 pesos reservados. También por reseñas y referidos.' },
              { num: '4', emoji: '🎁', color: '#ea4335',
                titulo: 'Canjea beneficios',
                desc: 'Usa tus puntos para obtener descuentos, upgrades y experiencias únicas.' },
            ].map(p => (
              <div className="col-md-3 col-6" key={p.num}>
                <div className="card border-0 shadow-sm h-100 text-center p-4">
                  <div
                    className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3"
                    style={{ width: '70px', height: '70px', background: p.color, fontSize: '2rem' }}
                  >
                    {p.emoji}
                  </div>
                  <div
                    className="badge rounded-pill mx-auto mb-3 px-3"
                    style={{ background: p.color }}
                  >
                    Paso {p.num}
                  </div>
                  <h6 className="fw-bold">{p.titulo}</h6>
                  <p className="text-muted small mb-0">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ===== NIVELES ===== */}
        <section className="mb-5">
          <h2 className="text-center fw-bold mb-2">Niveles de membresía</h2>
          <p className="text-center text-muted mb-5 fs-5">
            Mientras más viajes, más beneficios obtienes
          </p>
          <div className="row g-4">

            {/* EXPLORADOR */}
            <div className="col-md-4">
              <div className="card border-0 shadow h-100" style={{ borderTop: '5px solid #6c757d !important' }}>
                <div className="card-header bg-secondary text-white text-center py-4 border-0">
                  <div style={{ fontSize: '3rem' }}>🧭</div>
                  <h3 className="fw-bold mb-1">Explorador</h3>
                  <span className="badge bg-white text-secondary fs-6 px-3">0 - 999 puntos</span>
                </div>
                <div className="card-body p-4">
                  <h6 className="fw-bold text-muted mb-3">BENEFICIOS INCLUIDOS</h6>
                  <ul className="list-unstyled">
                    {[
                      '5% de descuento en reservas',
                      'Acceso a ofertas exclusivas',
                      'Newsletter con destinos',
                      'Soporte estándar'
                    ].map((b, i) => (
                      <li key={i} className="mb-3 d-flex gap-2 align-items-center">
                        <span className="text-success fw-bold">✓</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="card-footer bg-white border-0 p-4">
                  <Link to="/registro" className="btn btn-outline-secondary w-100 fw-bold">
                    Comenzar
                  </Link>
                </div>
              </div>
            </div>

            {/* AVENTURERO */}
            <div className="col-md-4">
              <div className="card border-0 shadow-lg h-100 position-relative">
                <div
                  className="position-absolute top-0 start-50 translate-middle badge bg-primary px-3 py-2"
                  style={{ borderRadius: '20px', fontSize: '0.8rem' }}
                >
                  MÁS POPULAR
                </div>
                <div className="card-header text-white text-center py-4 border-0"
                  style={{ background: 'linear-gradient(135deg, #1a73e8, #0d47a1)' }}>
                  <div style={{ fontSize: '3rem' }}>🎒</div>
                  <h3 className="fw-bold mb-1">Aventurero</h3>
                  <span className="badge bg-white text-primary fs-6 px-3">1.000 - 4.999 pts</span>
                </div>
                <div className="card-body p-4">
                  <h6 className="fw-bold text-muted mb-3">BENEFICIOS INCLUIDOS</h6>
                  <ul className="list-unstyled">
                    {[
                      '10% de descuento en reservas',
                      'Check-in prioritario',
                      'Guía digital PDF gratuita',
                      'Soporte preferencial 24h',
                      'Acceso a eventos exclusivos'
                    ].map((b, i) => (
                      <li key={i} className="mb-3 d-flex gap-2 align-items-center">
                        <span className="text-success fw-bold">✓</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="card-footer bg-white border-0 p-4">
                  <Link to="/registro" className="btn btn-primary w-100 fw-bold">
                    Comenzar
                  </Link>
                </div>
              </div>
            </div>

            {/* VIP */}
            <div className="col-md-4">
              <div className="card border-0 shadow h-100">
                <div className="card-header text-white text-center py-4 border-0"
                  style={{ background: 'linear-gradient(135deg, #f6d365, #fda085)' }}>
                  <div style={{ fontSize: '3rem' }}>👑</div>
                  <h3 className="fw-bold text-dark mb-1">Viajero VIP</h3>
                  <span className="badge bg-dark text-white fs-6 px-3">5.000+ puntos</span>
                </div>
                <div className="card-body p-4">
                  <h6 className="fw-bold text-muted mb-3">BENEFICIOS INCLUIDOS</h6>
                  <ul className="list-unstyled">
                    {[
                      '20% de descuento permanente',
                      'Concierge personal',
                      'Upgrades de habitación gratis',
                      'Destinos y tours exclusivos',
                      'Invitaciones a eventos VIP',
                      'Traslados aeropuerto incluidos'
                    ].map((b, i) => (
                      <li key={i} className="mb-3 d-flex gap-2 align-items-center">
                        <span className="text-warning fw-bold">★</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="card-footer bg-white border-0 p-4">
                  <Link to="/registro" className="btn btn-warning w-100 fw-bold">
                    Comenzar
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== TABLA DE PUNTOS ===== */}
        <section className="mb-5">
          <h2 className="text-center fw-bold mb-2">Cómo ganar puntos</h2>
          <p className="text-center text-muted mb-4">
            Cada acción suma puntos hacia tu próximo beneficio
          </p>
          <div className="table-responsive">
            <table className="table table-hover shadow-sm rounded-3 overflow-hidden">
              <thead>
                <tr style={{ background: 'linear-gradient(135deg, #1a73e8, #0d47a1)', color: 'white' }}>
                  <th className="py-3 px-4">Actividad</th>
                  <th className="py-3 px-4 text-center">Puntos ganados</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Registro en la plataforma',  '+ 200 puntos de bienvenida'],
                  ['Primera reserva realizada',  '+ 500 puntos especiales'],
                  ['Reserva de $100.000',        '+ 100 puntos'],
                  ['Publicar una reseña',        '+ 50 puntos'],
                  ['Referir un amigo',           '+ 200 puntos'],
                  ['Cumpleaños del viajero',     '+ 150 puntos regalo'],
                  ['Reserva en temporada baja',  'x2 puntos dobles'],
                  ['Completar perfil',           '+ 75 puntos'],
                ].map(([act, pts], i) => (
                  <tr key={i} className={i % 2 === 0 ? 'table-light' : ''}>
                    <td className="py-3 px-4">{act}</td>
                    <td className="py-3 px-4 text-center">
                      <span className="badge bg-warning text-dark px-3 py-2 fs-6">
                        {pts}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ===== CTA ===== */}
        <section
          className="text-center text-white p-5 rounded-3"
          style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
        >
          <h3 className="fw-bold mb-3">
            ¡Empieza hoy y recibe 200 puntos de bienvenida!
          </h3>
          <p className="lead mb-4" style={{ opacity: 0.9 }}>
            Únete gratis y comienza a disfrutar de los beneficios del programa de fidelidad
          </p>
          <Link to="/registro" className="btn btn-warning btn-lg fw-bold me-3 px-5">
            Crear cuenta gratis
          </Link>
          <Link to="/destinos" className="btn btn-outline-light btn-lg px-4">
            Ver destinos
          </Link>
        </section>

      </div>
    </div>
  )
}

export default Fidelidad