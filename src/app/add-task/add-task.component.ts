import { Component, OnInit, Input } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { DatePipe } from '@angular/common';

import { ProjectService } from '../project.service';
import { UsersService } from '../users.service';
import { TaskService } from '../task.service';
import { ParentService } from '../parent.service';

import { ManagerModalComponent } from '../modal/manager-modal.component';
import { ProjectModalComponent } from '../modal/project-modal.component';
import { ParentModalComponent } from '../modal/parent-modal.component';

declare var $: any;

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
  providers: [DatePipe]
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
  errorMsg = '';
  errorPresent = false;
  private sub: any;
  taskId: String;
  isEditTask = false;
  task: any;

  constructor(private datePipe: DatePipe,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
    public usersService: UsersService,
    public projectService: ProjectService,
    public taskService: TaskService,
    public parentService: ParentService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.taskId = params['taskId'];
      if (typeof this.taskId !== "undefined") {
        this.isEditTask = true;
        this.loadEditData();
      }
    });
    this.defaultDate();
  }

  defaultDate() {
    if (!this.isEditTask) {
      this.taskData.startDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
      this.taskData.endDate = this.datePipe.transform(
        new Date().setDate(new Date().getDate() + 1), 'yyyy-MM-dd');
    }
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  reset() {
    this.taskData = {
      taskId: '', task: '', parentId: '', parent: '', projectId: '', project: '',
      startDate: '', endDate: '', priority: '', status: '', userId: '', user: ''
    };
    this.isParentTask = false;
    this.showAdd = true;
    this.showUpdate = false;
    this.defaultDate();
  }

  createTask() {
    if (this.isInvalidRequest()) {
      this.errorPresent = true;
      return;
    } else {
      this.errorPresent = false;
    }
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

  isInvalidRequest() {
    if (this.taskData.task == '') {
      this.errorMsg = "Task is required.";
      return true;
    }

    if (!this.isParentTask && this.taskData.startDate > this.taskData.endDate) {
      this.errorMsg = "Start date can not be greater then end date.";
      return true;
    }
    return false;
  }

  loadEditData() {
    this.showUpdate = true;
    this.showAdd = false;
    this.taskService.getTask(this.taskId).subscribe((data: {
      taskId: '', task: '', parentId: '', parent: '', projectId: '', project: '',
      startDate: '', endDate: '', priority: '', status: '', userId: '', user: ''
    }) => {
      this.taskData = data;
      console.log(this.taskData);
    });
  }

  updateTask() {
    if (this.isInvalidRequest()) {
      this.errorPresent = true;
      return;
    } else {
      this.errorPresent = false;
    }
    this.taskService.updateTask(this.taskData.taskId, this.taskData)
      .subscribe(res => { }, (err) => { console.log(err) });
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
