import EmployeeRepository from "./EmployeeRepository";
import Employee from "./Employee";
import type { EmployeeData } from "./EmployeeFactory";
export default class EmployeeService {
    private employeeRepository;
    constructor(employeeRepository: EmployeeRepository);
    addEmployee(employee: EmployeeData): Promise<void>;
    deleteEmployee(employeeId: number): Promise<void>;
    getEmployeeById(id: number): Promise<Employee>;
    getAllEmployees(): Promise<Employee[]>;
    updateEmployee(employee: Employee): Promise<import("mysql2").QueryResult>;
}
//# sourceMappingURL=EmployeeService.d.ts.map