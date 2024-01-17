import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './user-auth/login/login.component';
import { FormsModule } from '@angular/forms';
import { RegisterComponent } from './user-auth/register/register.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import {  HttpClientModule } from '@angular/common/http';
import { MainComponent } from './main/main.component';
import { LoginLogoutComponent } from './login-logout/login-logout.component';
import { AddTodoComponent } from './add-todo/add-todo.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    TodoListComponent,
    MainComponent,
    LoginLogoutComponent,
    AddTodoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
