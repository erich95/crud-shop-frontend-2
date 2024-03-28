import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environment/environment";
import { Product } from "../models/product";
import { ProductDTO } from "../models/dto/productDTO";
import { Observable } from "rxjs";
import { ResponseObject } from "../models/response/responseObject";

@Injectable({
    providedIn: 'root'
  })
export class ProductService {
    host = environment.HOST;
    product = environment.PRODUCT;
    category = environment.CATEGORY;

    headers= new HttpHeaders();

    headeroption = {
        headers: new HttpHeaders({
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'responseType': 'application/json',
            'Access-Control-Allow-Origin' : 'http://localhost:4200',
        })
    };

    params = new HttpParams();
    headers1: any;

    constructor(private http: HttpClient) {} 
    
    getProductsList() {
        return this.http.get<Array<Product>>(this.host + this.product + '/all')
    }

    getProductById(idProduct: number) {
        this.headers= new HttpHeaders({
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'responseType': 'application/json',
            'Access-Control-Allow-Origin' : 'http://localhost:4200',
        })
        this.params = new HttpParams().set('idProduct', idProduct)
        return this.http.get<Product>(this.host + this.product + '/findById', {params: this.params})
    }

    getProductsByCategory(categoryName: string) {
        this.headers= new HttpHeaders({
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'responseType': 'application/json',
            'Access-Control-Allow-Origin' : 'http://localhost:4200',
        })
        this.params = new HttpParams().set('categoryName', categoryName)
        return this.http.get<Product[]>(this.host + this.product + '/byCategory', {params: this.params})
    }

    getProductsBySubCategory(subCategoryName: string) {
        this.headers= new HttpHeaders({
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'responseType': 'application/json',
            'Access-Control-Allow-Origin' : 'http://localhost:4200',
        })
        this.params = new HttpParams().set('subCategoryName', subCategoryName)
        return this.http.get<Product[]>(this.host + this.product + '/bySubCategory', {params: this.params})
    }

    getProductsByBrandName(brandName: string) {
        this.headers= new HttpHeaders({
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'responseType': 'application/json',
            'Access-Control-Allow-Origin' : 'http://localhost:4200',
        })
        this.params = new HttpParams().set('brandName', brandName)
        return this.http.get<Product[]>(this.host + this.product + '/byBrandName', {params: this.params})
    }

    getProductsByNameContaining(text: string) {
        this.headers= new HttpHeaders({
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'responseType': 'application/json',
            'Access-Control-Allow-Origin' : 'http://localhost:4200',
        })
        this.params = new HttpParams().set('text', text)
        return this.http.get<Product[]>(this.host + this.product + '/search', {params: this.params})
    }

    addProducts(productList: ProductDTO[]) {
        var productJSON = JSON.stringify(productList);
        return this.http.post<ResponseObject>(this.host + this.product + '/addProducts', productJSON, this.headeroption)
    }

    modifyProduct(productDTO: ProductDTO, idProduct: number) {
        this.headers= new HttpHeaders({
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'responseType': 'application/json',
            'Access-Control-Allow-Origin' : 'http://localhost:4200',
        })
        this.params = new HttpParams().set('idProduct', idProduct)
        var productDTOJSON = JSON.stringify(productDTO);
        return this.http.put<ResponseObject>(this.host + this.product + '/modifyProduct', productDTOJSON, {headers: this.headers, params: this.params} )
    }

    deleteById(idProduct: number) : Observable<string> {
        const options = {
            headers: new HttpHeaders({
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'responseType': 'application/json',
                'Access-Control-Allow-Origin' : 'http://localhost:4200',
            }),
            params: new HttpParams().set('idProduct', idProduct)
          }
        this.params = new HttpParams().set('idProduct', idProduct)
        return this.http.delete<string>(this.host + this.product + '/delete', options)
    }
} 