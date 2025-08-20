import {Injectable, signal} from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export  default class PurchaseStateService {

  purchaseStatus = signal<'idle' | 'processing' | 'success' | 'error'>('idle');

 setStatusIdle() {
   this.purchaseStatus.set('idle');
 }
 setStatusProcessing() {
   this.purchaseStatus.set('processing');
 }
 setStatusSuccess() {
   this.purchaseStatus.set('success');
 }
 setStatusFailed() {
   this.purchaseStatus.set('error');
 }

 getPurchaseState() {
   return this.purchaseStatus();
 }
}
