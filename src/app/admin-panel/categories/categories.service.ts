import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Category } from './categories.model';
import { ParentCategory } from './parentCategory.model';

@Injectable({ providedIn: 'root' })
export class CategoriesService {
  categories: Category[] = [];
  categoriesChanged = new Subject<Category[]>();

  addCategory(category: Category): void {
    this.categories.push(category);

    this.categoriesChanged.next(this.categories.slice());
  }

  setCategories(categories: Category[]) {
    this.categories = categories;

    this.categoriesChanged.next(this.categories.slice());
  }

  // getCategories(): {
  //   categories: Category[];
  //   parentCategories: ParentCategory[];
  // } {
  //   return {
  //     categories: this.categories,
  //     parentCategories: this.parentCategories,
  //   };
  // }

  updateCategory(index: number, category: Category): void {
    console.log('before: ', this.categories);
    this.categories[index - 1] = category;
    console.log('after: ', this.categories);

    this.categoriesChanged.next(this.categories.slice());
  }

  deleteCategory(index: number): void {
    this.categories.splice(index, 1);

    this.categoriesChanged.next(this.categories.slice());
  }
}
