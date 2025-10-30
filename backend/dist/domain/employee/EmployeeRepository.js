import Employee from "./Employee.js";
import { pool } from "../../infrastructure/dbc.js";
import EmployeeFactory, {} from "./EmployeeFactory";
export default class EmployeeRepository {
    async getEmployeeById(id) {
        const sql = 'SELECT * FROM employee WHERE id = ?';
        const [result] = await pool.query(sql, [id]);
        if (!result || result.length === 0) {
            throw new Error(`Employee with id ${id} not found`);
        }
        const employee = result[0]; /* non-null assertation .
        you guarantee that
        this expression is not undefined */
        return EmployeeFactory.createEmployeeFromDB(employee);
    }
    async getEmployeeByName(name) {
        const sql = 'SELECT * FROM employee WHERE name = ?';
        const [result] = await pool.query(sql, [name]);
        if (!result || result.length === 0) {
            throw new Error(`Employee with name ${name} not found`);
        }
        return result;
    }
    async addEmployee(employee) {
        try {
            const sql = 'INSERT INTO employee (name, position, salary) VALUES (?, ?, ?)';
            const [result] = await pool.query(sql, [
                employee.name,
                employee.position,
                employee.salary
            ]);
            return EmployeeFactory.createEmployeeWithId({
                id: result.insertId,
                name: employee.name,
                position: employee.position,
                salary: employee.salary
            });
        }
        catch (e) {
            console.log(e);
            throw e; // Re-throw the error so calling code can handle it
        }
    }
    async deleteEmployee(id) {
        const sql = 'DELETE FROM employee WHERE id = ?';
        const [result] = await pool.query(sql, [id]);
        if (result.affectedRows === 0) {
            throw new Error(`Employee with id ${id} not found or already deleted`);
        }
        return {
            success: true,
            message: `Employee with id ${id} has been deleted`,
            deletedId: id,
            affectedRows: result.affectedRows
        };
    }
    async getAllEmployees() {
        const sql = 'SELECT * FROM employee';
        const [result] = await pool.query(sql);
        return result.map(employee => EmployeeFactory.createEmployeeFromDB(employee));
    }
    async updateEmployee(employee) {
        const sql = 'UPDATE employee SET name = ?, position = ?, salary = ? WHERE id = ?';
        const [result] = await pool.query(sql, [
            employee.name,
            employee.position,
            employee.salary,
            employee.id
        ]);
        return result;
    }
}
//# sourceMappingURL=EmployeeRepository.js.map