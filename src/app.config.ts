import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding, withInMemoryScrolling } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { routes } from './app.routes';
import { CategoryRepository, ProductRepository } from './catalog/domain/catalog.repository';
import { CategoryApiRepository } from './catalog/infrastructure/category-api.repository';
import { ProductMockRepository } from './catalog/infrastructure/product-mock.repository';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding(), withInMemoryScrolling({ scrollPositionRestoration: 'top' })),
    provideHttpClient(withFetch()),
    { provide: CategoryRepository, useClass: CategoryApiRepository },
    { provide: ProductRepository, useClass: ProductMockRepository },
  ],
};
