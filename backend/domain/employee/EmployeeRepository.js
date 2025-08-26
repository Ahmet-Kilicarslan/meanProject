import Employee from "./Employee.js";
import {pool} from "../../infrastructure/dbc.js";

export default class EmployeeRepository {


    static async getEmployee(id) {
        const sql = 'select * from employee where id = ?';
        const [result] = await pool.query(sql, [id]);
        if (!result || result.length === 0) {
            throw new Error(`Employee with id ${id} not found`);
        }
        const employee=result[0];

        return new Employee
            (
                employee.id,
                employee.name,
                employee.position,
                employee.salary,
            );
    }

    static async addEmployee(employee) {
        try {

            const sql = 'insert into employee (name, position, salary) values (?,?,?)';
            const [result] = await pool.query(sql, [
                employee.name,
                employee.position,
                employee.salary,
            ]);
            employee.id = result.insertId;
            return employee;
        } catch (e) {
            console.log(e);

        }

    }

    static async deleteEmployee(id) {
        let sql = 'delete from employee where id = ?';
        const [result] = await pool.query(sql, [id]);

        // Check if any rows were affected
        if (result.affectedRows === 0) {
            throw new Error(`Employee with id ${id} not found or already deleted`);
        }

        // Return a success response
        return {
            success: true,
            message: `Employee with id ${id} has been deleted`,
            deletedId: id,
            affectedRows: result.affectedRows
        };
    }

    static async getAllEmployees() {
        const sql = 'select * from employee ';
        const [result] = await pool.query(sql);
        return result.map(employee => new Employee(
            employee.id,
            employee.name,
            employee.position,
            employee.salary,

        ));

    }

    static async updateEmployee(employee) {
        const sql = 'update  employee set name=?,position=?,salary=? where id = ?';
        const [result] = await pool.query(sql, [employee.name, employee.position, employee.salary, employee.id]);
        return result;
    }
}
