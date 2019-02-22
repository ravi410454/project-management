import { Component, OnInit, Input } from '@angular/core';
import { UsersService } from '../users.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  @Input() userData = { userId: '', firstName: '', lastName: '', employeeId: '' };
  users: any = [];

  constructor(public rest: UsersService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.users = [];
    this.rest.getUsers().subscribe((data: {}) => {
      console.log(data);
      this.users = data;
    });
  }

  addUser() {
    this.rest.addUser(this.userData)
      .subscribe(res => {
        this.getUsers();
      }, (err) => {
        console.log(err);
      }
      );
  }

  deleteUser(id) {
    this.rest.deleteUser(id)
      .subscribe(res => {
        this.getUsers();
      }, (err) => {
        console.log(err);
      }
      );
  }

  editUser(user) {
    this.userData= { userId:user.userId, firstName: user.firstName, lastName: user.lastName, employeeId: user.employeeId };
  }

  updateUser() {
    this.rest.updateUser(this.userData.userId, this.userData)
      .subscribe(res => {
        this.getUsers();
      }, (err) => {
        console.log(err);
      }
      );
  }

  reset() {
      this.userData= { userId:'', firstName: '', lastName: '', employeeId: '' };
  }

}
