import { Component } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';

interface Animal {
  name: string;
  sound: string;
  image: string;
}

@Component({
  selector: 'app-stories',
  templateUrl: './stories.component.html',
  styleUrls: ['./stories.component.css']
})
export class StoriesComponent {
  animalControl = new FormControl<Animal | null>(null, Validators.required);
  selectFormControl = new FormControl('', Validators.required);
  animals: Animal[] = [
    {name: 'Dragons', sound: 'Woof!', image: 'assets/img/Stories_img/dragons.jpg' },
    {name: 'Cars', sound: 'Meow!', image: 'assets/img/Stories_img/cars.jpg'},
    {name: 'Robots', sound: 'Moo!', image: 'assets/img/Stories_img/robots.jpg'},
    {name: 'Fox', sound: 'Wa-pa-pa-pa-pa-pa-pow!', image: 'assets/img/icons/multiaventura.jpg'},
  ];

  onClick(){
    window.open('https://www.google.com/', '_blank');
  }

}
