import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import { StorieService } from './storie.service';
import { trigger, state, style, transition, animate } from '@angular/animations'; 

interface Storie {
  name: string;
  sound: string;
  image: string;
}

@Component({
  selector: 'app-stories',
  templateUrl: './stories.component.html',
  styleUrls: ['./stories.component.css'],
  animations: [
    trigger('fadeAnimation', [
      state('in', style({ opacity: 1 })),
      state('out', style({ opacity: 0, display: 'none' })),
      transition('in => out', animate('1s')),
      transition('out => in', animate('1s')),
    ]),
    trigger('storyAnimation', [
      state('in', style({ opacity: 1 })),
      state('out', style({ opacity: 0, display: 'none' })),
      transition('in => out', animate('1s')),
      transition('out => in', animate('1s')),
    ]),
  ],
})
export class StoriesComponent implements OnInit {
  storieControl = new FormControl<Storie | null>(null, Validators.required);
  selectFormControl = new FormControl('', Validators.required);
  stories: Storie[] = [
    {name: 'Dragons', sound: 'Woof!', image: 'assets/img/Stories_img/dragons.jpg' },
    {name: 'Cars', sound: 'Meow!', image: 'assets/img/Stories_img/cars.jpg'},
    {name: 'Robots', sound: 'Moo!', image: 'assets/img/Stories_img/robots.jpg'},
    {name: 'Fox', sound: 'Wa-pa-pa-pa-pa-pa-pow!', image: 'assets/img/icons/multiaventura.jpg'},
  ];

  storyForm: FormGroup;
  generatedStory: string;
  showStory: boolean = false; // Controla la visibilidad de la historia generada
  showform: boolean = true;


  constructor(
    private formBuilder: FormBuilder,
    private storieService: StorieService
    ) {
    // Constructor del componente
  }
  

  ngOnInit() {
    // Inicializa el FormGroup y los FormControl en el método ngOnInit
    this.storyForm = this.formBuilder.group({
      storieControl: ['', Validators.required],
      mainCharacter: ['', Validators.required], // Campo "Personaje Principal" con validación requerida
      place: ['', Validators.required], // Campo "Lugar" con validación requerida
      genre: ['', Validators.required], // Campo "Género" con validación requerida
      audience: ['', Validators.required] // Campo "Público" con validación requerida
    });
  }

  onClick(){
    this.showform = false;
    this.showStory = true;
    //window.open('https://www.google.com/', '_blank');
    const formData = this.storyForm.value;
    console.log("FORMULARIO CAMPOS: " + JSON.stringify(formData))

    const storyRequest = {
      plot: formData.storieControl.name,
      mainCharacter: formData.mainCharacter,
      place: formData.place,
      genre: formData.genre,
      audience: formData.audience
    };

    // Enviar la solicitud al backend y obtener la respuesta
    this.storieService.generateStory(storyRequest).subscribe((response: any) => {
      // Accede a la historia generada desde la respuesta
      const generatedStory = response.story;

      // Asigna la historia generada a la variable
      this.generatedStory = generatedStory;

      console.log('GENERATED STORIE: ' + this.generatedStory)
    });
  }

}
