export interface Product {
  id: number;
  categoriaId: number;
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
  artesano: string;
  region: string;
  emoji: string; // placeholder visual hasta que existan imágenes en Azure Blob Storage
  tono: string;  // color base de la ilustración
}
