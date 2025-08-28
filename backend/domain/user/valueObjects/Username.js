export default class Username {
    constructor(value) {
        if (!value || typeof value !== 'string') {
            throw new Error("Username is required");
        }

        if (value.length < 3 || value.length > 50) {
            throw new Error("Username must be between 3-50 characters");
        }

        this._value = value.trim();
        Object.freeze(this);
    }

    get value() {
        return this._value;
    }

    equals(other) {
        return other instanceof Username && this._value === other._value;
    }
}