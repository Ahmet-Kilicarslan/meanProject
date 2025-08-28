export default class Password{
    constructor(value){

        if(!value){
            throw new Error('Password is required');
        }
        if(value.length < 6){
            throw new Error('Password must be at least 6 characters long');
        }

        this._value = value;
        Object.freeze(this);
    }

    get value() {
        return this._value;
    }
}