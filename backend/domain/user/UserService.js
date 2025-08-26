import userRepository from '../user/UserRepository.js';
import hash from "../../Utilities/hash.js";
import User from "./User.js";
import {ConflictError,ValidationError,NotFoundError,UnauthorizedError} from '../../Utilities/errors.js';


export default class UserService{

static async createUser(user){

    const existingUser = await userRepository.findByUsername(user.username);
    if (existingUser) {
        throw new ConflictError("Username already exists");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(user.email)) {
        throw new ValidationError("Invalid email format");
    }

    if (!user.username || !user.password) {
        throw new ValidationError("Username and password are required");
    }

    if (user.password.length < 6) {
        throw new ValidationError("Password must be at least 6 characters");
    }

    if (!user.email) {
        throw new ValidationError("Email is required");
    }


    if (!user.role) {
        user.role = 'user';
    }


    const hashedPassword = await hash.hashPassword(user.password);



    const userData = {
        username: user.username,
        password: hashedPassword,
        role: user.role || 'user',
        email: user.email,

    };


    console.log("UserData before repository:", userData);

    const newUser = await userRepository.createUser(userData);
    return new User(newUser);


}

static async loginUser(credentials){
    const { username, password } = credentials;

    // Input validation
    if (!username || !password) {
        throw new ValidationError("Username and password are required");
    }

    // Find user
    const user = await userRepository.getUserByUsernameOrEmail(username);
    if (!user) {
        throw new UnauthorizedError("Invalid credentials");
    }

    // Verify password
    const checkPassword = await hash.comparePassword(password, user.password);
    if (!checkPassword) {
        throw new UnauthorizedError("Invalid credentials");
    }

    return user;
}

static async logoutUser(){
    return { success: true };
}
}