// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import { SchemaResolver } from "@ethereum-attestation-service/eas-contracts/contracts/resolver/SchemaResolver.sol";
import { IEAS, Attestation } from "@ethereum-attestation-service/eas-contracts/contracts/IEAS.sol";

contract RedeemResolver is SchemaResolver {
    error OutOfBounds();

    mapping(bytes32 => bool) private redeemedMap;

    constructor(IEAS eas) SchemaResolver(eas) {
    }

    function onAttest(Attestation calldata attestation, uint256 /*value*/) internal override returns (bool) {
        bytes32 uid = _toBytes32(attestation.data, 0);

        bool redeemed = redeemedMap[uid];
        if (redeemed == true) {
            return false;
        }
        redeemedMap[uid] = true;

        return true;
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