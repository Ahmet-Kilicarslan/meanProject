import Employee from './Employee';
import type { RowDataPacket } from "mysql2";
export type EmployeePosition = 'Certified forklifter' | 'Manager' | 'Warehouseman';
export interface EmployeeData {
    name: string;
    position: EmployeePosition;
    salary: number;
}
export interface EmployeeDataWithId extends EmployeeData {
    id: number;
}
export interface EmployeeRow extends RowDataPacket {
    id: number;
    name: string;
    position: string;
    salary: number;
}
export default class EmployeeFactory {
    private static validatePosition;
    static createEmployee(employee: EmployeeData): Employee;
    static createEmployeeWithId(employee: EmployeeDataWithId): Employee;
    static createEmployeeFromDB(employee: EmployeeRow): Employee;
}
//# sourceMappingURL=EmployeeFactory.d.ts.map