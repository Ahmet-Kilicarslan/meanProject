import {Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-Employee',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './Employee.component.html',
  styleUrls: ['./Employee.component.css'],
})
export default class EmployeeComponent implements OnInit, OnChanges {
  @Input() employeeData: any = null;
  @Input() isEditMode: boolean = false;

  @Output() onSave = new EventEmitter<any>();
  @Output() onCancel = new EventEmitter<void>();

  employee = {
    id: null,
    name: '',
    position: '',
    salary: 0
  };

  ngOnInit() {

    this.resetForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    // This will run every time employeeData or isEditMode changes
    if (changes['employeeData']) {
      this.resetForm();
    }
  }

  resetForm() {
    if (this.isEditMode && this.employeeData) {
      this.employee = { ...this.employeeData };
    } else {
      this.employee = {
        id: null,
        name: '',
        position: '',
        salary: 0
      };
    }
  }

  onSubmit() {
    const form = document.querySelector('.needs-validation') as HTMLFormElement;

    if (!form.checkValidity()) {
      form.classList.add('was-validated');
      return;
    }
    this.onSave.emit(this.employee);
  }

  onCancelClick() {
    this.onCancel.emit();
  }
}
