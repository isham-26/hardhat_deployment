//SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract Token{
     string public name = "HardHat Token";
     string public symbol="HHT";
     uint public totalSupply=10000;
     address public owner;
     mapping(address=>uint) balance;

     constructor(){
        balance[msg.sender]=totalSupply;
        owner=msg.sender;
    }
    function transfer(address _to,uint _amount) external{
        require(balance[msg.sender]>=_amount,"Not Enought tokens");
        balance[msg.sender]-=_amount;
        balance[_to]+=_amount;
    }
    function balanceOf(address _account) external view returns(uint){
        return balance[_account];
    }

}