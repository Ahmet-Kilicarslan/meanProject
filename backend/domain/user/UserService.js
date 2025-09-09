import hash from "../../Utilities/hash.js";
import {ConflictError,ValidationError,NotFoundError,UnauthorizedError} from '../../Utilities/errors.js';
import UserFactory from "./UserFactory.js";
import Username from "./valueObjects/Username.js";
import Email from "./valueObjects/Email.js";


export default class UserService {



    constructor(userRepository) {

        this.userRepository =  userRepository;


    }
    async createUser(user) {

        try {

            const newUser = UserFactory.createUser(user);

            await this.ensureUniqueUsername(newUser.username);
            await this.ensureUniqueEmail(newUser.email);

            newUser.password = await hash.hashPassword(newUser.password.value);

            return  await this.userRepository.createUser(newUser);

        } catch (err) {
            throw err;


        }

    }

    async login(credentials) {

        const {username, password} = credentials;

        if (!username || !password) {
            throw new ValidationError('username and password are required');
        }

        const user = await this.userRepository.GetByUsername(username);
        if (!user) {
            throw new UnauthorizedError("invalid username");

        }
        const isValidPassword = await hash.comparePassword(password, user.password);

        if (!isValidPassword) {
            throw new UnauthorizedError("invalid password");
        }

        return user;


    }
    async getUserById(id) {

        const fetchedUser = await this.userRepository.getUserById(id);

        if (!fetchedUser) {
            throw new NotFoundError("User not found");
        }

        return fetchedUser;

    }

    async getAllUsers() {

        const Users = await this.userRepository.getAllUsers();

        return Users.map(user => user.toSafeObject());
    }


    async updateUser( updateData) {
       try {
           const user = await this.userRepository.getUserById(updateData.id);

           if (!user) {
               return  new NotFoundError("User not found");
           }

           if (updateData.username) {
               const usernameValue = updateData.username.value || updateData.username;
               await this.ensureUniqueUsername(new Username(usernameValue),updateData.id);
               user.changeUsername(usernameValue);

           }
           if (updateData.email) {
               const emailValue = updateData.email.value || updateData.email;
               await this.ensureUniqueEmail(new Email(emailValue ), updateData.id);
               user.changeEmail(emailValue);
           }

           if (updateData.password) {

               const passwordValue =  updateData.password;
               const hashedPassword= await hash.hashPassword(passwordValue);
              await user.changePassword(hashedPassword);
               console.log("updated values", hashedPassword);
           }


           return await this.userRepository.updateUser(user);

       }catch (error) {
           console.log(error);
           throw error;

       }

    }

    async deleteUser(userId) {

        return await this.userRepository.deleteUser(userId);


    }

    async ensureUniqueUsername(username ,excludeUserId = null) {
        const existingUser = await this.userRepository.GetByUsername(username.value);
        if (existingUser && existingUser.id !==  excludeUserId ) {
            throw new ConflictError("Username already exists");
        }
    }

    async ensureUniqueEmail(email,excludeUserId = null) {
        const existingUser = await this.userRepository.getUserByEmail(email.value);
        if (existingUser && existingUser.id !==  excludeUserId) {
            throw new ConflictError("Email already exists");
        }
    }



}