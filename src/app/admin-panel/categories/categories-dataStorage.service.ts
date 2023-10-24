import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, tap } from 'rxjs';

import { Category } from './categories.model';

import { CategoriesService } from './categories.service';

import { environment } from 'src/environments/environment';

const BACKEND_URL = environment.apiUTL + 'categories/';

@Injectable({ providedIn: 'root' })
export class CategoriesDataStorageService {
  constructor(
    private http: HttpClient,
    private categoryService: CategoriesService
  ) {}

  fetchCategories(): Observable<Category[]> {
    return this.http
      .get<{
        categories: {
          _id: string;
          __v: number;
          categoryName: string;
          parent: {
            id: string;
            categoryName: string;
            properties: { property: string; values: string[] }[];
          };
          properties: { property: string; values: string[] }[];
        }[];
      }>(BACKEND_URL + '/fetch-categories')
      .pipe(
        map((responseData) => {
          return responseData.categories.map((category) => {
            return {
              id: category._id,
              categoryName: category.categoryName,
              parent: category.parent,
              properties: category.properties.map((property) => {
                return {
                  property: property.property,
                  values: property.values,
                };
              }),
            };
          });
        }),
        tap((categories: Category[]) => {
          this.categoryService.setCategories(categories);
        })
      );
  }

  createCategory(category: Category): void {
    this.http
      .post<{
        message: string;
        category: {
          _id: string;
          __v: number;
          categoryName: string;
          parent?: {
            _id: string;
            __v: number;
            categoryName: string;
            properties: { property: string; values: string[] }[];
          };
          properties: { property: string; values: string[] }[];
        };
      }>(BACKEND_URL + 'create-category', category)
      .subscribe({
        next: (responseData) => {
          const modifiedParent = {
            id: responseData.category.parent?._id,
            categoryName: responseData.category.parent?.categoryName,
            properties: responseData.category.parent?.properties.map(
              (property) => {
                return {
                  property: property.property,
                  values: property.values,
                };
              }
            ),
          };

          const category = new Category(
            responseData.category._id,
            responseData.category.categoryName,
            responseData.category.properties,
            modifiedParent
          );

          this.categoryService.addCategory(category);
        },
        error: (err) => {
          console.log('[Categories] Error: ', err);
        },
      });
  }

  deleteCategory(categoryID: string, index: number): void {
    this.http.delete(BACKEND_URL + 'delete-category/' + categoryID).subscribe({
      next: () => {
        this.categoryService.deleteCategory(index);
      },
      error: (err) => {
        console.log('[Category] Error: ', err);
      },
    });
  }

  updateCategory(category: Category) {
    return this.http.put(BACKEND_URL + 'update-category/', category).subscribe({
      next: () => {
        this.categoryService.updateCategory(category);
      },
      error: (err) => {
        console.log('[Category] Error: ', err);
      },
    });
  }

  fetchParentCategories(): Observable<Object> {
    return this.http.get(BACKEND_URL + 'fetch-parent-categories');
  }
}
