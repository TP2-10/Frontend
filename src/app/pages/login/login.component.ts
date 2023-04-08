import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms'
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    usuario : new FormControl('', Validators.required),
    password : new FormControl('', Validators.required)

  })

  constructor(
    private loginservice: LoginService
  ) {}

  ngOnInit(): void{

  }

  user = {

    nombre: this.loginForm.controls.usuario.value,
    pass: this.loginForm.controls.password.value

  }

  onLogin(form: any){
    console.log(form)

    this.loginservice.sigIn(this.user).subscribe( res => {
      //console.log(res);
    })
  }

}
