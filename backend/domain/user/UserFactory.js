import User from './User';
import Email from './valueObjects/Email.js'
import Password from './valueObjects/Password.js'
import Username from "./valueObjects/Username.js";

export default class UserFactory {

    static createUser(userData) {

        const username = new Username(userData.username);
        const email = new Email(userData.email);
        const password = new Password(userData.password);


        return new User(
            null,
            username,
            userData.password,
            userData.role || 'user',
            email,
        );


    }

    static CreateUserFromDB(row) {
        return new User(
            row.id,
            row.username,
            row.password,
            row.role,
        )

    }

    static createAdmin(userData) {
        return this.createUser({
            ...userData,//spread operator used here.this will create user with admin role
            role: 'admin'
        });
    }
}