import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { SubcategoryService } from '../services/subcategory.service';
import { Subcategory } from '../models/subCategory';
import { ProductService } from '../services/product.service';
import { ProductDTO } from '../models/dto/productDTO';
import { EmailValidator, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { ResponseObject } from '../models/response/responseObject';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss'
})
export class AddProductComponent implements OnInit {

  subCategoryList!: Subcategory[];
  subCategory?: Subcategory;
  tempProductsList: ProductDTO[] = [];
  product!: ProductDTO;

  name!: string;
  price!: number;
  imgUrl!: string;
  subCategoryId!: number;
  saveDone : boolean = false;

  result!: ResponseObject;

  constructor(private subCategoryService: SubcategoryService, private productsService: ProductService, private formBuilder: FormBuilder) {}

  // form = this.formBuilder.group({
  //   name: '',
  //   address: ''
  // });

  form = new FormGroup({
    name: new FormControl<string>('', {
      validators: [
          Validators.required,
      ],
  }),
    brandName: new FormControl<string>('', {
      validators: [
          Validators.required,
      ],
  }),
    description: new FormControl<string>('', {
      validators: [
          Validators.required,
      ],
  }),
    subcategory: new FormControl<any>('',
    {
      validators: [
          Validators.required,
      ],
  }),
    imgUrl: new FormControl<string>('',
    {
      validators: [
          Validators.required,
      ],
  }),
    price: new FormControl<number>(0, {
      validators: [
          Validators.required,
      ],
  })
  });


//   form: FormGroup = new FormGroup({
//     name: new FormControl('Name', {
//         validators: [
//             Validators.required,
//         ],
//     }),
//     subcategory: new FormGroup({
//         email: new FormControl('Subcategory', {
//             validators: [
//                 Validators.required,
//                 // Validators.pattern(EmailValidato)
//             ],
//         }),
//     }),
//     imgUrl: new FormGroup({
//         email: new FormControl(null, {
//             validators: [
//                 Validators.required,
//                 // Validators.pattern(EMAIL_PATTERN)
//             ],
//         }),
//     }),
//     price: new FormGroup({
//       email: new FormControl(null, {
//           validators: [
//               Validators.required,
//               // Validators.pattern(EMAIL_PATTERN)
//           ],
//       }),
//   }),
// });

  ngOnInit(): void {
    this.subCategoryService.getSubCategoryList().subscribe(
      response => {
        this.subCategoryList = response;
      }
    )
  }
  

  createProduct() {
    if (this.form.value.name && this.form.value.subcategory && this.form.value.imgUrl && this.form.value.price && this.form.value.brandName && this.form.value.description ) {
      this.product = new ProductDTO;
      this.product.name = this.form.value.name!;
      this.product.description = this.form.value.description!;
      this.product.brandName = this.form.value.brandName!;
      this.product.price = this.form.value.price!;
      this.product.imgUrl = this.form.value.imgUrl!;
      this.product.subCategoryId = Number(this.form.value.subcategory);
      this.tempProductsList.push(this.product);
      this.saveDone = false; 
    } else {
      alert('Missing data')
    } 

  }

  saveTempProducts() {
    this.productsService.addProducts(this.tempProductsList).subscribe(
      response => {
        this.result = new ResponseObject;
        this.result = response;
        this.saveDone = true;
        // this.ngOnInit();
      }
    )
  }

  deleteProduct(index: number) {
    this.tempProductsList = this.tempProductsList.splice(index, 1);
  }


}

