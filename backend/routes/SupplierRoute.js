import express from 'express';
import SupplierDAO from '../DAOs/SupplierDAO.js'; // adjust path as needed

const router = express.Router();

// Create new supplier
router.post('/', async (req, res) => {
    const newSupplier = await SupplierDAO.addSupplier(req.body);
    res.json(newSupplier);
});

// Get all suppliers
router.get('/', async (req, res) => {
    const allSuppliers = await SupplierDAO.getAllSuppliers();
    res.json(allSuppliers);
});

// Get one supplier by ID
router.get('/:id', async (req, res) => {
    const supplier = await SupplierDAO.getSupplier(req.params.id);
    res.json(supplier);
});


router.put('/', async (req, res) => {
    const updatedSupplier = await SupplierDAO.updateSupplier( req.body);
    res.json(updatedSupplier);
});

// Delete supplier by ID
router.delete('/:id', async (req, res) => {
    const result = await SupplierDAO.deleteSupplier(req.params.id);
    res.json(result);
});

export default router;
