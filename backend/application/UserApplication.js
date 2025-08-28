import UserRepository from '../domain/user/UserRepository.js'
import UserService from '../domain/user/UserService.js'
import UserFactory from '../domain/user/UserFactory.js'
import hash from '../Utilities/hash.js'
import User from '../domain/user/User.js'
import {ValidationError, UnauthorizedError, NotFoundError} from '../Utilities/errors.js';
import Username from "../domain/user/valueObjects/Username.js";
import Email from "../domain/user/valueObjects/Email.js";
import Password from "../domain/user/valueObjects/Password.js";

export default class UserApplication {

    //dependency injection
    constructor() {

        this.userRepository = new UserRepository();
        this.userService = new UserService();

    }


    async createUser(userData) {
        try {

            await this.userService.createUser(userData);

        } catch (err) {
            throw err;

        }
    }

    async login(credentials) {

       try{
           await this.userService.login(credentials);
       }catch(err){
           throw err;
       }


    }

    async getUserById(id) {

     try{
         await this.userService.getOneById(id);
     }catch(err){
         throw err;
     }

    }

    async getAllUsers() {

        try{
            await this.userService.getAllUsers();
        }catch(err){
            throw err;
        }
    }


    async updateUser(id, updateData) {
        try{
            await this.userService.updateUser(id, updateData);
        }catch(err){
            throw err;
        }
    }

    async deleteUser(userId) {

          try{
              await this.userService.deleteUser(userId);
          }catch(err){
              throw err;
          }

    }


}