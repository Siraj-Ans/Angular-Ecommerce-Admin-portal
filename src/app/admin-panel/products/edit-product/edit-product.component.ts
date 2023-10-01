import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription, take } from 'rxjs';

import { Category } from '../../categories/categories.model';
import { Product } from '../products.model';

import { ProductDataStorageService } from '../products-dataStorage.service';
import { CategoriesDataStorageService } from '../../categories/categories-dataStorage.service';
import { CategoriesService } from '../../categories/categories.service';
import { ProductsService } from '../products.service';

import { mimeType } from '../mime-type.validator';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
})
export class EditProductComponent implements OnInit, OnDestroy {
  product: Product;
  categories: Category[] = [
    {
      id: null,
      categoryName: 'Uncategorized',
      parent: null,
      properties: null,
    },
  ];
  imageFiles = [];
  selectedProductSubscription: Subscription;
  productForm: FormGroup;
  imagePaths: string[] = [];

  constructor(
    private productsDataStorageService: ProductDataStorageService,
    private productSerive: ProductsService,
    private categorydataStorageService: CategoriesDataStorageService,
    private categoryService: CategoriesService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.categorydataStorageService.fetchCategory();

    this.productForm = new FormGroup({
      productName: new FormControl(null, Validators.required),
      productCategory: new FormControl(null, Validators.required),
      productImages: new FormControl([], [Validators.required]),
      description: new FormControl(null, Validators.required),
      priceInUSD: new FormControl(null, Validators.required),
    });

    this.categoryService.categoriesChanged.subscribe((categories) => {
      this.categories = [
        {
          id: null,
          categoryName: 'Uncategorized',
          parent: null,
          properties: null,
        },
        ...categories,
      ];
    });

    this.selectedProductSubscription = this.productSerive.selectedProduct
      .pipe(take(1))
      .subscribe((product) => {
        this.product = product;
        console.log(this.product);
      });

    this.activatedRoute.params.subscribe((params) => {
      if (params['id']) {
        this.productForm.get('productName').setValue(this.product.productName);

        this.productForm
          .get('productCategory')
          .setValue(this.product.productCategory);
        // this.categories = [this.product.productCategory, this.categories];

        console.log(this.product.productImages);
        this.productForm
          .get('productImages')
          .setValue(this.product.productImages);
        this.productForm.get('description').setValue(this.product.description);
        this.productForm.get('priceInUSD').setValue(this.product.priceInUSD);
      }
    });
  }

  onImagePreview(event: Event): void {
    const file = (event.target as HTMLInputElement).files[
      (event.target as HTMLInputElement).files.length - 1
    ];

    this.imageFiles.push(file);
    this.productForm.get('productImages').updateValueAndValidity();

    const reader = new FileReader();

    reader.onload = (e) => {
      this.imagePaths.push(e.target.result as string);
    };

    reader.readAsDataURL(file);
  }

  onSubmitProduct(): void {
    if (this.productForm.invalid) return;

    let formData = new FormData();

    formData.append('id', null);
    console.log('form: ', this.productForm.value);

    if (this.activatedRoute.snapshot.params['id'])
      formData.set('id', this.activatedRoute.snapshot.params['id']);

    formData.append('productName', this.productForm.value.productName);
    formData.append(
      'productCategory',
      this.productForm.value.productCategory.id
    );
    formData.append('description', this.productForm.value.description);
    formData.append('priceInUSD', this.productForm.value.priceInUSD);
    this.imageFiles.forEach((file) => {
      formData.append('productImages', file);
    });

    console.log('trig');
    if (!this.activatedRoute.snapshot.params['id'])
      this.productsDataStorageService.createProduct(formData);
    else this.productsDataStorageService.updatedProduct(formData);
  }

  ngOnDestroy(): void {
    this.selectedProductSubscription.unsubscribe();
  }
}
