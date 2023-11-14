import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GenerateStoriesService } from '../generate-stories/generate-stories.service';
import { VoiceAssistantService } from '../voice-assistant/voice-assistant.service';


@Component({
  selector: 'app-stories',
  templateUrl: './stories.component.html',
  styleUrls: ['./stories.component.css']
})
export class StoriesComponent {
  storyId: number; // Este es el ID de la historia

  // Aquí puedes definir una propiedad para almacenar la historia
  storyContent: string;
  generatedQuestions: string;

  showAudio: boolean = false;
  audioData: Blob | null = null;
  //audioUrl: string | null = null;
  audioUrl: string;
  loading: boolean = false;
  images: string[];
  images_gen: []
  image: string;
  @ViewChild('imageElement') imageElement: ElementRef;

  constructor(
    private route: ActivatedRoute, 
    private generateStoriesService: GenerateStoriesService,
    private voiceAssistantService: VoiceAssistantService,
    private router: Router
    ) 
    {this.images= [
      '../../../../assets/img/Backgrounds/img-EHJR44NNGjPzakFgZvKucBjk.png',
      '../../../../assets/img/Backgrounds/img-LjEAaC5Br7lj3SJTFbWfbmAI.png'
    ]
    this.image='https://img.freepik.com/free-vector/hand-drawn-world-children-s-day-background_52683-75105.jpg?size=626&ext=jpg&ga=GA1.1.1826414947.1699488000&semt=ais'
  }

  

  onImageLoad() {
    // Cuando la imagen se carga, se añade la clase 'show' para activar la transición de zoom.
    this.imageElement.nativeElement.classList.add('show');
  }
    

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.storyId = +params['id'];

      if(this.storyId){
        // Llama al servicio para obtener la historia por su ID
        this.generateStoriesService.getStoryById(this.storyId).subscribe((response: any) => {
        this.storyContent = response.story;
        });

        this.generateStoriesService.getImgByStorie(this.storyId).subscribe((response: any) => {
          this.images_gen = response;
          console.log(this.images_gen)
        });
      }

      
    });
  }

  generateQuestions(){

    this.loading = true;

    const questionRequest = {
      story: this.storyContent

    };

    this.generateStoriesService.generateQuestions(this.storyId, questionRequest).subscribe((response: any) => {

      this.loading = false;
      // Accede a la historia generada desde la respuesta
      const generatedQuestions = response;

      // Asigna la historia generada a la variable
      this.generatedQuestions = generatedQuestions;

      console.log("Response: " + JSON.stringify(this.generatedQuestions));

      // Redirige al usuario a la vista de la historia generada
      this.router.navigate(['/stories', this.storyId, 'questions']);
      
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
    this.voiceAssistantService.generateAndPlayAudio(this.storyContent).subscribe(
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
}
