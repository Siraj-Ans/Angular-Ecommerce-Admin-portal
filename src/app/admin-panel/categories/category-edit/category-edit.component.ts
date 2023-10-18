import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import { Category } from '../categories.model';

import { CategoriesService } from '../categories.service';
import { CategoriesDataStorageService } from '../categories-dataStorage.service';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
})
export class CategoryEditComponent implements OnInit {
  selectedCategory: Category;
  categories: Category[];
  editCategoryForm: FormGroup;

  constructor(
    private categoriesService: CategoriesService,
    private categoriesDataStorageService: CategoriesDataStorageService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.editCategoryForm = this.fb.group({
      categoryName: [null, Validators.required],
      parent: [
        {
          id: null,
          categoryName: 'No Parent Category',
          parent: null,
          properties: null,
        },
      ],
      properties: this.fb.array([]),
    });

    this.categoriesService.selectedCategory.subscribe((category) => {
      this.selectedCategory = category;

      this.editCategoryForm
        .get('categoryName')
        .setValue(this.selectedCategory.categoryName);

      if (this.selectedCategory.properties) {
        for (let i = 0; i < this.selectedCategory.properties.length; i++) {
          (<FormArray>this.editCategoryForm.get('properties')).push(
            new FormGroup({
              property: new FormControl(
                this.selectedCategory.properties[i].property
              ),
              value: new FormControl(
                this.selectedCategory.properties[i].values.join(',')
              ),
            })
          );
        }
      }
    });
  }

  get propertyControls(): FormArray {
    return this.editCategoryForm.get('properties') as FormArray;
  }

  onEditCategory(): void {}

  onDeletePropertyControl(index: number): void {
    (this.editCategoryForm.get('properties') as FormArray).removeAt(index);
  }

  onAddProperty(): void {
    (<FormArray>this.editCategoryForm.get('properties')).push(
      this.fb.group({
        property: [null],
        value: [null],
      })
    );
  }

  onSaveCategory(): void {
    const modifiedProperties = this.editCategoryForm
      .get('properties')
      .value.map((property: { property: string; value: string }) => {
        return {
          property: property.property,
          values: property.value.split(','),
        };
      });

    const category = new Category(
      this.selectedCategory.id,
      this.editCategoryForm.value.categoryName,
      modifiedProperties,
      this.editCategoryForm.value.parent
    );

    this.categoriesDataStorageService.updateCategory(category);
  }

  onCancelEdit(): void {
    this.categoriesService.editMode.next('no-edit');
    this.router.navigate(['adminpanel/categories']);
  }
}
