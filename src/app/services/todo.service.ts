import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';
import { Todo } from '../models/todo.model';
@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private apiUrl = 'https://localhost:7081/api/'; 
  private todoListUpdated$: EventEmitter<void> = new EventEmitter<void>();

  constructor(private http: HttpClient) {}

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(`${this.apiUrl}TodoItems`);
  }
  notifyTodoListUpdated() {
    
    this.todoListUpdated$.emit();
  }
  onTodoListUpdated(): Observable<void> {
    return this.todoListUpdated$.asObservable();
  }
  addTodo(todo: Todo): Observable<any> {
    console.log('add todo')
    return this.http.post<Todo>(`${this.apiUrl}TodoItems/`, todo).pipe(
      tap(() => { console.log('Todo added successfully:', todo);this.notifyTodoListUpdated()})
    );
  }

  updateTodo(todo: any): Observable<any> {
    return this.http.put(`${this.apiUrl}TodoItems/${todo.id}`, todo);
  }

  deleteTodo(todoId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}TodoItems/${todoId}`);
  }
}
