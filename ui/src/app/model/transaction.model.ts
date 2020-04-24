export class Transaction {
    _id?: string;
    ownerAccountNum: string;
    beneficiaryAccountNumber?: string;
    amount: number;
    type?: string;
    category?: string;
    transactionDate?: Date;

}

