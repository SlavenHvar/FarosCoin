// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract FarosCoin is ERC20 {
    
    address public contractCreator;
    uint256 public price;

    constructor() ERC20 ("Faros Coin", "FAROS") {
        contractCreator = msg.sender;
        price = 0.001 ether;
        _mint(contractCreator, 2000000000);
    }

    function buyFarosCoin(uint256 amount) payable public returns (bool){
        uint256 buyingPrice = amount*price;
        require(msg.value == buyingPrice, "msg.value not equal to buyingPrice!");
        _transfer(contractCreator, msg.sender, amount*100);
        return true;
    }

    function setMintingPrice(uint256 newPrice) public returns (bool){
        require(msg.sender == contractCreator, "Only contract creator can set token price!");
        price = newPrice;
        return true;
    }

    function withDrawMatic(uint256 _amount) public returns (bool){
        require(msg.sender == contractCreator, "Only contract creator can withdraw Matic from contract!");
        payable(contractCreator).transfer(_amount);
        return true;
    }

    function decimals() public view virtual override returns (uint8) {
        return 2;
    }

}
