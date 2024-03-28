import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product';
import { ResponseObject } from '../models/response/responseObject';

@Component({
  selector: 'app-product-subcategory',
  templateUrl: './product-subcategory.component.html',
  styleUrl: './product-subcategory.component.scss'
})
export class ProductSubcategoryComponent implements OnInit {
  subCategoryName!: string;
  productsList!: Product[];
  deleteResult!: ResponseObject;

  constructor(private activatedRoute: ActivatedRoute, private productService: ProductService) {}
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(s => {
      this.subCategoryName = (s["name"]);
      console.log(s["name"])
      this.productService.getProductsBySubCategory(this.subCategoryName).subscribe(
        response => {
          this.productsList = response;
        }
      )
    });
  }

  // deleteProduct(idProduct: number) {
  //   this.productService.deleteById(idProduct).subscribe(
  //     response => {
  //       this.deleteResult = response;
  //       this.ngOnInit();
  //     }
  //   )
  // }

}
