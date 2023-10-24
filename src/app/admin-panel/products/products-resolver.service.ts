import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Product } from './products.model';
import { ProductsService } from './products.service';
import { ProductDataStorageService } from './products-dataStorage.service';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProductResolverService implements Resolve<Product[]> {
  constructor(
    private productsDataStorageService: ProductDataStorageService,
    private productsService: ProductsService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Product[] | Observable<Product[]> | Promise<Product[]> {
    let products: any = this.productsService.getProducts();

    if (products.length === 0) {
      return this.productsDataStorageService.fetchProducts();
    } else {
      return products;
    }
  }
}

// import { inject } from '@angular/core';
// import {
//   ActivatedRouteSnapshot,
//   ResolveFn,
//   RouterStateSnapshot,
// } from '@angular/router';
// import { Product } from './products.model';
// import { ProductsService } from './products.service';
// import { ProductDataStorageService } from './products-dataStorage.service';

// export const productsReolver: ResolveFn<any> = (
//   route: ActivatedRouteSnapshot,
//   state: RouterStateSnapshot
// ) => {
//   let product: any = inject(ProductsService).getProductById(
//     route.paramMap.get('id')
//   );

//   if (!product) {
//     inject(ProductDataStorageService)
//       .fetchProduct(route.paramMap.get('id'))
//       .subscribe(
//         (response: {
//           product: {
//             _id: string;
//             productName: string;
//             productCategory: {
//               _id: string;
//               __v: number;
//               categoryName: string;
//               properties: { property: string; values: string[] }[];
//             };
//             storage: string;
//             color: string;
//             productImages: Object[];
//             description: string;
//             priceInUSD: number;
//           };
//           category: {
//             _id: string;
//             __v: number;
//             categoryName: string;
//             parent?: {
//               _id: string;
//               __v: number;
//               categoryName: string;
//               properties: { property: string; values: string[] }[];
//             };
//           };
//         }) => {
//           console.log('res: ', response);
//             product = {
//               id: response.product._id,
//               productName: response.product.productName,
//               productCategory: {
//                 id: response.product.productCategory._id,
//                 categoryName: response.product.productCategory.categoryName,
//                 properties: response.product.productCategory.properties,
//               },
//               productImages: response.product.productImages,
//               description: response.product.description,
//               priceInUSD: response.product.priceInUSD,
//             };

//           product = response;
//         }
//       );

//     console.log('resolvedProduct: ', product);

//     return product;
//   } else {
//     return product;
//   }
// };
