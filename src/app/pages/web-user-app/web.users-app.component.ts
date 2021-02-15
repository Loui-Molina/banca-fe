import {Component, OnInit} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {AuthService, CommonService, DashboardService} from '../../../../local-packages/banca-api';
import {Router} from '@angular/router';
import {UserService} from '../../services/user.service';
import {forkJoin, Observable} from 'rxjs';

@Component({
  selector: 'app-web-users-betting-panel',
  templateUrl: './web.users-app.component.html',
  styleUrls: ['./web.users-app.component.scss']
})
export class WebUsersAppComponent implements OnInit {

  establishmentName: string;
  balance = 0;
  loading = true;
  constructor(private userService: UserService,
              private commonService: CommonService,
              private authService: AuthService,
              private dashboardService: DashboardService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.loading = true;
    this.initDataSync().subscribe(responseList => {
      this.establishmentName = responseList[0].name;
      this.balance = responseList[1].balance;
      this.loading = false;
    }, error => {
      this.loading = false;
      throw new HttpErrorResponse(error);
    });
  }

  private initDataSync(): Observable<any[]> {
    const commonControllerGetEstablishmentName = this.commonService.commonControllerGetEstablishmentName();
    const dashboardControllerGetWebUserWidgetsStatistics = this.dashboardService.dashboardControllerGetWebUserWidgetsStatistics();
    return forkJoin([
      commonControllerGetEstablishmentName,
      dashboardControllerGetWebUserWidgetsStatistics
    ]);
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
