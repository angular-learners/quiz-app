import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
BASE_URL="http://localhost:3000/questions";
  constructor(private http:HttpClient) { }


  getAllQuestions():Observable<any>{
    return this.http.get(`${this.BASE_URL}`);
  }
}
