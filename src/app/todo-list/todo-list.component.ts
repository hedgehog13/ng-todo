import { Component } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { Todo } from '../models/todo.model';
import { Observable, Subscription, combineLatest, map } from 'rxjs';


@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent {
  todos$: Observable<Todo[]> | undefined; 
  private subscription: Subscription = new Subscription(); 


  showFloatingMenu: boolean = false;
  selectedTodoIndex: number | undefined;
  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.loadTodos();
    this.subscription.add(
      this.todoService.onTodoListUpdated().subscribe(() => {
        this.loadTodos();
      })
    );
  }

  loadTodos() {
   // Fetch the initial list of todos
  const initialTodos$ = this.todoService.getTodos();
  if (!this.todos$) {
    this.todos$ = initialTodos$;
  } else {
    console.warn('Existing todos found. Avoiding combination with the initial list.');
  }
   
  }

  editTodo(todo: Todo) {
    todo.editing = true;
  }

  saveEdit(todo: Todo) {
    todo.editing = false;
  }

  cancelEdit(todo: Todo) {
    todo.editing = false;
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
  toggleFloatingMenu(index: number) {
    if (this.selectedTodoIndex === index) {
      // If the same todo is clicked again, close the floating menu
      this.selectedTodoIndex = undefined;
      this.showFloatingMenu = false;
    } else {
      // If a different todo is clicked, open the floating menu
      this.selectedTodoIndex = index;
      this.showFloatingMenu = true;
    }
  }


  updateStatus(todo: Todo, newStatus: string) {
    console.log('status updated')
    // Implement update status logic
    // this.todoService.updateTodoStatus(todo.id, newStatus).subscribe(() => {
    //   this.loadTodos();
    //   this.showFloatingMenu = false;
    // });
    this.closeFloatingMenu();
  }
  cancelFloatingMenu() {
    this.closeFloatingMenu();
  }

  private closeFloatingMenu() {
    this.selectedTodoIndex = undefined;
    this.showFloatingMenu = false;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe(); 
  }
}
