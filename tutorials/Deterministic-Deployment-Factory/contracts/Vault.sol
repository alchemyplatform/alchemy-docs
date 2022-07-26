// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract Vault {
    uint public unlockTime;
    address payable public owner;

    event Deposit(uint amount, uint when);
    event Withdrawal(uint amount, uint when);

    constructor(uint _unlockTime) {
        require(
            block.timestamp < _unlockTime,
            "Unlock time should be in the future"
        );
        unlockTime = _unlockTime;
        owner = payable(0x5DAAC14781a5C4AF2B0673467364Cba46Da935dB); //CHANGE TO YOUR ADDRESS
    }

    function deposit() payable public {
        emit Deposit(msg.value, block.timestamp);

    }

    function withdraw() public {

        require(block.timestamp >= unlockTime, "You can't withdraw yet");
        require(msg.sender == owner, "you aren't the owner");

        emit Withdrawal(address(this).balance, block.timestamp);

        owner.transfer(address(this).balance);
    }
}


