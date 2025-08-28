import { Component } from '@angular/core';
import {CommonModule} from '@angular/common';
//import pieComponent from './pie-chart/pie-chart'

@Component({
  selector: 'app-dashboard',
  standalone:true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export default class Dashboard {

  brandLabels: string[] = [];
  brandValues: number[] = [];
  brandColors: string[] = [];

}
