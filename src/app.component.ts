import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/presentation/navbar.component';
import { I18nService } from './shared/infrastructure/i18n.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent],
  template: `
    <app-navbar />
    <main><router-outlet /></main>
    <footer class="footer">{{ i18n.t('footer') }}</footer>
  `,
})
export class AppComponent {
  readonly i18n = inject(I18nService);
}
