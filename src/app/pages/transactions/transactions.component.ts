import {Component, OnInit} from '@angular/core';
import {
  User
} from 'local-packages/banca-api';
import {UserService} from '../../services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent {

  constructor(private router: Router,
              private userService: UserService) {
    const routeCommands = ['transactions'];
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
