import { ethers } from "hardhat";

const main = async () => {
  const enStarContractfactory = await ethers.getContractFactory(
    "EnStarProject"
  );
  const enStarContract = await enStarContractfactory.deploy({
    value: ethers.utils.parseEther("0.1"),
  });
  await enStarContract.deployed();
  console.log("Contract addy:", enStarContract.address);

  let contractBalance = await ethers.provider.getBalance(
    enStarContract.address
  );
  console.log("Contract balance:", ethers.utils.formatEther(contractBalance));

  /*
   * Let's try two stars now
   */
  const starTxn = await enStarContract.star("This is star #1");
  await starTxn.wait();

  const starTxn2 = await enStarContract.star("This is star #2");
  await starTxn2.wait();

  contractBalance = await ethers.provider.getBalance(enStarContract.address);
  console.log("Contract balance:", ethers.utils.formatEther(contractBalance));

  let allstars = await enStarContract.getAllStars();
  console.log(allstars);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();
