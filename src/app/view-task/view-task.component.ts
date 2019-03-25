import { Component, OnInit, Input } from '@angular/core';
import { TaskService } from '../task.service';
import { ProjectService } from '../project.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ProjectModalComponent } from '../modal/project-modal.component'

declare var $: any;

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.css']
})
export class ViewTaskComponent implements OnInit {

  tasks: any = [];
  project: any;
  projectName: string;
  projectId: string;

  constructor(public dialog: MatDialog,
    public projectService: ProjectService,
    public taskService: TaskService) { }

  ngOnInit() { if (this.project != null) { this.tasks = this.project.tasks; } }

  endTask(task) {
    task.status = "Completed";
    this.taskService.updateTask(task.taskId, task).subscribe(res => {
      this.getTasks(task.projectId);
    }, (err) => {
      console.log(err);
    }
    );
  }

  getTasks(projectId) {
    this.projectService.getProject(projectId).subscribe(res => {
      console.log(res.tasks);
      this.tasks = res.tasks;
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ProjectModalComponent, {
      width: '250px',
      data: { name: this.projectName, id: this.projectId }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.project = result;
      this.tasks = result.tasks;
      this.projectName = result.project;
      this.projectId = result.projectId;
    });
  }

  sortByPriority() {
    this.tasks = this.tasks.sort((n1, n2) => {
      return n1.priority - n2.priority;
    });
  }

  sortByStart() {
    this.tasks = this.tasks.sort((n1, n2) => {
      if (n1.startDate > n2.startDate) {
        return 1;
      }
      if (n1.startDate < n2.startDate) {
        return -1;
      }
      return 0;
    });
  }

  sortByEnd() {
    this.tasks = this.tasks.sort((n1, n2) => {
      if (n1.endDate > n2.endDate) {
        return 1;
      }
      if (n1.endDate < n2.endDate) {
        return -1;
      }
      return 0;
    });
  }

  sortByStatus() {
    this.tasks = this.tasks.sort((n1, n2) => {
      if (n1.status > n2.status) {
        return 1;
      }
      if (n1.status < n2.status) {
        return -1;
      }
      return 0;
    });
  }

}
