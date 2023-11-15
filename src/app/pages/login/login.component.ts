import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms'
import { LoginService } from './login.service';
import { LoginRequest } from './models/loginInterface';
import { Router } from '@angular/router';
import { LoginResponse } from './models/LoginResponse';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm : FormGroup;
  showError: boolean = false;

  loginRequest: LoginRequest;
  loginResponse: LoginResponse;

  constructor(
    private formBuilder: FormBuilder,
    private loginservice: LoginService,
    private router: Router
  ) {}

  errorStatus: boolean = false;
  errorMsj:any = "";
  

  user = {

    //email: this.loginForm.controls.username.value,
    //password: this.loginForm.controls.password.value
  }



  ngOnInit(): void{

    //this.loginservice.sigIn(user).subscribe( data => {
    //  console.log(data);
    //})

    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

  }

  gotoFP(){
    this.router.navigate(['forgotpassword']);
  }

  

  onLogin(){

    this.loginRequest = this.loginForm.value

    this.loginservice.login(this.loginRequest).subscribe( (transformedData: LoginResponse) => {
      console.log(transformedData);
      this.loginResponse = transformedData
      //console.log(JSON.stringify(loginres.response));
      this.loginservice.setLoggedIn(true)
      this.showError = false
      this.router.navigate(['dashboard'])
      
    },
    error => {
      console.error('Error login user:', error);
      this.showError = true
      this.errorStatus = true;
      this.errorMsj = "ERROR CREDENCIAL INCORRECTAS";
      // Manejo de errores: mostrar un mensaje al usuario, etc.
    })

  }

}
