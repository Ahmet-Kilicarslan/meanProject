import Employee from "./Employee.js";
import { type EmployeeRow, type EmployeeData } from "./EmployeeFactory";
export default class EmployeeRepository {
    getEmployeeById(id: number): Promise<Employee>;
    getEmployeeByName(name: string): Promise<EmployeeRow[]>;
    addEmployee(employee: EmployeeData): Promise<Employee>;
    deleteEmployee(id: number): Promise<{
        success: boolean;
        message: string;
        deletedId: number;
        affectedRows: number;
    }>;
    getAllEmployees(): Promise<Employee[]>;
    updateEmployee(employee: Employee): Promise<import("mysql2").QueryResult>;
}
//# sourceMappingURL=EmployeeRepository.d.ts.map