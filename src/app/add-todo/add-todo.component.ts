// add-todo.component.ts

import { Component, Output, EventEmitter } from '@angular/core';
import { Todo, TodoStatus } from '../models/todo.model';


@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.scss']
})
export class AddTodoComponent {
  @Output() addTodo: EventEmitter<Todo> = new EventEmitter<Todo>();
  newTodo: Todo = { id: 0, name: '', taskDate: new Date(), status: TodoStatus.NotStarted };
  showForm: boolean = false;

  toggleForm() {
    this.showForm = !this.showForm;
  }

  onAddTodo() {
    if (this.newTodo.name.trim() !== '') {
      this.addTodo.emit(this.newTodo);
      this.newTodo = { id: 0, name: '', taskDate: new Date(), status: TodoStatus.NotStarted }; // Clear the input fields
      this.showForm = false; // Hide the form after saving
      this.clearForm();
    }
  }
  cancelForm(){
    this.clearForm();
    this.showForm = false;
  }
  private clearForm() {
    this.newTodo = { id: 0, name: '', taskDate: new Date(), status: TodoStatus.NotStarted };
  }
}
