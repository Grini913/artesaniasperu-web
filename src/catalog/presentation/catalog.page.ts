import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { CatalogService } from '../application/catalog.service';
import { Category } from '../domain/category';
import { I18nService } from '../../shared/infrastructure/i18n.service';
import { formatSoles } from '../../shared/domain/money';

@Component({
  selector: 'app-catalog-page',
  imports: [RouterLink],
  template: `
    <section class="hero">
      <h1>{{ i18n.t('hero.title') }}</h1>
      <p>{{ i18n.t('hero.subtitle') }}</p>
    </section>

    <div class="layout">
      <aside class="filters">
        <h2>{{ i18n.t('filters.title') }}</h2>
        <label class="field">
          <span>{{ i18n.t('filters.search') }}</span>
          <input type="search" [placeholder]="i18n.t('filters.placeholder')"
                 [value]="search()" (input)="search.set($any($event.target).value)">
        </label>
        <fieldset>
          <legend>{{ i18n.t('filters.category') }}</legend>
          @for (c of categories(); track c.id) {
            <label class="check">
              <input type="checkbox" [checked]="selected().has(c.id)" (change)="toggle(c.id)">
              {{ c.nombre }}
            </label>
          } @empty {
            <p class="muted">{{ i18n.t('catalog.apiOffline') }}</p>
          }
        </fieldset>
      </aside>

      <section class="grid" aria-live="polite">
        @for (p of filtered(); track p.id) {
          <a class="card" [routerLink]="['/producto', p.id]">
            <div class="art" [style.--tono]="p.tono"><span>{{ p.emoji }}</span></div>
            <div class="card-body">
              <small class="muted">{{ categoryName(p.categoriaId) }} · {{ p.region }}</small>
              <h3>{{ p.nombre }}</h3>
              <p class="price">{{ money(p.precio) }}</p>
            </div>
          </a>
        } @empty {
          <p class="muted">{{ i18n.t('catalog.empty') }}</p>
        }
      </section>
    </div>
  `,
})
export class CatalogPage {
  readonly i18n = inject(I18nService);
  private readonly catalog = inject(CatalogService);

  readonly products = toSignal(this.catalog.listProducts(), { initialValue: [] });
  readonly categories = signal<Category[]>([]);
  readonly search = signal('');
  readonly selected = signal<Set<number>>(new Set());
  readonly money = formatSoles;

  readonly filtered = computed(() => {
    const q = this.search().trim().toLowerCase();
    const sel = this.selected();
    return this.products().filter(p =>
      (sel.size === 0 || sel.has(p.categoriaId)) &&
      (!q || `${p.nombre} ${p.descripcion}`.toLowerCase().includes(q)));
  });

  constructor() {
    this.catalog.listCategories().subscribe({
      next: rows => this.categories.set(rows),
      error: () => this.categories.set([]),
    });
  }

  toggle(id: number): void {
    this.selected.update(s => { const n = new Set(s); n.has(id) ? n.delete(id) : n.add(id); return n; });
  }

  categoryName(id: number): string {
    return this.categories().find(c => c.id === id)?.nombre ?? '';
  }
}
