import { Component, OnInit, Input} from '@angular/core';
import { ProjectService } from '../project.service';
import { UsersService } from '../users.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ManagerModalComponent } from '../modal/manager-modal.component';

declare var $: any;

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
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

  constructor(public dialog: MatDialog, 
    public usersService: UsersService, 
    public projectService: ProjectService) { }

  ngOnInit() {
    this.getProjects();
    this.getUsers();
  }

  getProjects() {
    this.projects = [];
    this.projectService.getProjects().subscribe((data: {}) => {
      console.log(data);
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
  }

  setStartEndDate() {
    this.enableDates = !this.enableDates;
    $(document).ready( function() {
      $('#startDate').val(new Date());
  });​
      var date = new Date();

      var day = date.getDate();
      var month = date.getMonth() + 1;
      var year = date.getFullYear();

      var today = month + "/" + day + "/" +year ;
      var nextDay = year + "-" + month + "-" + (day + 1);
      this.projectData.startDate = year + "-" + month + "-" + day ;
      this.projectData.endDate = nextDay;
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
}
