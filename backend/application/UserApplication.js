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
    constructor(userService,userRepository) {

        this.userRepository = userRepository;
        this.userService =  userService;

    }


    async createUser(userData) {
        try {

           return  await this.userService.createUser(userData);

        } catch (err) {
            throw err;

        }
    }

    async login(credentials) {

       try{
           return await this.userService.login(credentials);
       }catch(err){
           throw err;
       }


    }

    async getUserById(id) {

     try{
         return await this.userService.getUserById(id);
     }catch(err){
         throw err;
     }

    }

    async getAllUsers() {

        try{
            return await this.userService.getAllUsers();
        }catch(err){
            throw err;
        }
    }


    async updateUser(id, updateData) {
        try{
            return await this.userService.updateUser(id, updateData);
        }catch(err){
            throw err;
        }
    }

    async deleteUser(userId) {

          try{
              return  await this.userService.deleteUser(userId);
          }catch(err){
              throw err;
          }

    }


}