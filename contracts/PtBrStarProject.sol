// SPDX-License-Identifier: MIT

import "hardhat/console.sol";

pragma solidity ^0.8.0;

contract PtBrStarProject {
  uint256 private totalStars;
  address[] private accounts;
  Star[] private stars;

  event NewStar(address indexed from, uint256 timestamp, string message);

  struct Star {
    address account; // Quem estrelou
    string mesage; // Mensagem enviado pelo usuário
    uint256 timestamp; // Quando foi enviada
  }

  function star(string memory _message) public {
    totalStars += 1;

    stars.push(Star(msg.sender, _message, block.timestamp));

    bool newAccount = true;

    for (uint256 i = 0; i < accounts.length; i++) {
      if (accounts[i] == msg.sender) {
        newAccount = false;
        break;
      }
    }

    if (newAccount) accounts.push(msg.sender);

    emit NewStar(msg.sender, block.timestamp, _message);
  }

  function removeAccount() public {
    for (uint256 i = 1; i < accounts.length; i++) {
      if (accounts[i] == msg.sender) {
        delete accounts[i];
      }
    }

    totalStars -= 1;
  }

  function getAllAccounts() public view returns (address[] memory) {
    return accounts;
  }

  function getTotalStars() public view returns (uint256) {
    return totalStars;
  }

  function getAllStars() public view returns (Star[] memory) {
    return stars;
  }
}
