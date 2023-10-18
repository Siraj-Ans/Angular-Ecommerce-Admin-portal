import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Category } from './categories.model';

import { CategoriesDataStorageService } from './categories-dataStorage.service';
import { CategoriesService } from './categories.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
})
export class CategoriesComponent implements OnInit, OnDestroy {
  categories: Category[] = [
    {
      id: null,
      categoryName: 'No Parent Category',
      parent: null,
      properties: null,
    },
  ];
  categoryObsSubscription: Subscription;
  mode = 'no-edit';
  categoryForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private categoriesDataStorageService: CategoriesDataStorageService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private categoriesService: CategoriesService
  ) {}

  ngOnInit(): void {
    this.categoryForm = this.fb.group({
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

    this.categoriesDataStorageService
      .fetchCategories()
      .subscribe((categories: Category[]) => {
        this.categories = [
          {
            id: null,
            categoryName: 'No Parent Category',
            parent: null,
            properties: null,
          },
          ...categories,
        ];
      });

    this.categoryObsSubscription =
      this.categoriesService.categoriesChanged.subscribe((categories) => {
        this.categories = categories;
      });

    this.categoriesService.editMode.subscribe((editMode) => {
      this.mode = editMode;
    });
  }

  get propertyControls(): FormArray {
    return this.categoryForm.get('properties') as FormArray;
  }

  onDeletePropertyControl(index: number): void {
    (this.categoryForm.get('properties') as FormArray).removeAt(index);
  }

  onAddProperty(): void {
    (<FormArray>this.categoryForm.get('properties')).push(
      this.fb.group({
        property: [null],
        value: [null],
      })
    );
  }

  onSubmitCategory(): void {
    if (this.categoryForm.invalid) return;

    const modifiedProperties = this.categoryForm
      .get('properties')
      .value.map((property: { property: string; value: string }) => {
        return {
          property: property.property,
          values: property.value.split(','),
        };
      });

    let category = null;

    if (this.categoryForm.value.parent) {
      category = new Category(
        null,
        this.categoryForm.value.categoryName,
        modifiedProperties,
        this.categoryForm.value.parent.id
      );
    } else {
      category = new Category(
        null,
        this.categoryForm.value.categoryName,
        modifiedProperties
      );
    }

    this.categoriesDataStorageService.createCategory(category);
    // }

    this.categoryForm.get('parent').setValue('No Parent Category');
    this.categoryForm.get('categoryName').setValue(null);
    (<FormArray>this.categoryForm.get('properties')).clear();
  }

  onDeleteCategory(index: number): void {
    const categoryID = this.categories[index].id;

    this.categoriesDataStorageService.deleteCategory(categoryID, index - 1);
  }

  onEditCategory(category: Category): void {
    this.mode = 'edit';

    this.categoriesService.selectedCategory.next(category);

    this.router.navigate(['edit-category/', category.id], {
      relativeTo: this.activatedRoute,
    });
  }

  onCancelEdit(): void {
    this.mode = 'no-edit';

    this.categoryForm.get('parent').setValue({
      id: null,
      categoryName: 'No Parent Category',
      parent: null,
      properties: null,
    });
    this.categoryForm.get('categoryName').setValue(null);
    (<FormArray>this.categoryForm.get('properties')).clear();
  }

  ngOnDestroy(): void {
    this.categoryObsSubscription.unsubscribe();
  }
}
