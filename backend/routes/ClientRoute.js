import express from 'express';
import ClientDAO from "../DAOs/ClientDAO.js";


const router= express.Router();

//get all Clients
router.get('/', async (req,res)=>{
    const getAllClients = await ClientDAO.getAllClients();
    res.json(getAllClients);


})

//get one client
router.get('/:id', async (req,res)=>{
    const id = req.params.id;
    const client = await ClientDAO.getClient(id);
    res.json(client);
})

//new client
router.post('/', async (req,res)=>{

    const newClient=await ClientDAO.addClient(req.body);
    res.json(newClient);
})
//update client
router.put('/:id', async (req,res)=>{
    const id = req.params.id;
    const client = await ClientDAO.updateClient(id,req.body);
    res.json(client);
})
router.delete('/:id', async (req,res)=>{
    const id = req.params.id;
    const client = await ClientDAO.deleteClient(id);
    res.json(client);
})

export default router;