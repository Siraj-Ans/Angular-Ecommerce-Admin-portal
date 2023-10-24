import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';

import { CategoriesDataStorageService } from '../categories/categories-dataStorage.service';
import { CategoriesService } from '../categories/categories.service';

import { Category } from './categories.model';

@Injectable({ providedIn: 'root' })
export class CategoriesResolverService implements Resolve<Category[]> {
  constructor(
    private categoryDataStorageService: CategoriesDataStorageService,
    private categoriesService: CategoriesService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Category[] | Observable<Category[]> | Promise<Category[]> {
    const categories = this.categoriesService.getCategories();

    if (categories.length === 0) {
      return this.categoryDataStorageService.fetchCategories();
    } else {
      return categories;
    }
  }
}

// import {
//   ActivatedRouteSnapshot,
//   ResolveFn,
//   RouterStateSnapshot,
// } from '@angular/router';
// import { inject } from '@angular/core';

// import { Category } from '../categories/categories.model';

// import { CategoriesService } from '../categories/categories.service';
// import { CategoriesDataStorageService } from '../categories/categories-dataStorage.service';

// export const categoriesResolver: ResolveFn<Category[]> = (
//   route: ActivatedRouteSnapshot,
//   state: RouterStateSnapshot
// ) => {
//   const categories = inject(CategoriesService).getCategories();

//   if (categories.length === 0) {
//     inject(CategoriesDataStorageService).fetchCategory();

//     return inject(CategoriesService).getCategories();
//   } else {
//     return inject(CategoriesService).getCategories();
//   }
// };
