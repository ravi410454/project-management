import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router'
import { HttpClientModule } from '@angular/common/http';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NguiPopupModule } from '@ngui/popup';

import { AppComponent } from './app.component';
import { AddUserComponent } from './add-user/add-user.component';
import { AddProjectComponent } from './add-project/add-project.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { ViewTaskComponent } from './view-task/view-task.component';
import { ProjectService } from './project.service';
import { TaskService } from './task.service';
import { UsersService } from './users.service';
import { NavigationComponent } from './navigation/navigation.component';
import { ModalComponent } from './modal/_directives';
import { ModalService } from './modal/_services';

const appRoutes: Routes = [
  {
    path: 'add-project',
    component: AddProjectComponent,
    data: { title: 'Add Project' }
  },
  {
    path: 'add-user',
    component: AddUserComponent,
    data: { title: 'Add User' }
  },
  {
    path: 'add-task',
    component: AddTaskComponent,
    data: { title: 'Add Task' }
  },
  {
    path: '',
    component: ViewTaskComponent,
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    AddUserComponent,
    AddProjectComponent,
    AddTaskComponent,
    ViewTaskComponent,
    NavigationComponent,
    ModalComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    FormsModule,
    BrowserModule,
    HttpClientModule,
    Ng2SearchPipeModule,
    NgbModule.forRoot(),
    NguiPopupModule
  ],
  providers: [ProjectService, TaskService, UsersService, ModalService],
  bootstrap: [AppComponent]
})
export class AppModule { }
