import { Injectable } from '@angular/core';
import { Subject, ReplaySubject } from 'rxjs';

import { Category } from './categories.model';

@Injectable({ providedIn: 'root' })
export class CategoriesService {
  categories: Category[] = [];
  categoriesChanged = new Subject<Category[]>();
  selectedCategory = new ReplaySubject<Category>();
  editMode = new Subject<string>();

  addCategory(category: Category): void {
    this.categories.push(category);
    this.categoriesChanged.next(this.categories.slice());
  }

  setCategories(categories: Category[]) {
    this.categories = categories;
    this.categoriesChanged.next(this.categories.slice());
  }

  getCategories(): Category[] {
    return this.categories.slice();
  }

  updateCategory(category: Category): void {
    this.categoriesChanged.next(this.categories.slice());
  }

  deleteCategory(index: number): void {
    this.categories.splice(index, 1);
    this.categoriesChanged.next(this.categories.slice());
  }
}
