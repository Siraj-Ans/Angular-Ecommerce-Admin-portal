import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  SocialLoginModule,
  SocialAuthServiceConfig,
} from '@abacritt/angularx-social-login';
import { GoogleLoginProvider } from '@abacritt/angularx-social-login';
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

@NgModule({
  declarations: [
    AppComponent,
    AdminPanelComponent,
    DashboardComponent,
    ProductsComponent,
    EditProductComponent,
    CategoriesComponent,
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
    SocialLoginModule,
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
    }),
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '371408936031-nqmnudk1nmaut008iup7e0f9out948ok.apps.googleusercontent.com'
            ),
          },
        ],
        onError: (err) => {
          console.error('err: ', err);
        },
      } as SocialAuthServiceConfig,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
