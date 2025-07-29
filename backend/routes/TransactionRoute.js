import express from 'express';
import TransactionDAO from '../DAOs/TransactionDAO.js'; // adjust path as needed

const router = express.Router();

// Create a new transaction
router.post('/', async (req, res) => {
    const newTransaction = await TransactionDAO.addTransaction(req.body);
    res.json(newTransaction);
});

// Get all transactions
router.get('/', async (req, res) => {
    const allTransactions = await TransactionDAO.getAllTransactions();
    res.json(allTransactions);
});

// Get one transaction by ID
router.get('/:id', async (req, res) => {
    const transaction = await TransactionDAO.getTransaction(req.params.id);
    res.json(transaction);
});


export default router;
