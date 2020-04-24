'use strict';
const mongoose = require('mongoose'),

Account = mongoose.model('accounts'),
Transaction = mongoose.model('transactions');
/**
 * Returns an array of account number object matching the search parameters.
 *
 * @param {Object} params {Search parameters}
 */
exports.search = async function (params) {
    try{
        const acc = await Account.findOne(params);   
        return acc;
    } catch (error) {
        throw error;
    }
};

/**
 * Returns the account object matching the id.
 */
exports.update = function (account, amount) {
    
    return new Promise(async(resolve, reject)=>{
        try{      
            account.CurrentBalance = amount;
            await Account.findOneAndUpdate({_id: account._id}, account);
            resolve(true);
        } catch (error) {
            reject(error);
        }
    }
    )

};

// transfer amount to accout in the same bank
exports.transfer = function (transaction, ownerAccount, beneficiaryAccount) {
 
    return new Promise(async(resolve, reject)=>{
        try{      
            ownerAccount.CurrentBalance = ownerAccount.CurrentBalance - transaction.amount;
            beneficiaryAccount.CurrentBalance = beneficiaryAccount.CurrentBalance + transaction.amount;
            await Account.findOneAndUpdate({_id: ownerAccount._id}, ownerAccount);
            await Account.findOneAndUpdate({_id: beneficiaryAccount._id}, beneficiaryAccount);
            resolve(true);
        } catch (error) {
            reject(error);
        }
    }
    )

};

// transfer amount to accout in another bank
exports.transferInOtherBank = function (transaction, ownerAccount) {
 
    return new Promise(async(resolve, reject)=>{
        try{      
            ownerAccount.CurrentBalance = ownerAccount.CurrentBalance - transaction.amount;            
            await Account.findOneAndUpdate({_id: ownerAccount._id}, ownerAccount);
            resolve(true);
        } catch (error) {
            reject(error);
        }
    }
    )

};


/**
 * Saves transfer transaction made to another bank
 *
 * @param {Object} transaction {transaction object}
 */
exports.save = async function (transaction) {
    const transactionData = new Transaction(transaction);
    const tx = await transactionData.save(transactionData);
    return tx;
};


/**
 * Saves transfer transaction made to the same bank
 *
 * @param {Object} transaction {transaction object}
 */
exports.saveSameBankTransferTransactions = async function (transaction) {
    //transaction 1 for the owner
    const loggingTx1 = new Transaction(transaction);
    let owner = loggingTx1.ownerAccountNum;
    let beneficiary = loggingTx1.beneficiaryAccountNumber;
    loggingTx1.type="Debit";

    //transaction 2 for the beneficiary
    const loggingTx2 = new Transaction(transaction);
    loggingTx2.beneficiaryAccountNumber = owner;
    loggingTx2.ownerAccountNum = beneficiary;
    loggingTx2.type="Credit";

    //saving both transactions
    const tx2 = await loggingTx2.save(loggingTx2);
    const tx1 = await loggingTx1.save(loggingTx1);
    return [tx1,tx2];
};

