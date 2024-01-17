import { Component } from '@angular/core';
import { Todo } from '../models/todo.model';
import { TodoService } from '../services/todo.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {

  constructor(private todoSrv: TodoService) { }
  onAddTodo(item: Todo) {
    console.log(item)
  }
}
