// =====================================================
// Archivo: mockData.js
// Proyecto: Conociendo.com - Frontend React
// Descripcion: Datos estaticos de destinos turisticos
//              No requiere conexion con el backend
// Evidencia: GA7-220501096-AA4-EV03
// =====================================================

export const destinos = [
  {
    id: 1,
    nombre: "Ciudad Amurallada de Cartagena",
    descripcion: "Centro histórico declarado Patrimonio de la Humanidad por la UNESCO. Plazas coloniales, iglesias barrocas y coloridas casas con balcones floridos. Disfruta de gastronomía, playas cercanas y vibrante vida nocturna.",
    pais: "Colombia",
    ciudad: "Cartagena de Indias",
    precio: 850000,
    categoria: "CULTURAL",
    imagenUrl: "https://images.unsplash.com/photo-1583997052301-de2c88e5e67a?w=600&h=400&fit=crop",
    activo: true
  },
  {
    id: 2,
    nombre: "Parque Nacional Natural Tayrona",
    descripcion: "Combina bosque tropical húmedo con playas paradisíacas de aguas cristalinas. Ideal para senderismo, avistamiento de fauna y conocer vestigios de la civilización Tairona.",
    pais: "Colombia",
    ciudad: "Santa Marta",
    precio: 620000,
    categoria: "ECOTURISMO",
    imagenUrl: "https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?w=600&h=400&fit=crop",
    activo: true
  },
  {
    id: 3,
    nombre: "Valle del Cocora",
    descripcion: "Hogar de la palma de cera, árbol nacional de Colombia. Sus paisajes de niebla, montañas verdes y palmeras gigantes crean uno de los escenarios más fotogénicos del país.",
    pais: "Colombia",
    ciudad: "Salento",
    precio: 480000,
    categoria: "AVENTURA",
    imagenUrl: "https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?w=600&h=400&fit=crop",
    activo: true
  },
  {
    id: 4,
    nombre: "Desierto de la Tatacoa",
    descripcion: "El segundo desierto más grande de Colombia. Paisaje de arcillas rojas y grises, cactus y cañones erosionados. Uno de los mejores lugares del país para observar estrellas.",
    pais: "Colombia",
    ciudad: "Villavieja",
    precio: 350000,
    categoria: "AVENTURA",
    imagenUrl: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=600&h=400&fit=crop",
    activo: true
  },
  {
    id: 5,
    nombre: "Islas del Rosario",
    descripcion: "Archipiélago de 27 islas coralinas a 45 km de Cartagena. Aguas turquesas, arrecifes de coral y biodiversidad marina. El destino ideal para buceo y snorkel.",
    pais: "Colombia",
    ciudad: "Cartagena de Indias",
    precio: 720000,
    categoria: "PLAYA",
    imagenUrl: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&h=400&fit=crop",
    activo: true
  },
  {
    id: 6,
    nombre: "Medellín — Ciudad de la Eterna Primavera",
    descripcion: "Ciudad innovadora y moderna que fue elegida la ciudad más innovadora del mundo. Cable aéreo, metrocable, museos, parques y una gastronomía excepcional te esperan.",
    pais: "Colombia",
    ciudad: "Medellín",
    precio: 540000,
    categoria: "CIUDAD",
    imagenUrl: "https://images.unsplash.com/photo-1599946347371-68eb71b16afc?w=600&h=400&fit=crop",
    activo: true
  },
  {
    id: 7,
    nombre: "Caño Cristales",
    descripcion: "Conocido como el río de los cinco colores o el río más hermoso del mundo. Sus aguas exhiben tonalidades de rojo, amarillo, verde, azul y negro entre julio y noviembre.",
    pais: "Colombia",
    ciudad: "La Macarena",
    precio: 980000,
    categoria: "ECOTURISMO",
    imagenUrl: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=600&h=400&fit=crop",
    activo: true
  },
  {
    id: 8,
    nombre: "Bogotá — La Capital",
    descripcion: "Capital de Colombia con una oferta cultural incomparable. Museos de clase mundial, La Candelaria, Monserrate, gastronomía diversa y una vibrante escena artística.",
    pais: "Colombia",
    ciudad: "Bogotá",
    precio: 430000,
    categoria: "CIUDAD",
    imagenUrl: "https://images.unsplash.com/photo-1582466695090-2a26b8a70e84?w=600&h=400&fit=crop",
    activo: true
  },
  {
    id: 9,
    nombre: "San Andrés Isla",
    descripcion: "Paraíso caribeño colombiano con aguas multicolores. Mar de los Siete Colores, arrecifes de coral, snorkel y la famosa Cueva de Morgan te esperan en esta isla mágica.",
    pais: "Colombia",
    ciudad: "San Andrés",
    precio: 1200000,
    categoria: "PLAYA",
    imagenUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&h=400&fit=crop",
    activo: true
  }
]

export const promociones = [
  {
    id: 1,
    titulo: "Escapada a Cartagena",
    descripcion: "3 noches en hotel 4 estrellas + tours incluidos",
    precio: "desde $1.200.000",
    descuento: "30% OFF",
    imagen: "https://images.unsplash.com/photo-1583997052301-de2c88e5e67a?w=600&h=400&fit=crop",
    vigencia: "Hasta 31 Dic 2026"
  },
  {
    id: 2,
    titulo: "Aventura en el Eje Cafetero",
    descripcion: "4 noches + desayunos + tour al Valle del Cocora",
    precio: "desde $890.000",
    descuento: "25% OFF",
    imagen: "https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?w=600&h=400&fit=crop",
    vigencia: "Hasta 28 Feb 2027"
  },
  {
    id: 3,
    titulo: "San Andrés Todo Incluido",
    descripcion: "5 noches + vuelos + actividades acuáticas",
    precio: "desde $2.100.000",
    descuento: "20% OFF",
    imagen: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&h=400&fit=crop",
    vigencia: "Hasta 15 Mar 2027"
  }
]

export const resenas = [
  {
    id: 1,
    nombre: "Carlos Rodríguez",
    ciudad: "Bogotá",
    calificacion: 5,
    comentario: "Excelente plataforma, encontré mi viaje ideal a Cartagena en minutos. El proceso de reserva fue muy fácil y el destino superó todas mis expectativas.",
    destino: "Cartagena de Indias",
    fecha: "Marzo 2026"
  },
  {
    id: 2,
    nombre: "María González",
    ciudad: "Medellín",
    calificacion: 5,
    comentario: "Conociendo.com me ayudó a organizar mi viaje al Tayrona perfectamente. Las fotos son reales y la información muy completa. 100% recomendado.",
    destino: "Parque Tayrona",
    fecha: "Abril 2026"
  },
  {
    id: 3,
    nombre: "Andrés Martínez",
    ciudad: "Cali",
    calificacion: 4,
    comentario: "Muy buena experiencia reservando el Valle del Cocora. La atención fue excelente y los precios muy competitivos. Volveré a usar la plataforma.",
    destino: "Valle del Cocora",
    fecha: "Mayo 2026"
  }
]