import express from 'express';
import cors from 'cors';

import EmployeeRoute from './routes/EmployeeRoute.js';
import ProductRoute from './routes/ProductRoute.js';
import ClientRoute from "./routes/ClientRoute.js";
import SupplierRoute from "./routes/SupplierRoute.js";
import TransactionRoute from "./routes/TransactionRoute.js";


//create an express app
const app = express();

//allow front talk to back
app.use(cors());

//enable express to parse incoming requests
app.use(express.json());

app.use('/Employee', EmployeeRoute);
app.use('/Product', ProductRoute);
app.use('/Client', ClientRoute);
app.use('/Supplier', SupplierRoute);
app.use('/Transaction', TransactionRoute);
/*
================dao=========
static async addProduct(product) {
        try{
        const products=await this.getAllProducts();
        for (const p of products) {
            if (product.name === p.name) {
                console.log("product name already exists");
                return;
            }
        }
        const sql = 'insert into products (name, amount, price,supplier) VALUES (?,?,?,?)';
        const [result] = await pool.query(sql, [product.name, product.amount, product.price,product.supplier]);

        return  new Product(result.insertId, product.name, product.amount, product.price,product.supplier );
    }catch(err){
            console.log(err);
        }

    }
    =======================route=============
    const router=express.Router();

router.post("/", async (req,res)=>{
    const newProduct=await ProductDAO.addProduct(req.body);
    res.json(newProduct);

})
======================service================
  private apiUrl = 'http://localhost:3000/Product';
  constructor(private http: HttpClient) { }


 addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product);

 }
 ===========add-component.ts==================
   @Input() isEditMode: boolean = false;
  @Input() productData: any = null;

  @Output() onSave = new EventEmitter<any>();
  @Output() onCancel = new EventEmitter<void>();

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
==================add-component.html

==============00view-component.html=====0
   <div class="modal-body">
        <app-Product
          [productData]="selectedProduct"
          [isEditMode]="isEditMode"
          (onSave)="handleSave($event)"
          (onCancel)="handleCancel()">
        </app-Product>

 =============view-component.ts===========
 handleSave(productData){
 this.addProduct(productData);

 }
  addProduct(productData: any) {
    this.selectedProduct = productData;
    this.productService.addProduct(productData).subscribe({
      next: (data: Product) => {
        this.isEditMode = false;
        this.loadProducts();
        this.closeAddEditProductModal();

      }, error: error => {
        this.error = error;
      }
    })
    this.closeAddEditProductModal();
  }


                                                                    */

export default app;


