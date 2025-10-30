import Employee from './Employee';
export default class EmployeeFactory {
    static validatePosition(position) {
        const validPositions = [
            'Certified forklifter',
            'Manager',
            'Warehouseman',
        ];
        return validPositions.includes(position);
    }
    static createEmployee(employee) {
        return new Employee(null, employee.name, employee.position, employee.salary);
    }
    static createEmployeeWithId(employee) {
        return new Employee(employee.id, employee.name, employee.position, employee.salary);
    }
    static createEmployeeFromDB(employee) {
        // Runtime validation
        if (!this.validatePosition(employee.position)) {
            throw new Error(`Invalid employee position: "${employee.position}". ` +
                `Valid positions are: Certified Forklifter, Manager, Warehouseman`);
        }
        return new Employee(employee.id, employee.name, employee.position, employee.salary);
    }
}
//# sourceMappingURL=EmployeeFactory.js.map