---
description: Learn about Arbitrum, ERC-721, and How to Deploy an NFT
---

# Arbitrum NFTs: Creating and Deploying ERC-721

In this article, we’ll teach you how to create ERC-721 Ethereum tokens (NFTs) on Arbitrum, a leading Ethereum layer 2 scaling solution that uses optimistic rollups, in just a couple of easy steps so you can start selling digital items on NFT marketplaces, like [Stratos](https://www.stratos.xyz/).

### How to deploy an ERC-721 token on Arbitrum <a href="#h.lyxgeuj5ss7z" id="h.lyxgeuj5ss7z"></a>

### Step 1: Sign up for Alchemy <a href="#h.cyozwa6klqz8" id="h.cyozwa6klqz8"></a>

To make things easy, [sign up for a free Alchemy developer account](https://dashboard.alchemyapi.io/signup/?a=169b429af6), so you can communicate with the Arbitrum chain without having to run your own nodes.

We’ll also take advantage of Alchemy’s developer tools for monitoring and analytics to understand what’s going on under the hood in your smart contract deployment.

### Step 2: Create an API key <a href="#h.pmiodst42nik" id="h.pmiodst42nik"></a>

Next, create a new app to generate an API key and to [connect to the Arbitrum Rinkeby test network.](../guides/choosing-a-network.md)

Navigate to the “Create App” page in your Alchemy Dashboard by hovering over “Apps” in the navbar and click “Create App”

![](../.gitbook/assets/image10)

Name your app (we chose “arbitrum\_nft”), and write a short description.

Select “Arbitrum” for your chain and choose “Arbitrum Rinkeby” for your network.

![](../.gitbook/assets/image9)

Click “Create app” and that’s it! Your app should appear in the table below.

### Step 3: Create an Ethereum wallet <a href="#h.9y1vlzub8it1" id="h.9y1vlzub8it1"></a>

We need an Ethereum wallet to send and receive transactions. For this tutorial, we’ll use MetaMask, a browser-based digital asset wallet to manage Ethereum accounts.[ Download MetaMask](https://metamask.io/) and create a free account.

### Step 4: Connect to the Arbitrum Testnet <a href="#h.qvg2iwnt83yi" id="h.qvg2iwnt83yi"></a>

Connect to the “Arbitrum Testnet” so you’re not dealing with real money for this tutorial.

To connect to the Arbitrum testnet, click on the upper right (where it displays your current network), and then choose “Add Network”.

Your metamask should open up a new tab where you can fill in details about the new network you want to add.

Fill it in as follows:

![](../.gitbook/assets/image2)

* **Network Name:** Arbitrum Testnet
* **New RPC URL:** [https://rinkeby.arbitrum.io/rpc](https://www.google.com/url?q=https://rinkeby.arbitrum.io/rpc\&sa=D\&source=editors\&ust=1654039441621639\&usg=AOvVaw31gKBx64WHTGtP\_vskoQe\_)
* **Chain ID:** 421611
* **Currency Symbol:** ETH
* **Block Explorer URL:** https://testnet.arbiscan.io/
* Click “Save” and you’re done!

Your network should be “Arbitrum Testnet” in the upper right.

### Step 5: Add testnet ETH from a Rinkeby faucet <a href="#h.kzwpl52y1og7" id="h.kzwpl52y1og7"></a>

To deploy your smart contract to the Arbitrum test network, [get Rinkeby ETH from a Rinkeby faucet](https://rinkebyfaucet.com) and enter your Rinkeby Testnet account address. You normally get 0.1 ETH, but if you [sign in with your alchemy account](https://dashboard.alchemyapi.io/signup/?a=169b429af6) you get 0.5 ETH! Simply click “Send me ETH”.

You should see 0.5 ETH in your MetaMask account, in the “Rinkeby Test Network” soon after (on the upper right).

Once you have your ETH in Rinkeby, bridge the tokens to “Arbitrum Testnet” by going to [https://bridge.arbitrum.io/](https://www.google.com/url?q=https://bridge.arbitrum.io/\&sa=D\&source=editors\&ust=1654039441622963\&usg=AOvVaw2C4W-G8Lb6S49wnpPq9C5G), deposit as much test ETH as possible, and click “Deposit,”

Your Arbitrum Testnet wallet should now have ETH (make sure to change your network in the upper right of Metamask, from “Rinkeby Test Network” to “Arbitrum Testnet”).

### Step 6: Check your Arbitrum ETH balance <a href="#h.dciwe5w5e7jv" id="h.dciwe5w5e7jv"></a>

To double-check your balance is there, let’s make an [eth\_getBalance ](../apis/arbitrum/eth-getbalance.md)request using [Alchemy’s composer tool](https://composer.alchemyapi.io/?composer\_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth\_getBalance%22%2C%22paramValues%22%3A%5B%22%22%2C%22latest%22%5D%7D). This will return the amount of ETH assets in your wallet.

![](../.gitbook/assets/image4)

After you input your MetaMask account address and click “Send Request”, you should see a response like this:

![](../.gitbook/assets/image8)

{% hint style="info" %}
**NOTE:** This result is in wei, not ETH. Wei is used as the smallest denomination of ether. The conversion from wei to ETH is 1 eth = 1018 wei. So if we convert 0x6ccd46641d8ff89 to decimal we get 4.9\*1017 wei, which equals .49 ETH.
{% endhint %}

### ​​Step 7: Initialize your Arbitrum NFT project <a href="#h.2uogikwaw316" id="h.2uogikwaw316"></a>

To initialize your Arbitrum NFT project, create a new folder by navigating to your command line and typing the following commands:

```
mkdir my-nft
cd my-nft
npm init
```

The output should look like this:

![](../.gitbook/assets/image6)

You can answer the installation questions as shown above.

### Step 8: Install Hardhat <a href="#h.8wr19em3khpv" id="h.8wr19em3khpv"></a>

Hardhat is a development environment to compile, deploy, test, and debug Ethereum software that helps developers build smart contracts and dApps locally. We’re going to [install Hardhat](https://hardhat.org/getting-started/#overview) to create an Arbitrum NFT.

Inside `my-nft` project run&#x20;

```
npm install --save-dev hardhat
```

### Step 9: Create a new Hardhat project <a href="#h.gn4bx5z8l9zx" id="h.gn4bx5z8l9zx"></a>

Inside the project folder, run&#x20;

\>>> npx hardhat

You should see a welcome message and the option to select what you want to do.

Select “create an empty hardhat.config.js” to generate a `hardhat.config.js` file which is where we’ll set up our project in step 14.

![](../.gitbook/assets/image11)

### Step 10: Add project folders <a href="#h.n3vzo1lbvpu8" id="h.n3vzo1lbvpu8"></a>

​​To keep your project organized, create two new folders by navigating to the root directory of your project from the command line and typing:

```
mkdir contracts
```

`contracts/` is where we’ll keep your NFT smart contract code2.

```
mkdir scripts
```

`scripts/` is where we’ll keep scripts to deploy and interact with your smart contract

### Step 11: Write your contract <a href="#h.rz6ao8aevswb" id="h.rz6ao8aevswb"></a>

Now that we’ve created our development environment, let’s move on to more exciting stuff–writing your smart contract code!

Open up the my-nft project in your favorite editor like VScode.

Smart contracts are written in a language called Solidity which is what we will use to write your `MyNFT.sol` smart contract.‌

Navigate to the contracts folder and create a new file called `MyNFT.sol`

Below is your NFT smart contract code, which is based on the [OpenZeppelin](https://www.openzeppelin.com/) library’s ERC-721 implementation. Copy and paste the contents below into your `MyNFT.sol` file.

```solidity
//Contract based on [https://docs.openzeppelin.com/contracts/3.x/erc721](https://docs.openzeppelin.com/contracts/3.x/erc721)
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
contract MyNFT is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    constructor() ERC721("MyNFT", "NFT") {}
    function mintNFT(address recipient, string memory tokenURI)
        public onlyOwner
        returns (uint256)
    {
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        _mint(recipient, newItemId);
        _setTokenURI(newItemId, tokenURI);
        return newItemId;
    }
}
```

Because we are inheriting classes from the OpenZeppelin contracts library, run the following in the command line to install the library into your folder:

```
npm install @openzeppelin/contracts
```

So, what does this code do exactly? Let’s break it down, line-by-line.

At the top of your smart contract, we import three OpenZeppelin smart contract classes:

* `@openzeppelin/contracts/token/ERC721/ERC721.sol` contains the implementation of the ERC-721 standard, which your NFT smart contract will inherit. Your smart contract must implement all the methods of the ERC-721 standard to be a valid NFT. To learn more about the inherited ERC-721 functions, check out [the interface definition](https://eips.ethereum.org/EIPS/eip-721.).
* `@openzeppelin/contracts/utils/Counters.sol` provides counters that can only be incremented or decremented by one. Your smart contract uses a counter to keep track of the total number of NFTs minted and sets the unique ID on your new NFT. Each NFT minted using a smart contract must be assigned a unique ID—here your unique ID is just determined by the total number of NFTs in existence. For example, the first NFT we mint with your smart contract has an ID of "1," your second NFT has an ID of "2," etc.
* `@openzeppelin/contracts/access/Ownable.sol` sets up [access control](https://docs.openzeppelin.com/contracts/3.x/access-control.) on your smart contract, so only the owner of the smart contract (you) can mint NFTs. (
  * Note, including access control is entirely a preference. If you'd like anyone to be able to mint an NFT using your smart contract, remove the word `Ownable` on line 10 and `onlyOwner` on line 17.)

After your import statements, you have your custom NFT smart contract, which is surprisingly short, it only contains a counter, a constructor, and a single function!

This is thanks to your inherited OpenZeppelin contracts, which implement most of the methods we need to create an NFT. These methods include things like `ownerOf`, which returns the owner of the NFT, and `transferFrom`, which transfers ownership of the NFT from one account to another.

In your ERC-721 constructor, you’ll notice we pass 2 strings, “`MyNFT`” and “`NFT`.” The first variable is the smart contract’s name, and the second is its symbol. You can name each of these variables whatever you wish!

Finally, we have your function `mintNFT(address recipient, string memory tokenURI)` that allows us to mint an NFT! You'll notice this function takes two variables:

* `address recipient` specifies the address that will receive your freshly minted NFT
* `string memory tokenURI` is a string that should resolve to a JSON document that describes the NFT's metadata. An NFT's metadata is really what brings it to life, allowing it to have configurable properties, such as a name, description, image, and other attributes. In part 2 of this tutorial, we will describe how to configure this metadata.

`mintNFT` calls some methods from the inherited ERC-721 library and ultimately returns a number that represents the ID of the freshly minted NFT.

### Step 12: Connect Metamask to Alchemy to your project <a href="#h.7qbn9296c3x7" id="h.7qbn9296c3x7"></a>

Now that we’ve created a MetaMask wallet, Alchemy account, and written your smart contract, it’s time to connect the three.

Every transaction sent from your virtual wallet requires a signature using your unique private key. To provide your program with this permission, we can safely store your private key (and Alchemy API key) in an environment file.

First, install the dotenv package in your project directory:

```
npm install dotenv --save
```

Then, create a `.env` file (just name it “.env”) in the root directory of your project, and add your MetaMask private key and HTTP Alchemy API URL.

Follow these instructions to [export your private key from MetaMask](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-Export-an-Account-Private-Key).

See below to get the HTTP Alchemy API URL and copy it to your clipboard.

![](../.gitbook/assets/image3)

Your `.env` should now look like this:

{% code title=".env" %}
```
API_URL="https://arb-rinkeby.g.alchemy.com/v2/your-api-key"
PRIVATE_KEY="your-metamask-private-key"
```
{% endcode %}

To connect these to your code, we’ll reference these variables in your `hardhat.config.js` file in step 14.

Don't commit .env! Please make sure never to share or expose your .env file with anyone, as you are compromising your secrets in doing so. If you are using version control, add your .env to a [gitignore](https://git-scm.com/docs/gitignore) file.

### Step 13: Install ethers.js <a href="#h.gq7g1fqyvn13" id="h.gq7g1fqyvn13"></a>

Ethers.js is a library that makes it easier to interact and make Ethereum requests by wrapping standard JSON-RPC methods with more user-friendly methods.

Hardhat makes it super easy to integrate plugins for additional tooling and extended functionality. We’ll be taking advantage of the [Ethers plugin for Hardhat](https://hardhat.org/plugins/nomiclabs-hardhat-ethers.html) for contract deployment (Ethers.js has some super clean contract deployment methods).

In your project directory type:

```
npm install --save-dev @nomiclabs/hardhat-ethers ethers@^5.0.0
```

We’ll also require ethers.js in your `hardhat.config.js` in the next step.

### Step 14: Update hardhat.config.js <a href="#h.uh94ocd8jryu" id="h.uh94ocd8jryu"></a>

We’ve added several dependencies and plugins so far, now we need to update `hardhat.config.js` so that your project knows about them.

Update your `hardhat.config.js` to look like this:

{% code title="hardhat.config.js" %}
```javascript
/**
* @type import('hardhat/config').HardhatUserConfig
*/
require("dotenv").config();
require("@nomiclabs/hardhat-ethers");
const { API_URL, PRIVATE_KEY } = process.env;
module.exports = {
 solidity: "0.8.1",
 defaultNetwork: "arbitrum_rinkeby",
 networks: {
   hardhat: {},
   arbitrum_rinkeby: {
     chainId: 421611,
     url: API_URL,
     accounts: [`0x${PRIVATE_KEY}`],
   },
 },
};
```
{% endcode %}

### Step 15: Compile your contract <a href="#h.s5y9eg5k2l6" id="h.s5y9eg5k2l6"></a>

Compile your contract to make sure everything is working so far by running this command from the command line:

```
npx hardhat compile
```

Note: You might get a warning about an SPDX license identifier not provided in the source file, but no need to worry about that–hopefully everything else looks good! If not, you can always message in the [Alchemy Discord](https://alchemy.com/discord).

### Step 16: Write your deploy script <a href="#h.3bh8ks4diqmn" id="h.3bh8ks4diqmn"></a>

Now that your contract is written and your configuration file is good to go, it’s time to write the contract deploy script.

Navigate to the scripts/ folder and create a new file called `deploy.js` with the following contents:

{% code title="deploy.js" %}
```javascript
async function main() {
  const MyNFT = await ethers.getContractFactory("MyNFT");
  // Start deployment, returning a promise that resolves to a contract object
  const myNFT = await MyNFT.deploy();
  await myNFT.deployed();
  console.log("Contract deployed to address:", myNFT.address);
}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
```
{% endcode %}

Hardhat does an amazing job of explaining what each of these lines of code does in their [contracts tutorial](https://hardhat.org/tutorial/testing-contracts.html#writing-tests.). We’ve adopted their explanations here.

`const MyNFT = await ethers.getContractFactory("MyNFT");`

A ContractFactory in ethers.js is an abstraction used to deploy new smart contracts, so MyNFT here is a factory for instances of your NFT contract.

When using the hardhat-ethers plugin, ContractFactory and Contract instances are connected to the first signer by default.

`const myNFT = await MyNFT.deploy();`

Calling `deploy()` on a ContractFactory will start the deployment, and return a Promise that resolves to a Contract. This is the object that has a method for each of your smart contract functions.

### Step 17: Deploy your contract <a href="#h.c2g3vkxlv1ur" id="h.c2g3vkxlv1ur"></a>

We’re finally ready to deploy your smart contract! Navigate back to the root of your project directory and in the command line run:

```
npx hardhat --network arbitrum_rinkeby run scripts/deploy.js
```

You should then see something like this:

Contract deployed to address: 0x0BA7b1cB490E375F33773e0f24d3f80D74a96347

If we go to the [Arbitrum Testnet etherscan](https://testnet.arbiscan.io) and search for your contract address we should be able to see that it has been deployed successfully. If you can't see it immediately, wait a while as it can take some time. The transaction will look something like this:

![](../.gitbook/assets/image7)

The From address should match your MetaMask account address and the To address will say “Contract Creation.” If we click on the transaction, we’ll see your contract address in the To field:

![](../.gitbook/assets/image5)

You just deployed your NFT smart contract to the Ethereum chain!

To understand what’s going on under the hood, navigate to the Explorer tab in your Alchemy dashboard.

If you have multiple Alchemy apps make sure to filter by app and select “arbitrum\_nft”.

![](../.gitbook/assets/image1)

Here you’ll see a handful of JSON-RPC calls that Hardhat/Ethers made under the hood for us when we called the `.deploy()` function.

Two important ones to call out here are [eth\_sendRawTransaction](../apis/arbitrum/eth-sendrawtransaction.md), which is the request to actually write your smart contract onto the Arbitrum Rinkeby chain, and [eth\_getTransactionByHash](../apis/arbitrum/eth-gettransactionbyhash.md), which is a request to read information about your transaction given the hash (a typical pattern when sending transactions).

To learn more about sending transactions, check out this tutorial on [sending transactions using Web3.](../introduction/getting-started/sending-txs.md)

### Arbitrum NFT Resources <a href="#h.k41gbdsrbvsk" id="h.k41gbdsrbvsk"></a>

Arbitrum is an excellent choice for creators to launch NFT projects with all the benefits of its optimistic rollup and less expensive gas fees of a fully EVM-compatible layer 2.

Here are some additional Arbitrum NFT resources to check out:

* [Arbitrum One Portal](https://portal.arbitrum.one/) - Arbitrum NFT ecosystem portal
* [Arbitrum NFT Alliance ](https://www.nftalliance.xyz/)- an independent collective of marketplaces and NFT collection creators whose aim is to advance the Arbitrum platform ecosystem

### Conclusion <a href="#h.meieiy7v5bgl" id="h.meieiy7v5bgl"></a>

Because of its speed, cost efficient transactions, reliability, and security, creating NFTs on Arbitrum’s layer 2 blockchain is a great option for web3 developers who want an alternative to launching NFTs on Ethereum’s mainnet. If you’re interested in launching your own NFT project on Arbitrum, [sign up for a free Alchemy developer account](https://dashboard.alchemyapi.io/signup/?a=169b429af6) and start today!
