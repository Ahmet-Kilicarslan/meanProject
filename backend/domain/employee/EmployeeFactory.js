import Employee from './Employee';

export default class EmployeeFactory{


    static async createEmployee(employee){
        return new Employee(
            null,
            employee.name,
            employee.position,
            employee.salary

        )
    }
    static async createEmployeeFromDB(employee){
        return new Employee(
            employee.id,
            employee.name,
            employee.position,
            employee.salary
        )
    }
}