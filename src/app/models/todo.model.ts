export interface Todo {
    id: number; // Optional: If you want to uniquely identify each Todo item
    name: string;
    description?: string; // Optional description
    taskDate: Date;
    status: TodoStatus;
  }
  
  export enum TodoStatus {
    NotStarted = 'Not Started',
    InProgress = 'In Progress',
    Done = 'Done'
  }