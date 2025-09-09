import './chartjs.config'

import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import * as bootstrap from 'bootstrap';


import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import  App  from './app/app';
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement
} from 'chart.js';

// Register Chart.js components
Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,    // For pie charts
  BarElement     // For bar charts
);

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
(window as any).bootstrap = bootstrap;
