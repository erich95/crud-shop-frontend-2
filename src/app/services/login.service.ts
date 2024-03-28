import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  host = environment.HOST;
  product = environment.PRODUCT;
  category = environment.CATEGORY;
  cart = environment.CART;
  login = environment.LOGIN;

  headeroption = {
    headers: new HttpHeaders({
        'Accept': '*/*',
        // 'Content-Type': 'application/json',
        'Access-Control-Allow-Origin' : 'http://localhost:4200',
        // 'Access-Control-Allow-Methods' : 'GET, POST, PUT, DELETE',
        // 'Access-Control-Allow-Headers' : 'Content-Type'
    })
};

  params = new HttpParams().set('key', 'value');

  constructor(private http: HttpClient) { }

  doLogin(email: string, password: string) {
    this.params = new HttpParams().set('email', email).set('password', password);
    return this.http.get<User>(this.host + this.login + '/login', {params: this.params});
  }
}
