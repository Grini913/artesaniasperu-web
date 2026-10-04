import { Product } from '../domain/product';

// categoriaId coincide con la tabla `categorias` (1 Textiles, 2 Ceramica, 3 Joyeria).
export const MOCK_PRODUCTS: Product[] = [
  { id: 1, categoriaId: 1, nombre: 'Poncho de Alpaca Fina', descripcion: 'Poncho tejido en telar con alpaca de la sierra de Cusco. Cálido, liviano y de tiraje limitado.', precio: 450, stock: 8, artesano: "Taller Q'ero", region: 'Cusco', emoji: '🧶', tono: '#7a3e2b' },
  { id: 2, categoriaId: 1, nombre: 'Chal de Baby Alpaca', descripcion: 'Chal suave con guardas andinas teñidas con tintes naturales.', precio: 280, stock: 12, artesano: 'Tejedoras de Chinchero', region: 'Cusco', emoji: '🧣', tono: '#5b3a6b' },
  { id: 3, categoriaId: 1, nombre: 'Chullo Tejido a Mano', descripcion: 'Gorro tradicional con orejeras, tejido a dos agujas.', precio: 95, stock: 25, artesano: 'Taller Taquile', region: 'Puno', emoji: '🧢', tono: '#3d5a6c' },
  { id: 4, categoriaId: 2, nombre: 'Jarrón de Cerámica Ayacuchana', descripcion: 'Jarrón modelado y pintado a mano con motivos de flora andina.', precio: 180, stock: 6, artesano: 'Familia Quispe', region: 'Ayacucho', emoji: '🏺', tono: '#a4572b' },
  { id: 5, categoriaId: 2, nombre: 'Retablo Ayacuchano', descripcion: 'Retablo de madera y masa con escenas de la vida cotidiana.', precio: 340, stock: 3, artesano: 'Taller Jiménez', region: 'Ayacucho', emoji: '🎎', tono: '#8a6a1f' },
  { id: 6, categoriaId: 2, nombre: 'Plato Decorativo de Chulucanas', descripcion: 'Cerámica bruñida con técnica de pre-cocción y negativo.', precio: 120, stock: 14, artesano: 'Taller Vicús', region: 'Piura', emoji: '🍽️', tono: '#4a3b34' },
  { id: 7, categoriaId: 3, nombre: 'Aretes de Plata de Catacaos', descripcion: 'Aretes de filigrana en plata 950, hechos pieza por pieza.', precio: 160, stock: 9, artesano: 'Orfebres de Catacaos', region: 'Piura', emoji: '💎', tono: '#4d5d66' },
  { id: 8, categoriaId: 3, nombre: 'Collar de Filigrana', descripcion: 'Collar con dije de flor en filigrana de plata, edición limitada.', precio: 390, stock: 4, artesano: 'Orfebres de Catacaos', region: 'Piura', emoji: '📿', tono: '#6c3a4a' },
];
