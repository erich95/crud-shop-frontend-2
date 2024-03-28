import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { ResponseObject } from '../models/response/responseObject';

@Injectable({
    providedIn: 'root'
  })
export class SignUpService {
    host = environment.HOST;
    product = environment.PRODUCT;
    category = environment.CATEGORY;
    cart = environment.CART;
    login = environment.LOGIN;
    params! : HttpParams;
    
    constructor(private http: HttpClient) { }

    headeroption = {
        headers: new HttpHeaders({
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'responseType': 'application/json',
            'Access-Control-Allow-Origin' : 'http://localhost:4200',
        })
    };

    doSignUp(email: string, password: string, name: string, surname: string) : Observable<ResponseObject> {
        // const options = {
        //     headers: new HttpHeaders({
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json',
        //         'responseType': 'application/json',
        //         'Access-Control-Allow-Origin' : 'http://localhost:4200',
        //     }),
        //     params : new HttpParams().set('email', email).set('password', password).set('name', name).set('surname', surname)
        //   }
        this.params =  new HttpParams().set('email', email).set('password', password).set('name', name).set('surname', surname)
        return this.http.post<ResponseObject>(this.host + this.login + '/signup', this.headeroption, {params: this.params});       
    }
}