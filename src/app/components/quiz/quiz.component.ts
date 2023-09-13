import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
 questions:any[]=[];
 questionIndex=0;
 timer=30;
 interval:any;
 selectedOption:any;
 answersList:any[]=[];
 answerCount:number=0;

  constructor(private quizService: QuizService) {

  }
  ngOnInit(): void {
    this.getAllQuestions();
    this.timeout();
  }

  timeout(){
   this.interval=setInterval(()=>{
      this.timer=this.timer-1;
      if(this.timer==0){
        this.clearInterval()
        this.questionIndex=this.questionIndex+1;
        this.timer=30;
        this.timeout();
        if(this.questionIndex>=this.questions.length){
          this.clearInterval();
        }
      }
      //  this.timer==0 ?this.clearInterval():'';   
    },1000)
  }

  clearInterval(){
      clearInterval(this.interval);
  }
  getAllQuestions() {
    this.quizService.getAllQuestions().subscribe(
      (res: any) => {
        this.questions=[...res];
        console.log(res);
      },
      (err: any) => {
        console.log(err);
      }
    )
  }

  nextQuestion(){
    console.log(this.questions);
    this.questions[this.questionIndex].options.forEach((item:any)=>{
        if(this.selectedOption==item.option && item.answer==true){
           this.answerCount=this.answerCount+1;
        }
    })


    if(this.questionIndex<5){
      this.timer=30;
      this.questionIndex=this.questionIndex+1;
    }
  }
}
