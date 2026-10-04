import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { Product } from '../domain/product';
import { ProductRepository } from '../domain/catalog.repository';
import { MOCK_PRODUCTS } from './mock-products';

/**
 * Temporal: la API de WildFly (PC2) solo expone /api/categorias.
 * Cuando se publique /api/productos, crear ProductApiRepository y cambiar
 * el provider en app.config.ts; nada más del front cambia.
 */
@Injectable()
export class ProductMockRepository extends ProductRepository {
  list(): Observable<Product[]> {
    return of(MOCK_PRODUCTS).pipe(delay(150));
  }
  findById(id: number): Observable<Product | undefined> {
    return of(MOCK_PRODUCTS.find(p => p.id === id));
  }
}
