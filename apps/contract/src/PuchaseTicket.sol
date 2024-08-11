// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract PurchaseTicket {
  error AlreadyPurchased();
  error AlreadyIssued();

  address private paymentAddress;

  mapping(string => mapping(string => uint256)) private prices;
  mapping(string => mapping(string => bool)) private proofs;
  mapping(string => mapping(string => bool)) private tickets;

  constructor(address _paymentAddress) {
    paymentAddress = _paymentAddress;
  }

  function purchase(
    string memory eventId,
    string memory uniqueEventId,
    string memory seat,
    string memory ticketType,
    string memory worldProof
  ) external payable {
    bool purchased = proofs[uniqueEventId][worldProof];
    if (purchased == true) {
      revert AlreadyPurchased();
    }

    bool issued = tickets[uniqueEventId][seat];
    if (issued == true) {
      revert AlreadyIssued();
    }

    uint256 price = prices[eventId][ticketType];
    proofs[uniqueEventId][worldProof] = true;
    tickets[uniqueEventId][seat] = true;
    payable(paymentAddress).transfer(price);
  }
}
