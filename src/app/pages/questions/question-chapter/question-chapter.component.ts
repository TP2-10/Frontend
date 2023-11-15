import { Component, Inject, OnInit   } from '@angular/core';
import { QuestionService } from '../question.service'; 
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-question-chapter',
  templateUrl: './question-chapter.component.html',
  styleUrls: ['./question-chapter.component.css']
})
export class QuestionChapterComponent implements OnInit {

  storyId: number;
  generatedQuestions: any;
  answerCorrect: boolean = false;
  answerIncorrect : boolean = false;
  selectedOptions: any[] = [];
  answersForQuestions: { [questionId: number]: string } = {};
  answersForQuestionss: any[] = [];
  options: any
  selectedOptionsForQuestions: { [questionId: number]: string } = {};
  questionsIds: any[] = []
  totalScore: number = 0;
  scorePerQuestion: number = 4;
  showScore: boolean = false;
  chapterContent: string
  loading: boolean = false;
  
  constructor(
    private questionService: QuestionService,
    private dialogRef: MatDialogRef<QuestionChapterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) 
    {
      this.chapterContent = this.data.chapter;
      console.log('El capítulo generado es:', JSON.stringify(this.chapterContent));
    }
  
  ngOnInit() {

    this.loading = true;

    const questionRequest = {
      chapter: this.chapterContent

    };
    // Llama al servicio para obtener la historia por su ID
    this.questionService.generateQuestionForChapter(questionRequest).subscribe((response: any) => {
      this.generatedQuestions = response;
      console.log('Pregunta generada:', JSON.stringify(this.generatedQuestions));
      for(const question of this.generatedQuestions){
        const answer = question.options[question.options.length - 1]
        const correctAnswer = answer.substring("Respuesta correcta: ".length);
        const questionId = question.id
        this.questionsIds.push(questionId)
        this.answersForQuestions[questionId] = correctAnswer
        this.answersForQuestionss.push({ questionId, answer: correctAnswer });
        this.loading = false;
      }
      console.log(JSON.stringify(this.answersForQuestionss))
      console.log(this.answersForQuestions)
      console.log(this.questionsIds)
    
      this.transformQuestions()
      console.log(JSON.stringify(this.generatedQuestions));
      
  
    });
    
  }

  checkAnswers() {
    
    console.log(this.selectedOptions)
    for (const question of this.selectedOptions) {
      console.log("Opcion marcada " + question.text)
      console.log("Opcion correcta " + this.answersForQuestions[question.questionId])
      if(question.text === this.answersForQuestions[question.questionId]){
        this.totalScore += this.scorePerQuestion;
        this.answerCorrect = true
        this.answerIncorrect = false
        console.log("Pregunta " + question.id + ": correcta")
        this.dialogRef.disableClose = false;

      }else{
        this.answerCorrect = false
        this.answerIncorrect = true
        console.log("Pregunta " + question.id + ": incorrecta")
      }

    }

    this.showScore = true;
    

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
        .filter(option => option.toLowerCase().includes("respuesta correcta:") ? false : option.length >= 2) 
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
    return this.answerCorrect? 'green' : 'red';
  }

}
