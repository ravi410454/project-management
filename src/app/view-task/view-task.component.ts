import { Component, OnInit, Input } from '@angular/core';
import { TaskService } from '../task.service';
import { ProjectService } from '../project.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.css']
})
export class ViewTaskComponent implements OnInit {

  tasks: any = [];
  project: any;
  @Input() inputProjectName = {projectName: ''};

  constructor(public taskService: TaskService, public projectService: ProjectService, 
    private route: ActivatedRoute, private router: Router) { }

  ngOnInit() { this.getProject(1); }

  getProject(id) {
    this.tasks = [];
    this.projectService.getProject(id).subscribe((data: {}) => {
      console.log(data);
      this.project = data;
    });
  }

  endTask() {
    // set status to complete
  }

}
