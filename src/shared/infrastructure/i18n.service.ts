import { Injectable, signal } from '@angular/core';
import es from '../../locales/es.json';
import en from '../../locales/en.json';

export type Lang = 'es' | 'en';
const messages: Record<Lang, unknown> = { es, en };

@Injectable({ providedIn: 'root' })
export class I18nService {
  readonly lang = signal<Lang>((localStorage.getItem('lang') as Lang) || 'es');

  toggle(): void {
    const next: Lang = this.lang() === 'es' ? 'en' : 'es';
    this.lang.set(next);
    localStorage.setItem('lang', next);
    document.documentElement.lang = next;
  }

  /** t('cart.title') o t('catalog.stock', { n: 5 }) */
  t(key: string, params: Record<string, string | number> = {}): string {
    const found = key.split('.').reduce<unknown>(
      (node, part) => (node as Record<string, unknown> | undefined)?.[part], messages[this.lang()]);
    let text = typeof found === 'string' ? found : key;
    for (const [k, v] of Object.entries(params)) text = text.replace(`{${k}}`, String(v));
    return text;
  }
}
