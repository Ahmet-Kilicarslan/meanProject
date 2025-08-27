import { Component,Input, Output, EventEmitter } from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-fire-employee',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './fire-employee.html',
  styleUrls: ['./fire-employee.css']
})
export default class FireEmployee {
@Input() employeeData: any=null;
@Output() onSave = new EventEmitter<any>();
@Output() onCancel = new EventEmitter<any>();



  onSubmit(){
    if(this.employeeData){
      this.onSave.emit(this.employeeData);
    }
  }

  onCancelClick() {
    this.onCancel.emit();
  }
}
