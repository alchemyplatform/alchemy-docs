---
description: >-
  Learn how to use Alchemy's SDK to query the transfer history of one or
  multiple smart contracts in a single request.
---

# How to get a contract's first transfer event

One of the best ways to study a smart contract is to look at its transfer events. In this tutorial, we will query the very first transfer event of the BAYC smart contract. However, you are welcome to use any contract address you are interested in!

See the following for use cases for retrieving a contract's first transfer event:

* Finding the first addresses to interact with a contract (e.g., the first address to mint a Bored Ape).
* Tracking the first interaction an address had with a smart contract.
* Verifying whether a contract facilitated transfers before a certain date.

{% hint style="info" %}
If you already completed "How to get a contract's last transfer event", you may skip the setup and installation steps.
{% endhint %}

## Install Node.js

Head to [Node.js](https://nodejs.org/en/) and download the LTS version.

You can verify your installation was successful by running `npm -version` in your macOS terminal or Windows command prompt. A successful installation will display a version number, such as:

```
6.4.1
```

## Setup Project Environment

Open VS Code (or your preferred IDE) and enter the following in terminal:

```bash
mkdir contract-transfers
cd contract-transfers
```

Once inside our project directory, initialize npm (node package manager) with the following command:

```bash
npm init
```

Press enter and answer the project prompt as follows:

```json
package name: (contract-transfers)
version: (1.0.0)
description: 
entry point: (index.js)
test command: 
git repository: 
keywords: 
author: 
license: (ISC)
```

Press enter again to complete the prompt. If successful, a `package.json` file will have been created in your directory.

## Install Alchemy's SDK

[Alchemy's SDK](https://docs.alchemy.com/alchemy/sdk/sdk-quickstart#alchemy-sdk-for-javascript) allows us to efficiently interact with Alchemy's endpoints and make JSON-RPC requests.

Ensure you are inside your project folder, then type the following command in terminal:

```bash
npm install @alch/alchemy-sdk
```

## Get Contract's First Transfer Event

In this section, we will use Alchemy's [Transfer API](https://docs.alchemy.com/alchemy/enhanced-apis/transfers-api) to retrieve the contract's first transfer event. The Alchemy SDK allows us to call the [`alchemy_getAssetTransfers`](https://docs.alchemy.com/alchemy/enhanced-apis/transfers-api#alchemy\_getassettransfers-ethereum-mainnet) function and filter transfers by passing in the following object parameters:

| Property            | Description                                                                                                                                                                                                                                                                                                                                                                                | Requirement | Default                |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------- | ---------------------- |
| `fromBlock`         | Indicates from which block the endpoint searches. Inclusive and can be a hex string, integer, or `latest`.                                                                                                                                                                                                                                                                                 | Optional    | `"0x0"`                |
| `toBlock`           | Indicates to which block the endpoint searches. Inclusive and can be a hex string, integer, or `latest`.                                                                                                                                                                                                                                                                                   | Optional    | `latest`               |
| `fromAddress`       | Indicates the sending address in the transaction. Can be a hex string.                                                                                                                                                                                                                                                                                                                     | Optional    | Wildcard - any address |
| `toAddress`         | Indicates the receiving address in the transaction. Can be a hex string.                                                                                                                                                                                                                                                                                                                   | Optional    | Wildcard - any address |
| `contractAddresses` | An array of contact addresses to filter for. **Note:** Only applies to transfers of `token`, `erc20`, `erc721`, and `erc1155`.                                                                                                                                                                                                                                                             | Optional    | Wildcard - any address |
| `category`          | An array of transfer categories. Can be any of the following: `external`, `internal`, `erc20`, `erc721`, or `erc1155`.                                                                                                                                                                                                                                                                     | Required    |                        |
| `excludeZeroValue`  | A boolean to exclude transfers of zero value. A zero value is not the same as `null`.                                                                                                                                                                                                                                                                                                      | Optional    | `true`                 |
| `maxCount`          | The maximum number of results to return per call. **Note**: 1000 is the max per request.                                                                                                                                                                                                                                                                                                   | Optional    | `` 1000 or `0x3e8` ``  |
| `pageKey`           | Use for [pagination](https://app.gitbook.com/o/-MB5OnTtI\_5pcZn7v2wm/s/-MB17w56kk7ZnRMWdqOL/\~/changes/WTZhmfICAlXTSmnAxOTR/enhanced-apis/transfers-api/how-to-get-a-contracts-first-transfer-event#pagination). If more results are available after the response, a `uuid` property will return. You can use this in subsequent requests to retrieve the next 1000 results of `maxCount`. | Optional    |                        |

For reference, here is an example of how the above parameters could be passed into `getAssetTransfers`:

```javascript
getAssetTransfers(alchemy, {
    fromBlock: "0x0",
    toBlock: "latest",
    contractAddresses: ["0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d"],
    excludeZeroValue: true,
    category: ["erc721"],
  });
```

To get started finding a contract's first transfer, let's create a file inside our project folder named `FirstTransfer.js`  and add the following code to utilize the  [`alchemy_getAssetTransfers`](https://docs.alchemy.com/alchemy/enhanced-apis/transfers-api#alchemy\_getassettransfers-ethereum-mainnet)endpoint:

```javascript
const getFirstTransfer = async () => {
  const { initializeAlchemy, getAssetTransfers } = require("@alch/alchemy-sdk");
  // Importing necessary functions from Alchemy's SDK
  const alchemy = initializeAlchemy(); // <-- May pass in an optional settings config to use your own API key
  // Allows us to make requests with our API
  const getTransfers = getAssetTransfers(alchemy, {
   // Calling the getAssetTransfers function and filters using the following parameters
    fromBlock: "0x0",
    contractAddresses: ["0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d"], // You can replace with contract of your choosing
    excludeZeroValue: true,
    category: ["erc721"],
  });
  const allTransfers = await getTransfers;
  // Awaiting the return of our request
  console.log("First Transfer:");
  console.log(allTransfers.transfers[0]);
  // printing the first indexed transfer event to console
};

getFirstTransfer();
```

Above, we created an async function called <mark style="color:red;">`getFirstTransfer`</mark>.  To learn more about how what it does, view the commented notes above.

To use your script, run the following command in your terminal:

```bash
node FirstTransfer.js
```

If successful, you should see the following transfer object in your output:

```javascript
First Transfer:
{
  blockNum: '0xbb933a',
  hash: '0xcfb197f62ec5c7f0e71a11ec0c4a0e394a3aa41db5386e85526f86c84b3f2796',
  from: '0x0000000000000000000000000000000000000000',
  to: '0xaba7161a7fb69c88e16ed9f455ce62b791ee4d03',
  value: null,
  erc721TokenId: '0x0000000000000000000000000000000000000000000000000000000000000000',
  erc1155Metadata: null,
  tokenId: '0x0000000000000000000000000000000000000000000000000000000000000000',
  asset: 'BAYC',
  category: 'erc721',
  rawContract: {
    value: null,
    address: '0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d',
    decimal: null
  }
}
```

Congratulations, you've successfully retrieved the first transfer event in the BAYC contract!

If you enjoyed this tutorial for retrieving a contract's first transfer event, give us a tweet [@AlchemyPlatform](https://twitter.com/AlchemyPlatform)!  And don't forget to join our [Discord server](https://www.alchemy.com/discord) to meet other blockchain devs, builders, and entrepreneurs!&#x20;

