import { ethers } from "hardhat";

const main = async () => {
  const [deployer] = await ethers.getSigners();
  const accountBalance = await deployer.getBalance();

  console.log("Deploying contracts with account: ", deployer.address);
  console.log("Account balance: ", accountBalance.toString());

  // en Contract
  const enStarContractFactory = await ethers.getContractFactory(
    "EnStarProject"
  );
  const enStarContract = await enStarContractFactory.deploy();

  await enStarContract.deployed();

  console.log("En contract deployed to:", enStarContract.address);

  // pt-br Contract
  const ptBrStarContractFactory = await ethers.getContractFactory(
    "PtBrStarProject"
  );
  const ptBrContract = await ptBrStarContractFactory.deploy();

  await ptBrContract.deployed();

  console.log("Pt-br contract deployed to:", ptBrContract.address);

  // es Contract
  const esStarContractFactory = await ethers.getContractFactory(
    "EsStarProject"
  );
  const esContract = await esStarContractFactory.deploy();

  await esContract.deployed();

  console.log("Es contract deployed to:", esContract.address);

  console.log("Account balance: ", accountBalance.toString());
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
