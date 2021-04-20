import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../../services/user.service';
import {User} from '../../../../local-packages/banca-api';

@Component({
  selector: 'app-collections',
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.scss']
})
export class CollectionsComponent {
  constructor(private router: Router,
              private userService: UserService) {
    const routeCommands = ['collections'];
    if (this.userService.checkRoles([User.RoleEnum.Consortium])) {
      routeCommands.push('consortium');
    } else if (this.userService.checkRoles([User.RoleEnum.Admin])) {
      routeCommands.push('admin');
    }
    this.router.navigate(routeCommands);
  }

}
