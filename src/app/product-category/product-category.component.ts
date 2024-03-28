import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Subcategory } from '../models/subCategory';
import { Product } from '../models/product';
import { Category } from '../models/category';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrl: './product-category.component.scss'
})
export class ProductCategoryComponent implements OnInit {

  constructor(private productService: ProductService, private activatedRoute: ActivatedRoute) {}

  productsList!: Product[];
  categoryList!: Category[];
  subCategoryList!: Subcategory[];
  
  categoryName!: string; 
  deleteResult?: string;

  

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(s => {
      this.categoryName = (s["name"]);
      console.log(s["name"])
      this.productService.getProductsByCategory(this.categoryName).subscribe(
        response => {
          this.productsList = response;
        }
      )
    });

  }

  deleteProduct(idProduct: number) {
    this.productService.deleteById(idProduct).subscribe(
      response => {
        this.deleteResult = response;
        this.ngOnInit();
      }
    )
  } 

}
