import {Component, OnInit, SimpleChanges} from '@angular/core';
import Supplier from '../../../models/Supplier';
import Product from '../../../models/Product';
import supplierService from '../../../services/SupplierService';
import productService from '../../../services/ProductService';
import utilService from '../../../services/UtilsService';
import UserService from '../../../services/UserService';
import ProductService from '../../../services/ProductService';
import SupplierService from '../../../services/SupplierService';
import UtilsService from '../../../services/UtilsService';
import cartModal from '../cart/cart';
import {purchasedProduct, Purchase} from '../../../models/Purchase';
import PurchaseService from '../../../services/PurchaseService';

@Component({
  selector: 'app-client-view-products',
  standalone: true,
  imports: [cartModal],
  templateUrl: './client-view-products.html',
  styleUrl: './client-view-products.css'
})

export default class ClientViewProducts implements OnInit {

  constructor(private productService: ProductService,
              private supplierService: SupplierService,
              private utilsService: UtilsService,
              private purchaseService: PurchaseService,
              private userService: UserService) {
  }

  products: Product[] = [];
  suppliers: Supplier[] = [];
  cartItems: { product: Product, quantity: number }[] = [];
  itemQuantity: number = 0;
  totalPrice: number = 0;

  purchaseCompleted: boolean = true;


  ngOnInit() {
    this.loadSuppliers();
    this.calculateTotalPrice()
  }

  loadSuppliers() {
    this.supplierService.getAllSupplier().subscribe({
      next: suppliers => {
        this.suppliers = suppliers;
        this.loadProducts();
      }, error: error => {
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
      }, error: error => {
        console.error(error);
      }
    })

  }

  getSupplierName(id: number): string {
    const supplier = this.suppliers.find((supplier) => supplier.id === id);
    return supplier ? supplier.name : "Unknown";

  }

  handleOpenCart() {
    this.utilsService.openModal('cartModal');
  }


  createPurchase() {

    if (!this.purchaseCompleted || this.cartItems.length === 0) {
      return;
    }

    this.purchaseCompleted = false;

    // Convert your frontend cart format to backend purchase format
    const purchasedProducts: purchasedProduct[] = this.cartItems.map(item => ({
      id: 0,
      purchaseId: 0,
      productId: item.product.id!,
      quantity: item.quantity,
      price: item.product.price
    }));

    const purchaseData = {
      userId: this.userService.getCurrentUserId(),
      totalAmount: this.getTotalAmount(),
      products: purchasedProducts
    };

    this.purchaseService.createPurchase(purchaseData).subscribe({
      next: response => {
        console.log('purchase successful',response);
        this.purchaseCompleted = true;
        this.cartItems=[];
        this.calculateTotalPrice();

      },error: error => {
        console.log('purchase failed',error);
        this.purchaseCompleted = true;

      }
    })
    this.loadSuppliers()

  }


  handleAddToCart(product: Product): void {
    const existingProduct = this.cartItems.find(
      item => item.product.id === product.id);

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      this.cartItems.push({
        product: product,
        quantity: 1
      });

    }
    this.calculateTotalPrice();

  }

  private calculateTotalPrice(): number {
    this.totalPrice=0;
    for (const item of this.cartItems) {
      this.totalPrice += item.product.price*item.quantity;
    }
    return this.totalPrice;
  }

  getTotalAmount() {
    return this.totalPrice;

  }
  getItemQuantity(): number {
    this.itemQuantity =0;
    for( const item of this.cartItems) {
      this.itemQuantity += item.quantity;
    }
    return this.itemQuantity;
  }

  removeFromCart(productId:number): void {
    this.cartItems = this.cartItems.filter(item => item.product.id !== productId);
    this.calculateTotalPrice()
  }

  updateQuantity(data: {productId: number, newQuantity: number}) {
    const item = this.cartItems.find(
      cartItem => cartItem.product.id === data.productId);

    if (!item) return;

    if (data.newQuantity <= 0) {
      this.removeFromCart(data.productId);
    } else {
      item.quantity = data.newQuantity;
      this.calculateTotalPrice();
    }
  }




}
