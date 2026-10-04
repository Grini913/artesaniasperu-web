import { Injectable, inject } from '@angular/core';
import { CategoryRepository, ProductRepository } from '../domain/catalog.repository';

@Injectable({ providedIn: 'root' })
export class CatalogService {
  private readonly products = inject(ProductRepository);
  private readonly categories = inject(CategoryRepository);

  listProducts = () => this.products.list();
  getProduct = (id: number) => this.products.findById(id);
  listCategories = () => this.categories.list();
  createCategory = (nombre: string, descripcion: string) => this.categories.create(nombre, descripcion);
  deleteCategory = (id: number) => this.categories.remove(id);
}
