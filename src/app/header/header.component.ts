import { Component, Injectable, OnInit } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { Category } from '../models/category';
import { ProductService } from '../services/product.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRouteSnapshot } from '@angular/router';
import { Product } from '../models/product';
import { LoginEventService } from '../services/loginEvent.service';
import { CartService } from '../services/cart.service';
import { Cart } from '../models/cart';

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

  categoryList!: Category[];
  searchText!: string;
  productsList!: Product[];
  idUser!: number;
  cart!: Cart;

  constructor(private categoryService: CategoryService, private productService: ProductService,private cartService: CartService, private loginEvent: LoginEventService) {}
  
  form = new FormGroup({
    searchText: new FormControl<string>('', {
      validators: [
          Validators.required,
      ],
    }),
  });

  

  search() {
    this.productService.getProductsByNameContaining(this.searchText).subscribe(
      response => {
        this.productsList = response;
      }
    )
  }

  checkSearchInputValue() {
    if (this.searchText == undefined) {
      this.searchText = '';
    }
  }

  signOut() {
    localStorage.clear();
    this.categoryList.length = 0;
    this.ngOnInit();
  }

  getCartByUser() {
    this.cartService.getCartByUser(this.idUser).subscribe(
      response => {
        this.cart = response;
      }
    )
  }

  ngOnInit(): void {    
    this.idUser = parseInt(localStorage.getItem('idUser')!);
    this.categoryService.getCategoryList().subscribe(
      response => {
        this.categoryList = response;
      }
    )
    this.loginEvent.notifyObservable.subscribe(() => {
      this.ngOnInit();
    });
  }
}
