import { Component, OnInit } from '@angular/core';
import { ProjectService } from './project.service';
import { TaskService } from './task.service';
import { UsersService } from './users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Project management';

  constructor() {  }

  ngOnInit() {
  }
}
