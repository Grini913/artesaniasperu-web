import { Observable } from 'rxjs';
import { Category } from './category';
import { Product } from './product';

export abstract class CategoryRepository {
  abstract list(): Observable<Category[]>;
  abstract create(nombre: string, descripcion: string): Observable<Category>;
  abstract remove(id: number): Observable<void>;
}

export abstract class ProductRepository {
  abstract list(): Observable<Product[]>;
  abstract findById(id: number): Observable<Product | undefined>;
}
