import {Component, EventEmitter, input, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import Supplier from '../../../../models/Supplier';
import SupplierService from '../../../../services/SupplierService';


@Component({
  selector: 'app-Product',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './Product.component.html',
  styleUrls: ['./Product.component.css']
})
export default class ProductComponent implements OnInit, OnChanges {
  @Input() isEditMode: boolean = false;
  @Input() productData: any = null;

  @Output() onSave = new EventEmitter<any>();
  @Output() onCancel = new EventEmitter<void>();
  suppliers: Supplier[] = [];
  typedSupplier:string='';
  product = {
    id: null,
    name: '',
    amount: 0,
    price: 0,
    supplier: 0,
  }
  constructor(private supplierService: SupplierService) {}

  ngOnInit(): void {
    this.resetForm();
    this.loadSuppliers()
  }

  ngOnChanges(changes: SimpleChanges):void {
    if (changes['productData']) {
      this.resetForm();
    }

  }
  loadSuppliers(): void {

    this.supplierService.getAllSupplier().subscribe({
      next: suppliers => {
        this.suppliers = suppliers;

      }
    });
  }

  getSupplierId() {
    const match = this.suppliers.find((supplier) => supplier.name === this.typedSupplier);
     if (match) {
       this.product.supplier = match.id;
     }else console.warn('Supplier not found');
  }

  resetForm() {
    if (this.productData && this.isEditMode) {
      this.product = {...this.productData};
    } else {
      this.product = {
        id: null,
        name: '',
        amount: 0,
        price: 0,
        supplier: 0,
      };
    }

  }

  onSubmit() {
    const form = document.querySelector('.needs-validation') as HTMLFormElement;
    if (!form.checkValidity()) {
      form.classList.add('was-validated');
      return;
    }
    this.onSave.emit(this.product);
  }

  onCancelClick() {
    this.onCancel.emit();

  }


}
