import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrl: './search-result.component.scss'
})
export class SearchResultComponent implements OnInit {
  
  constructor(private productService: ProductService, private activatedRoute: ActivatedRoute) {}

  productsList!: Product[];
  searchText!: string;
  
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(s => {
      this.searchText = (s["searchText"]);
      console.log(s["searchText"]);
      this.productService.getProductsByNameContaining(this.searchText).subscribe(
        response => {
          this.productsList = response;
        }
      )
    });
  }

}
