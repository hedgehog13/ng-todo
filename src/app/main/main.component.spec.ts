import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MainComponent } from './main.component';
import { TodoService } from '../services/todo.service';
import { of, throwError } from 'rxjs';
import { Todo, TodoStatus } from '../models/todo.model';
import { HttpErrorResponse } from '@angular/common/http';
import { LoginLogoutComponent } from '../login-logout/login-logout.component'; // Import your component here
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Import HttpClientTestingModule
import {AddTodoComponent} from '../add-todo/add-todo.component'
import { RouterTestingModule } from '@angular/router/testing';
describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;
  let todoServiceSpy: jasmine.SpyObj<TodoService>;

  beforeEach(waitForAsync(() => {
    const spy = jasmine.createSpyObj('TodoService', ['addTodo']);

    TestBed.configureTestingModule({
      declarations: [MainComponent, LoginLogoutComponent, AddTodoComponent],
      providers: [{ provide: TodoService, useValue: spy }],
      imports: [HttpClientTestingModule, RouterTestingModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    todoServiceSpy = TestBed.inject(TodoService) as jasmine.SpyObj<TodoService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add todo successfully', waitForAsync(() => {
    const testTodo: Todo = { id: 1, name: 'Test Todo', dueDate: new Date(), status:TodoStatus.NotStarted};
    todoServiceSpy.addTodo.and.returnValue(of(testTodo));

    component.onAddTodo(testTodo);

    fixture.whenStable().then(() => {
      expect(todoServiceSpy.addTodo).toHaveBeenCalledWith(testTodo);
    });
  }));


});
