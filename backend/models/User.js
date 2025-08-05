export default class User{
    constructor(id,username,password,role,email,location) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.role = role;
        this.email = email;

    }

    toSafeObject() {
        return {
            id: this.id,
            username: this.username,
            role: this.role,
            email: this.email,

        }
    }

    isAdmin(){
        return this.role === 'admin';

    }

    displayUserInString(){
        return `User(${this.id}, ${this.username}, ${this.role})`;
    }
}