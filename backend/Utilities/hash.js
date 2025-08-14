import bcrypt from 'bcrypt';


export default class hash{

/*
* hashing is mathematical function  that is irreversible.
* Same input always produces same hash.Salt is a random data added to input before hashing
* to make it more secure.more saltrounds means more iterations and more scurity.
*
* hashing is used for storing functions ,verifying data integrity ,blockchain,digital signatures.
*
*
* for storing credit card infos encryption,tokens and vault services are used instead of hashing.
* thats because hashing is irreversible.
*
* how hashing works:
* first user input characters turned into ascii values then bytes.bytes put into some mathemitcal operations.turned into
* hashed values
*
*
*
*
* */
static async hashPassword(password){
    const saltRounds=10
    return await bcrypt.hash(password, saltRounds);
}

static async comparePassword(plainPassword,hashedPassword){
     return await bcrypt.compare(plainPassword,hashedPassword);
}

 }