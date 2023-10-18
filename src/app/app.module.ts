import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  LucideAngularModule,
  Home,
  Store,
  ShoppingCart,
  List,
  Layers,
  Users,
  Settings,
  LogOut,
  ArrowUpFromLine,
  Trash2,
  Menu,
} from 'lucide-angular';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { DashboardComponent } from './admin-panel/dashboard/dashboard.component';
import { ProductsComponent } from './admin-panel/products/products.component';
import { CategoriesComponent } from './admin-panel/categories/categories.component';
import { OrdersComponent } from './admin-panel/orders/orders.component';
import { AdminsComponent } from './admin-panel/admins/admins.component';
import { SettingsComponent } from './admin-panel/settings/settings.component';
import { AuthComponent } from './auth/auth.component';
import { EditProductComponent } from './admin-panel/products/edit-product/edit-product.component';
import { CategoryEditComponent } from './admin-panel/categories/category-edit/category-edit.component';

import { ProductResolverService } from './admin-panel/products/products-resolver.service';
import { CategoriesResolverService } from './admin-panel/categories/categories-resolver';

@NgModule({
  declarations: [
    AppComponent,
    AdminPanelComponent,
    DashboardComponent,
    ProductsComponent,
    EditProductComponent,
    CategoriesComponent,
    CategoryEditComponent,
    OrdersComponent,
    AdminsComponent,
    SettingsComponent,
    AuthComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    LucideAngularModule.pick({
      Home,
      Store,
      ShoppingCart,
      List,
      Layers,
      Users,
      Settings,
      LogOut,
      ArrowUpFromLine,
      Trash2,
      Menu,
    }),
  ],
  providers: [[ProductResolverService, CategoriesResolverService]],
  bootstrap: [AppComponent],
})
export class AppModule {}
