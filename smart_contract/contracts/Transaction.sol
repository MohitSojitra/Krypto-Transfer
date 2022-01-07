// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;


contract Transaction {
  uint256 transactionCount; // total transactions

  event transfer(address from, address reciver , uint amount, string message, uint256 timestamp , string keyword); // event emit when money transfer

  struct TransferStruct{
    address from;
    address reciver;
    uint amount;
    string message;
    uint256 timestamp;
    string keyword;
  }

  TransferStruct[] transactions;

  function addToBlockChain(address payable reciver , uint amount , string memory message , string memory keyword) public{
    // trnsaction occure so count increase by one
    transactionCount+=1;

    // add transaction to our array but not add the block chaing, we need to emit transfer event for add transaction in block chain. 
    transactions.push(TransferStruct(msg.sender , reciver , amount , message, block.timestamp , keyword));

    //  add trancation to blockchain
    emit transfer(msg.sender, reciver, amount, message, block.timestamp, keyword);
  }

  function getTransactions() public view returns (TransferStruct[] memory) {
    return transactions;
  }

  function getTransactionCount() public view returns (uint256) {
    return transactionCount;
  }
}
