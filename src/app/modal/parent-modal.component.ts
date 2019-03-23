import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ParentService } from '../parent.service';

@Component({
  selector: 'app-modal',
  templateUrl: './parent-modal.component.html',
  styleUrls: ['./parent-modal.component.css']
})
export class ParentModalComponent implements OnInit {

  parents: any = [];

  constructor(public dialogRef: MatDialogRef<ParentModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public parentService: ParentService, ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.getParents();
  }

  getParents() {
    this.parents = [];
    this.parentService.getParents().subscribe((data: {}) => {
      this.parents = data;
    });
  }

  onCloseClick(): void {
    this.dialogRef.close(this.data);
  }

}
