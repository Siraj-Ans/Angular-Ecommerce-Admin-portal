import { Injectable } from '@angular/core';
import { Subject, ReplaySubject } from 'rxjs';

import { Product } from './products.model';

@Injectable({ providedIn: 'root' })
export class ProductsService {
  products: Product[] = [];
  productsChanged = new Subject<Product[]>();
  selectedProduct = new ReplaySubject<Product>();
  editMode = new Subject<string>();

  addProduct(product: Product): void {
    this.products.push(product);

    this.productsChanged.next(this.products.slice());
  }

  setProducts(products: Product[]): void {
    this.products = products;

    this.productsChanged.next(this.products.slice());
  }

  deleteProduct(index: number): void {
    this.products.splice(index, 1);

    this.productsChanged.next(this.products.slice());
  }

  updateProducts(updatedProduct: Product): void {
    const index = this.products.findIndex(
      (product) => product.id === updatedProduct.id
    );

    this.products[index] = updatedProduct;

    this.productsChanged.next(this.products.slice());
  }
}
