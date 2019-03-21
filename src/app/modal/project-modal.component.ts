import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-modal',
  templateUrl: './project-modal.component.html',
  styleUrls: ['./project-modal.component.css']
})
export class ProjectModalComponent implements OnInit {

  projects: any = [];

  constructor(public dialogRef: MatDialogRef<ProjectModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public projectService: ProjectService, ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.getProjects();
  }

  getProjects() {
    this.projects = [];
    this.projectService.getProjects().subscribe((data: {}) => {
      this.projects = data;
    });
  }

  onCloseClick(): void {
    this.dialogRef.close(this.data);
  }

}
