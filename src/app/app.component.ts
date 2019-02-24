import { Component, OnInit } from '@angular/core';

import './modal/_content/app.less';
import './modal/_content/modal.less';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Project management';

  constructor() { }

  ngOnInit() {
  }
}
