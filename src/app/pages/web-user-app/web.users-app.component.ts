import {Component, OnInit} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {AuthService, CommonService} from '../../../../local-packages/banca-api';
import {Router} from '@angular/router';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-web-users-betting-panel',
  templateUrl: './web.users-app.component.html',
  styleUrls: ['./web.users-app.component.scss']
})
export class WebUsersAppComponent implements OnInit {

  establishmentName: string;
  constructor(private userService: UserService,
              private commonService: CommonService,
              private authService: AuthService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.commonService.commonControllerGetEstablishmentName().subscribe(res => {
      this.establishmentName = res.name;
    }, error => {
      throw new HttpErrorResponse(error);
    });
  }

  logout(): void {
    this.authService.authControllerLogOut().subscribe(value => {
      console.log('Logout successfully');
    }, error => {
      console.log('Logout Err');
    });
    this.userService.logout();
    this.router.navigate(['login']);
  }



}
