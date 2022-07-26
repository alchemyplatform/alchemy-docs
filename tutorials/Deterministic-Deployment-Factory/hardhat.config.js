require("hardhat-deploy");
require("@nomiclabs/hardhat-ethers");
require("dotenv").config();
const { task } = require("hardhat/config");
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const {
  API_URL_GOERLI,
  API_URL_MUMBAI,
  API_URL_ARBITRUM,
  API_URL_OPTIMISM,
  PRIVATE_KEY,
} = process.env;

/** @type import('hardhat/config').HardhatUserConfig */
task("unlocktimer", "returns unlock time")
  .addParam("set", "adds specifed minutes to unlock time")
  .setAction((minutes) => {
    const currentTimestampInSeconds = Math.round(Date.now() / 1000);
    const unlockTime = currentTimestampInSeconds + minutes.set * 60;
    console.log(unlockTime);
  });

task(
  "account",
  "returns nonce and balance for specified address on multiple networks"
)
  .addParam("address")
  .setAction(async (address) => {
    const web3Goerli = createAlchemyWeb3(API_URL_GOERLI);
    const web3Mumbai = createAlchemyWeb3(API_URL_MUMBAI);
    const web3Arb = createAlchemyWeb3(API_URL_ARBITRUM);
    const web3Opt = createAlchemyWeb3(API_URL_OPTIMISM);

    const networkIDArr = ["Ethereum Goerli:", "Polygon  Mumbai:", "Arbitrum Rinkby:", "Optimism Goerli:"];
    const providerArr = [web3Goerli, web3Mumbai, web3Arb, web3Opt];
    const resultArr = [];
    for (let i = 0; i < providerArr.length; i++) {
      const nonce = await providerArr[i].eth.getTransactionCount(
        address.address,
        "latest"
      );
      const balance = await providerArr[i].eth.getBalance(address.address);
      resultArr.push([
        networkIDArr[i],
        nonce,
        parseFloat(providerArr[i].utils.fromWei(balance, "ether")).toFixed(2) +
          "ETH",
      ]);
    }
    resultArr.unshift(["  |NETWORK|   |NONCE|   |BALANCE|  "]);
    console.log(resultArr);
  });

module.exports = {
  solidity: "0.8.9",
  networks: {
    hardhat: {},
    goerli: {
      url: API_URL_GOERLI,
      accounts: [`0x${PRIVATE_KEY}`],
    },
    mumbai: {
      url: API_URL_MUMBAI,
      accounts: [`0x${PRIVATE_KEY}`],
    },
    arbitrum: {
      url: API_URL_ARBITRUM,
      accounts: [`0x${PRIVATE_KEY}`],
    },
    optimism: {
      url: API_URL_OPTIMISM,
      accounts: [`0x${PRIVATE_KEY}`],
    },
  },
};
