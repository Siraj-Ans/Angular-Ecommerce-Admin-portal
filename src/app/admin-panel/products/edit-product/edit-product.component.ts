import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, take } from 'rxjs';

import { Category } from '../../categories/categories.model';
import { Product } from '../products.model';

import { ProductDataStorageService } from '../products-dataStorage.service';
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
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private productsDataStorageService: ProductDataStorageService,
    private productSerive: ProductsService,
    private categoryService: CategoriesService
  ) {}

  ngOnInit(): void {
    this.productSerive.editMode.next('edit-mode');

    this.productForm = new FormGroup({
      productName: new FormControl(null, Validators.required),
      productCategory: new FormControl(null, Validators.required),
      productImages: new FormControl(null, [Validators.required]),
      description: new FormControl(null, Validators.required),
      priceInUSD: new FormControl(null, Validators.required),
    });

    this.categories = [
      {
        id: null,
        categoryName: 'Uncategorized',
        parent: null,
        properties: null,
      },

      ...this.categoryService.getCategories(),
    ];

    this.selectedProductSubscription = this.productSerive.selectedProduct
      .pipe(take(1))
      .subscribe((product) => {
        this.product = product;
      });

    this.activatedRoute.params.subscribe((params) => {
      if (params['id']) {
        this.product = this.productSerive.getProductById(params['id']);

        this.productForm.get('productName').setValue(this.product.productName);

        this.productForm
          .get('productCategory')
          .setValue(this.product.productCategory);
        this.categories = [this.product.productCategory, ...this.categories];

        this.imageFiles = this.product.productImages;
        console.log(this.imageFiles);
        // console.log(this.productForm.get('productImages'));
        // this.productForm
        //   .get('productImages')
        //   .setValue(this.product.productImages);
        this.productForm.get('description').setValue(this.product.description);
        this.productForm.get('priceInUSD').setValue(this.product.priceInUSD);
      }
    });
  }

  onCancelEdit(): void {
    this.productSerive.editMode.next('no-edit');
    this.router.navigate(['adminpanel/products']);
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

    if (!this.activatedRoute.snapshot.params['id'])
      this.productsDataStorageService.createProduct(formData);
    else this.productsDataStorageService.updatedProduct(formData);
  }

  ngOnDestroy(): void {
    this.selectedProductSubscription.unsubscribe();
  }
}
