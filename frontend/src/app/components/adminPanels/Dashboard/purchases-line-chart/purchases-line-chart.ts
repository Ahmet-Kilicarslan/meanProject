import {Component, OnChanges, Input, SimpleChanges} from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartData, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-purchases-line-chart',
  imports: [BaseChartDirective],
  templateUrl: './purchases-line-chart.html',
  styleUrl: './purchases-line-chart.css'
})
export class PurchasesLineChart implements OnChanges {

  ngOnChanges() {
  }

}
