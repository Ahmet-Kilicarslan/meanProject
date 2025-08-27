import {Component, OnInit, Input, Output, EventEmitter, OnChanges} from '@angular/core';
import {FormsModule,ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-add-supplier',
  standalone:true,
    imports: [
        FormsModule,ReactiveFormsModule
    ],
  templateUrl: './add-supplier.html',
  styleUrl: './add-supplier.css'
})
export default class AddSupplier implements OnInit ,OnChanges{
  @Input() supplierData:any=null;
  @Output() onSave=new EventEmitter<any>();
  @Output() onCancel=new EventEmitter<void>();

  supplier={
    id:null,
    name:'',
    contact:'',
  }

  ngOnInit() {
    this.resetForm();
  }

  ngOnChanges(){
    this.resetForm();
  }

  onSubmit(){
    const form=document.querySelector('.needs-validation') as HTMLFormElement;
    if (!form.checkValidity()) {
      form.classList.add('was-validated');
      return;
    }
    this.onSave.emit(this.supplier);
  }
  onCancelClick(){
    this.onCancel.emit();
    this.resetForm();
  }
  resetForm(){
    this.supplier={
      id:null,
      name:'',
      contact:'',

    }
  }

}
