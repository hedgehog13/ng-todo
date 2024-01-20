import { Component } from '@angular/core';
import { Todo } from '../models/todo.model';
import { TodoService } from '../services/todo.service';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {

  constructor(private todoSrv: TodoService) { }
  onAddTodo(item: Todo) {
    console.log('main component, add todo', item)
    this.todoSrv.addTodo(item).pipe(
      tap(() => {
        console.log('main component, add todo', item)
      })
      ,
      catchError((err: HttpErrorResponse) => throwError(() => "error loading"))

      // Handle the error (e.g., show a user-friendly message)

    ).subscribe();
  }
}
