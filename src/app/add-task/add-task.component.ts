import { Component, OnInit, Input } from '@angular/core';
import { ProjectService } from '../project.service';
import { UsersService } from '../users.service';
import { TaskService } from '../task.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ManagerModalComponent } from '../modal/manager-modal.component';
import { ProjectModalComponent } from '../modal/project-modal.component';
import { ParentModalComponent } from '../modal/parent-modal.component';
import { ParentService } from '../parent.service';

declare var $: any;

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {

  @Input() taskData = {
    taskId: '',
    task: '',
    parentId: '',
    parent: '',
    projectId: '',
    project: '',
    startDate: '',
    endDate: '',
    priority: '',
    status: '',
    userId: '',
    user: ''
  };
  @Input() parentData = { parentId: '', parentTask: '' };
  user: any;
  enableDates = false;
  showAdd = true;
  showUpdate = false;
  isParentTask = false;

  constructor(public dialog: MatDialog,
    public usersService: UsersService,
    public projectService: ProjectService,
    public taskService: TaskService,
    public parentService: ParentService) { }

  ngOnInit() {

  }

  reset() {
    this.taskData = {
      taskId: '', task: '', parentId: '', parent: '', projectId: '', project: '',
      startDate: '', endDate: '', priority: '', status: '', userId: '', user: ''
    };
    this.isParentTask = false;
  }

  createTask() {
    if (this.isParentTask) {
      this.parentData.parentTask = this.taskData.task;
      this.parentService.addParent(this.parentData)
        .subscribe(res => { }, (err) => { console.log(err) });
    } else {
      this.taskService.addTask(this.taskData)
      .subscribe(res => { }, (err) => { console.log(err) });
    }
    this.reset();
  }

  openProjectDialog(): void {
    const dialogRef = this.dialog.open(ProjectModalComponent, {
      width: '400px',
      data: { name: this.taskData.project, id: this.taskData.projectId }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.taskData.project = result.project;
      this.taskData.projectId = result.projectId;
    });
  }

  openParentDialog(): void {
    const dialogRef = this.dialog.open(ParentModalComponent, {
      width: '400px',
      data: { name: this.taskData.parent, id: this.taskData.parentId }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.taskData.parent = result.parentTask;
      this.taskData.parentId = result.parentId;
    });
  }

  openUserDialog(): void {
    const dialogRef = this.dialog.open(ManagerModalComponent, {
      width: '400px',
      data: { name: this.taskData.user, id: this.taskData.userId }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.taskData.user = result.firstName + " " + result.lastName;
      this.taskData.userId = result.userId;
      this.user = result;
    });
  }

}
