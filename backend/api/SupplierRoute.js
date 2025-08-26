import express from 'express';
import SupplierRepository from '../domain/supplier/SupplierRepository.js';

const router = express.Router();

// Create new supplier
router.post('/', async (req, res) => {
    const newSupplier = await SupplierRepository.addSupplier(req.body);
    res.json(newSupplier);
});

// Get all suppliers
router.get('/', async (req, res) => {
    const allSuppliers = await SupplierRepository.getAllSuppliers();
    res.json(allSuppliers);
});

// Get one supplier by ID
router.get('/:id', async (req, res) => {
    const supplier = await SupplierRepository.getSupplier(req.params.id);
    res.json(supplier);
});


router.put('/', async (req, res) => {
    const updatedSupplier = await SupplierRepository.updateSupplier( req.body);
    res.json(updatedSupplier);
});

// Delete supplier by ID
router.delete('/:id', async (req, res) => {
    const result = await SupplierRepository.deleteSupplier(req.params.id);
    res.json(result);
});

export default router;
