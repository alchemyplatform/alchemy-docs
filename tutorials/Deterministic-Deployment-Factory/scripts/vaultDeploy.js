const { bytecode } = require("../artifacts/contracts/Vault.sol/Vault.json");
const { encoder, create2Address } = require("../utils/utils.js")

const main = async () => {
  const factoryAddr = "0x7B514ecfA2d02e085706d3EE6D63DE4a33CFc4e0";
  const unlockTime = "1657434348"; //***Before deploying vault, change this timestamp using: npx hardhat unlocktimer --set 15***
  const saltHex = ethers.utils.id("1234");
  const initCode = bytecode + encoder(["uint"], [unlockTime]);

  const create2Addr = create2Address(factoryAddr, saltHex, initCode);
  console.log("precomputed address:", create2Addr);

  const Factory = await ethers.getContractFactory("DeterministicDeployFactory");
  const factory = await Factory.attach(factoryAddr);
  
  const lockDeploy = await factory.deploy(initCode, saltHex);
  const txReceipt = await lockDeploy.wait();
  console.log("Deployed to:", txReceipt.events[0].args[0]);
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
