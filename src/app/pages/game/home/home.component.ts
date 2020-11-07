import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';


@Component({
  selector: 'app-accounts',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private fb: FormBuilder, private router: Router) {
  }
  isCollapsed = false;
  urlBg = 'assets/imgs/bettingfoot.jpg';

  data = [
    {title: 'American football', events: 5, background: 'assets/imgs/ameri.jpg'},
    {title: 'Hockey', events: 0, background: 'assets/imgs/hockey.jpg', disabled: true},
    {title: 'Football', events: 2, background: 'assets/imgs/football.jpg'}
  ];

  ngOnInit(): void {
  }
}
