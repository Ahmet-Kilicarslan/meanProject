import express from "express";
import EmployeeRepository from "../domain/employee/EmployeeRepository.js";
import EmployeeApplication from "../application/EmployeeApplication.js";
import EmployeeService from "../domain/employee/EmployeeService.js";
const router= express.Router();

const employeeRepository = new EmployeeRepository();
const employeeService = new EmployeeService(employeeRepository);
const employeeApplication = new EmployeeApplication(employeeRepository,employeeService);

//getting all employees
router.get("/",async (req,res)=>{
  const allEmployees= await employeeApplication.getAllEmployees();
  res.json(allEmployees);

})

// Get employee by ID*****  CLAUDE ADDED TRY-CATCH .  I HAVE TO USE ERROR CHECKING IN EVERY STEP****************
router.get("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        console.log('Getting employee with ID:', id);

        // Validate ID
        if (!id || isNaN(id)) {
            return res.status(400).json({ error: 'Valid employee ID is required' });
        }

        const employee = await employeeApplication.getEmployeeById(Number(id));
        res.json(employee);
    } catch (error) {
        console.error('Error getting employee:', error);

        if (error.message.includes('not found')) {
            res.status(404).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
});

// Delete employee
router.delete("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        console.log('Deleting employee with ID:', id);

        // Validate ID
        if (!id || isNaN(id)) {
            return res.status(400).json({ error: 'Valid employee ID is required' });
        }

        const fired = await employeeApplication.deleteEmployee(Number(id));
        res.json(fired);
    } catch (error) {
        console.error('Error deleting employee:', error);

        if (error.message.includes('not found')) {
            res.status(404).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
});

//new employee
router.post("/",async (req,res)=>{
    console.log("Received employee:", req.body);
    const addedEmployee = await employeeApplication.addEmployee(req.body);
    res.json(addedEmployee);
})
//update
router.put("/", async (req, res) => {
    try {
        const updatedEmployee = await employeeApplication.updateEmployee(req.body);
        res.json(updatedEmployee);
    } catch (error) {
        console.error("Error updating employee:", error);
        res.status(500).json({ message: "Failed to update employee", error });
    }
});


export default router;