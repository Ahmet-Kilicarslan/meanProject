import { Routes } from '@angular/router';
import ProductComponent from './components/panels/Product/view-products/view-products';
import Dashboard from './components/panels/Dashboard/dashboard';
import ViewEmployees from './components/panels/Employee/view-employees/view-employees';
import viewSupplier from  './components/panels/Supplier/view-supplier/view-supplier';
import LoginComponent from './components/Login/login-component/login-component';
import clientViewProducts from './components/clientPanels/client-view-products/client-view-products';
import clientDashboard from './components/clientPanels/client-dashboard/client-dashboard';
import clientProfile from './components/clientPanels/client-profile/client-profile';
import authGuard from './guards/auth.guard';
import adminGuard from './guards/admin.guard';
import clientGuard from './guards/client.guard';


export const routes: Routes = [//insert components here

  {path:'login',component:LoginComponent},

/*amdin paellens*/
  { path: 'Dashboard', component: Dashboard, canActivate: [authGuard,adminGuard] },
  { path: 'Employee', component: ViewEmployees, canActivate: [authGuard,adminGuard] },
  { path: 'Inventory', component: ProductComponent, canActivate: [authGuard,adminGuard] },
  { path: 'Supplier', component: viewSupplier, canActivate: [authGuard,adminGuard] },


  /*client panels*/
  {path:'clientViewProducts', component: clientViewProducts, canActivate: [authGuard,clientGuard] ,data: { expectedRole: 'user' }},
  {path:'clientDashboard',component:clientDashboard, canActivate: [authGuard,clientGuard] },
  {path:'clientProfile',component:clientProfile, canActivate: [authGuard,clientGuard] },

  //*****************************************************
   { path: '**', redirectTo: '/login' }


];
