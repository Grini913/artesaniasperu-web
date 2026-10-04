import { Injectable, computed, signal } from '@angular/core';
import { Product } from '../domain/product';

export interface CartLine { product: Product; qty: number }
export interface Order { numero: string; fecha: Date; total: number }

@Injectable({ providedIn: 'root' })
export class CartService {
  readonly lines = signal<CartLine[]>([]);
  readonly lastOrder = signal<Order | null>(null);
  readonly count = computed(() => this.lines().reduce((n, l) => n + l.qty, 0));
  readonly total = computed(() => this.lines().reduce((s, l) => s + l.qty * l.product.precio, 0));

  add(product: Product, qty = 1): void {
    this.lines.update(lines => {
      const existing = lines.find(l => l.product.id === product.id);
      if (!existing) return [...lines, { product, qty: Math.min(qty, product.stock) }];
      return lines.map(l => l.product.id === product.id
        ? { ...l, qty: Math.min(l.qty + qty, product.stock) } : l);
    });
  }

  remove(productId: number): void {
    this.lines.update(lines => lines.filter(l => l.product.id !== productId));
  }

  /** Simula el cierre de la compra; el POST /api/pedidos llegará en una siguiente fase. */
  checkout(): void {
    this.lastOrder.set({
      numero: `AP-${new Date().getFullYear()}-${Math.floor(Math.random() * 9000) + 1000}`,
      fecha: new Date(),
      total: this.total(),
    });
    this.lines.set([]);
  }
}
