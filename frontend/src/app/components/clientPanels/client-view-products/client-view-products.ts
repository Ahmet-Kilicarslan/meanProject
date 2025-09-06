import {Component, inject, OnInit, SimpleChanges} from '@angular/core';
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
import PurchaseStateService from '../../../services/PurchaseStateService';
import {Toast} from 'bootstrap';
import ProductWithDetails from '../../../models/ProductWithDetails';

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
              private userService: UserService,
              private purchaseStateService: PurchaseStateService,
  ) {
  }


  products: Product[] = [];
  suppliers: Supplier[] = [];

  productsWithDetails: ProductWithDetails[] = [];

  cartItems: { product: Product, quantity: number }[] = [];
  itemQuantity: number = 0;
  totalPrice: number = 0;
  purchaseCompleted: boolean = true;
error='';

  ngOnInit() {
this.loadProductsWithDetails()
    this.calculateTotalPrice()
    this.purchaseStateService.setStatusIdle();
  }


  loadProductsWithDetails() {
    this.error = '';
    console.log('Loading products with details...');

    this.productService.getAllProductsWithDetails().subscribe({
      next: products => {

        this.productsWithDetails = products ;

      }, error: error => {
        console.error('Component error:', error);

        this.error = 'failed to load products';
      }
    })
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

  handleCloseCart(): void {
    this.utilsService.closeModal('cartModal');
  }


  createPurchase() {
    try {
      if (!this.purchaseCompleted || this.cartItems.length === 0 || this.purchaseStateService.getPurchaseState() !== 'idle') {
        return;
      }
      this.purchaseStateService.setStatusProcessing();

      this.purchaseCompleted = false;


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

          console.log('purchase successful', response);
          this.purchaseCompleted = true;

          this.calculateTotalPrice();
          this.purchaseStateService.setStatusSuccess();
          this.updateProductAmountAfterPurchase();
          this.loadProductsWithDetails()
          this.handleCloseCart()
          this.showSuccessToaster()
          this.cartItems = [];

        }, error: error => {
          console.log('purchase failed', error);
          this.purchaseCompleted = true;
          this.purchaseStateService.setStatusFailed()
        }
      })




    } catch (error) {
      console.error('Failed to create purchase in component ', error);
      this.purchaseCompleted = true;
      this.handleCloseCart()

    }

  }

  updateProductAmountAfterPurchase() {
    console.log('updateProductAmountAfterPurchase() function called ');
    console.log('Current Purchase status', this.purchaseStateService.getPurchaseState());

    if (this.purchaseStateService.getPurchaseState() !== 'success') {
      return;
    }

    console.log('📦 Cart items to update:', [...this.cartItems]);

    for (const item of this.cartItems) {

      console.log(`🔄 Processing item:`, item);
      console.log(`📊 Current amount: ${item.product.amount}, Quantity: ${item.quantity}`);

      const newAmount = item.product.amount - item.quantity;
      console.log(` newAmount : ${newAmount}`);

      this.productService.updateProductAmount(item.product.id, newAmount).subscribe({

        next: response => {

          console.log(`✅ SUCCESS: Product ${item.product.id} updated:`, response);
          this.purchaseStateService.setStatusIdle();

        }, error: error => {
          console.log('Failed to update product amount in database after successfull purchase', error);
        }
      })
    }

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
    this.totalPrice = 0;
    for (const item of this.cartItems) {
      this.totalPrice += item.product.price * item.quantity;
    }
    return this.totalPrice;
  }

  getTotalAmount() {
    return this.totalPrice;

  }

  getItemQuantity(): number {
    this.itemQuantity = 0;
    for (const item of this.cartItems) {
      this.itemQuantity += item.quantity;
    }
    return this.itemQuantity;
  }

  removeFromCart(productId: number): void {
    this.cartItems = this.cartItems.filter(item => item.product.id !== productId);
    this.calculateTotalPrice()
  }

  updateQuantity(data: { productId: number, newQuantity: number }) {
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

  showSuccessToaster() {
    const tost = document.getElementById('success-toaster');
    if (tost) {
      const toast = new Toast(tost, {
        autohide: true,
        delay: 10000
      });
      toast.show();
    }


  }


}
