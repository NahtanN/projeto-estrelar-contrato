// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract StarPortal {
  uint256 private totalStars;
  
  constructor() {
      console.log("Hello There!");
  }

  function star() public {
    totalStars += 1;
    console.log("%s has starred your project!", msg.sender);
  }

  function getTotalStars() public view returns (uint256) {
    console.log("We have %d total stars!", totalStars);
    return totalStars;
  }
}
