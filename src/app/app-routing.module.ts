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

const appRoutes: Routes = [
  { path: '',  redirectTo: '/adminpanel', pathMatch: 'full' },
  // { path: 'adminpanel', redirectTo: '/adminpanel/dashboard', pathMatch: 'prefix' },
  { path: 'adminpanel', component: AdminPanelComponent, children: [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'products', component: ProductsComponent },
    { path: 'categories', component: CategoriesComponent },
    { path: 'orders', component: OrdersComponent },
    { path: 'admins', component: AdminsComponent },
    { path: 'settings', component: SettingsComponent },
    
  ]},
  { path: 'auth', component: AuthComponent }
  
];


@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
