import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-modal',
  templateUrl: './manager-modal.component.html',
  styleUrls: ['./manager-modal.component.css']
})
export class ManagerModalComponent implements OnInit {

  users: any = [];

  constructor(public dialogRef: MatDialogRef<ManagerModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public usersService: UsersService, ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.users = [];
    this.usersService.getUsers().subscribe((data: {}) => {
      this.users = data;
    });
  }

  onCloseClick(): void {
    this.dialogRef.close(this.data);
  }

}
