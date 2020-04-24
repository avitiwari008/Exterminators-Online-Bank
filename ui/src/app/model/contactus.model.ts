import { User } from './user';

export class Contactus {
    category: string;
    description: string;
    firstName : string;
    lastName : string;
    email : string;
    accountNumber : string;

    // Constructor
    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}
