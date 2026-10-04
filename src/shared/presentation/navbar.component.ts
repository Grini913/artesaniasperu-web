import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { I18nService } from '../infrastructure/i18n.service';
import { CartService } from '../../catalog/application/cart.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  template: `
    <header class="nav">
      <a routerLink="/" class="brand">ArtesaniasPeru</a>
      <nav class="nav-links" aria-label="principal">
        <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }">{{ i18n.t('nav.shop') }}</a>
        <a routerLink="/categorias" routerLinkActive="active">{{ i18n.t('nav.categories') }}</a>
      </nav>
      <div class="nav-tools">
        <button class="chip" type="button" (click)="i18n.toggle()" aria-label="Idioma / Language">
          {{ i18n.lang() === 'es' ? 'EN' : 'ES' }}
        </button>
        <a routerLink="/carrito" class="cart-link">
          {{ i18n.t('nav.cart') }}
          @if (cart.count() > 0) { <span class="badge">{{ cart.count() }}</span> }
        </a>
      </div>
    </header>
  `,
})
export class NavbarComponent {
  readonly i18n = inject(I18nService);
  readonly cart = inject(CartService);
}
