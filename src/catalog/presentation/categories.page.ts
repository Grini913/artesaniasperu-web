import { Component, inject, signal } from '@angular/core';
import { CatalogService } from '../application/catalog.service';
import { Category } from '../domain/category';
import { I18nService } from '../../shared/infrastructure/i18n.service';

/** Pantalla de integración: usa GET, POST y DELETE de /api/categorias (WildFly + MySQL). */
@Component({
  selector: 'app-categories-page',
  template: `
    <section class="cart">
      <h1>{{ i18n.t('admin.title') }}</h1>
      <p class="muted">{{ i18n.t('admin.subtitle') }}</p>

      <div class="form-row">
        <label class="field"><span>{{ i18n.t('admin.name') }}</span>
          <input #nombre type="text" maxlength="100"></label>
        <label class="field grow"><span>{{ i18n.t('admin.description') }}</span>
          <input #desc type="text"></label>
        <button class="btn" type="button" (click)="create(nombre.value, desc.value); nombre.value=''; desc.value=''">
          {{ i18n.t('admin.create') }}
        </button>
      </div>

      @if (message(); as m) { <p class="notice" [class.error]="isError()" role="status">{{ m }}</p> }

      @for (c of categories(); track c.id) {
        <div class="line">
          <div class="grow">
            <h3>{{ c.nombre }}</h3>
            <p class="muted">{{ c.descripcion }}</p>
          </div>
          <button class="link" type="button" (click)="remove(c.id)">{{ i18n.t('admin.delete') }}</button>
        </div>
      }
    </section>
  `,
})
export class CategoriesPage {
  readonly i18n = inject(I18nService);
  private readonly catalog = inject(CatalogService);
  readonly categories = signal<Category[]>([]);
  readonly message = signal('');
  readonly isError = signal(false);

  constructor() { this.load(); }

  private load(): void {
    this.catalog.listCategories().subscribe({
      next: rows => this.categories.set(rows),
      error: () => this.notify('admin.error', true),
    });
  }

  private notify(key: string, error = false): void {
    this.message.set(this.i18n.t(key));
    this.isError.set(error);
  }

  create(nombre: string, descripcion: string): void {
    if (!nombre.trim()) return;
    this.catalog.createCategory(nombre.trim(), descripcion.trim()).subscribe({
      next: () => { this.notify('admin.created'); this.load(); },
      error: () => this.notify('admin.error', true),
    });
  }

  remove(id: number): void {
    this.catalog.deleteCategory(id).subscribe({
      next: () => { this.notify('admin.deleted'); this.load(); },
      error: () => this.notify('admin.error', true),
    });
  }
}
