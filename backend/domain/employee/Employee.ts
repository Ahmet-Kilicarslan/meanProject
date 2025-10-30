export default class Employee {
    id: number | null;
    name: string;
    position: 'Certified forklifter' | 'Manager' | 'Warehouseman';
    salary: number;

    constructor(id: number | null,
                name: string,
                position: 'Certified forklifter' | 'Manager' | 'Warehouseman',
                salary: number
    ) {
        this.id = id;
        this.name = name;
        this.position = position;
        this.salary = salary;
    }


}
