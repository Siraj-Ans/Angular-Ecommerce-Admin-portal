import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { ProductDataStorageService } from './products-dataStorage.service';
import { ProductsService } from './products.service';

import { Product } from './products.model';

@Component({
  selector: 'app-product',
  templateUrl: './products.component.html',
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  productsChangedSubscription: Subscription;
  mode = 'no-edit';

  constructor(
    private productDataStorageService: ProductDataStorageService,
    private productService: ProductsService,
    private router: Router,
    private activateRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.productDataStorageService.fetchProducts();

    this.productService.editMode.subscribe((updatedMode) => {
      this.mode = updatedMode;
    });

    this.productsChangedSubscription =
      this.productService.productsChanged.subscribe((products) => {
        this.products = products;
      });
  }

  onAddProduct(): void {
    this.mode = 'add-mode';
    this.router.navigate(['create-product/'], {
      relativeTo: this.activateRoute,
    });
  }

  onEditProduct(product: Product): void {
    this.mode = 'edit-mode';

    this.productService.selectedProduct.next(product);

    this.router.navigate(['edit-product/', product.id], {
      relativeTo: this.activateRoute,
    });
  }

  onDeleteProduct(productID: string, index: number): void {
    this.productDataStorageService.deleteProduct(productID, index);
  }

  ngOnDestroy(): void {
    this.productsChangedSubscription.unsubscribe();
  }
}
