/*import {Component, OnChanges,Input} from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartData, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-pie-chart',
  imports: [BaseChartDirective],
  templateUrl: './pie-chart.html',
  styleUrl: './pie-chart.css'
})
export default class PieChart implements OnChanges {


  @Input() chartLabels: string[] = [];
  @Input() chartValues: number[] = [];
  @Input() chartColors: string[] = [];

  chartData: ChartData<'pie'> = {
    labels: [],
    datasets: [{ data: [], backgroundColor: [] }]
  };

  chartOptions: ChartOptions<'pie'> = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      tooltip: { enabled: true }
    }
  };

  ngOnChanges() {
    this.chartData.labels=this.chartLabels;
    this.chartData.datasets[0].data=this.chartValues;
    this.chartData.datasets[1].backgroundColor=this.chartColors;
  }



}*/
