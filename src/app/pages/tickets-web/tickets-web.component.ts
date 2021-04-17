import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../../services/user.service';
import {User} from '../../../../local-packages/banca-api';

@Component({
  selector: 'app-tickets-web',
  templateUrl: './tickets-web.component.html',
  styleUrls: ['./tickets-web.component.scss']
})
export class TicketsWebComponent {
  constructor(private router: Router,
              private userService: UserService) {
    const routeCommands = ['tickets-web'];
    if (this.userService.checkRoles([User.RoleEnum.Banker])) {
      routeCommands.push('banker');
    } else if (this.userService.checkRoles([User.RoleEnum.Consortium])) {
      routeCommands.push('consortium');
    } else if (this.userService.checkRoles([User.RoleEnum.Admin])) {
      routeCommands.push('admin');
    }
    this.router.navigate(routeCommands);
  }

}
