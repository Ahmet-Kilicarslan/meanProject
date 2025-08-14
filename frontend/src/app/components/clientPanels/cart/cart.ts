import {Component, OnInit, Output, Input, EventEmitter} from '@angular/core';
import PurchaseService from '../../../services/PurchaseService';
import ProductService from '../../../services/ProductService';
import {purchasedProduct, Purchase} from '../../../models/Purchase';
import Product from '../../../models/Product';

@Component({
  selector: 'app-cart',
  imports: [],
  templateUrl: './cart.html',
  styleUrl: './cart.css'
})
export default class Cart  {

  constructor(private PurchaseService: PurchaseService, private ProductService: ProductService) {
  }

  @Input() cartItems: { product: Product, quantity: number }[] = [];
  @Input() totalAmount: number = 0;
  @Output() onBuy = new EventEmitter<void>();
  @Output() onRemove = new EventEmitter<number>();
  @Output() onUpdate = new EventEmitter<{productId: number, newQuantity: number}>();


  handleBuy() {
    this.onBuy.emit();

  }
  removeItem(ProductId: number) {
    this.onRemove.emit(ProductId);
  }

  updateQuantity(item: { product: Product, quantity: number }, newQuantity: number) {
    this.onUpdate.emit({
      productId: item.product.id!,
      newQuantity: newQuantity
    });
  }





}
