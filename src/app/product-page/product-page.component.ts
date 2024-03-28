import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../models/product';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.scss'
})
export class ProductPageComponent implements OnInit {

  idProduct! : number;
  product!: Product;
  constructor(private productService: ProductService, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(s => {
      this.idProduct = parseInt(s["id"]);      
      console.log(s["id"])

      this.productService.getProductById(this.idProduct).subscribe(
        response => {
          this.product = response;
        }
      )

    });

  }
}
