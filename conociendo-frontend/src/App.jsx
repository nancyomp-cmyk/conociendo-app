// =====================================================
// Archivo: App.jsx
// Proyecto: Conociendo.com - Frontend React
// Descripcion: Componente raiz con TODAS las rutas
// Evidencia: GA7-220501096-AA4-EV03
// =====================================================

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar         from './components/Navbar'
import Footer         from './components/Footer'
import Home           from './pages/Home'
import Destinos       from './pages/Destinos'
import DestinoDetalle from './pages/DestinoDetalle'
import Login          from './pages/Login'
import Registro       from './pages/Registro'
import MisReservas    from './pages/MisReservas'
import Promociones    from './pages/Promociones'
import Fidelidad      from './pages/Fidelidad'
import Resenas        from './pages/Resenas'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main style={{ minHeight: '60vh' }}>
        <Routes>
          <Route path="/"             element={<Home />} />
          <Route path="/destinos"     element={<Destinos />} />
          <Route path="/destinos/:id" element={<DestinoDetalle />} />
          <Route path="/login"        element={<Login />} />
          <Route path="/registro"     element={<Registro />} />
          <Route path="/mis-reservas" element={<MisReservas />} />
          <Route path="/promociones"  element={<Promociones />} />
          <Route path="/fidelidad"    element={<Fidelidad />} />
          <Route path="/resenas"      element={<Resenas />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  )
}

export default App