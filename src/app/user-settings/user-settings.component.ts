import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { User } from '../models/user';
import { Request } from '../models/response/request';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrl: './user-settings.component.scss'
})
export class UserSettingsComponent implements OnInit {

  idUser!: number;
  user!: User;
  request = new Request();

  actualPassword!: string;
  newPassword!: string;

  constructor(private authService: AuthService){}


  form = new FormGroup({
    name: new FormControl<string>('', {
      validators: [
          Validators.required,
      ],
  }),
    brandName: new FormControl<string>('', {
      validators: [
          Validators.required,
      ],
  }),
    description: new FormControl<string>('', {
      validators: [
          Validators.required,
      ],
  }),
    subcategory: new FormControl<any>('',
    {
      validators: [
          Validators.required,
      ],
  }),
    imgUrl: new FormControl<string>('',
    {
      validators: [
          Validators.required,
      ],
  }),
    price: new FormControl<number>(0, {
      validators: [
          Validators.required,
      ],
  })
  });

  updateInfo() {
    this.idUser = parseInt(localStorage.getItem('idUser')!);
    var user = new User();
    user.id = this.idUser;
    user.name = this.user.name;
    user.surname = this.user.surname;
    user.email = this.user.email;
    user.role = this.user.role;
    this.request = new Request();
    this.request.user = user;
    this.request.password = this.actualPassword;
    this.request.newPassword = this.newPassword;
    this.authService.updateUserInfo(this.request).subscribe(response => {
      this.request = response;
    })
  }



  ngOnInit(): void {
    this.idUser = parseInt(localStorage.getItem('idUser')!);
    this.authService.getUserById(this.idUser).subscribe(response => {
      this.user = response;
    })
  }

}
