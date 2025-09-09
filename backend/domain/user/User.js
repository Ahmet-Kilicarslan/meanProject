import Email from './valueObjects/Email.js'
import Password from './valueObjects/Password.js'
import Username from "./valueObjects/Username.js";

export default class User{
    constructor(id,username,password,role,email,location) {
        this.id = id;
        this.username = username instanceof Username ? username : new Username(username);
        this.password = password;
        this.role = role || 'user';
        this.email = email instanceof Email ? email : new Email(email);

    }

    toSafeObject() {
        return {
            id: this.id,
            username: this.username.value,
            role: this.role,
            email: this.email.value,

        }
    }
    changeEmail(newEmail) {
        this.email = new Email(newEmail);
    }

    changeUsername(newUsername) {
        this.username = new Username(newUsername);
    }

    changePassword(newPassword) {
        this.password = newPassword;
    }

    isAdmin(){
        return this.role === 'admin';

    }

    displayUserInString(){
        return `User(${this.id}, ${this.username}, ${this.role})`;
    }
}