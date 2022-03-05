// SPDX-License-Identifier: MIT

import "hardhat/console.sol";

pragma solidity ^0.8.0;

contract EnStarProject {
  uint256 private totalStars;
  address[] private accounts;
  Star[] private stars;
  uint256 private seed;

  constructor() payable {
    seed = (block.timestamp + block.difficulty) % 100;
  }

  event NewStar(address indexed from, uint256 timestamp, string message);

  struct Star {
    address account; // Quem estrelou
    string mesage; // Mensagem enviado pelo usuário
    uint256 timestamp; // Quando foi enviada
  }

  /**
    Essa estrutura associa um endereço a um número.
    Nesse Caso, ela associa um endereço com o timestamp da última vez que ele chamou a função star()
   */
  mapping(address => uint256) public lastStarAt;

  function star(string memory _message) public {
    require(lastStarAt[msg.sender] + 15 minutes < block.timestamp, "Wait 15m");
    lastStarAt[msg.sender] = block.timestamp;

    totalStars += 1;
    stars.push(Star(msg.sender, _message, block.timestamp));

    seed = (block.timestamp + block.difficulty) % 100;

    if (seed <= 50) {
      uint256 prizeAmount = 0.0001 ether;

      require(prizeAmount <= address(this).balance, "No funds!");
      (bool success, ) = (msg.sender).call{ value: prizeAmount }("");
      require(success, "Failed to withdraw money from contract.");
    }

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
