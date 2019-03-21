import { Component, OnInit, Input } from '@angular/core';
import { ProjectService } from '../project.service';
import { UsersService } from '../users.service';
import { TaskService } from '../task.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ManagerModalComponent } from '../modal/manager-modal.component';
import { ProjectModalComponent } from '../modal/project-modal.component';

declare var $: any;

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {

  @Input() taskData = {
    projectId: '',
    projectName: '',
    taskName: '',
    startDate: '',
    endDate: '',
    priority: '',
    managerId: '',
    managerName: ''
  };
  enableDates = false;
  showAdd = true;
  showUpdate = false;

  constructor(public dialog: MatDialog,
    public usersService: UsersService,
    public projectService: ProjectService,
    public taskService: TaskService) { }

  ngOnInit() {

  }

  openProjectDialog(): void {
    const dialogRef = this.dialog.open(ProjectModalComponent, {
      width: '400px',
      data: { name: this.taskData.projectName, id: this.taskData.projectId }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.taskData.projectName = result.project;
      this.taskData.projectId = result.projectId;
    });
  }

  openUserDialog(): void {
    const dialogRef = this.dialog.open(ManagerModalComponent, {
      width: '400px',
      data: { name: this.taskData.managerName, id: this.taskData.managerId }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.taskData.managerName = result.firstName + " " + result.lastName;
      this.taskData.managerId = result.userId;
    });
  }

}
