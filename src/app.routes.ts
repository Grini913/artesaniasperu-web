import { Routes } from '@angular/router';
import { CatalogPage } from './catalog/presentation/catalog.page';
import { ProductDetailPage } from './catalog/presentation/product-detail.page';
import { CartPage } from './catalog/presentation/cart.page';
import { CategoriesPage } from './catalog/presentation/categories.page';

export const routes: Routes = [
  { path: '', component: CatalogPage },
  { path: 'producto/:id', component: ProductDetailPage },
  { path: 'carrito', component: CartPage },
  { path: 'categorias', component: CategoriesPage },
  { path: '**', redirectTo: '' },
];
