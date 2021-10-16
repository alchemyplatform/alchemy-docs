---
description: >-
  Don't know where to start? This guide will walk you through writing a simple
  web3 script to get the latest block number from the Ethereum mainnet using
  Alchemy.
---

# 👷 Simple Web3 Script

_This guide assumes you've gone through the _[_getting started_](../introduction/getting-started.md)_ steps and have an _[_Alchemy account!_](https://alchemy.com/?r=affiliate:b92f4e01-cafb-4038-83f4-372a42df5171)__

### 1. From your [command line](https://www.computerhope.com/jargon/c/commandi.htm), create a new project directory and `cd` into it:

```
mkdir web3-example
cd web3-example
```

### 2. Install the Alchemy Web3 dependency if you have not already:

You can use any [web3 library](../introduction/getting-started.md#other-web3-libraries) of your choosing, however there are tons of benefits to using [Alchemy Web3](../documentation/alchemy-web3/)! 

```
npm install @alch/alchemy-web3
```

### 3. Create a file named `index.js` and add the following contents:

{% hint style="warning" %}
You should ultimately replace `<api-key>` with your Alchemy HTTP API key. 
{% endhint %}

```javascript
async function main() {
 const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
 const web3 = createAlchemyWeb3("https://eth-mainnet.alchemyapi.io/<api-key>");
 const blockNumber = await web3.eth.getBlockNumber();
 console.log("The latest block number is " + blockNumber);
}
main();             
```

Unfamiliar with the async stuff? Check out this [Medium post](https://medium.com/better-programming/understanding-async-await-in-javascript-1d81bb079b2c).

### 4. Run it using node

```
node index.js
```

### 5. You should now see the latest block number output in your console! 

```
The latest block number is 11043912
```

Woo! Congrats! You just wrote your first web3 script using Alchemy :tada: 

Once you complete this tutorial, let us know how your experience was or if you have any feedback by tagging us on Twitter [@alchemyplatform](https://twitter.com/AlchemyPlatform)!

_Not sure what to do next? Build upon your skills learned in this tutorial by checking out our beginner's tutorial for _[_sending Ethereum transactions using Web3 and Alchemy_](sending-txs.md)_._
