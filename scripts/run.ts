import { BigNumber } from "ethers";
import { ethers } from "hardhat";

const main = async () => {
  const [owner, randomPerson] = await ethers.getSigners();

  const enStarContractFactory = await ethers.getContractFactory(
    "EnStarProject"
  );
  const enStarContract = await enStarContractFactory.deploy();

  await enStarContract.deployed();

  console.log("Contract deployed to:", enStarContract.address);
  console.log("Contract deployed by:", owner.address);

  let starCount: BigNumber;
  starCount = await enStarContract.getTotalStars();
  console.log(starCount.toNumber());

  let starTxn = await enStarContract.star("First Star!");
  await starTxn.wait();

  starTxn = await enStarContract.connect(randomPerson).star("Second Star");
  await starTxn.wait();

  starTxn = await enStarContract.connect(randomPerson).star("Third Star");
  await starTxn.wait();

  starTxn = await enStarContract.connect(randomPerson).star("Fourth Star");
  await starTxn.wait();

  let allStars = await enStarContract.getAllStars();
  console.log(allStars);

  let accounts = await enStarContract.getAllAccounts();
  console.log(accounts);

  starCount = await enStarContract.getTotalStars();
  console.log(starCount.toNumber());

  let removeAccount = await enStarContract
    .connect(randomPerson)
    .removeAccount();

  accounts = await enStarContract.getAllAccounts();
  console.log(accounts);

  starCount = await enStarContract.getTotalStars();
  console.log(starCount.toNumber());
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
