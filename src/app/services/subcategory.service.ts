import { environment } from "src/environment/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Subcategory } from "../models/subCategory";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
  })
export class SubcategoryService {
    host = environment.HOST;
    product = environment.PRODUCT;
    category = environment.CATEGORY;
    subcategory = environment.SUBCATEGORY;

    headeroption = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    constructor(private http: HttpClient) {} 

    getSubCategoryList() {
        return this.http.get<Array<Subcategory>>(this.host + this.subcategory + '/all')
    }
}