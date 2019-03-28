import { Component, OnInit, Input } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DatePipe } from '@angular/common';

import { ProjectService } from '../project.service';
import { UsersService } from '../users.service';
import { ManagerModalComponent } from '../modal/manager-modal.component';

declare var $: any;

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css'],
  providers: [DatePipe]
})
export class AddProjectComponent implements OnInit {
  @Input() projectData = { projectId: '', project: '', startDate: '', endDate: '', priority: '', managerId: '' };
  projects: any = [];
  users: any = [];
  enableDates = false;
  showAdd = true;
  showUpdate = false;
  managerName: string;
  managerId: string;
  errorMsg = '';
  errorPresent = false;

  constructor(private datePipe: DatePipe,
    public dialog: MatDialog,
    public usersService: UsersService,
    public projectService: ProjectService) { }

  ngOnInit() {
    this.getProjects();
    this.getUsers();
    this.defaultDate();
  }

  defaultDate() {
    this.projectData.startDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    this.projectData.endDate = this.datePipe.transform(
      new Date().setDate(new Date().getDate() + 1), 'yyyy-MM-dd');
  }

  getProjects() {
    this.projects = [];
    this.projectService.getProjects().subscribe((data: {}) => {
      this.projects = data;
    });
  }

  sortByPriority() {
    this.projects = this.projects.sort((n1, n2) => {
      return n1.priority - n2.priority;
    });
  }

  sortByStartDate() {
    this.projects = this.projects.sort((n1, n2) => {
      if (n1.startDate > n2.startDate) {
        return 1;
      }
      if (n1.startDate < n2.startDate) {
        return -1;
      }
      return 0;
    });
  }

  sortByEndDate() {
    this.projects = this.projects.sort((n1, n2) => {
      if (n1.endDate > n2.endDate) {
        return 1;
      }
      if (n1.endDate < n2.endDate) {
        return -1;
      }
      return 0;
    });
  }

  sortByCompleted() {
    this.projects = this.projects.sort((n1, n2) => {
      return n1.completed - n2.completed;
    });
  }

  getUsers() {
    this.users = [];
    this.usersService.getUsers().subscribe((data: {}) => {
      console.log(data);
      this.users = data;
    });
  }

  createProject() {
    if (this.isInvalidRequest()) {
      this.errorPresent = true;
      return;
    } else {
      this.errorPresent = false;
    }
    this.projectService.addProject(this.projectData)
      .subscribe(res => {
        this.getProjects();
      }, (err) => {
        console.log(err);
      }
      );
    this.reset();
  }

  editProject(project) {
    this.showUpdate = true;
    this.showAdd = false;
    this.projectData = { projectId: project.projectId, project: project.project, startDate: project.startDate, endDate: project.endDate, priority: project.priority, managerId: project.managerId };
  }

  updateProject(project) {
    if (this.isInvalidRequest()) {
      this.errorPresent = true;
      return;
    } else {
      this.errorPresent = false;
    }
    this.projectService.updateProject(this.projectData.projectId, this.projectData)
      .subscribe(res => {
        this.getProjects();
      }, (err) => {
        console.log(err);
      }
      );
    this.showUpdate = false;
    this.showAdd = true;
    this.reset();
  }

  reset() {
    this.projectData = { projectId: '', project: '', startDate: '', endDate: '', priority: '', managerId: '' };
    this.managerName = "";
    this.defaultDate();
    this.errorMsg = '';
    this.errorPresent = false;
  }

  enableStartEndDates() {
    this.enableDates = !this.enableDates;
    this.defaultDate();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ManagerModalComponent, {
      width: '400px',
      data: { name: this.managerName, id: this.managerId }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.managerName = result.firstName + " " + result.lastName;
      this.projectData.managerId = result.userId;
    });
  }

  isInvalidRequest() {
    if (this.projectData.project == '') {
      this.errorMsg = "Project is required.";
      return true;
    }

    if (this.projectData.startDate > this.projectData.endDate) {
      this.errorMsg = "Start date can not be greater then end date.";
      return true;
    }
    return false;
  }
}
