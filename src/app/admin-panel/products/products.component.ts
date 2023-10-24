import {
  Component,
  OnInit,
  OnDestroy,
  AfterContentChecked,
  ChangeDetectorRef,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { ProductDataStorageService } from './products-dataStorage.service';
import { ProductsService } from './products.service';

import { Product } from './products.model';

@Component({
  selector: 'app-product',
  templateUrl: './products.component.html',
})
export class ProductsComponent
  implements OnInit, OnDestroy, AfterContentChecked
{
  products: Product[] = [];
  productsChangedSubscription: Subscription;
  mode = 'no-edit';

  constructor(
    private productDataStorageService: ProductDataStorageService,
    private productService: ProductsService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {}

  ngAfterContentChecked(): void {
    this.cdr.detectChanges();
  }

  ngOnInit(): void {
    this.productDataStorageService.fetchProducts().subscribe((products) => {
      this.products = products;
    });

    this.productService.editMode.subscribe((updatedMode) => {
      this.mode = updatedMode;
    });
  }

  onAddProduct(): void {
    this.mode = 'add-mode';
    this.router.navigate(['create-product/'], {
      relativeTo: this.activatedRoute,
    });
  }

  onEditProduct(product: Product): void {
    this.mode = 'edit-mode';

    this.productService.selectedProduct.next(product);

    this.router.navigate(['edit-product/', product.id], {
      relativeTo: this.activatedRoute,
    });
  }

  onDeleteProduct(productID: string, index: number): void {
    const selectedProduct = this.products[index];

    this.productDataStorageService.deleteProduct(
      productID,
      index,
      selectedProduct
    );
  }

  ngOnDestroy(): void {}
}
