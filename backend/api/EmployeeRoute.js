import express from "express";
import EmployeeRepository from "../domain/employee/EmployeeRepository.js";

const router= express.Router();

//combining routes and controller.works for small projects

//getting all employees
router.get("/",async (req,res)=>{
  const allEmployees= await EmployeeRepository.getAllEmployees();
  res.json(allEmployees);

})
/*
************** MY SKİNNY AHH CODE HERE*********************
//get one by id
router.get("/:id",async (req,res)=>{
    const id = req.params.id;
    const employee = await EmployeeRepository.getEmployee(id);
    res.json(employee);
})

//delete employee
router.delete("/:id",async (req,res)=>{
    const id = req.params.id;
    const fired = await EmployeeRepository.deleteEmployee(Number(id));
    res.json(fired);
})***************************************************/
/*Error handling notes
// DAO - Just throw meaningful errors
static async deleteEmployee(id) {
    let sql = 'delete from employee where id = ?';
    const [result] = await pool.query(sql, [id]);

    if (result.affectedRows === 0) {
        throw new Error(`Employee with id ${id} not found`);
    }

    return { success: true, deletedId: id };
}

// Route - Convert to HTTP responses
router.delete("/:id", async (req, res) => {
    try {
        const result = await EmployeeRepository.deleteEmployee(Number(req.params.id));
        res.json(result);
    } catch (error) {
        res.status(error.message.includes('not found') ? 404 : 500)
           .json({ error: error.message });
    }
});

// Service - Keep it simple
deleteEmployee(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
}

// Component - Handle user experience
fireLoser(employeeData: any) {
    this.EmployeeService.deleteEmployee(employeeData.id).subscribe({
        next: () => {
            this.loadEmployees();
            this.closeConfirmationModal();
        },
        error: () => {
            alert('Failed to delete employee');
            this.closeConfirmationModal();
        }
    });
}
* */
// Get employee by ID*****  CLAUDE ADDED TRY-CATCH .  I HAVE TO USE ERROR CHECKING IN EVERY STEP****************
router.get("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        console.log('Getting employee with ID:', id);

        // Validate ID
        if (!id || isNaN(id)) {
            return res.status(400).json({ error: 'Valid employee ID is required' });
        }

        const employee = await EmployeeRepository.getEmployee(Number(id));
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

        const fired = await EmployeeRepository.deleteEmployee(Number(id));
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
    const addedEmployee = await EmployeeRepository.addEmployee(req.body);
    res.json(addedEmployee);
})
//update
router.put("/", async (req, res) => {
    try {
        const updatedEmployee = await EmployeeRepository.updateEmployee(req.body);
        res.json(updatedEmployee);
    } catch (error) {
        console.error("Error updating employee:", error);
        res.status(500).json({ message: "Failed to update employee", error });
    }
});


export default router;