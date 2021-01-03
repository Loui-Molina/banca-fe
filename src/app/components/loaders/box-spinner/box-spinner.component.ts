import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-box-spinner',
  templateUrl: './box-spinner.component.html',
  styleUrls: ['./box-spinner.component.scss']
})
export class BoxSpinnerComponent implements OnInit {

  loader: boolean;
  key: number;
  @Input() set loading(loading: boolean) {
    const a = Math.random();
    this.key = a;
    setTimeout(() => {
      if (loading !== this.loader && this.key ===  a){
        this.loader = loading;
      }
    }, 200);
  }
  constructor() {
  }

  ngOnInit(): void {
  }

}
