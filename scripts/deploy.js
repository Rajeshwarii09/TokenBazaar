import { hardhat } from "hardhat";

async function main() {
  const hre = hardhat;
  const unlockTime = 1643723400; // Replace with the desired unlock time
  const lockedAmount = hre.ethers.utils.parseEther("1.0"); // Replace with the desired locked amount

  const ZealMarket = await hre.ethers.getContractFactory("ZealMarket");
  const zealMarket = await ZealMarket.deploy(unlockTime, { value: lockedAmount });

  console.log(`Deployed contract address ${zealMarket.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});