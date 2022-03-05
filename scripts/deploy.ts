import { ethers } from "hardhat";

const deployEnContract = async () => {
  // en Contract
  const enStarContractFactory = await ethers.getContractFactory(
    "EnStarProject"
  );
  const enStarContract = await enStarContractFactory.deploy({
    value: ethers.utils.parseEther("1"),
  });

  await enStarContract.deployed();

  console.log("En contract deployed to:", enStarContract.address);
};

const deployPtBrContract = async () => {
  // pt-br Contract
  const ptBrStarContractFactory = await ethers.getContractFactory(
    "PtBrStarProject"
  );
  const ptBrContract = await ptBrStarContractFactory.deploy({
    value: ethers.utils.parseEther("1"),
  });

  await ptBrContract.deployed();

  console.log("Pt-br contract deployed to:", ptBrContract.address);
};

const deployEsContract = async () => {
  // es Contract
  const esStarContractFactory = await ethers.getContractFactory(
    "EsStarProject"
  );
  const esContract = await esStarContractFactory.deploy();

  await esContract.deployed();

  console.log("Es contract deployed to:", esContract.address);
};

const main = async () => {
  const [deployer] = await ethers.getSigners();
  const accountBalance = await deployer.getBalance();

  console.log("Deploying contracts with account: ", deployer.address);
  console.log("Account balance: ", accountBalance.toString());

  // await deployPtBrContract();
  await deployEnContract();

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
