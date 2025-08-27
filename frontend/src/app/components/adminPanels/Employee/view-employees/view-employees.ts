import {Component, OnInit} from '@angular/core';


import Employee from '../../../../models/Employee';
import EmployeeService from '../../../../services/EmployeeService';
import EmployeeComponent from '../add-editEmployee/Employee.component';
import FireEmployee from '../fire-employee/fire-employee';
import UtilsService from '../../../../services/UtilsService';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-view-employees',
  imports: [CommonModule,
    EmployeeComponent,FireEmployee
  ],
  templateUrl: './view-employees.html',
  styleUrls: ['./view-employees.css']
})
export default class ViewEmployees implements OnInit {


  employees: Employee[] = [];
  isLoading = false;
  error: string = '';
  isEditMode: boolean = false;
  SelectedEmployee: any = null;


  constructor(private EmployeeService: EmployeeService,private UtilService:UtilsService) {
  }

  ngOnInit(): void {
    this.loadEmployees();
  }

  closeModal() {
    const modal = (window as any).bootstrap.Modal.getInstance(document.getElementById('employeeModal'));
    modal?.hide();
  }

  closeConfirmationModal() {
    const modal = (window as any).bootstrap.Modal.getInstance(document.getElementById('ConfirmationModal'));
    modal?.hide();
  }



  handleCancel(): void {
    this.closeModal();
    this.closeConfirmationModal()

  }

  loadEmployees(): void {
    this.isLoading = true;
    this.error = '';

    this.EmployeeService.getAllEmployees().subscribe({
      next: (data: Employee[]) => {
        this.employees = data;
        this.isLoading = false;

      }, error: error => {
        this.isLoading = false;
        this.error = 'failed to load employees.';
      }
    })

  }

  openAddForm() {
    this.isEditMode = false;
    this.SelectedEmployee = null;
    const modal = new (window as any).bootstrap.Modal(document.getElementById('employeeModal'));
    modal.show();
  }

  openEditForm(employee: any) {
    this.isEditMode = true;
    this.SelectedEmployee = {...employee};
    const modal = new (window as any).bootstrap.Modal(document.getElementById('employeeModal'));
    modal.show();
  }

  openConfirmDeleteEmployee(employee: any) {
    this.SelectedEmployee = {...employee};
    const modal = new (window as any).bootstrap.Modal(document.getElementById('ConfirmationModal'));
    modal.show();
  }

  fireLoser(employeeData: any) {
    this.SelectedEmployee = employeeData;
    this.EmployeeService.deleteEmployee(employeeData.id).subscribe({
      next: (data: any) => {
        console.log("fired", employeeData.name);
        this.loadEmployees();
        this.closeConfirmationModal();
      },
      error: error => {
        console.log(error);
        this.closeConfirmationModal();
      }
    });

  }



  handleSave(employeeData: any) {
    if (this.isEditMode) {
      this.updateEmployee(employeeData);

    } else this.addEmployee(employeeData);

    this.SelectedEmployee = null;
  }

  updateEmployee(employeeData: any) {
    this.SelectedEmployee = employeeData;
    this.EmployeeService.updateEmployee( employeeData).subscribe({
      next: (data: Employee) => {
        console.log("successfully updated", data);
        this.isEditMode = false;
        this.loadEmployees();
        this.UtilService.closeModal('employeeModal')
      },
      error: error => {
        console.error('Error updating employee:', error);

      }
    });


  }
  addEmployee(employeeData: any) {
    if(employeeData.name===""||employeeData.salary===0) {
      this.closeModal();
      return;
    }
    this.EmployeeService.addEmployee(employeeData).subscribe({
      next: (data: Employee) => {
        console.log("successfully added", data);
        this.isEditMode = false;
        this.loadEmployees();
        this.UtilService.closeModal('employeeModal')
      },error: error => {
        console.error('Error adding employee:', error);
      }
    })
  }


}
