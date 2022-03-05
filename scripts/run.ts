import { BigNumber } from "ethers";
import { ethers } from "hardhat";

const main = async () => {
  const [owner, randomPerson] = await ethers.getSigners();

  const ptBrStarContractFactory = await ethers.getContractFactory(
    "PtBrStarProject"
  );
  const ptBrStarContract = await ptBrStarContractFactory.deploy({
    value: ethers.utils.parseEther("1"),
  });

  await ptBrStarContract.deployed();

  console.log("Contract deployed to:", ptBrStarContract.address);
  console.log("Contract deployed by:", owner.address);

  let contractBalance = await ethers.provider.getBalance(
    ptBrStarContract.address
  );
  console.log("Contract balance:", ethers.utils.formatEther(contractBalance));

  let starCount: BigNumber;
  starCount = await ptBrStarContract.getTotalStars();
  console.log(starCount.toNumber());

  let starTxn = await ptBrStarContract.star("First Star!");
  await starTxn.wait();

  starTxn = await ptBrStarContract.connect(randomPerson).star("Second Star");
  await starTxn.wait();

  starTxn = await ptBrStarContract.connect(randomPerson).star("Third Star");
  await starTxn.wait();

  starTxn = await ptBrStarContract.connect(randomPerson).star("Fourth Star");
  await starTxn.wait();

  let allStars = await ptBrStarContract.getAllStars();
  console.log(allStars);

  let accounts = await ptBrStarContract.getAllAccounts();
  console.log(accounts);

  starCount = await ptBrStarContract.getTotalStars();
  console.log(starCount.toNumber());

  let removeAccount = await ptBrStarContract
    .connect(randomPerson)
    .removeAccount();

  accounts = await ptBrStarContract.getAllAccounts();
  console.log(accounts);

  starCount = await ptBrStarContract.getTotalStars();
  console.log(starCount.toNumber());

  contractBalance = await ethers.provider.getBalance(ptBrStarContract.address);
  console.log("Contract balance:", ethers.utils.formatEther(contractBalance));
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
