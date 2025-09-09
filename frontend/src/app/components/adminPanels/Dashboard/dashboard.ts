import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import pieComponent from './pie-chart/pie-chart.js'
import lineComponent from './purchases-line-chart/purchases-line-chart.js'
import ProductService from '../../../services/ProductService.js';
import PurchaseService from '../../../services/PurchaseService';
import ProductWithDetails from '../../../models/ProductWithDetails.js';
import { HttpClient } from '@angular/common/http';
import UtilsService from '../../../services/UtilsService.js';
import { Purchase } from '../../../models/Purchase';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, pieComponent, lineComponent],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export default class Dashboard implements OnInit {

  // Pie chart values
  brandLabels: string[] = [];
  brandValues: number[] = [];
  brandColors: string[] = [];

  // Line chart values
  purchaseCount: number = 0;
  dailyPurchases: { date: string, amount: number }[] = [];

  // Loading states
  isLoadingPie: boolean = true;
  isLoadingLine: boolean = true;
  hasError: boolean = false;
  errorMessage: string = '';
  lowestStock: string = '';

  constructor(
    private ProductService: ProductService,
    private UtilsService: UtilsService,
    private PurchaseService: PurchaseService
  ) {}

  ngOnInit(): void {
    this.loadPieChart();
    this.loadLineChart();
  }

  loadPieChart(): void {
    this.isLoadingPie = true;
    this.hasError = false;
    let min: number = 10;

    this.ProductService.getAllProductsWithDetails().subscribe({
      next: (products: ProductWithDetails[]) => {
        try {
          const supplierData: { [key: string]: number } = {};

          for (const product of products) {
            const supplier = product.supplierName || 'Unknown Supplier';
            const amount = Number(product.amount) || 0;

            if (product.amount <= min) {
              min = product.amount;
              if (min !== null) {
                this.lowestStock = product.name;
              }
            }

            supplierData[supplier] = (supplierData[supplier] || 0) + amount;
          }

          this.brandLabels = Object.keys(supplierData);
          this.brandValues = Object.values(supplierData);
          this.brandColors = this.UtilsService.generateRandomColors(this.brandLabels.length);

          this.isLoadingPie = false;

          console.log('Pie chart data loaded:', {
            labels: this.brandLabels,
            values: this.brandValues,
            colors: this.brandColors
          });

        } catch (error) {
          console.error('Error processing product data:', error);
          this.handleError('Error processing data');
        }
      },
      error: (error: any) => {
        console.error('Error loading pie chart data:', error);
        this.handleError('Failed to load chart data');
      }
    });
  }

  loadLineChart(): void {
    this.isLoadingLine = true;
    this.hasError = false;

    console.log('Starting line chart data load...');

    this.PurchaseService.getaAllPurchases().subscribe({
      next: (purchases: Purchase[]) => {
        console.log('Raw purchases received:', purchases);
        this.purchaseCount = purchases.length;

        try {
          if (!purchases || purchases.length === 0) {
            console.log('No purchases data received');
            this.dailyPurchases = [];
            this.isLoadingLine = false;
            return;
          }

          const purchaseData: { [dateString: string]: number } = {};

          for (const purchase of purchases) {
            // Handle date conversion properly
            const dateObj = new Date(purchase.date);
            const dateString = dateObj.toISOString().split('T')[0];
            const amount = Number(purchase.totalAmount) || 0;

            console.log(`Processing purchase: ${dateString} = ${amount}`);
            purchaseData[dateString] = (purchaseData[dateString] || 0) + amount;
          }

          // Convert to array format
          this.dailyPurchases = Object.entries(purchaseData).map(([date, amount]) => ({
            date: date,
            amount: amount
          }));

          console.log('Processed daily purchases:', this.dailyPurchases);
          this.isLoadingLine = false;

        } catch (error: any) {
          console.error('Error processing purchase data:', error);
          this.handleError('Error processing purchase data');
        }
      },
      error: (error: any) => {
        console.error('Error loading line chart data:', error);
        this.handleError('Failed to load purchase data');
      }
    });
  }

  private handleError(message: string): void {
    this.hasError = true;
    this.errorMessage = message;
    this.isLoadingPie = false;
    this.isLoadingLine = false;

    // Reset data
    this.brandLabels = [];
    this.brandValues = [];
    this.brandColors = [];
    this.dailyPurchases = [];
  }

  // Public methods for template
  getTotalProducts(): number {
    return this.brandValues.length > 0 ? this.brandValues.reduce((a, b) => a + b, 0) : 0;
  }

  getSupplierCount(): number {
    return this.brandLabels.length;
  }

  refreshDashboard(): void {
    this.loadPieChart();
    this.loadLineChart();
  }
}
