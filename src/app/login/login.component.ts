import { Component } from '@angular/core';
import { LoginService } from '../services/login.service';
import { User } from '../models/user';
import { NgModel } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { Request } from '../models/response/request';
import { ActivatedRoute, Router } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { LoginEventService } from '../services/loginEvent.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  email!: string;
  password!: string;
  name!: string; 
  surname!: string;
  user!: User;
  response!: Request;

  loginResult!: string;

  constructor(private loginService: LoginService,private authService: AuthService, private activatedRoute: Router, private loginEvent: LoginEventService) {};

  doLogin() {
    this.authService.doLogin(this.email, this.password).subscribe(
      response => {
        this.response = new Request;
        this.response = response;
        localStorage.setItem('token', this.response.token);
        localStorage.setItem('refreshToken', this.response.refreshToken);
        localStorage.setItem('expirationTime', Date.now() + 86400000 + '');
        localStorage.setItem('idUser', this.response.user.id.toString());
        if (this.response.statusCode == 500) {
          this.loginResult = 'Non è stata trovata alcuna utenza con questa combinazione di email e password'
        }
        if (this.response.user !== undefined && this.response.statusCode == 200) {
          this.loginResult = 'Benvenuto ' + this.response.user.name + ', il login è stato effettuato correttamente!';
        } else {
          this.loginResult = 'Non è stata trovata alcuna utenza con questa combinazione di email e password'
        }
        this.loginEvent.notifyOtherComponent();        
        this.activatedRoute.navigate(['/products'])
      }
    );
  }
}
