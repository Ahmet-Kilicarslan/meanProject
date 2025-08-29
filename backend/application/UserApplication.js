

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


    async updateUser(updateData) {
        try{
            return await this.userService.updateUser( updateData);
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