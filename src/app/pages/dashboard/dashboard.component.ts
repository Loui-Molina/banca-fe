import {Component} from '@angular/core';
import {UserRole} from '../../../../local-packages/banca-api';
import {Router} from '@angular/router';
import {MockUserService} from '../../services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  constructor(private router: Router,
              private userService: MockUserService) {
    const routeCommands = ['dashboard'];
    if (this.userService.checkRoles([UserRole.banker])) {
      routeCommands.push('banker');
    } else if (this.userService.checkRoles([UserRole.consortium])) {
      routeCommands.push('consortium');
    } else if (this.userService.checkRoles([UserRole.admin])) {
      routeCommands.push('admin');
    }
    this.router.navigate(routeCommands);
  }

}
