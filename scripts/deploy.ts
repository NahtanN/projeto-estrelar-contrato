import { BigNumber } from 'ethers';
import { ethers } from 'hardhat';

const main = async () => {
  const [deployer] = await ethers.getSigners();
  const accountBalance = await deployer.getBalance();

  console.log('Deploying contracts with account: ', deployer.address);
  console.log('Account balance: ', accountBalance.toString());

  const starContractFactory = await ethers.getContractFactory('StarPortal');
  const starContract = await starContractFactory.deploy();
  await starContract.deployed();

  console.log('Contract deployed to:', starContract.address);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

runMain();
