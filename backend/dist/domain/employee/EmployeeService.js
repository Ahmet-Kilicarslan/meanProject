import EmployeeRepository from "./EmployeeRepository";
import Employee from "./Employee";
export default class EmployeeService {
    employeeRepository;
    constructor(employeeRepository) {
        this.employeeRepository = employeeRepository;
    }
    async addEmployee(employee) {
        try {
            await this.employeeRepository.addEmployee(employee);
        }
        catch (err) {
            throw err;
        }
    }
    async deleteEmployee(employeeId) {
        try {
            await this.employeeRepository.deleteEmployee(employeeId);
        }
        catch (err) {
            throw err;
        }
    }
    async getEmployeeById(id) {
        try {
            return await this.employeeRepository.getEmployeeById(id);
        }
        catch (err) {
            throw err;
        }
    }
    async getAllEmployees() {
        try {
            return await this.employeeRepository.getAllEmployees();
        }
        catch (err) {
            throw err;
        }
    }
    async updateEmployee(employee) {
        try {
            return await this.employeeRepository.updateEmployee(employee);
        }
        catch (err) {
            throw err;
        }
    }
}
//# sourceMappingURL=EmployeeService.js.map