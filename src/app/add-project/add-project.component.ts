import { Component, OnInit, Input, ViewChild, AfterViewInit } from '@angular/core';
import { ProjectService } from '../project.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalService } from '../modal/_services';

declare var $: any;

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {
  @Input() userData = { projectId: '', project: '', startDate: '', endDate: '', priority: '' };
  projects: any = [];
  isStartEndDateEnabled = false;
  private bodyText: string;

  constructor(private modalService: ModalService, public rest: ProjectService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.getProjects();
    this.bodyText = 'This text can be updated in modal 1';
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }


  getProjects() {
    this.projects = [];
    this.rest.getProjects().subscribe((data: {}) => {
      console.log(data);
      this.projects = data;
    });
  }

  createProject() {
    this.rest.addProject(this.userData)
      .subscribe(res => {
        this.getProjects();
      }, (err) => {
        console.log(err);
      }
      );
  }

  editProject(project) {
    this.userData = { projectId: project.projectId, project: project.project, startDate: project.startDate, endDate: project.endDate, priority: project.priority };
  }

  updateProject(project) {
    console.log(this.userData.priority);
    this.rest.updateProject(this.userData.projectId, this.userData)
      .subscribe(res => {
        this.getProjects();
      }, (err) => {
        console.log(err);
      }
      );
  }

  reset() {
    this.userData = { projectId: '', project: '', startDate: '', endDate: '', priority: '' };
  }

  setStartEndDate() {
    this.isStartEndDateEnabled = !this.isStartEndDateEnabled;
    $(document).ready(function () {
      var date = new Date();

      var day = date.getDate();
      var month = date.getMonth() + 1;
      var year = date.getFullYear();

      var today = year + "-" + month + "-" + day;
      var nextDay = year + "-" + month + "-" + (day + 1);
      $("#startDate").attr("value", today);
      $("#endDate").attr("value", nextDay);
      $("#startDate").attr("disabled", this.isStartEndDateEnabled);
      $("#endDate").attr("disabled", this.isStartEndDateEnabled);
    });
    return;
  }
}
