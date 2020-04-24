import { Account } from 'src/app/model/account.model';
//Class for bank customer
export class User {
  firstName: string;
  lastName: string;
  dob: Date;
  email: string;
  phoneNumber: number;
  accountType: string;
  ssn: number;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  zip: number;
  password: string;
  account: Account;
  role: string;
  lastLoginDate: any;

  // Constructor
  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
