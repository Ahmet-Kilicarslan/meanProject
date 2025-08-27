import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-remove-all',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule,CommonModule],
  templateUrl: './remove-all.html',
  styleUrl: './remove-all.css'
})
export default class RemoveAll {
  @Input() productData: any = null;

  @Output() OnSave = new EventEmitter<any>();
  @Output() OnCancel = new EventEmitter<any>();

  onSubmit() {
    if (this.productData) {
      this.OnSave.emit(this.productData);
    }
  }

  onCancelClick() {
    this.OnCancel.emit();

  }
}
