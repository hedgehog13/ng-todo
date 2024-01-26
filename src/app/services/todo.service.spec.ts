import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TodoService } from './todo.service';
import { Todo, TodoStatus } from '../models/todo.model';


describe('TodoService', () => {
  let service: TodoService;
  let httpTestingController: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({ 
      imports: [HttpClientTestingModule],
      providers: [TodoService]});
      service = TestBed.inject(TodoService);
      httpTestingController = TestBed.inject(HttpTestingController);
  });
  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should get todos', () => {
    const mockTodos: Todo[] = [
      { id: 1, name: 'Todo 1', dueDate: new Date(), status: TodoStatus.NotStarted },
      { id: 2, name: 'Todo 2', dueDate: new Date(),  status: TodoStatus.InProgress}
    ];

    service.getTodos().subscribe(todos => {
      expect(todos).toEqual(mockTodos);
    });

    const req = httpTestingController.expectOne(`${service['apiUrl']}TodoItems`);
    expect(req.request.method).toBe('GET');
    req.flush(mockTodos);
  });

 

});
