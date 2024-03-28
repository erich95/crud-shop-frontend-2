import { Component, OnInit } from '@angular/core';
import { ProductDTO } from '../models/dto/productDTO';
import { Subcategory } from '../models/subCategory';
import { ResponseObject } from '../models/response/responseObject';
import { ProductService } from '../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../models/product';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SubcategoryService } from '../services/subcategory.service';

@Component({
  selector: 'app-product-modify',
  templateUrl: './product-modify.component.html',
  styleUrl: './product-modify.component.scss'
})
export class ProductModifyComponent implements OnInit {
  idProduct!: number;

  subCategoryList!: Subcategory[];
  subCategory?: Subcategory;
  tempProductsList: ProductDTO[] = [];
  productDTO!: ProductDTO;
  product!: Product;

  name!: string;
  price!: number;
  imgUrl!: string;
  subCategoryId!: number;
  saveDone : boolean = false;

  // form!: FormGroup;

  result!: ResponseObject;

  constructor(private productService: ProductService, private subCategoryService: SubcategoryService,private activatedRoute: ActivatedRoute) {}

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

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(s => {
      this.idProduct = parseInt(s["id"]);      
      console.log(s["id"])

      this.subCategoryService.getSubCategoryList().subscribe(
        response => {
          this.subCategoryList = response;
        }
      )

      this.productService.getProductById(this.idProduct).subscribe(
        response => {
          this.product = response;

          // this.form = new FormGroup({
          //   name: new FormControl<string>('', {
          //     validators: [
          //         Validators.required,
          //     ],
          // }),
          //   brandName: new FormControl<string>('', {
          //     validators: [
          //         Validators.required,
          //     ],
          // }),
          //   description: new FormControl<string>('', {
          //     validators: [
          //         Validators.required,
          //     ],
          // }),
          //   subcategory: new FormControl<any>('',
          //   {
          //     validators: [
          //         Validators.required,
          //     ],
          // }),
          //   imgUrl: new FormControl<string>('',
          //   {
          //     validators: [
          //         Validators.required,
          //     ],
          // }),
          //   price: new FormControl<number>(0, {
          //     validators: [
          //         Validators.required,
          //     ],
          // })
          // });
        }
      )
    });
  }

  applyChanges() {
    this.productDTO = new ProductDTO;
    this.productDTO.id = this.product.id;
    this.productDTO.name = this.product.name;
    this.productDTO.brandName = this.product.brandName;
    this.productDTO.description = this.product.description;
    this.productDTO.imgUrl = this.product.imgUrl;
    this.productDTO.price = this.product.price;
    this.productDTO.subCategoryId = parseInt(this.form.value.subcategory);
    this.productService.modifyProduct(this.productDTO, this.product.id).subscribe(
      response => {
        this.result = response;
        this.saveDone = true;
        console.log('Changes applied!')
      }
    )
    console.log('Apply changes')
  }


}
