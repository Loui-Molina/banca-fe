import {Component} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dashboard-webusers',
  templateUrl: './web.users.component.html',
  styleUrls: ['./web.users.component.scss']
})
export class WebUsersComponent {
  constructor(private router: Router) {
    this.router.navigate(['app/main']);
  }
}
