import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit {
  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };
  @Input('results') results: any;
  @Input('xAxisLabel') xAxisLabel: string;
  @Input('yAxisLabel') yAxisLabel: string;

  constructor() {
  }

  ngOnInit(): void {
  }
}
