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

const appRoutes: Routes = [
  { path: '', redirectTo: '/adminpanel/dashboard', pathMatch: 'full' },
  {
    path: 'adminpanel',
    component: AdminPanelComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      {
        path: 'products',
        component: ProductsComponent,
        children: [
          { path: 'create-product', component: EditProductComponent },
          { path: 'edit-product/:id', component: EditProductComponent },
        ],
      },
      { path: 'categories', component: CategoriesComponent },
      { path: 'orders', component: OrdersComponent },
      { path: 'admins', component: AdminsComponent },
      { path: 'settings', component: SettingsComponent },
    ],
  },
  { path: 'auth', component: AuthComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
