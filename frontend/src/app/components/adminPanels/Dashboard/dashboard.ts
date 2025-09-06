import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
//import pieComponent from './pie-chart/pie-chart'
import ProductService from '../../../services/ProductService';
import ProductWithDetails from '../../../models/ProductWithDetails';
import {HttpClient} from '@angular/common/http';

import UtilsService from '../../../services/UtilsService';




@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, /*pieComponent*/],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})


export default class Dashboard  {


  brandLabels: string[] = [];
  brandValues: number[] = [];
  brandColors: string[] = [];



  constructor(
    private ProductService: ProductService,
    private UtilsService: UtilsService) {
  }
/*
  ngOnInit() {
    this.loadLineChart();
    this.loadPieChart();


  }*/


  loadPieChart() {
    this.ProductService.getAllProductsWithDetails().subscribe({
      next: products => {
        const supplierData: { [key: string]: number } = {}

        for (const product of products) {
          const supplier = product.supplier;
          const amount = product.amount



         supplierData[supplier] = (supplierData[supplier] || 0) + amount;
         if (supplierData[supplier]) {
            supplierData[supplier] += amount;
          } else {
            supplierData[supplier] = amount;
          }
        }
        this.brandLabels = Object.keys(supplierData)
        this.brandValues=Object.values(supplierData)

       this.brandColors=this.UtilsService.generateRandomColors(this.brandLabels.length);

      }, error(error: any) {
        console.log(error);
      }
    })


  }



  loadLineChart() {
  }
}
