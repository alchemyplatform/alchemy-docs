---
description: Guide for sending transactions using EIP-1559 methods
---

# ⛽ How to Send Transactions with EIP 1559

The London Hardfork introduced a new EIP that modifies how gas estimation and costs work for transactions on Ethereum.

This tutorial will walk you through both the legacy and new ([EIP-1559](https://blog.alchemy.com/blog/eip-1559)) way to estimate gas and send transactions. To learn more about EIP-1559, check out [this blog post](https://blog.alchemy.com/blog/eip-1559).

## How sending transactions used to work <a href="how-sending-transactions-used-to-work" id="how-sending-transactions-used-to-work"></a>

When you submitted a transaction you also sent a [`gasPrice`](../../apis/ethereum/eth\_gasprice.md), which is an amount you are offering to pay per gas consumed. You probably called [`eth_estimateGas`](../../apis/ethereum/eth\_estimategas.md) and [`eth_gasPrice`](../../apis/ethereum/eth\_gasprice.md) in order to determine an approximate amount that the transaction was going to cost you. Then, when you submitted the transaction, miners could decide to include it or not based on your `gasPrice` bid. Miners would prioritize the highest gas prices.

## How sending transactions work with EIP 1559 <a href="how-sending-transactions-work-with-eip-1559" id="how-sending-transactions-work-with-eip-1559"></a>

It's a similar concept, but with a few incentive changes in order to more closely align user and miner interests. The total fee (gas \* gasPrice) will be split into a `baseFee` and a `priorityFee`. Every transaction needs to pay the base fee, which is calculated based on how full the previous block was. Transactions can also offer the miner a `priorityFee` to incentivize the miner to include the transaction in the block.

I won't go into the incentive model here, if you want to dive into that check out [this blog post](https://blog.alchemy.com/blog/eip-1559).

## Let's send a transaction <a href="lets-send-a-transaction" id="lets-send-a-transaction"></a>

First, let's send a legacy (non EIP 1559 transaction). The steps below are:

1. Estimate the gas of our call
2. Get an estimate on what the price per gas should be
3. Send the transaction.

This example uses [Alchemy's web3 wrapper](https://github.com/alchemyplatform/alchemy-web3).

```javascript
require("dotenv").config();
const AlchemyWeb3 = require("@alch/alchemy-web3");

const { API_URL_HTTP_PROD_RINKEBY, PRIVATE_KEY, ADDRESS } = process.env;
const toAddress = "0x31B98D14007bDEe637298086988A0bBd31184523";
const web3 = AlchemyWeb3.createAlchemyWeb3(API_URL_HTTP_PROD_RINKEBY);

async function signTx(web3, fields = {}) {
  const nonce = await web3.eth.getTransactionCount(ADDRESS, 'latest');

  const transaction = {
   'nonce': nonce,
   ...fields,
  };

  return await web3.eth.accounts.signTransaction(transaction, PRIVATE_KEY);
}

async function sendTx(web3, fields = {}) {
  const signedTx = await signTx(web3, fields);

  web3.eth.sendSignedTransaction(signedTx.rawTransaction, function(error, hash) {
    if (!error) {
      console.log("Transaction sent!", hash);
      const interval = setInterval(function() {
        console.log("Attempting to get transaction receipt...");
        web3.eth.getTransactionReceipt(hash, function(err, rec) {
          if (rec) {
            console.log(rec);
            clearInterval(interval);
          }
        });
      }, 1000);
    } else {
      console.log("Something went wrong while submitting your transaction:", error);
    }
  });
}

function sendLegacyTx(web3) {
  web3.eth.estimateGas({
    to: toAddress,
    data: "0xc6888fa10000000000000000000000000000000000000000000000000000000000000003"
  }).then((estimatedGas) => {
    web3.eth.getGasPrice().then((price) => {
      sendTx(web3, {
        gas: estimatedGas,
        gasPrice: price,
        to: toAddress,
        value: 100,
      });
    });
  });
}

sendLegacyTx(web3);
```

Your existing code probably looks somewhat different, but the idea is the same. Here is the output:

```
Transaction sent! 0x8612c1c1a20e2f2512df43f62d3b1f91bfc86c577a72dc1b7d3ad0cc49bb97a8
Attempting to get transaction receipt...
Attempting to get transaction receipt...
Attempting to get transaction receipt...
Attempting to get transaction receipt...
Attempting to get transaction receipt...
Attempting to get transaction receipt...
Attempting to get transaction receipt...
{
  transactionHash: '0x8612c1c1a20e2f2512df43f62d3b1f91bfc86c577a72dc1b7d3ad0cc49bb97a8',
  blockHash: '0x930486f72436f6e8203474794f2dbbdee42c57846e848f54e75fd0a02103cea6',
  blockNumber: 9058813,
  contractAddress: null,
  cumulativeGasUsed: 1849069,
  effectiveGasPrice: '0x3b9aca08',
  from: '0x52b9234231d1459aaa6a9f79e7b7af7464c4f587',
  gasUsed: 21000,
  logs: [],
  logsBloom: '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
  status: true,
  to: '0x31b98d14007bdee637298086988a0bbd31184523',
  transactionIndex: 14,
  type: '0x0'
}
```

## Using EIP-1559 with Minimal changes <a href="using-eip-1559-with-minimal-changes" id="using-eip-1559-with-minimal-changes"></a>

The smallest possible change we can make to the original code is to simply remove the `gasPrice` field on the transaction. So our calling code will look like this:

```javascript
function sendMinimalLondonTx(web3) {
  web3.eth.estimateGas({
    to: toAddress,
    data: "0xc6888fa10000000000000000000000000000000000000000000000000000000000000003"
  }).then((estimatedGas) => {
    sendTx(web3, {
      gas: estimatedGas,
      to: toAddress,
      value: 100,
    });
  });
}

sendMinimalLondonTx(web3);
```

In this case Alchemy will fill in reasonable defaults for the new London transaction fields. Notice how we have removed the `getGasPrice` call. The output looks pretty similar:

```
Transaction sent! 0xb49dbe2ae38664f3881c33ad067d30fb27717709d800b0b87fd9d4a57479a775
Attempting to get transaction receipt...
Attempting to get transaction receipt...
Attempting to get transaction receipt...
Attempting to get transaction receipt...
Attempting to get transaction receipt...
{
  blockHash: '0x87ff71d0431cc4e271b44f72a0aa235822c35ee20e8eb8ebaf64916141ce7a91',
  blockNumber: 9058915,
  contractAddress: null,
  cumulativeGasUsed: 583419,
  effectiveGasPrice: '0x3b9aca08',
  from: '0x52b9234231d1459aaa6a9f79e7b7af7464c4f587',
  gasUsed: 21000,
  logs: [],
  logsBloom: '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
  status: true,
  to: '0x31b98d14007bdee637298086988a0bbd31184523',
  transactionHash: '0xb49dbe2ae38664f3881c33ad067d30fb27717709d800b0b87fd9d4a57479a775',
  transactionIndex: 9,
  type: '0x0'
}
```

## Add maxPriorityFeePerGas field only <a href="add-max-priority-fee-per-gas-field-only-recommended" id="add-max-priority-fee-per-gas-field-only-recommended"></a>

The closest analogy to the `gas`:`gasPrice` combination is `gas`:`maxPriorityFeePerGas`. Since the baseFee needs to be paid regardless, we can just submit a bid on the "tip" for the miner. Our calling code becomes:

```javascript
function sendOnlyMaxPriorityFeePerGasLondonTx(web3) {
  web3.eth.estimateGas({
    to: toAddress,
    data: "0xc6888fa10000000000000000000000000000000000000000000000000000000000000003"
  }).then((estimatedGas) => {
    web3.eth.getMaxPriorityFeePerGas().then((price) => {
      sendTx(web3, {
        gas: estimatedGas,
        maxPriorityFeePerGas: price,
        to: toAddress,
        value: 100,
      });
    });
  });
}

sendOnlyMaxPriorityFeePerGasLondonTx(web3);
```

Note that we have substituted the `web3.eth.getGasPrice()` call in the legacy code with `web3.eth.getMaxPriorityFeePerGas()`. I won't bore you with the output, it looks the same. The [`eth_maxPriorityFeePerGas`](../../apis/ethereum/eth\_maxpriorityfeepergas.md) method is documented [here](https://docs.alchemy.com/alchemy/documentation/apis/ethereum#eth\_maxpriorityfeepergas).

## Add maxFeePerGas field only (a la [Eth Gas Station](https://ethgasstation.info)) <a href="viewing-the-base-fee" id="viewing-the-base-fee"></a>

If you are accustomed to using a fee estimator like Eth Gas Station then instead of providing only the tip you will provide only the `maxFeePerGas` field, which is the base fee plus tip. You can take the output of your API call to Eth Gas Station or another estimator and plug it in like so:

```
web3.eth.estimateGas({
  to: toAddress,
  data: "0xc6888fa10000000000000000000000000000000000000000000000000000000000000003"
}).then((estimatedGas) => {
  ethGasStationCall().then((price) => {
    sendTx(web3, {
      gas: estimatedGas,
      maxFeePerGas: price,
      to: toAddress,
      value: 100,
    });
  });
});
```

## Viewing the baseFee <a href="viewing-the-base-fee" id="viewing-the-base-fee"></a>

When you send an EIP 1559 transaction you will _always_ be charged the `baseFee`. You can view the baseFee for the current block with:

```javascript
web3.eth.getBlock("pending").then((block) => console.log(block.baseFeePerGas));
```

Which returns a hex:

```
0x8
```

## Building a more sophisticated estimate of maxPriorityFeePerGas <a href="building-a-more-sophisticated-estimate-of-max-priority-fee-per-gas" id="building-a-more-sophisticated-estimate-of-max-priority-fee-per-gas"></a>

Alchemy has exposed the [`eth_maxPriorityFeePerGas`](../../apis/ethereum/eth\_maxpriorityfeepergas.md) method so that you can pretty much call that and not worry too much about fee calculations. However you might want to make your own calculations, similar to how you might currently offer a "low", "medium", and "high" fee (like what [Eth Gas Station](https://ethgasstation.info) offers). To do this, you can use the [`eth_feeHistory`](../../apis/ethereum/eth\_feehistory.md) API, which returns detailed information on historical fees for blocks, allowing you to build a better estimate. We will not go into detail on that here.

**If you're interested in learning more, or have feedback, suggestions, or questions, reach out to us in** [**Discord**](https://alchemy.com/discord)**! Get started with Alchemy today by** [**signing up for free**](https://alchemy.com/?r=affiliate:5494a54b-6ae1-4d33-9016-c331c0dcdc1f)**.**
