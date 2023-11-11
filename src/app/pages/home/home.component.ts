import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(private router: Router){

  }

  ngOnInit(){

    const container = document.querySelector('.container');
    container?.classList.add('loaded');

  }

  goGenarateSotries(){
    // Redirige al usuario a la vista de la generar historia
    this.router.navigate(['/generatestories']);
  }

}
