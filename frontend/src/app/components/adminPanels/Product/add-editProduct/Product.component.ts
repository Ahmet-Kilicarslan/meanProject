import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import Supplier from '../../../../models/Supplier';
import SupplierService from '../../../../services/SupplierService';
import ProductService from '../../../../services/ProductService';
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
  filteredSuppliers: Supplier[] = [];
  typedSupplier: string = '';
  showDropdown: boolean = false;
  selectedSupplierId: number = 0;

  isUploading:boolean = false;
  imagePreviewUrl: string='';
  selectedFile: any = null;


  product = {
    id: null,
    name: '',
    amount: 0,
    price: 0,
    supplier: 0,
    supplier_name: '',
    imageUrl: ''
  }

  constructor(private supplierService: SupplierService,
              private productService:ProductService
  ) {}

  ngOnInit(): void {
    this.loadSuppliers();
    this.resetForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['productData']) {
      this.resetForm();
    }
  }

  uploadImage(): void {
    if(!this.selectedFile){
      return;
    }
    this.isUploading = true;
    this.productService.uploadProductImage(this.selectedFile).subscribe({
      next: result => {
        this.product.imageUrl = result.imageUrl;
        console.log("successfully uploaded image",result);
        this.isUploading = false;

      },error: error => {
        console.log(error);

      }
    })
  }
  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (!file) {
      return;
    }
    const allowedTypes=['image/png','image/jpeg','image/gif','image/jpg'];
    if(!allowedTypes.includes(file.type)){
      alert('Only jpeg,jpg,png and gif formats are allowed');
      return;
    }
    const maxSize = 5*1024*1024;
    if(file.size>maxSize){
      alert('Maximum file size is exceeded');
      return;

    }

    this.selectedFile = file;

    const reader = new FileReader();
    reader.onload = (event: any) => {
      this.imagePreviewUrl = event.target.result;
    };
    reader.readAsDataURL(file);

    this.uploadImage();

  }


  // Load suppliers once when component initializes
  loadSuppliers(): void {
    this.supplierService.getAllSupplier().subscribe({
      next: (suppliers) => {
        this.suppliers = suppliers;
        this.filteredSuppliers = suppliers;
      },
      error: (error) => {
        console.error('Error loading suppliers:', error);
      }
    });
  }


  onSupplierInputChange(): void {
    if (!this.typedSupplier.trim()) {
      this.filteredSuppliers = this.suppliers;
      this.showDropdown = false;
      this.selectedSupplierId = 0;
      this.product.supplier = 0;
      return;
    }

    this.filteredSuppliers = this.suppliers.filter(supplier =>
      supplier.name.toLowerCase().includes(this.typedSupplier.toLowerCase())
    );
    this.showDropdown = this.filteredSuppliers.length > 0;
  }

  // Handle supplier selection from dropdown
  selectSupplier(supplier: Supplier): void {
    this.typedSupplier = supplier.name;
    this.selectedSupplierId = supplier.id;
    this.product.supplier = supplier.id;
    this.showDropdown = false;
  }

  // Handle clicks outside dropdown to close it
  onInputBlur(): void {
    // Small delay to allow click on dropdown items
    setTimeout(() => {
      this.showDropdown = false;
    }, 200);
  }

  onInputFocus(): void {
    if (this.filteredSuppliers.length > 0 && this.typedSupplier.trim()) {
      this.showDropdown = true;
    }
  }

  resetForm(): void {
    if (this.productData && this.isEditMode) {
      this.product = {...this.productData};
      this.selectedFile=null;

      // Set the typed supplier name for edit mode
      if (this.productData.supplierName) {
        this.typedSupplier = this.productData.supplierName;
        this.selectedSupplierId = this.productData.supplier;
      }
    } else {
      this.product = {
        id: null,
        name: '',
        amount: 0,
        price: 0,
        supplier: 0,
        supplier_name: '',
        imageUrl: ''
      };
      this.typedSupplier = '';
      this.selectedSupplierId = 0;
      this.selectedFile=null;
    }
  }

  onSubmit(): void {
    const form = document.querySelector('.needs-validation') as HTMLFormElement;

    // Validate that a supplier is selected
    if (!this.selectedSupplierId) {
      alert('Please select a valid supplier');
      return;
    }

    if (!form.checkValidity()) {
      form.classList.add('was-validated');
      return;
    }

    // Make sure supplier ID is set correctly
    this.product.supplier = this.selectedSupplierId;
    this.onSave.emit(this.product);
  }

  onCancelClick(): void {
    this.onCancel.emit();
    this.resetForm();
  }
}
