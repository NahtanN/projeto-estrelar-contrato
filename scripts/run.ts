import { BigNumber } from 'ethers';
import { ethers } from 'hardhat';

const main = async () => {
  const [owner, randomPerson] = await ethers.getSigners();

  const starContractFactory = await ethers.getContractFactory('StarPortal');
  const starContract = await starContractFactory.deploy();

  await starContract.deployed();

  console.log('Contract deployed to:', starContract.address);
  console.log('Contract deployed by:', owner.address);

  let starCount: BigNumber;
  starCount = await starContract.getTotalStars();

  let starTxn = await starContract.star();
  await starTxn.wait();

  starCount = await starContract.getTotalStars();

  starTxn = await starContract.connect(randomPerson).star();
  starCount = await starContract.getTotalStars();
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
