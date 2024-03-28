import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { Cart } from '../models/cart';
import { CartDetail } from '../models/cartDetail';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
  idUser!: number;
  cart!: Cart;
  cartDetailList!: CartDetail[];
  totalPrice: number = 0;

  constructor(private cartService: CartService) {}
  
  ngOnInit(): void {
    this.idUser = parseInt(localStorage.getItem('idUser')!);
    if (this.idUser !== null && this.idUser !== undefined) {
      this.cartService.getCartByUser(this.idUser).subscribe(
        response => {
          this.cart = response;
          this.cartDetailList = response.cartDetail;
          this.calculateTotalCheckOutPrice();
        }
      )
    }
  };

  calculateTotalCheckOutPrice() {
    this.totalPrice = 0;
    this.cartDetailList.forEach(x => {
      x.totalPrice = x.productQuantity * x.products.price
      this.totalPrice += x.totalPrice
    })
  }

  deleteProductFromCart(idProduct: number) {
    this.cartService.deleteProductFromCart(this.idUser, idProduct).subscribe(response => {
      this.cart = response;
      this.ngOnInit();
    })
  }

  clearCart() {
    this.cartService.clearCart(this.idUser).subscribe(response => {
      this.cart = response;
      this.ngOnInit();
    })
  }



  test() {
    console.log(this.cartDetailList)
    this.calculateTotalCheckOutPrice();
  }

}
