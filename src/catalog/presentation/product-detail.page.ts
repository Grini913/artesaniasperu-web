import { Component, inject, input, signal, effect } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CatalogService } from '../application/catalog.service';
import { CartService } from '../application/cart.service';
import { Product } from '../domain/product';
import { I18nService } from '../../shared/infrastructure/i18n.service';
import { formatSoles } from '../../shared/domain/money';

@Component({
  selector: 'app-product-detail-page',
  imports: [RouterLink],
  template: `
    <a routerLink="/" class="back">{{ i18n.t('product.back') }}</a>
    @if (product(); as p) {
      <article class="detail">
        <div class="art big" [style.--tono]="p.tono"><span>{{ p.emoji }}</span></div>
        <div class="detail-info">
          <small class="muted">{{ i18n.t('product.maker') }}: {{ p.artesano }} · {{ p.region }}</small>
          <h1>{{ p.nombre }}</h1>
          <p class="price lg">{{ money(p.precio) }}</p>
          <p>{{ p.descripcion }}</p>
          <p class="muted">{{ i18n.t('catalog.stock', { n: p.stock }) }}</p>
          <label class="field qty">
            <span>{{ i18n.t('product.qty') }}</span>
            <input type="number" min="1" [max]="p.stock" [value]="qty()"
                   (input)="qty.set(clamp($any($event.target).value, p.stock))">
          </label>
          <button class="btn" type="button" (click)="add(p)">{{ i18n.t('product.add') }}</button>
        </div>
      </article>
    } @else if (loaded()) {
      <p class="muted">{{ i18n.t('product.notFound') }}</p>
    }
  `,
})
export class ProductDetailPage {
  readonly id = input.required<string>(); // viene de la ruta /producto/:id
  readonly i18n = inject(I18nService);
  private readonly catalog = inject(CatalogService);
  private readonly cart = inject(CartService);
  private readonly router = inject(Router);

  readonly product = signal<Product | undefined>(undefined);
  readonly loaded = signal(false);
  readonly qty = signal(1);
  readonly money = formatSoles;

  constructor() {
    effect(() => {
      this.catalog.getProduct(Number(this.id())).subscribe(p => {
        this.product.set(p);
        this.loaded.set(true);
      });
    });
  }

  clamp(value: string, max: number): number {
    return Math.max(1, Math.min(Number(value) || 1, max));
  }

  add(p: Product): void {
    this.cart.add(p, this.qty());
    this.router.navigate(['/carrito']);
  }
}
