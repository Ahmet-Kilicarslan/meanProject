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
import { CommonModule } from '@angular/common';
import { Chart, ChartConfiguration, ChartType, registerables } from 'chart.js';

// Register Chart.js components
Chart.register(...registerables);


@Component({
  selector: 'app-pie-chart',
  imports: [CommonModule],
  templateUrl: './pie-chart.html',
  styleUrl: './pie-chart.css'
})

export default class PieChartComponent implements OnChanges ,AfterViewInit,OnDestroy{
  @Input() chartLabels: string[] = [];
  @Input() chartValues: number[] = [];
  @Input() chartColors: string[] = [];
  @Input() title: string = 'Pie Chart';

  @ViewChild('chartCanvas', { static: false }) chartCanvas!: ElementRef<HTMLCanvasElement>;

  private chart: Chart<'pie'> | null = null;
  public isDataLoaded: boolean = false;

  ngAfterViewInit() {
    setTimeout(() => {
      this.createChart();
    }, 100);
  }
  ngOnChanges(changes: SimpleChanges) {
    if (this.chart && (changes['chartLabels'] || changes['chartValues'] || changes['chartColors'])) {
      this.updateChart();
    }
  }
  ngOnDestroy() {
    if (this.chart) {
      this.chart.destroy();
      this.chart = null;
    }
  }

  private createChart() {
    if (!this.chartCanvas) {
      console.error('Chart canvas not found');
      return;
    }

    const ctx = this.chartCanvas.nativeElement.getContext('2d');
    if (!ctx) {
      console.error('Cannot get 2D context from canvas');
      return;
    }


    if (!this.hasValidData()) {
      this.isDataLoaded = false;
      return;
    }

    const config: ChartConfiguration<'pie'> = {
      type: 'pie',
      data: {
        labels: this.chartLabels,
        datasets: [{
          data: this.chartValues,
          backgroundColor: this.getColors(),
          borderColor: '#ffffff',
          borderWidth: 2,
          hoverBorderWidth: 3,
          hoverBorderColor: '#ffffff'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              padding: 20,
              usePointStyle: true,
              font: {
                size: 12
              }
            }
          },
          tooltip: {
            callbacks: {
              label: (context) => {
                const label = context.label || '';
                const value = context.parsed;
                const dataset = context.dataset;
                const total = (dataset.data as number[]).reduce((a, b) => a + b, 0);
                const percentage = total > 0 ? ((value / total) * 100).toFixed(1) : '0';
                return `${label}: ${value} (${percentage}%)`;
              }
            }
          }
        },
        animation: {
          animateRotate: true,
          animateScale: true
        }
      }
    };

    try {
      this.chart = new Chart(ctx, config);
      this.isDataLoaded = true;
      console.log('Chart created successfully');
    } catch (error) {
      console.error('Error creating chart:', error);
      this.isDataLoaded = false;
    }
  }


  private updateChart(): void {
    if (!this.chart || !this.hasValidData()) {
      return;
    }

    this.chart.data.labels = this.chartLabels;
    this.chart.data.datasets[0].data = this.chartValues;
    this.chart.data.datasets[0].backgroundColor = this.getColors();

    this.chart.update('active');
    this.isDataLoaded = true;
  }

  private getColors(): string[] {
    if (this.chartColors && this.chartColors.length >= this.chartLabels.length) {
      return this.chartColors.slice(0, this.chartLabels.length);
    }

    const defaultColors = [
      '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0',
      '#9966FF', '#FF9F40', '#C9CBCF', '#FF6384',
      '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'
    ];

    return this.chartLabels.map((_, index) =>
      defaultColors[index % defaultColors.length]
    );
  }

  private hasValidData(): boolean {
    return this.chartLabels &&
      this.chartValues &&
      this.chartLabels.length > 0 &&
      this.chartValues.length > 0 &&
      this.chartLabels.length === this.chartValues.length &&
      this.chartValues.some(value => value > 0);
  }

  // Public method for parent component to refresh chart
  public refreshChart(): void {
    if (this.chart) {
      this.chart.destroy();
    }
    this.createChart();
  }











}







