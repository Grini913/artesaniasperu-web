import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment';
import { Category } from '../domain/category';
import { CategoryRepository } from '../domain/catalog.repository';

/** Respuesta JSON del servlet de WildFly (columnas de la tabla `categorias`). */
interface CategoriaDto { categoria_id: number; nombre: string; descripcion: string | null }

const toCategory = (d: CategoriaDto): Category =>
  ({ id: d.categoria_id, nombre: d.nombre, descripcion: d.descripcion });

@Injectable()
export class CategoryApiRepository extends CategoryRepository {
  private readonly http = inject(HttpClient);
  private readonly url = `${environment.apiUrl}/categorias`;

  list(): Observable<Category[]> {
    return this.http.get<CategoriaDto[]>(this.url).pipe(map(rows => rows.map(toCategory)));
  }

  create(nombre: string, descripcion: string): Observable<Category> {
    // El endpoint POST recibe application/x-www-form-urlencoded (ver Swagger, figura 6.2W)
    const body = new HttpParams().set('nombre', nombre).set('descripcion', descripcion);
    return this.http.post<CategoriaDto>(this.url, body).pipe(map(toCategory));
  }

  remove(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
