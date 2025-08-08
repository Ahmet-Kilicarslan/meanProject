
import {Component, OnInit, SimpleChanges} from '@angular/core';
import Supplier from '../../../models/Supplier';
import Product from '../../../models/Product';
import supplierService from '../../../services/SupplierService';
import productService from '../../../services/ProductService';
import utilService  from '../../../services/UtilsService';
import ProductService from '../../../services/ProductService';
import SupplierService from '../../../services/SupplierService';
import UtilsService from '../../../services/UtilsService';
@Component({
  selector: 'app-client-view-products',
  standalone: true,
  imports: [],
  templateUrl: './client-view-products.html',
  styleUrl: './client-view-products.css'
})
export default class ClientViewProducts implements OnInit {
  products: Product[] = [];
  suppliers: Supplier[] = [];
  constructor(private productService: ProductService, private supplierService: SupplierService, private utilsService: UtilsService) {
  }

 ngOnInit() {
    this.loadSuppliers();
  }

  loadSuppliers() {
    this.supplierService.getAllSupplier().subscribe({
      next: suppliers => {
        this.suppliers = suppliers;
        this.loadProducts();
      },error: error => {
        console.log(error);
      }
    })
  }

  loadProducts() {
    this.productService.getAllProducts().subscribe({
      next: products => {
        this.products = products.map(product => ({
          ...product, supplierName: this.getSupplierName(product.supplier)
        }));
      },error: error => {
        console.error(error);
      }
    })

  }
  getSupplierName(id: number): string {
    const supplier = this.suppliers.find((supplier) => supplier.id === id);
    return supplier ? supplier.name : "Unknown";

  }
  handleBuy(): void {}


}
