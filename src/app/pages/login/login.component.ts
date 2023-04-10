import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms'
import { LoginService } from './login.service';
import { LoginIn } from './models/loginInterface';
import { Router } from '@angular/router';
import { LoginResponse } from './models/LoginResponse';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    email : new FormControl('', Validators.required),
    password : new FormControl('', Validators.required)

  })

  constructor(
    private loginservice: LoginService,
    private router: Router
  ) {}

  errorStatus: boolean = false;
  errorMsj:any = "";
  

  user = {

    email: this.loginForm.controls.email.value,
    password: this.loginForm.controls.password.value
  }



  ngOnInit(): void{

    //this.loginservice.sigIn(user).subscribe( data => {
    //  console.log(data);
    //})

  }

  gotoFP(){
    this.router.navigate(['forgotpassword']);
  }

  

  onLogin(form: any){
    console.log(form)

    this.loginservice.sigIn(form).subscribe( res => {
      console.log(res);
      let loginres: LoginResponse = res;
      //console.log(JSON.stringify(loginres.response));
      if(loginres.token != null){
        this.router.navigate(['dashboard']);
        console.log(this.errorStatus)
      }else{
        this.errorStatus = true;
        this.errorMsj = "ERROR CREDENCIAL INCORRECTAS";
        console.log(this.errorStatus)

      }
      
      
    })
  }

}
