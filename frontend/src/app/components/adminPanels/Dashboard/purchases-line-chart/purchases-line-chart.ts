import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  ElementRef,
  ViewChild,
  AfterViewInit,
  OnDestroy
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart, ChartConfiguration, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-purchases-line-chart',
  imports: [CommonModule],
  templateUrl: './purchases-line-chart.html',
  styleUrl: './purchases-line-chart.css'
})
export default class PurchasesLineChart implements OnChanges, AfterViewInit, OnDestroy {

  @Input() purchaseData: { date: string, amount: number }[] = [];
  @Input() title: string = 'Line Chart';
  @Input() lineColor: string = '#007bff';
  @Input() backgroundColor: string = 'rgba(0, 123, 255, 0.1)';
  @Input() dateFormat: 'short' | 'medium' | 'full' = 'short';

  @ViewChild('chartCanvas', { static: false }) chartCanvas!: ElementRef<HTMLCanvasElement>;

  private chart: Chart<'line'> | null = null;
  public isDataLoaded: boolean = false;

  // Processed data for chart
  private chartLabels: string[] = [];
  private chartValues: number[] = [];

  ngOnChanges(changes: SimpleChanges) {
    console.log('Line chart ngOnChanges triggered');
    console.log('Changes:', changes);
    console.log('Current purchaseData:', this.purchaseData);

    if (changes['purchaseData'] && this.purchaseData) {
      console.log('Processing new purchase data...');
      this.processData();

      if (this.chart) {
        console.log('Chart exists, updating...');
        this.updateChart();
      }
    }
  }

  ngAfterViewInit() {
    console.log('Line chart AfterViewInit');
    console.log('Purchase data at init:', this.purchaseData);

    setTimeout(() => {
      this.processData();
      this.createChart();
    }, 100);
  }

  ngOnDestroy() {
    if (this.chart) {
      this.chart.destroy();
      this.chart = null;
    }
  }

  private processData(): void {
    console.log('=== PROCESSING DATA ===');
    console.log('Input purchaseData:', this.purchaseData);

    if (!this.purchaseData || this.purchaseData.length === 0) {
      console.log('No purchase data to process');
      this.chartLabels = [];
      this.chartValues = [];
      this.isDataLoaded = false;
      return;
    }

    // Sort data by date
    const sortedData = [...this.purchaseData].sort((a, b) =>
      new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    // Extract labels and values
    this.chartLabels = sortedData.map(item => this.formatDate(item.date));
    this.chartValues = sortedData.map(item => item.amount);

    console.log('Processed chartLabels:', this.chartLabels);
    console.log('Processed chartValues:', this.chartValues);

    this.isDataLoaded = this.chartLabels.length > 0 && this.chartValues.length > 0;
  }

  private formatDate(dateString: string): string {
    const date = new Date(dateString);

    switch (this.dateFormat) {
      case 'short':
        return `${date.getMonth() + 1}/${date.getDate()}`; // "8/14"

      case 'medium':
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
          'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return `${months[date.getMonth()]} ${date.getDate()}`; // "Aug 14"

      case 'full':
        return date.toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric'
        }); // "August 14"

      default:
        return `${date.getMonth() + 1}/${date.getDate()}`;
    }
  }

  createChart() {
    console.log('=== CREATING CHART ===');
    console.log('Canvas element:', this.chartCanvas);
    console.log('Chart labels:', this.chartLabels);
    console.log('Chart values:', this.chartValues);

    if (!this.chartCanvas) {
      console.error('Chart canvas not found');
      return;
    }

    const ctx = this.chartCanvas.nativeElement.getContext('2d');
    if (!ctx) {
      console.error('Cannot get 2D context from canvas');
      return;
    }

    // Check if we have valid data
    if (this.chartLabels.length === 0 || this.chartValues.length === 0) {
      console.log('No valid data for chart creation');
      this.isDataLoaded = false;
      return;
    }

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
          fill: true,
          tension: 0.4,
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
                return `${label}: $${value}`;
              }
            }
          }
        },
        scales: {
          x: {
            display: true,
            title: {
              display: true,
              text: 'Date',
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
              text: 'Amount (₺)',
              font: {
                size: 14,
                weight: 'bold'
              }
            },
            grid: {
              color: 'rgba(0, 0, 0, 0.1)'
            },
            beginAtZero: true,
            ticks: {
              callback: function(value) {
                return '₺' + value;
              }
            }
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
    console.log('=== UPDATING CHART ===');

    if (!this.chart) {
      console.log('No chart instance to update');
      return;
    }

    if (this.chartLabels.length === 0 || this.chartValues.length === 0) {
      console.log('No valid data to update chart');
      return;
    }

    // Update chart data
    this.chart.data.labels = this.chartLabels;
    this.chart.data.datasets[0].data = this.chartValues;
    this.chart.data.datasets[0].borderColor = this.lineColor;
    this.chart.data.datasets[0].backgroundColor = this.backgroundColor;

    // Update the chart
    this.chart.update('active');
    this.isDataLoaded = true;

    console.log('Line chart updated successfully');
  }

  // Public methods for template
  public getTotalValue(): number {
    return this.chartValues.reduce((a, b) => a + b, 0);
  }

  public getAverageValue(): number {
    if (this.chartValues.length === 0) return 0;
    return this.getTotalValue() / this.chartValues.length;
  }

  public getDataPointCount(): number {
    return this.chartValues.length;
  }
}
