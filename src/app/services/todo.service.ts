import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private apiUrl = 'https://localhost:7081/'; //'YOUR_BACKEND_API_URL';
  constructor(private http: HttpClient) {}

  getTodos(): Observable<any> {
    return this.http.get(`${this.apiUrl}/TodoItems`);
  }

  addTodo(todo: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/TodoItems`, todo);
  }

  updateTodo(todo: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/TodoItems/${todo.id}`, todo);
  }

  deleteTodo(todoId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/TodoItems/${todoId}`);
  }
}
