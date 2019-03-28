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
  errorMsg = '';
  errorPresent = false;
  showAdd = true;
  showUpdate = false;

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
    if (this.isInvalidRequest()) {
      this.errorPresent = true;
      return;
    } else {
      this.errorPresent = false;
    }
    this.rest.addUser(this.userData)
      .subscribe(res => {
        this.getUsers();
      }, (err) => {
        console.log(err);
      }
      );
    this.reset();
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
    this.userData = { userId: user.userId, firstName: user.firstName, lastName: user.lastName, employeeId: user.employeeId };
    this.showAdd = false;
    this.showUpdate = true;
  }

  updateUser() {
    if (this.isInvalidRequest()) {
      this.errorPresent = true;
      return;
    } else {
      this.errorPresent = false;
    }
    this.rest.updateUser(this.userData.userId, this.userData)
      .subscribe(res => {
        this.getUsers();
      }, (err) => {
        console.log(err);
      }
      );
    this.showAdd = true;
    this.showUpdate = false;
    this.reset();
  }

  isInvalidRequest() {
    if (this.userData.firstName == '') {
      this.errorMsg = "First Name is required.";
      return true;
    }

    if (this.userData.lastName == '') {
      this.errorMsg = "Last Name is required.";
      return true;
    }

    if (this.userData.employeeId == '') {
      this.errorMsg = "Employee ID is required.";
      return true;
    }
    return false;
  }

  reset() {
    this.userData = { userId: '', firstName: '', lastName: '', employeeId: '' };
    this.showAdd = true;
    this.showUpdate = false;
    this.errorMsg = '';
    this.errorPresent = false;
  }

  sortByFirstNm() {
    this.users = this.users.sort((n1, n2) => {
      if (n1.firstName > n2.firstName) {
        return 1;
      }
      if (n1.firstName < n2.firstName) {
        return -1;
      }
      return 0;
    });
  }

  sortByLastNm() {
    this.users = this.users.sort((n1, n2) => {
      if (n1.lastName > n2.lastName) {
        return 1;
      }
      if (n1.lastName < n2.lastName) {
        return -1;
      }
      return 0;
    });
  }

  sortById() {
    this.users = this.users.sort((n1, n2) => {
      return n1.employeeId - n2.employeeId;
    });
  }

}
