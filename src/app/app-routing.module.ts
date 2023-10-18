import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './admin-panel/dashboard/dashboard.component';
import { ProductsComponent } from './admin-panel/products/products.component';
import { CategoriesComponent } from './admin-panel/categories/categories.component';
import { OrdersComponent } from './admin-panel/orders/orders.component';
import { AdminsComponent } from './admin-panel/admins/admins.component';
import { SettingsComponent } from './admin-panel/settings/settings.component';
import { AuthComponent } from './auth/auth.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { EditProductComponent } from './admin-panel/products/edit-product/edit-product.component';
import { CategoryEditComponent } from './admin-panel/categories/category-edit/category-edit.component';

import { CategoriesResolverService } from './admin-panel/categories/categories-resolver';
import { ProductResolverService } from './admin-panel/products/products-resolver.service';
import { authGuard } from './auth/auth.guard';

const appRoutes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  {
    path: 'adminpanel',
    component: AdminPanelComponent,
    // canActivate: [authGuard],
  },
  { path: 'dashboard', component: DashboardComponent },
  {
    path: 'products',
    component: ProductsComponent,
    children: [
      {
        path: 'create-product',
        component: EditProductComponent,
        resolve: { isResolve: CategoriesResolverService },
      },
      {
        path: 'edit-product/:id',
        component: EditProductComponent,
        resolve: {
          isResolved: ProductResolverService,
        },
      },
    ],
  },
  {
    path: 'categories',
    component: CategoriesComponent,
    children: [{ path: 'edit-category/:id', component: CategoryEditComponent }],
  },
  { path: 'orders', component: OrdersComponent },
  { path: 'admins', component: AdminsComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'auth', component: AuthComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
