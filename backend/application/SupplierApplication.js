

export default class SupplierApplication{

    constructor(supplierRepository,supplierService){
        this.supplierRepository = supplierRepository;
        this.supplierService = supplierService;
    }

    async createSupplier(supplier){
        try{
           return await this.supplierService.createSupplier(supplier);
        }catch(error){
            throw error;
        }
    }

    async getAllSuppliers(){
        try{
          return  await this.supplierService.getAllSuppliers();
        }catch(error){
            throw error;
        }
    }
}