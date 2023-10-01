import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import { Category } from './categories.model';
import { ParentCategory } from './parentCategory.model';

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
  mode = {
    state: 'no-edit',
    index: null,
  };
  categoryForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private categoriesDataStorageService: CategoriesDataStorageService,
    private categoryService: CategoriesService
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

    this.categoriesDataStorageService.fetchCategory();

    this.categoryObsSubscription =
      this.categoryService.categoriesChanged.subscribe((categories) => {
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

    if (this.mode.state === 'edit') {
      const modifiedProperties = this.categoryForm
        .get('properties')
        .value.map((property: { property: string; value: string }) => {
          return {
            property: property.property,
            values: property.value.split(','),
          };
        });

      const category = new Category(
        this.categories[this.mode.index].id,
        this.categories[this.mode.index].categoryName,
        modifiedProperties,
        this.categoryForm.value.parent
      );

      console.log('cat: ', category);

      this.categoriesDataStorageService.updateCategory(
        this.mode.index,
        category
      );
    } else {
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
    }

    this.categoryForm.get('parent').setValue('No Parent Category');
    this.categoryForm.get('categoryName').setValue(null);
    (<FormArray>this.categoryForm.get('properties')).clear();

    if (this.mode.state === 'edit') {
      this.mode.state = 'no-edit';
      this.mode.index = null;
    }
  }

  onDeleteCategory(index: number): void {
    const categoryID = this.categories[index].id;

    this.categoriesDataStorageService.deleteCategory(categoryID, index - 1);
  }

  onEditCategory(index: number): void {
    this.mode.state = 'edit';
    this.mode.index = index;
    const selectedCategory = this.categories[index];

    this.categoryForm.controls['categoryName'].setValue(
      selectedCategory.categoryName
    );
    console.log(this.categories);
    this.categories[0] = selectedCategory.parent;

    this.categoryForm.controls['parent'].setValue(selectedCategory.parent);
    if (selectedCategory.properties) {
      for (let i = 0; i < selectedCategory.properties.length; i++) {
        (<FormArray>this.categoryForm.get('properties')).push(
          new FormGroup({
            property: new FormControl(selectedCategory.properties[i].property),
            value: new FormControl(
              selectedCategory.properties[i].values.join(',')
            ),
          })
        );
      }
    }
  }

  onCancelEdit(): void {
    this.mode.state = 'no-edit';
    this.mode.index = null;

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
