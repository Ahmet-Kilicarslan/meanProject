import { Component ,OnInit} from '@angular/core';
import Product from '../../../../models/Product';
import ProductService from '../../../../services/ProductService';
import Supplier from '../../../../models/Supplier';
import supplierService from '../../../../services/SupplierService';
import addSupplierComponent from '../add-supplier/add-supplier';
import utilService from '../../../../services/UtilsService';






@Component({
  selector: 'app-view-supplier',
  standalone:true,
  imports: [addSupplierComponent,],
  templateUrl: './view-supplier.html',
  styleUrls: ['./view-supplier.css']
})
export default class ViewSupplier implements OnInit {
 suppliers:Supplier[]=[];
 productsBySupplier:Product[]=[];
 selectedSupplier:any=null;
 expandedSupplierId:number|null=null;

 constructor(private supplierService:supplierService,private productService:ProductService,private utilsService:utilService) {}

  ngOnInit(){
   this.loadSuppliers();
  }

  isExpanded(supplierId:number):boolean{
   if(supplierId===this.expandedSupplierId){
     return true;
   }else return false;

  }
  getIcon(supplierId:number):string{
    return this.isExpanded(supplierId) ? 'bi-chevron-up' : 'bi-chevron-down';
  }

  loadProductsBySupplier(supplierId:number){
   this.productService.getProductBySupplier(supplierId).subscribe({
     next: (result:any) => {
       this.productsBySupplier = result;
     },error:(err:any) => {
       console.log(err);
     }
   })
  }

  toggleProducts(supplierId:number):void{
    if (this.expandedSupplierId === supplierId) {
      this.expandedSupplierId = null;
      this.productsBySupplier = [];
      return;
    }

    this.expandedSupplierId=supplierId;
    this.loadProductsBySupplier(supplierId);

  }

 loadSuppliers():void{
   this.supplierService.getAllSupplier().subscribe({
     next:supplierList=>{
       this.suppliers=supplierList;

   },error(error){
       console.log(error);
     }
   })
 }


  openAddSupplierModal(){
   this.utilsService.openModal("addSupplierModal")
  }


  handleCancel(){
   this.utilsService.closeModal("addSupplierModal");
  }

  handleSave(supplier:Supplier){
   this.handleAddSupplier(supplier);
  }


  handleAddSupplier(supplier:any){
    this.selectedSupplier = supplier;

    this.supplierService.addSupplier(supplier).subscribe({
      next:supplier=>{
        this.utilsService.closeModal("addSupplierModal");
        this.loadSuppliers()

      },error(error){
        console.log(error);
      }
    })
  }
}
