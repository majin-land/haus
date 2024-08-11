// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import { Address } from "@openzeppelin/contracts/utils/Address.sol";

contract PurchaseTicket is Ownable {
    using Address for address payable;

    error AlreadyPurchased();
    error AlreadyIssued();
    error Duplicate();
    error Insufficient();

    address private paymentAddress;

    mapping(string => mapping(string => uint256)) private prices;
    mapping(string => mapping(string => bool)) private proofs;
    mapping(string => mapping(string => bool)) private ticketSeats;

    constructor(address _paymentAddress) Ownable(msg.sender) {
        paymentAddress = _paymentAddress;
    }

    function setPrice(string memory eventId, string memory ticketType, uint256 price) external onlyOwner {
        prices[eventId][ticketType] = price;
    }

    function getPrice(string memory eventId, string memory ticketType) public view returns (uint256) {
        return prices[eventId][ticketType];
    }

    function purchase(
        string memory eventId,
        string memory seat,
        string memory ticketType,
        string memory worldProof
    ) external payable {
        bool purchased = proofs[eventId][worldProof];
        if (purchased == true) {
            revert AlreadyPurchased();
        }

        bool issued = ticketSeats[eventId][seat];
        if (issued == true) {
            revert AlreadyIssued();
        }

        uint256 price = prices[eventId][ticketType];
        if (msg.value < price) {
            revert Insufficient();
        }

        proofs[eventId][worldProof] = true;
        ticketSeats[eventId][seat] = true;
        payable(paymentAddress).transfer(msg.value);
    }

}