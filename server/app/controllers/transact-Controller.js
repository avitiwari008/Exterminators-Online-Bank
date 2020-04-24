'use strict';
//import transact service.
const Service = require('../services/transact-service');
const TxnHistoryService = require('../services/transactionHistory-service')

// handles the transfer of funds from the requestor's account to beneficiary account
// same bank transfer
exports.transfer = async function (request, response) {
    try {
        const transaction = Object.assign({}, request.body);
        // owner account existence and balance verification
        const ownerAccount = await Service.search({AccountNumber:transaction.ownerAccountNum});
        if(!ownerAccount || ownerAccount.CurrentBalance < transaction.amount){
            return response.json({
                status: 401,
                message: "Account doesnt exist or Insufficient Funds"
            });
        }

        // beneficiary account existence
        const beneficiaryAccount = await Service.search({ AccountNumber: transaction.beneficiaryAccountNumber });
        if (!beneficiaryAccount) {
            return response.json({
                status: 401,
                message: "beneficiary acc doesn't exist"
            });
        }

        // transfer funds
        await Service.transfer(transaction, ownerAccount, beneficiaryAccount);

        // logging transaction 1 (the owner transfers the amount)
        // logging transaction 2 (the beneficiary receives the amount)
        const tx = await Service.saveSameBankTransferTransactions(transaction);
        return response.json({
            status: 200,
            message: "Amount transferred successfully!",
            data: tx
        });
        

    } catch (error) {
        return response.json({
            status: 401,
            message: error.message
        });
    }


}


// transfer funds to an account in another bank
exports.transferInOtherBank = async function (request, response) {
    try {
        const transaction = Object.assign({}, request.body);
        // owner account existence and balance verification
        const ownerAccount = await Service.search({AccountNumber:transaction.ownerAccountNum});
        if(!ownerAccount || ownerAccount.CurrentBalance < transaction.amount){
            return response.json({
                status: 401,
                message: "Account doesnt exist or Insufficient Funds"
            });
        }

        // transfer funds
        await Service.transferInOtherBank(transaction, ownerAccount);

        // logging transaction 
        const tx = await Service.save(transaction);
        return response.json({
            status: 200,
            message: "Amount transferred successfully!",
            data: tx
        });


    } catch (error) {
        return response.json({
            status: 401,
            message: error.message
        });
    }


}

// the below function credits the amount to the requestor's account
exports.credit = async function (request, response) {
    try {
        const transaction = Object.assign({}, request.body);

        // verify owner's account existence 
        const ownerAccount = await Service.search({AccountNumber:transaction.ownerAccountNum});
        if(!ownerAccount){
           return response.json({
                status: 401,
                message: "Account doesnt exist"
            });
        }

        // credit the amount to the owner's account 
        await Service.update(ownerAccount, ownerAccount.CurrentBalance + transaction.amount);
        // logging transaction        
        const tx = await Service.save(transaction);
        return response.json({
            status: 200,
            message: "Transaction successful!",
            data: tx
        });


    } catch (error) {
        return response.json({
            status: 401,
            message: error.message
        });
    }

};


// the below function debits the amount from the requestor's account
exports.debit = async function (request, response) {
    try {
        const transaction = Object.assign({}, request.body);

        // verify owner's account existence 
        const ownerAccount = await Service.search({AccountNumber:transaction.ownerAccountNum});
        if(!ownerAccount || ownerAccount.CurrentBalance < transaction.amount){
            return response.json({
                status: 401,
                message: "Account doesnt exist or Insufficient Funds"
            });
        }

        // debit the amount from the owner's account 
        await Service.update(ownerAccount, ownerAccount.CurrentBalance - transaction.amount);
        // logging transaction        
        const tx = await Service.save(transaction);
        return response.json({
            status: 200,
            message: "Transaction successful!",
            data: tx
        });

    } catch (error) {
        return response.json({
            status: 401,
            message: error.message
        });
    }

};

// 
exports.list = (request, response) => {
    const accountId = request.params.accountNumber;

    const total = TxnHistoryService.Search(accountId)
        .then(item => {

            response.status(200).json(item);
        })
        .catch(err => {
            response.status(500).json({
                message: "not proper id format"
            });
        });
};


// pdf
exports.pdf = (request, response) => {
    const accountId = request.params.accountNumber;

    const total = TxnHistoryService.pdf(accountId)
        .then(item => {

            response.status(200).json(item);
        })
        .catch(err => {
            response.status(500).json({
                message: "not proper id format"
            });
        });
};
