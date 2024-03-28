import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environment/environment";
import { Cart } from "../models/cart";
import { Request } from "../models/response/request";

@Injectable({
    providedIn: 'root'
  })
export class CartService {

    host = environment.HOST;
    product = environment.PRODUCT;
    category = environment.CATEGORY;
    cart = environment.CART;
    headers = new HttpHeaders;

    headeroption = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    params = new HttpParams()

    constructor(private http: HttpClient) {}

    getCartByUser(idUser: number) {
        this.params = new HttpParams().set('idUser', idUser);
        return this.http.get<Cart>(this.host + this.cart + '/getCart', {params: this.params})
    }

    clearCart(idUser: number) {
        this.headers= new HttpHeaders({
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'responseType': 'application/json',
            'Access-Control-Allow-Origin' : 'http://localhost:4200',
        })
        
        this.params = new HttpParams().set('idUser', idUser);
        return this.http.post<Cart>(this.host + this.cart + '/clearCart', null, {headers: this.headers, params: this.params})
    }

    deleteProductFromCart(idUser: number, idProduct: number) {
        this.headers= new HttpHeaders({
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'responseType': 'application/json',
            ',n' : 'http://localhost:4200',
        })
        this.params = new HttpParams().set('idUser', idUser).set('idProduct', idProduct);
        return this.http.post<Cart>(this.host + this.cart + '/removeProductFromCart', null, {headers: this.headers, params: this.params})        
    }

    addProductToCart(idUser: number, idProduct: number, productQuantity: number) {
        this.headers= new HttpHeaders({
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'responseType': 'application/json',
            'Access-Control-Allow-Origin' : 'http://localhost:4200',
        })
        this.params = new HttpParams().set('idUser', idUser).set('idProduct', idProduct).set('productQuantity', productQuantity);
        return this.http.post<Request>(this.host + this.cart + '/addToCart', null, {headers: this.headers, params: this.params})
    }
}