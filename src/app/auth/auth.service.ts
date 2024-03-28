import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';
import { User } from '../models/user';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Request } from '../models/response/request';
import { LoginEventService } from '../services/loginEvent.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  host = environment.HOST;
  product = environment.PRODUCT;
  category = environment.CATEGORY;
  cart = environment.CART;
  login = environment.LOGIN;
  auth = environment.AUTH;

  request!: Request;
  userJson!: string;

  headeroption = {
    headers: new HttpHeaders({
        'Accept': '*/*',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin' : 'http://localhost:4200',
        'Access-Control-Allow-Methods' : 'GET, POST, PUT, DELETE',
        // 'Access-Control-Allow-Headers' : 'Content-Type'
    })
};

headers= new HttpHeaders({
  'Accept': 'application/json',
  'Content-Type': 'application/json',
  'responseType': 'application/json',
  'Access-Control-Allow-Origin' : 'http://localhost:4200',
})

  params = new HttpParams().set('key', 'value');

  constructor(private http: HttpClient) { }

  public isAuthenticated() : boolean {
    const token = localStorage.getItem('authToken');
    const helper = new JwtHelperService();
    const isExpired = helper.isTokenExpired(token);
    return !isExpired;
  }

  doSignUp(email: string, password: string, name: string, surname: string, role: string) {
    // this.params = new HttpParams().set('email', email).set('password', password);
    this.request = new Request;
    this.request.email = email;
    this.request.password = password;
    this.request.name = name;
    this.request.surname = surname;
    this.request.role = role;
    var requestDTO = JSON.stringify(this.request);
    return this.http.post<Request>(this.host + this.auth + '/signUp', requestDTO, this.headeroption);
  }

  doLogin(email: string, password: string) {
    // this.params = new HttpParams().set('email', email).set('password', password);
    this.request = new Request;
    this.request.email = email;
    this.request.password = password;
    var requestDTO = JSON.stringify(this.request);
    return this.http.post<Request>(this.host + this.auth + '/signIn', requestDTO, this.headeroption);
  }

  updateUserInfo(user: Request) {
    this.userJson = JSON.stringify(user);
    return this.http.post<Request>(this.host + this.auth + '/userSetting', this.userJson, {headers: this.headers});
  }

  getUserById(idUser: number) {
    this.params = new HttpParams().set('idUser', idUser);
    return this.http.get<User>(this.host + this.auth + '/getUserById', {headers: this.headers, params: this.params});
  }
}
