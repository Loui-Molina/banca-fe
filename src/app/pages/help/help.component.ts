import {Component, OnInit} from '@angular/core';
import {
  User
} from 'local-packages/banca-api';
import {UserService} from '../../services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss']
})
export class HelpComponent {

  constructor(private router: Router,
              private userService: UserService) {
    const routeCommands = ['help'];
    if (this.userService.checkRoles([User.RoleEnum.Banker])) {
      routeCommands.push('banking');
    } else if (this.userService.checkRoles([User.RoleEnum.Consortium])) {
      routeCommands.push('consortium');
    } else if (this.userService.checkRoles([User.RoleEnum.Admin])) {
      routeCommands.push('admin');
    }
    this.router.navigate(routeCommands);
  }
}
