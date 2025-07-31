import { Routes } from '@angular/router';

import ProductComponent from './components/panels/Product/view-products/view-products';
import Dashboard from './components/panels/Dashboard/dashboard';
import ViewEmployees from './components/panels/Employee/view-employees/view-employees';
import viewSupplier from  './components/panels/Supplier/view-supplier/view-supplier';

export const routes: Routes = [//insert components here
  {path:'',redirectTo:'Dashboard',pathMatch:'full'},
  {path:'Dashboard',component:Dashboard},
  {path: 'Employee', component: ViewEmployees },
  {path: 'Inventory', component: ProductComponent},
  {path:'Supplier',component:viewSupplier},

];
