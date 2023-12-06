import { Component } from '@angular/core';
import { TodoService } from '../services/todo.service';


@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent {
  todos: any[] = [];
  newTodo: string = '';
  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.loadTodos();
  }

  loadTodos() {
    this.todoService.getTodos().subscribe((data) => {
      this.todos = data;
    });
  }

  addTodo() {
    this.todoService.addTodo({ text: this.newTodo }).subscribe(() => {
      this.loadTodos();
      this.newTodo = '';
    });
  }

  updateTodo(todo: any) {
    this.todoService.updateTodo(todo).subscribe(() => {
      this.loadTodos();
    });
  }

  deleteTodo(todoId: number) {
    this.todoService.deleteTodo(todoId).subscribe(() => {
      this.loadTodos();
    });
  }

}
