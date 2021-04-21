import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../../services/user.service';
import {User} from '../../../../local-packages/banca-api';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.scss']
})
export class BalanceComponent {
  constructor(private router: Router,
              private userService: UserService) {
    const routeCommands = ['balance'];
    if (this.userService.checkRoles([User.RoleEnum.Consortium])) {
      routeCommands.push('consortium');
    } else if (this.userService.checkRoles([User.RoleEnum.Admin])) {
      routeCommands.push('admin');
    }
    this.router.navigate(routeCommands);
  }

}
