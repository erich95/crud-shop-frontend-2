import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environment/environment";
import { Stock } from "../models/stock";
import { ResponseObjectStock } from "../models/response/responseObjectStock";

@Injectable({
    providedIn: 'root'
  })
  export class StockService {
    host = environment.HOST;
    product = environment.PRODUCT;
    category = environment.CATEGORY;
    cart = environment.CART;
    login = environment.LOGIN;
    stock = environment.STOCK;

    constructor(private http: HttpClient) {}

    getAllStock() {
        return this.http.get<ResponseObjectStock>(this.host + this.stock + '/getAllStock');
    }

  }