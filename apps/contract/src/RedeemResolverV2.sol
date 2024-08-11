// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import { SchemaResolver } from "@ethereum-attestation-service/eas-contracts/contracts/resolver/SchemaResolver.sol";
import { IEAS, Attestation } from "@ethereum-attestation-service/eas-contracts/contracts/IEAS.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import { Address } from "@openzeppelin/contracts/utils/Address.sol";

contract RedeemResolverV2 is SchemaResolver, Ownable {
    using Address for address payable;

    error OutOfBounds();
    error AlreadyPurchased();
    error AlreadyIssued();
    error Duplicate();
    error Insufficient();

    address private paymentAddress;

    mapping(bytes32 => bool) private redeemedMap;
    mapping(string => mapping(string => uint256)) private prices;
    mapping(string => mapping(string => bool)) private proofs;
    mapping(string => mapping(string => bool)) private ticketSeats;
    mapping(address => mapping(string => bool)) private ticketRecipients;
    mapping(address => string[]) private ticketRecipientsArr;

    constructor(IEAS eas, address _paymentAddress) SchemaResolver(eas) Ownable(msg.sender) {
        paymentAddress = _paymentAddress;
    }

    function isPayable() public pure override returns (bool) {
        return true;
    }

    function setPrice(string memory eventId, string memory ticketType, uint256 price) external onlyOwner {
        prices[eventId][ticketType] = price;
    }

    function getPrice(string memory eventId, string memory ticketType) public view returns (uint256) {
        return prices[eventId][ticketType];
    }

    function getTickets() public view returns (string[] memory) {
        return ticketRecipientsArr[msg.sender];
    }

    function purchase(
        string memory eventId,
        string memory seat,
        string memory ticketType,
        string memory worldProof,
        string memory attestationId
    ) external payable {
        bool purchased = proofs[eventId][worldProof];
        if (purchased == true) {
            revert AlreadyPurchased();
        }

        bool issued = ticketSeats[eventId][seat];
        if (issued == true) {
            revert AlreadyIssued();
        }

        bool recipient = ticketRecipients[msg.sender][attestationId];
        if (recipient == true) {
            revert Duplicate();
        }

        uint256 price = prices[eventId][ticketType];
        if (msg.value < price) {
            revert Insufficient();
        }

        proofs[eventId][worldProof] = true;
        ticketSeats[eventId][seat] = true;
        ticketRecipients[msg.sender][attestationId] = true;
        ticketRecipientsArr[msg.sender].push(attestationId);
        payable(paymentAddress).transfer(msg.value);
    }

    function onAttest(Attestation calldata attestation, uint256 /*value*/) internal view override returns (bool) {
        bytes32 uid = _toBytes32(attestation.data, 0);
        string memory uidStr = string(abi.encodePacked(uid));
        bool exist = ticketRecipients[attestation.recipient][uidStr];
        if (exist == true) {
            return true;
        }

        return false;
    }

    function onRevoke(Attestation calldata /*attestation*/, uint256 /*value*/) internal pure override returns (bool) {
        return true;
    }

    function toBytes32(bytes memory data, uint256 start) external pure returns (bytes32) {
        return _toBytes32(data, start);
    }

    function _toBytes32(bytes memory data, uint256 start) private pure returns (bytes32) {
        unchecked {
            if (data.length < start + 32) {
                revert OutOfBounds();
            }
        }

        bytes32 tempBytes32;

        // solhint-disable-next-line no-inline-assembly
        assembly {
            tempBytes32 := mload(add(add(data, 0x20), start))
        }

        return tempBytes32;
    }
}