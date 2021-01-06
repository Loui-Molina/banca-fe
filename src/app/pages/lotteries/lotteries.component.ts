import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../../services/user.service';
import {User} from '@banca-api/model/user';

@Component({
  selector: 'app-lotteries',
  templateUrl: './lotteries.component.html',
  styleUrls: ['./lotteries.component.scss']
})
export class LotteriesComponent {
  constructor(private router: Router,
              private userService: UserService) {
    const routeCommands = ['lotteries'];
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
