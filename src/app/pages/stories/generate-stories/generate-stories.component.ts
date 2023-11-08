import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import { GenerateStoriesService} from './generate-stories.service';
import { trigger, state, style, transition, animate } from '@angular/animations'; 
import { VoiceAssistantService } from '../voice-assistant/voice-assistant.service';
import { Router } from '@angular/router';

declare var webkitSpeechRecognition: any

interface Storie {
  name: string;
  sound: string;
  image: string;
}

@Component({
  selector: 'app-generate-stories',
  templateUrl: './generate-stories.component.html',
  styleUrls: ['./generate-stories.component.css'],
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
export class GenerateStoriesComponent implements OnInit {
  storieControl = new FormControl<Storie | null>(null, Validators.required);
  selectFormControl = new FormControl('', Validators.required);
  stories: Storie[] = [
    {name: 'Dragons', sound: 'Woof!', image: 'assets/img/Stories_img/dragons.jpg' },
    {name: 'Cars', sound: 'Meow!', image: 'assets/img/Stories_img/cars.jpg'},
    {name: 'Robots', sound: 'Moo!', image: 'assets/img/Stories_img/robots.jpg'},
    {name: 'Fox', sound: 'Wa-pa-pa-pa-pa-pa-pow!', image: 'assets/img/icons/multiaventura.jpg'},
  ];

  audienceOptions = [
    'Niños de 6 años',
    'Niños de 7 años',
    'Niños de 8 años',
    'Niños de 9 años'
  ];

  storyForm: FormGroup;
  generatedStory: string;
  showStory: boolean = false; // Controla la visibilidad de la historia generada
  showform: boolean = true;
  showQuestions: boolean = false;
  showAudio: boolean = false;
  showGenerateAudio: boolean = false;
  showNewContainer: boolean = false;
  generatedQuestions: any;
  questions: [];
  images: [];
  audioData: Blob | null = null;
  //audioUrl: string | null = null;
  audioUrl: string;
  storyId = 'ID_DE_LA_HISTORIA'; // Reemplaza esto con el ID real
  recording = false;
  mediaRecorder: MediaRecorder;
  audioChunks: Blob[] = [];

  audioStream: MediaStream;
  //audioChunks: Blob[] = [];

  isRecording = false;
  recognition = new webkitSpeechRecognition();
  audioBlob: Blob;
  recognizedText : any;
  acumulatedTranscription : string = ''

 


  constructor(
    private formBuilder: FormBuilder,
    private generateStoriesService: GenerateStoriesService,
    private voiceAssistantService: VoiceAssistantService,
    private router: Router
    ) {
    // Constructor del componente
    this.recognition.lang = 'es-ES';
    this.recognition.continuous = true;
    
  }
  

  ngOnInit() {
    this.recognition.continuous = true;
    // Inicializa el FormGroup y los FormControl en el método ngOnInit
    this.storyForm = this.formBuilder.group({
      storieControl: ['', Validators.required],
      mainCharacter: ['', Validators.required], // Campo "Personaje Principal" con validación requerida
      place: ['', Validators.required], // Campo "Lugar" con validación requerida
      genre: ['', Validators.required], // Campo "Género" con validación requerida
      audience: ['', Validators.required] // Campo "Público" con validación requerida
    });

    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) 
{
  console.log("speech recognition API supported");
} 
else 
{
  console.log("speech recognition API not supported")
}
  }

  onClick(){
    this.showNewContainer= true;
    this.showform = false;
    this.showStory = true;
    
    //window.open('https://www.google.com/', '_blank');
    const formData = this.storyForm.value;
    console.log("FORMULARIO CAMPOS: " + JSON.stringify(formData))

    const storyRequest = {
      plot: formData.storieControl,
      mainCharacter: formData.mainCharacter,
      place: formData.place,
      genre: formData.genre,
      audience: formData.audience
    };

    // Enviar la solicitud al backend y obtener la respuesta
    this.generateStoriesService.generateStory(storyRequest).subscribe((response: any) => {
      // Accede a la historia generada desde la respuesta
      const generatedStory = response.story.content;

      // Asigna la historia generada a la variable
      this.generatedStory = generatedStory;

      const images = response.images;

      this.images = images

      console.log('GENERATED STORIE: ' + this.generatedStory)

      this.showGenerateAudio = true
    });

    //this.generateAudio(this.generatedStory)
  }

  onClick2(){

    this.showQuestions = true

    const questionRequest2 = {
      story: 'Lucas era un chico alegre y curioso que vivía en Epoca Medieval. Siempre estaba leyendo cuentos de dragones y aventuras heroicas que narran la lucha entre el bien y el mal. Estas historias lo volvieron muy fascinado queriendo buscar su propia aventura. Un día, un enorme dragón le dijo que debía recolectar cinco objetos legendarios para salvar el reino. Lucas estaba decidido a salir de su pequeño pueblo para cumplir con su objetivo. Así que se armó de valor y luego de decirle adiós a sus padres, salió en un viaje. Durante su viaje experimentó muchas aventuras, tanto buenas como malas. Saber luchar, buscar información en los libros, nadar en aguas turbulentas y luchar con dragones eran algunas de las cosas que aprendió y a lo que tuvo que enfrentarse. Finalmente, después de muchas aventuras, fue capaz de reunir los cinco objetos legendarios con los cuales vence al dragón malvado y salva al reino. La gente del reino lo felicitó por su gran logro y su heroísmo con el que enfrentó el peligro. Esta historia, llena de aventuras y fantasia, fue la última y más grande aventura de Lucas que espera sea una motivación para todos los niños de entre 8 años y en adelante para que salgan a enfrentarse a sus propias aventuras.'

    };

    const questionRequest = {
      story: this.generatedStory

    };

    this.generateStoriesService.generateQuestions(questionRequest, 2).subscribe((response: any) => {
      // Accede a la historia generada desde la respuesta
      const generatedQuestions = response;

      // Asigna la historia generada a la variable
      this.generatedQuestions = generatedQuestions;

      console.log("Response: " + JSON.stringify(this.generatedQuestions));
      
    });


  }

  playAudio(): void {
    this.generateAudio()
    if (this.audioData) {
      if (this.audioUrl) {
        URL.revokeObjectURL(this.audioUrl);
      }
      this.audioUrl = URL.createObjectURL(this.audioData);
      console.log(this.audioUrl)
      const audio = new Audio(this.audioUrl);
      this.showAudio = true;
      audio.play().then(() => {
        // Audio is playing.
      })
      .catch(error => {
        console.log(error);
      });;
    }

    
  }
  
  generateAudio() {
    this.voiceAssistantService.generateAndPlayAudio(this.generatedStory).subscribe(
      (response: any) => {
        // response debería contener la URL del audio generado por el servidor
        // Crear una URL a partir de la respuesta
        this.audioUrl = URL.createObjectURL(response);
        console.log('URL: ' + this.audioUrl)

        const audio = new Audio(this.audioUrl);
        this.showAudio = true;
        //audio.play()
      },
      (error) => {
        console.error('Error al obtener el audio', error);
      }
    );
  }

  prueba(){
    const formData = this.storyForm.value;
    console.log("FORMULARIO CAMPOS: " + JSON.stringify(formData));
    this.router.navigate(['stories', this.storyId]);

  }


  genStorie(){
    
    const formData = this.storyForm.value;
    console.log("FORMULARIO CAMPOS: " + JSON.stringify(formData))

    const storyRequest = {
      plot: formData.storieControl,
      mainCharacter: formData.mainCharacter,
      place: formData.place,
      genre: formData.genre,
      audience: formData.audience
    };

    // Enviar la solicitud al backend y obtener la respuesta
    this.generateStoriesService.generateStory(storyRequest).subscribe((response: any) => {
      // Accede a la historia generada desde la respuesta
      const generatedStory = response.story.content;

      // Asigna la historia generada a la variable
      this.generatedStory = generatedStory;

      this.storyId = response.story.id; 

      console.log('GENERATED STORIE: ' + this.generatedStory)

      // Redirige al usuario a la vista de la historia generada
      this.router.navigate(['/stories', this.storyId]);

    });

  }

  startRecording(fieldName: string) {
    
    this.isRecording = true
    this.recognition.start();
    this.audioChunks = [];
    this.recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      this.recognizedText = transcript
      this.storyForm.get(fieldName)?.setValue(this.recognizedText);
      console.log('Texto reconocido:', transcript);
      console.log(`Iniciar grabación para el campo: ${fieldName}`);
      this.stopRecording()
    };
    
  }

  stopRecording() {
    this.recognition.stop();
    
  }

  playRecording() {
    if (this.audioBlob) {
      const audio = new Audio(this.audioUrl);
      audio.play();
    }
  }

  



}
