import {ConflictError, NotFoundError} from '../../Utilities/errors.js';

import supplierFactory from "./SupplierFactory.js";
import supplierRepository from "./SupplierFactory.js";


export default class SupplierService{

    constructor(supplierRepository){
        this.supplierRepository = supplierRepository;
    }


    async ensureUniqueNama(name){
        const existingName= await this.supplierRepository.getSupplierByName(name);
        if(existingName){
            throw new ConflictError("Supplier  already exists");
        }
    }


    async createSupplier(supplier){
        try{
            const newSupplier = await supplierFactory.createSupplier(supplier);
            await this.ensureUniqueNama(newSupplier.name)

            return await this.supplierRepository.createSupplier(newSupplier);
        }catch(error){
            throw error;

        }


    }

    async getAllSuppliers(){
        try{
            return await this.supplierRepository.getAllSuppliers();
        }catch(error){
            throw error;
        }
    }





}