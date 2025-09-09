import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  ElementRef,
  ViewChild,
  AfterViewInit,
  OnDestroy,
  OnInit
} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Chart, ChartConfiguration, ChartType, registerables} from 'chart.js';


Chart.register(...registerables);


@Component({
  selector: 'app-purchases-line-chart',
  imports: [CommonModule],
  templateUrl: './purchases-line-chart.html',
  styleUrl: './purchases-line-chart.css'
})
export default class PurchasesLineChart implements OnChanges, AfterViewInit, OnDestroy {

  @Input() purchaseData: { date: string, amount: number }[] = [];

   chartValues: number[] = [];
   chartLabels: string[] = [];

  @Input() title: string = 'Line Chart';
  @Input() lineColor: string = '#007bff';
  @Input() backgroundColor: string = 'rgba(0, 123, 255, 0.1)';

  @ViewChild('chartCanvas', {static: false}) chartCanvas!: ElementRef<HTMLCanvasElement>;

  private chart: Chart<'line'> | null = null;
  public isDataLoaded: boolean = false;

  ngOnChanges(changes: SimpleChanges) {
    if (this.chart && (changes['YValues'] || changes['XValues'])) {
      this.updateChart();
    }
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.createChart();
    }, 100);
  }

  ngOnDestroy() {
    if (this.chart) {
      this.chart.destroy();
      this.chart = null;
    }
  }

  createChart() {
    if (!this.chartCanvas) {
      console.error('Chart canvas not found');
      return;
    }

    const ctx = this.chartCanvas.nativeElement.getContext('2d');
    if (!ctx) {
      console.error('Cannot get 2D context from canvas');
      return;
    }
    this.processData() ;


    const config: ChartConfiguration<'line'> = {
      type: 'line',
      data: {
        labels: this.chartLabels,
        datasets: [{
          label: this.title,
          data: this.chartValues,
          borderColor: this.lineColor,
          backgroundColor: this.backgroundColor,
          borderWidth: 3,
          fill: true, // Fill area under the line
          tension: 0.4, // Smooth curves
          pointRadius: 6,
          pointHoverRadius: 8,
          pointBackgroundColor: this.lineColor,
          pointBorderColor: '#ffffff',
          pointBorderWidth: 2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: 'top',
            labels: {
              usePointStyle: true,
              padding: 20,
              font: {
                size: 12
              }
            }
          },
          tooltip: {
            mode: 'index',
            intersect: false,
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            titleColor: '#ffffff',
            bodyColor: '#ffffff',
            borderColor: this.lineColor,
            borderWidth: 1,
            callbacks: {
              label: (context) => {
                const label = context.dataset.label || '';
                const value = context.parsed.y;
                return `${label}: ${value}`;
              }
            }
          }
        },
        scales: {
          x: {
            display: true,
            title: {
              display: true,
              text: 'Time Period',
              font: {
                size: 14,
                weight: 'bold'
              }
            },
            grid: {
              color: 'rgba(0, 0, 0, 0.1)'
            }
          },
          y: {
            display: true,
            title: {
              display: true,
              text: 'Values',
              font: {
                size: 14,
                weight: 'bold'
              }
            },
            grid: {
              color: 'rgba(0, 0, 0, 0.1)'
            },
            beginAtZero: true
          }
        },
        interaction: {
          mode: 'nearest',
          axis: 'x',
          intersect: false
        },
        animation: {
          duration: 1000,
          easing: 'easeInOutQuart'
        }
      }


    };

    try {
      this.chart = new Chart(ctx, config);
      this.isDataLoaded = true;
      console.log('Line chart created successfully');
    } catch (error) {
      console.error('Error creating line chart:', error);
      this.isDataLoaded = false;
    }
  }

  updateChart() {
    if (!this.chart ) {
      console.log('Cannot update chart: no chart instance or invalid data');
      return;
    }
    this.processData();

    // Update chart data
    this.chart.data.labels = this.chartLabels;
    this.chart.data.datasets[0].data = this.chartValues;
    this.chart.data.datasets[0].borderColor = this.lineColor;
    this.chart.data.datasets[0].backgroundColor = this.backgroundColor;

    // Update the chart
    this.chart.update('active');
    this.isDataLoaded = true;

    console.log('Line chart updated with new data');

  }

  private processData(): void {
    // Sort by date first
    const sortedData = this.purchaseData.sort((a, b) =>
      new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    // Extract labels and values
    this.chartLabels = sortedData.map(item => this.formatDate(item.date));
    this.chartValues = sortedData.map(item => item.amount);
  }

  private formatDate(dateString: string): string {
    const date = new Date(dateString);
    return `${date.getMonth() + 1}/${date.getDate()}`; // "1/15" format
  }

}
