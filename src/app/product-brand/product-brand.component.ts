import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { ResponseObject } from '../models/response/responseObject';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-brand',
  templateUrl: './product-brand.component.html',
  styleUrl: './product-brand.component.scss'
})
export class ProductBrandComponent implements OnInit {
  brandName!: string;
  productsList!: Product[];
  deleteResult!: ResponseObject;

  constructor(private activatedRoute: ActivatedRoute, private productService: ProductService) {}
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(s => {
      this.brandName = (s["brandName"]);
      console.log(s["brandName"])
      this.productService.getProductsByBrandName(this.brandName).subscribe(
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
