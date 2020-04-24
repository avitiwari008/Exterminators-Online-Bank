// Class for the Beneficiary 
export class Beneficiary {
    firstName: string;
    lastName: string;
    accountNumber: string;
    nickName: string
    routingNumber: number
    parentAccountNumber: string
    // Constructor
    constructor(firstName: string,
        lastName: string,
        accountNumber: string,
        nickName: string,
        routingNumber: number,
        parentAccountNumber: string
    ) {

        this.firstName = firstName;
        this.lastName = lastName;
        this.accountNumber = accountNumber;
        this.nickName = nickName;
        this.routingNumber = routingNumber;
        this.parentAccountNumber = parentAccountNumber
    }
}
