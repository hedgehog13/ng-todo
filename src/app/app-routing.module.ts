import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './user-auth/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { RegisterComponent } from './user-auth/register/register.component';



const routes: Routes = [
//  { path: 'todo-list', component: TodoListComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
