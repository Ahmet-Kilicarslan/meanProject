import userRepository from '../user/UserRepository.js';
import hash from "../../Utilities/hash.js";
import User from "./User.js";
import {ConflictError,ValidationError,NotFoundError,UnauthorizedError} from '../../Utilities/errors.js';
import UserFactory from "./UserFactory.js";
import Username from "./valueObjects/Username.js";


export default class UserService {


    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async createUser(userData) {

        try {

            const newUser = UserFactory.createUser(userData);

            await this.ensureUniqueUsername(newUser.username);
            await this.ensureUniqueEmail(newUser.email);

            newUser.password = await hash.hashPassword(newUser.password);

            const savedUser = await this.userRepository.save(newUser);

            return savedUser.toSafeObject();
        } catch (err) {
            throw err;


        }

    }

    async login(credentials) {

        const {username, password} = credentials;

        if (!username || !password) {
            throw new ValidationError('username and password are required');
        }

        const user = await this.userRepository.getUserByUsernameOrEmail(username);
        if (!user) {
            throw new UnauthorizedError("invalid username");

        }
        const isValidPassword = await hash.compare(password, user.password);

        if (!isValidPassword) {
            throw new UnauthorizedError("invalid password");
        }

        return user.toSafeObject();


    }
    async getOneById(id) {

        const fetchedUser = await this.userRepository.getUserById(id);

        if (!fetchedUser) {
            throw new NotFoundError("User not found");
        }

        return fetchedUser.toSafeObject();

    }

    async getAllUsers() {

        const Users = await this.userRepository.getAllUsers();

        return Users.map(user => user.toSafeObject());
    }


    async updateUser(id, updateData) {
        const user = await this.userRepository.getUserById(id);

        if (!user) {
            throw new NotFoundError("User not found");
        }

        if (updateData.username) {
            await this.ensureUniqueUsername(new Username(updateData.username));
            user.changeUsername(updateData.username);

        }
        if (updateData.email) {
            await this.ensureUniqueEmail(updateData.email);
            user.changeEmail(updateData.email);
        }

        if (updateData.password) {
            user.password = await hash.hashPassword(updateData.password);
        }

        const updatedUser = await this.userRepository.save(user);
        return updatedUser.toSafeObject();


    }

    async deleteUser(userId) {

        return await this.userRepository.deleteUser(userId);


    }

    async ensureUniqueUsername(username) {
        const existingUser = await this.userRepository.GetByUsername(username.value);
        if (existingUser) {
            throw new ConflictError("Username already exists");
        }
    }

    async ensureUniqueEmail(email) {
        const existingUser = await this.userRepository.getUserByUsernameOrEmail(email.value);
        if (existingUser) {
            throw new ConflictError("Email already exists");
        }
    }



}