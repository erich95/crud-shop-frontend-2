import { Component } from '@angular/core';
import { SignUpService } from '../services/signup.service';
import { ResponseObject } from '../models/response/responseObject';
import { AuthService } from '../auth/auth.service';
import { Request } from '../models/response/request';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  name!: string;
  surname!: string;
  email!: string;
  password!: string;

  signUpResult = new ResponseObject();
  request!: Request;

  roleList: string[] = ['ADMIN', 'USER'];
  role!: string;
  

  constructor(private signUpService: SignUpService, private authService: AuthService){};

  doSignUp() {
    return this.authService.doSignUp(this.email, this.password, this.name, this.surname, this.role).subscribe(
      response => {
        this.request = response;
      }

    )
  }

}
