import bcrypt from 'bcrypt';


export default class hash{


static async hashPassword(password){
    const saltRounds=10
    return await bcrypt.hash(password, saltRounds);
}

static async comparePassword(plainPassword,hashedPassword){
     return await bcrypt.compare(plainPassword,hashedPassword);
}

 }