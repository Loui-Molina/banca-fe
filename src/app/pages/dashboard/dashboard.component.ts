import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../../services/user.service';
import {User} from '@banca-api/model/user';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  constructor(private router: Router,
              private userService: UserService) {
    const routeCommands = ['dashboard'];
    if (this.userService.checkRoles([User.RoleEnum.Banker])) {
      routeCommands.push('banker');
    } else if (this.userService.checkRoles([User.RoleEnum.Consortium])) {
      routeCommands.push('consortium');
    } else if (this.userService.checkRoles([User.RoleEnum.Admin])) {
      routeCommands.push('admin');
    } else {
      alert('No role');
    }
    this.router.navigate(routeCommands);
  }

}
