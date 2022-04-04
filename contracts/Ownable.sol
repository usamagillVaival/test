// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

contract Ownable {
    address private _owner;
    event OwnershipTransferred(
        address indexed previousOwner,
        address indexed newOwner
    );

    constructor() {
        _owner = msg.sender;
    }

    function owner() public view returns (address) {
        return _owner;
    }

    function transferOwnership(address newOwner) public onlyOwner {
        address oldOwner = _owner;
        _owner = newOwner;
        emit OwnershipTransferred(oldOwner, newOwner);
    }

    modifier onlyOwner() {
        require(isOwner(), "only owner can call");
        _;
    }

    function isOwner() public view returns (bool) {
        return msg.sender == _owner;
    }
}
