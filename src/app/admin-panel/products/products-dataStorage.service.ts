import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { Product } from './products.model';

import { environment } from 'src/environments/environment';

import { ProductsService } from './products.service';

const BACKEND_URL = environment.apiUTL + 'products/';

@Injectable({ providedIn: 'root' })
export class ProductDataStorageService {
  constructor(
    private http: HttpClient,
    private productService: ProductsService,
    private router: Router
  ) {}

  fetchProducts(): void {
    this.http
      .get<{
        message: string;
        products: {
          id: String;
          productName: string;
          productCategory: {
            _id: string;
            __v: number;
            categoryName: string;
            properties: { property: string; values: string[] }[];
          };
          storage: string;
          color: string;
          productImages: Object[];
          description: string;
          priceInUSD: number;
          _id: string;
          __v: number;
        }[];
      }>(BACKEND_URL + 'fetch-products')
      .subscribe({
        next: (responseData) => {
          const products: Product[] = responseData.products.map((product) => {
            return {
              id: product._id,
              productName: product.productName,
              productCategory: {
                id: product.productCategory._id,
                categoryName: product.productCategory.categoryName,
                properties: product.productCategory.properties,
              },
              productImages: product.productImages,
              description: product.description,
              priceInUSD: product.priceInUSD,
            };
          });

          this.productService.setProducts(products);
        },
        error: (err) => {
          console.log('[Products] Error', err);
        },
      });
  }

  createProduct(product: FormData): void {
    this.http
      .post<{
        product: {
          productName: string;
          productCategory: {
            id: string;
            categoryName: string;
            properties: { property: string; values: string[] }[];
          };
          color: string;
          storage: string;
          productImages: Object[];
          description: string;
          priceInUSD: number;
          _id: string;
          __v: number;
        };
        message: string;
      }>(BACKEND_URL + 'create-product', product)
      .subscribe({
        next: (responseData) => {
          const product = new Product(
            responseData.product._id,
            responseData.product.productName,
            responseData.product.productCategory,
            responseData.product.productImages,
            responseData.product.description,
            +responseData.product.priceInUSD
          );

          console.log('product: ', product);

          this.productService.addProduct(product);
          this.productService.editMode.next('no-edit');
          this.router.navigate(['adminpanel/products']);
        },
        error: (error) => {
          console.log('err: ', error);
        },
      });
  }

  updatedProduct(formData: any): void {
    this.http.put(BACKEND_URL + 'update-product', formData).subscribe({
      next: () => {
        const updatedProduct = new Product(
          formData.get('id'),
          formData.get('productName'),
          formData.get('productCategory'),
          formData.get('productImages'),
          formData.get('description'),
          formData.get('priceInUSD')
        );

        this.productService.updateProducts(updatedProduct);

        this.productService.editMode.next('no-edit');
        this.router.navigate(['adminpanel/products']);
      },
      error: (err) => {
        console.log('[products] Error: ', err);
      },
    });
  }

  deleteProduct(productID: string, index: number): void {
    this.http
      .delete<{ message: string }>(BACKEND_URL + '/delete-product/' + productID)
      .subscribe({
        next: () => {
          this.productService.deleteProduct(index);
        },
      });
  }

  fetchProduct(id: string): Observable<Object> {
    return this.http.get(BACKEND_URL + 'fetch-product', {
      params: new HttpParams().set('id', id),
    });
  }
}
