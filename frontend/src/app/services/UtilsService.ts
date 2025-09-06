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

  generateRandomColors(count: number): string[] {
    const colors: string[] = [];
    for (let i = 0; i < count; i++) {
      const hue = (i * 360 / count) + Math.random() * 60; // Spread hues evenly with some randomness
      const saturation = 70 + Math.random() * 30; // 70-100%
      const lightness = 50 + Math.random() * 20;  // 50-70%
      colors.push(`hsl(${hue}, ${saturation}%, ${lightness}%)`);
    }
    return colors;
  }



}
