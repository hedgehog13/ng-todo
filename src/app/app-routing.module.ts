import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './user-auth/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { RegisterComponent } from './user-auth/register/register.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { MainComponent } from './main/main.component';



const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    canActivate:[AuthGuard],
    children: [
      { path: 'my-lists', component: TodoListComponent },
      // { path: 'shared-lists', component: TodoListComponent },
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
