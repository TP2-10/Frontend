import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterService } from './register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registrationForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private registerService: RegisterService) {
     }

  ngOnInit(): void {
    this.registrationForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  register() {
    // Aquí puedes agregar la lógica para enviar los datos de registro al servidor
    // por ejemplo, utilizando un servicio de Angular
    if (this.registrationForm.valid) {
      const userData = this.registrationForm.value;
      this.registerService.registerUser(userData).subscribe(
        response => {
          console.log('User registered successfully:', response);
          // Aquí podrías redirigir al usuario a otra página o mostrar un mensaje de éxito, etc.
        },
        error => {
          console.error('Error registering user:', error);
          // Manejo de errores: mostrar un mensaje al usuario, etc.
        }
      );
    } else {
      // Manejo si el formulario no es válido
    }
    console.log(this.registrationForm.value);
  }

}
