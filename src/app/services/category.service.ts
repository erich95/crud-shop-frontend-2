import { environment } from "src/environment/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Category } from "../models/category";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
  })
export class CategoryService {
    host = environment.HOST;
    product = environment.PRODUCT;
    category = environment.CATEGORY;

    headeroption = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    constructor(private http: HttpClient) {} 

    getCategoryList() {
        return this.http.get<Array<Category>>(this.host + this.category + '/all')
    }  
}