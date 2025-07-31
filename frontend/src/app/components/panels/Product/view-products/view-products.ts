import {Component, OnInit, SimpleChanges} from '@angular/core';
import Product from '../../../../models/Product';
import Supplier from '../../../../models/Supplier';
import ProductService from '../../../../services/ProductService';
import SupplierService from '../../../../services/SupplierService';
import ProductComponent from '../add-editProduct/Product.component';
import UtilsService from '../../../../services/UtilsService';
import removeAll from '../remove-all/remove-all';


@Component({
  selector: 'app-view-products',
  standalone: true,
  imports: [
    ProductComponent,removeAll

  ],
  templateUrl: './view-products.html',
  styleUrls: ['./view-products.css']
})
export default class ViewProducts implements OnInit {
  products: Product[] = [];
  suppliers: Supplier[] = [];
  isLoading = false;
  isEditMode = false;
  error: string = '';
  selectedProduct: any = null;


  constructor(private productService: ProductService, private supplierService: SupplierService, private utilsService: UtilsService) {
  }


  ngOnInit() {
    this.loadSuppliers();
  }



  getSupplierName(id: number): string {
    const supplier = this.suppliers.find((supplier) => supplier.id === id);
    return supplier ? supplier.name : "Unknown";

  }

  loadSuppliers(): void {
    this.isLoading = true;
    this.supplierService.getAllSupplier().subscribe({
      next: suppliers => {
        this.suppliers = suppliers;
        this.loadProducts();
      }
    });
  }


  loadProducts() {
    this.isLoading = true;
    this.error = '';
    this.productService.getAllProducts().subscribe({
      next: products => {
        this.products = products.map(product => ({
          ...product, supplierName: this.getSupplierName(product.supplier)
        }));

      }, error: error => {
        this.error = 'failed to load products';
        this.isLoading = false;
      }
    })

  }

  openAddProductModal() {
    this.isEditMode = false;
    this.selectedProduct = null;
    this.utilsService.openModal('add/editProductModal');
  }

  openEditProductModal(product: Product) {
    this.isEditMode = true;
    this.selectedProduct={...product,supplierName:this.getSupplierName(product.supplier)}

   this.utilsService.openModal('add/editProductModal');
  }

  openDeleteModal(product:Product){
    this.selectedProduct={...product};
    /*const modal = new (window as any).bootstrap.Modal(document.getElementById('removeAllModal'));
    modal.show()*/
    this.utilsService.openModal('removeAllModal');
  }

  handleCancel(id:string) {
   this.utilsService.closeModal(id);
  }


  handleSave(productData: Product) {
    if (this.isEditMode) {
      this.updateProduct(productData);
      this.utilsService.closeModal('add/editProductModal');

    } else {
      this.addProduct(productData);
      this.utilsService.closeModal('add/editProductModal');
    }

    this.selectedProduct = null;
  }

  updateProduct(productData: any) {
    this.selectedProduct = productData;
    this.productService.updateProduct(productData).subscribe({
      next: (data: Product) => {
        this.isEditMode = false;
        this.loadProducts();
        this.utilsService.closeModal('add/editProductModal')
      }, error: error => {
        this.error = error;
        this.isEditMode=false;
        this.utilsService.closeModal('add/editProductModal')
      }
    })

  }

  addProduct(productData: any) {
    this.selectedProduct = productData;
    this.productService.addProduct(productData).subscribe({
      next: (data: Product) => {
        this.isEditMode = false;
        this.loadProducts();
        this.utilsService.closeModal('add/editProductModal')

      }, error: error => {
        this.error = error;
        this.isEditMode=false;
      }
    })
    this.utilsService.closeModal('add/editProductModal')
  }

  deleteProduct(productData:Product){
    this.selectedProduct=productData;
    this.productService.deleteProduct(productData.id).subscribe({
      next: (data:any)=>{
        this.utilsService.closeModal('removeAllModal');
        this.loadProducts()
        this.selectedProduct=null;
      },
      error:error=>{
        console.log(error);


      }
    })
  }

}
