import { Component, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService } from '../application/cart.service';
import { I18nService } from '../../shared/infrastructure/i18n.service';
import { formatSoles } from '../../shared/domain/money';

@Component({
  selector: 'app-cart-page',
  imports: [RouterLink, DatePipe],
  template: `
    @if (cart.lastOrder(); as o) {
      <section class="thanks">
        <h1>{{ i18n.t('thanks.title') }}</h1>
        <p>{{ i18n.t('thanks.text') }}</p>
        <dl class="summary">
          <h2>{{ i18n.t('thanks.summary') }}</h2>
          <div><dt>{{ i18n.t('thanks.order') }}</dt><dd>#{{ o.numero }}</dd></div>
          <div><dt>{{ i18n.t('thanks.date') }}</dt><dd>{{ o.fecha | date: 'dd/MM/yyyy HH:mm' }}</dd></div>
          <div><dt>{{ i18n.t('thanks.total') }}</dt><dd class="price">{{ money(o.total) }}</dd></div>
        </dl>
        <a routerLink="/" class="btn" (click)="cart.lastOrder.set(null)">{{ i18n.t('thanks.back') }}</a>
      </section>
    } @else {
      <section class="cart">
        <h1>{{ i18n.t('cart.title') }}</h1>
        @for (l of cart.lines(); track l.product.id) {
          <div class="line">
            <div class="art mini" [style.--tono]="l.product.tono"><span>{{ l.product.emoji }}</span></div>
            <div class="grow">
              <h3>{{ l.product.nombre }}</h3>
              <p class="muted">{{ l.qty }} × {{ money(l.product.precio) }}</p>
            </div>
            <p class="price">{{ money(l.qty * l.product.precio) }}</p>
            <button class="link" type="button" (click)="cart.remove(l.product.id)">{{ i18n.t('cart.remove') }}</button>
          </div>
        } @empty {
          <p class="muted">{{ i18n.t('cart.empty') }}</p>
          <a routerLink="/" class="btn">{{ i18n.t('cart.keep') }}</a>
        }
        @if (cart.lines().length) {
          <div class="total">
            <span>{{ i18n.t('cart.total') }}</span>
            <strong class="price lg">{{ money(cart.total()) }}</strong>
          </div>
          <button class="btn" type="button" (click)="cart.checkout()">{{ i18n.t('cart.confirm') }}</button>
        }
      </section>
    }
  `,
})
export class CartPage {
  readonly cart = inject(CartService);
  readonly i18n = inject(I18nService);
  readonly money = formatSoles;
}
