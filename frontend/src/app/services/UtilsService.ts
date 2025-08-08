import {Injectable} from '@angular/core';
import bootstrap from 'bootstrap';

@Injectable({
  providedIn: 'root'
})
export default class UtilsService {


   closeModal(modalId: string): void {
     const modal = (window as any).bootstrap.Modal.getInstance(document.getElementById(modalId));
     modal?.hide();


  }

  openModal(modalId: string): void {
    const modal = new (window as any).bootstrap.Modal(document.getElementById(modalId));
    modal.show();
  }



}
