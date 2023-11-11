import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from './question.service';

interface Question {
  id: string;
  options: string[];
  question_text: string;
}

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent {

  storyId: number;
  generatedQuestions: any;
  //selectedOption: any;
  selectedOptions: any[] = [];
  answersForQuestions: { [questionId: number]: string } = {};
  answersForQuestionss: any[] = [];
  question: Question;
  options: any
  selectedOptionsForQuestions: { [questionId: number]: string } = {};
  questionsIds: any[] = []
  totalScore: number = 0;
  scorePerQuestion: number = 4;
  showScore: boolean = false;
  
  constructor(
    private route: ActivatedRoute, 
    private questionService: QuestionService
    ) 
    {}
  
  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.storyId = +params['id'];

      if(this.storyId){
        // Llama al servicio para obtener la historia por su ID
        this.questionService.getQuestionByStory(this.storyId).subscribe((response: any) => {
          this.generatedQuestions = response.questions;
          for(const question of this.generatedQuestions){
            const answer = question.options[question.options.length - 1]
            const correctAnswer = answer.substring("Correct answer: ".length);
            const questionId = question.id
            this.questionsIds.push(questionId)
            this.answersForQuestions[questionId] = correctAnswer
            this.answersForQuestionss.push({ questionId, answer: correctAnswer });
          }
          console.log(JSON.stringify(this.answersForQuestionss))
          console.log(this.answersForQuestions)
          console.log(this.questionsIds)
          //this.selectedOptions[this.generatedQuestions[0].id] = this.generatedQuestions[0].options[0]
          //this.selectedOptions[this.generatedQuestions[1].id] = this.generatedQuestions[1].options[1]
          //console.log(`Checkbox change for question ${this.generatedQuestions[0].id} - Option: ${this.generatedQuestions[0].options[0]}`);
          //console.log(`Checkbox change for question ${this.generatedQuestions[1].id} - Option: ${this.generatedQuestions[1].options[1]}`);
          this.transformQuestions()
          console.log(JSON.stringify(this.generatedQuestions));
          
      
        });
      }

      
    });
  }

  checkAnswers() {
    
    console.log(this.selectedOptions)
    for (const question of this.selectedOptions) {
      console.log("Opcion marcada " + question.text)
      console.log("Opcion correcta " + this.answersForQuestions[question.questionId])
      if(question.text === this.answersForQuestions[question.questionId]){
        this.totalScore += this.scorePerQuestion;
        console.log("Pregunta " + question.id + ": correcta")

      }else{
        console.log("Pregunta " + question.id + ": incorrecta")
      }

    }

    this.showScore = true;
    // Itera a través de las preguntas y verifica las respuestas
    
    //for (const question of this.generatedQuestions) {
    //  const correctAnswer = this.answersForQuestions[question.id];
    //  const selectedOption = question.correctAnswer; // Supongamos que cada pregunta tiene una propiedad correctAnswer
  //
    //  question.isAnsweredCorrectly = selectedOption === correctAnswer;
    //}
  }

  onCheckboxChange2(questionId: number, option: any) {
    console.log(`Checkbox change for question ${questionId} - Option: ${option.text} - ISSELECT: ${option.isSelected}`);
    // Verifica si la opción ya está en el arreglo selectedOptions
    
  }

  onCheckboxChange(questionId: any, selectedOption: any): void {
    if (selectedOption.isSelected) {
      // La opción fue marcada, puedes acceder a su texto así:
      console.log(`Opción marcada en la pregunta ${questionId}: ${selectedOption.text}`);
    } else {
      // La opción fue desmarcada
    }

    const index = this.selectedOptions.findIndex((selectedOption) => selectedOption.questionId === questionId);

    if (index !== -1) {
      // Si la opción ya está en el arreglo, elimínala
      this.selectedOptions.splice(index, 1);
    } else {
      // Si la opción no está en el arreglo, agrégala
      this.selectedOptions.push({ questionId, text: selectedOption.text });
    }
    
  }
  
  
  getOptionSelecById(id: number){
    this.questionService.getOptionById(id).subscribe((response: any) => {
      this.generatedQuestions = response.questions;
      
    });

  }

  transformQuestions() {
    this.generatedQuestions = this.generatedQuestions.map((question: { options: any[]; id: any; question_text: any; }) => {
      const options = question.options
        .filter(option => option.toLowerCase().includes("correct answer:") ? false : option.length >= 2) 
        .map((optionText: string, index:number) => {
          return {
            id: index + 1, // ID de la opción, puedes ajustarlo según tus necesidades
            text: optionText,
            isSelected: false,
          };
        });
  
      return {
        id: question.id,
        options: options,
        question_text: question.question_text,
        correctAnswer: "",
      };
    });
  }

  public get scoreColor(): string {
    return this.totalScore < 10 ? 'red' : 'green';
  }
  
  

}
