---
description: >-
  Step by step guide on submitting your smart contract's ABI to Etherscan so
  anyone can look at the contract's methods and variables and understand how to
  interact with it.
---

# 📩 Submitting your Smart Contract to Etherscan

You should have completed part 1 [creating and deploying a smart contract](./), and part 2 [interacting with your smart contract](interacting-with-a-smart-contract.md) prior to starting part 3 below.  

## Part 3: Publish your Smart Contract to Etherscan

You did all the hard work of bringing your smart contract to life - now it's time to share it with the world!

By verifying your smart contract on Etherscan, anyone can view your source code and interact with your smart contract. Let's get started!

### Step 1: Generate an API Key on your Etherscan account

An Etherscan API Key is necessary to verify that you're the owner of the smart contract that you're trying to publish. 

{% hint style="info" %}
If you don't have an Etherscan account, first sign up using this [link](https://etherscan.io/register). 
{% endhint %}

Once logged in, press your username on the top right, and select the "My profile" button:

![](<../../.gitbook/assets/image (8).png>)

Next, navigate to the "API-KEYs" button on the left tab bar. Then press the "Add" button, name your app whatever you wish (we chose `hello-world`), and then select continue.

![](<../../.gitbook/assets/image (6).png>)

Once you've followed the steps above, you should be able to view your new API key, which we've highlighted in red below. Copy this API key to your clipboard.

![](<../../.gitbook/assets/image (18).png>)

Now, let's update your `.env `file to include your Etherscan API Key. 

If you were following the [Hardhat tutorial](./#create-and-deploy-your-smart-contract-using-hardhat), your `.env`file should look like this:

```javascript
API_URL = "https://eth-ropsten.alchemyapi.io/v2/your-api-key"
PUBLIC_KEY = "your-public-account-address"
PRIVATE_KEY = "your-private-account-address"
ETHERSCAN_API_KEY = "your-etherscan-key" 
```

If you were following the [Truffle tutorial](./#create-and-deploy-your-smart-contract-using-truffle), your .env file should look like this:

```javascript
API_URL = "https://eth-ropsten.alchemyapi.io/v2/your-api-key"
MNEMONIC = "your-metamask-seed-reference"
PUBLIC_KEY = "your-public-account-address"
PRIVATE_KEY = "your-private-account-address"
ETHERSCAN_API_KEY = "your-etherscan-key" 
```

### Step 2: HardHat-deployed smart contracts

{% hint style="warning" %}
This is where our steps diverge for HardHat and Truffle deployed smart contracts, as they require different plugins. Skip to the _Step 3: Truffle-deployed smart contracts_ section if you deployed your contract using Truffle.
{% endhint %}

#### Step 2.1 Install the [`hardhat-etherscan`](https://hardhat.org/plugins/nomiclabs-hardhat-etherscan.html) plugin

Publishing your contract to Etherscan with HardHat is super simple. To get started, you will first need to install the `hardhat-etherscan` plugin to automatically verify your smart contract's source code and ABI on Etherscan. In your `hello-world` project directory run:

```
npm install --save-dev @nomiclabs/hardhat-etherscan
```

Once installed, include the following statement at the top of your `hardhat.config.js`:

```
require("@nomiclabs/hardhat-etherscan");
```

Next, add the following Etherscan config to your `hardhat.config.js` file:

```
module.exports = {
  solidity: "0.7.3",
  defaultNetwork: "ropsten",
  networks: {
      hardhat: {},
      ropsten: {
         url: API_URL,
         accounts: [`0x${PRIVATE_KEY}`]
      }
  },
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    apiKey: process.env.ETHERSCAN_API_KEY
  }
};
```

#### Step 2.2 Verify your smart contract on Etherscan!

Make sure your files are properly saved (especially if you're in VSCode) and your `.env` variables are properly configured.

Finally, run the `verify` task, passing the address of the contract, and the network where it's deployed:

```
npx hardhat verify --network ropsten DEPLOYED_CONTRACT_ADDRESS 'Hello World!'
```

If all goes well, you should see the following message in your terminal:

```
Successfully submitted source code for contract
contracts/HelloWorld.sol:HelloWorld at 0xdeployed-contract-address
for verification on Etherscan. Waiting for verification result...


Successfully verified contract HelloWorld on Etherscan.
https://ropsten.etherscan.io/address/<contract-address>#contracts
```

Congrats! Your smart contract code should be on Etherescan! Check out [Step 4](submitting-your-smart-contract-to-etherscan.md#step-4-check-out-your-smart-contract-on-etherscan) to see how to view your smart contract code!

### Step 3: Truffle-deployed smart contracts

{% hint style="warning" %}
Skip this section if you deployed your smart contract with HardHat.
{% endhint %}

#### Step 3.1: Install the `truffle-plugin-verify` plugin 

We need the `truffle-plugin-verify` plugin to automatically verify your truffle smart contract's source code and ABI on Etherscan. In your project directory run:

```
npm install -g truffle-plugin-verify
```

Once installed, add the plugin to your `truffle-config.js` file. Your file should look similar to this. 

```javascript
const HDWalletProvider = require("@truffle/hdwallet-provider");
require('dotenv').config()

const { API_URL, MNEMONIC } = process.env;

module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*", // Match any network id
      gas: 5000000
    },
    ropsten: {
      provider: function() {
        return new HDWalletProvider(MNEMONIC, API_URL)
      },
      network_id: 3
    }
  },
  compilers: {
    solc: {
      settings: {
        optimizer: {
          enabled: true, // Default: false
          runs: 200      // Default: 200
        },
      }
    }
  },
  plugins: ['truffle-plugin-verify'] //PLUGIN ADDED HERE
};
```

You're almost at the finish line! 😅

Let's update your `truffle-config.js` file to include your Etherscan API key. See the bottom of the code below for reference:

```javascript
const HDWalletProvider = require("@truffle/hdwallet-provider");
require('dotenv').config()

const { API_URL, MNEMONIC } = process.env;

module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*", // Match any network id
      gas: 5000000
    },
    ropsten: {
      provider: function() {
        return new HDWalletProvider(MNEMONIC, API_URL)
      },
      network_id: 3
    }
  },
  compilers: {
    solc: {
      settings: {
        optimizer: {
          enabled: true, // Default: false
          runs: 200      // Default: 200
        },
      }
    }
  },
  plugins: ['truffle-plugin-verify'],
  api_keys: {
    etherscan: process.env.ETHERSCAN_API_KEY
  }

};
```

#### Step 3.2 Verify your smart contract on Etherscan!

Last but not least, run the following command in your terminal:

```
truffle run verify HelloWorld --network ropsten
```

If all goes well, you should see the following message in your terminal.

```
Verifying HelloWorld 
Pass - Verified: https://ropsten.etherscan.io/address/<contract-address>#contracts
Successfully verified 1 contract(s).
```

### Step 4: Check out your smart contract on Etherscan!

When you navigate to the link provided in your terminal, you should be able to see your smart contract code and ABI published on Etherscan!

![](<../../.gitbook/assets/image (13).png>)

**Wahooo - you did it champ! Now anyone can call or write to your smart contract! We can't wait to see what you build next!**:tada:

Once you complete this tutorial, let us know how your experience was or if you have any feedback by tagging us on Twitter [@alchemyplatform](https://twitter.com/AlchemyPlatform)!
