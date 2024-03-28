import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { ProductService } from '../services/product.service';
import { CategoryService } from '../services/category.service';
import { SubcategoryService } from '../services/subcategory.service';
import { CommonModule } from '@angular/common';
import { Category } from '../models/category';
import { Subcategory } from '../models/subCategory';
import { CartButton } from '../models/utility/cartButton';
import { CartService } from '../services/cart.service';
import { Request } from '../models/response/request';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {

  productsList!: Product[];
  categoryList!: Category[];
  subCategoryList!: Subcategory[];

  deleteResult?: string;
  idUser!: number;
  response!: Request;

  clickedButtons: boolean[] = [];
  cartButtons!: CartButton[];

  constructor(private productService: ProductService, private categoryService: CategoryService, private subCategoryService: SubcategoryService, private cartService: CartService) {}

  initializeCartButtons() {
    if (this.productsList.length > 0) {
      for (let i = 0; i <= this.productsList.length; i++) {
        this.cartButtons.push({id: i, clicked: false})
        this.clickedButtons.push(false);
      }
    }
  }
  
  ngOnInit(): void {
    this.idUser = parseInt(localStorage.getItem('idUser')!);
    this.productService.getProductsList().subscribe(
      response => {
        this.productsList = response;
        console.log(this.productsList);
      }
    )
    this.categoryService.getCategoryList().subscribe(
      response => {
        this.categoryList = response;
      }
    )
    this.subCategoryService.getSubCategoryList().subscribe(
      response => {
        this.subCategoryList = response;
      }
    )
  }

  deleteProduct(idProduct: number) {
    this.productService.deleteById(idProduct).subscribe(
      response => {
        this.deleteResult = response;
        this.ngOnInit();
      }
    )
  }

  cartClick(index: number, idProduct: number) {
    this.clickedButtons[index] = true;
    // Opzionalmente, reimposta il flag dopo un certo tempo se vuoi che l'effetto "clicked" sia temporaneo
    setTimeout(() => this.clickedButtons[index] = false, 1000); // 1000ms = 1 secondo
    this.cartService.addProductToCart(this.idUser, idProduct, 1).subscribe(response => {
      this.response = response;
    })
  }

}
