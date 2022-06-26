---
description: >-
  Learn how to use Alchemy's SDK to query the transfer history of one or
  multiple smart contracts in a single request.
---

# How to get a contract's last transfer event

Have you ever wanted to know what's going on under the hood of a smart contract? One way to get insight into how a smart contract is used is to track a contract's transfer events. This allows you to examine how users/addresses interact with it.

In this guide, you will query the last transfer even of the BAYC smart contract, though you may choose another contract of your preference.

The following is a list of potential use cases:

* Create an NFT tracker for reporting on the latest trades.
* Create a DeFi tracker of a particular dex to get the latest transfer info or provide current information.
* Create Crypto Whale Twitter bot.
* Create the transfer history of a particular address or smart contract.
* Build smart contract logic that requires the most up-to-date transfer info.

{% hint style="info" %}
If you already completed "How to get a contract's first transfer event" you may skip the setup and installation steps.
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

[Alchemy's SDK](https://docs.alchemy.com/alchemy/sdk/sdk-quickstart#alchemy-sdk-for-javascript) allows us to more efficiently interact with Alchemy's end points and make JSON-RPC requests.

Ensure you are inside your project folder and type the following command in terminal:

```bash
npm install @alch/alchemy-sdk
```

## Get Contract's Last Transfer Event

In this section, we will use Alchemy's [Transfer API](https://docs.alchemy.com/alchemy/enhanced-apis/transfers-api) to retrieve the contract's last transfer event. The Alchemy SDK allows us to call the [`alchemy_getAssetTransfers`](https://docs.alchemy.com/alchemy/enhanced-apis/transfers-api#alchemy\_getassettransfers-ethereum-mainnet) function and filter transfers by passing in the following object parameters:

| Property            | Description                                                                                                                                                                                                                                                                                                                                                                                | Requirement | Default                |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------- | ---------------------- |
| `fromBlock`         | Indicates from which block the endpoint searches. Inclusive and can be a hex string, integer, or `latest`.                                                                                                                                                                                                                                                                                 | Optional    | `"0x0"`                |
| `toBlock`           | Indicates to which block the endpoint searches. Inclusive and can be a hex string, integer, or `latest`.                                                                                                                                                                                                                                                                                   | Optional    | `latest`               |
| `fromAddress`       | Indicates the sending address in the transaction. Can be a hex string.                                                                                                                                                                                                                                                                                                                     | Optional    | Wildcard - any address |
| `toAddress`         | Indicates the receiving address in the transaction. Can be a hex string.                                                                                                                                                                                                                                                                                                                   | Optional    | Wildcard - any address |
| `contractAddresses` | An array of contract addresses to filter for. **Note:** Only applies to transfers of `token`, `erc20`, `erc721`, and `erc1155`.                                                                                                                                                                                                                                                            | Optional    | Wildcard - any address |
| `category`          | An array of transfer types. Can be any of the following: `external`, `internal`, `erc20`, `erc721`, or `erc1155`.                                                                                                                                                                                                                                                                          | Required    |                        |
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

To get started finding a contract's last transfer, let's create a file inside our project folder named `LastTransfers.js` and add the following code to utilize the  [`alchemy_getAssetTransfers`](https://docs.alchemy.com/alchemy/enhanced-apis/transfers-api#alchemy\_getassettransfers-ethereum-mainnet)endpoint:

```javascript
  const { initializeAlchemy, getAssetTransfers } = require("@alch/alchemy-sdk");
  // Importing necessary functions from Alchemy's SDK
  const alchemy = initializeAlchemy(); // <-- You may pass in an optional settings config to use your own API key
  // Allows us to make requests with our API 
  const getTransfers = getAssetTransfers(alchemy, {
  // Calling the getAssetTransfers function and filtering using the following parameters
    fromBlock: "0x0",
    toBlock: "latest",
    contractAddresses: ["0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d"], // BAYC address
    excludeZeroValue: true,
    category: ["erc721"],
  });
  const firstPage = await getTransfers;
  // Awaiting the return of our request
  const firstPageLength = firstPage.transfers.length;
  // Getting the length of our returned transfers
  console.log(firstPage.transfers[firstPageLength - 1]);
  // Printing the last transfer index from our returned transfers
  let pageKey = firstPage.pageKey;
  if (pageKey) {
    console.log("Page key: " + pageKey);
  } else {
    console.log("Page key: none");
  }
  // Checks to see if a page key exists

```

Above, we created an async function called <mark style="color:red;">`getLastTransfer`</mark>.To learn more about how what it does, view the commented notes above.

To use your script, type the following command in your terminal:

```bash
node LastTransfer.js
```

If successful, you should see the following transfer object in your output:

```javascript
{
  blockNum: '0xbc61b7',
  hash: '0xb74538f871af833485fd3e62c5b53234403628e3be5ae369385ee24bf546f0df',
  from: '0x0000000000000000000000000000000000000000',
  to: '0x7772881a615cd2d326ebe0475a78f9d2963074b7',
  value: null,
  erc721TokenId: '0x00000000000000000000000000000000000000000000000000000000000003b7',
  erc1155Metadata: null,
  tokenId: '0x00000000000000000000000000000000000000000000000000000000000003b7',
  asset: 'BAYC',
  category: 'erc721',
  rawContract: {
    value: null,
    address: '0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d',
    decimal: null
  }
}
Page key: 915e662f-a7ca-4c4f-a5e9-0bbf2c6a53f1
```

If your output includes a `page key`, you can use the value for pagination in subsequent requests. If you've received the latest transfer event, your result will not include a page key and reads as:

```
Page key: none
```

In that scenario, congratulations, you've successfully queried some of the latest transfer events!

However, in our case, we did receive a uuid page key. This is because the BAYC contract contains more than 1000 transfer events (the maximum allowed per `getAssetTransfers` request). To learn more about how to use page keys, continue on to the following section.

## Use Page Keys

To account for potential page keys, we will create a loop to check whether `getAssetTransfer` returns a page key. If it does, the loop will continuously call `getAssetTransfers` until a page key no longer returns.

To do this, we need to reorganize our code to make room for the while loop. Remove lines 18-25 of `LastTransfer.js`:

```javascript
const getLastTransfer = async () => {
  const { initializeAlchemy, getAssetTransfers } = require("@alch/alchemy-sdk");
  const alchemy = initializeAlchemy();
  const getTransfers = getAssetTransfers(alchemy, {
    fromBlock: "0x0",
    toBlock: "latest",
    contractAddresses: ["0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d"],
    excludeZeroValue: true,
    category: ["erc721"],
  });
  const firstPage = await getTransfers;
  // *** remove these lines ***
  const firstPageLength = firstPage.transfers.length;
  console.log(firstPage.transfers[firstPageLength - 1]);
  let pageKey = firstPage.pageKey;
  if (pageKey) {
    console.log("Page key: " + pageKey);
  } else {
    console.log("Page key: none");
  }
  // *** ^^^^^^^^^^^^^^^^^^ ***
};

getLastTransfer();
```

&#x20;Now, replace lines 18-25 with the following code block:

```javascript
 let pageKey = firstPage.pageKey;
 // creating a page key variable using let, which will allow us to redefine it within our while loop later.
 try {
    if (pageKey) {
      let counter = 0;
      // optional counter variable we can count how many times our loop will run.
      while (pageKey) {
      // creating a while loop that will run only when getAssetTransfers returns a page key.
        const nextKey = getAssetTransfers(alchemy, {
          fromBlock: "0x0",
          toBlock: "latest",
          contractAddresses: ["0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d"],
          excludeZeroValue: true,
          category: ["erc721"],
          pageKey: pageKey.toString(),
          //Passing the page key into the function as a string.
        });
        const nextPage = await nextKey;
        pageKey = nextPage.pageKey;
        // calling getAssetTransfers and setting our pageKey variable equal to the newly returned page key.
        if (pageKey) {
          counter += 1;
          console.log("Request #" + counter + " made!");
          continue;
          // if our new request still contains a page key, we loop again.
        } else {
          const nextPageLength = nextPage.transfers.length;
          const transferCount = counter * 1000 + nextPageLength; // Optional transfer counter. We multiply our count by 1000 because each page contains 1000 transfers, then add the length of the final page returned.
          console.log("Last BAYC token transfer(#" + transferCount + "):");
          console.log(nextPage.transfers[nextPageLength - 1]);
          break;
          // if our new request doesn't contain a page key, we get the last transfer on the final page we were returned giving us the latest transfer event.
        }
      }
    } else if (pageKey === undefined) {
    // If the first request did not include a page key, then we print the final transfer as we did previously in the tutorial.
      const firstPageLength = firstPage.transfers.length;
      console.log(firstPage.transfers[firstPageLength - 1]);
    }
  } catch (err) {
    console.log("Something went wrong with your request: " + err);
  }
```

{% hint style="success" %}
**Tip:** To dive into the loop's details, check out the commented code above.
{% endhint %}

Your entire `LastTransfer.js` script should look like this:

```javascript
const getLastTransfer = async () => {
  const { initializeAlchemy, getAssetTransfers } = require("@alch/alchemy-sdk");
  const alchemy = initializeAlchemy();
  const getTransfers = getAssetTransfers(alchemy, {
    fromBlock: "0x0",
    toBlock: "latest",
    contractAddresses: ["0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d"],
    excludeZeroValue: true,
    category: ["erc721"],
  });
  const firstPage = await getTransfers;
  let pageKey = firstPage.pageKey;
  try {
    if (pageKey) {
      let counter = 0;
      while (pageKey) {
        const nextKey = getAssetTransfers(alchemy, {
          fromBlock: "0x0",
          toBlock: "latest",
          contractAddresses: ["0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d"],
          excludeZeroValue: true,
          category: ["erc721"],
          pageKey: pageKey.toString(),
        });
        const nextPage = await nextKey;
        pageKey = nextPage.pageKey;
        if (pageKey) {
          counter += 1;
          console.log("Request #" + counter + " made!");
          continue;
        } else {
          const nextPageLength = nextPage.transfers.length;
          const transferCount = counter * 1000 + nextPageLength;
          console.log("Last BAYC token transfer(#" + transferCount + "):");
          console.log(nextPage.transfers[nextPageLength - 1]);
          break;
        }
      }
    } else if (pageKey === undefined) {
      const firstPageLength = firstPage.transfers.length;
      console.log(firstPage.transfers[firstPageLength - 1]);
    }
  } catch (err) {
    console.log("Something went wrong with your request: " + err);
  }
};

getLastTransfer();
```

To test our script, run the following code in your terminal:

```bash
node LastTransfer.js
```

If successful, your script should log each request:

```javascript
Request #1 made!
Request #2 made!
Request #3 made!
...
```

Once your script loops through the contract's entire transfer history, you should see an output similar to the following:

```javascript
...
Request #73 made!
Request #74 made!
Request #75 made!
Last BAYC token transfer(#75016):
{
  blockNum: '0xe4f531',
  hash: '0x9363b1b2fa0808183e713c49fd9e2720e8a1592aeae13ecb899cac4a67b8d2c0',
  from: '0x86018f67180375751fd42c26c560da2928e2b8d2',
  to: '0x3bad83b5e9a026774f3928d1f27d9d6c0590da85',
  value: null,
  erc721TokenId: '0x00000000000000000000000000000000000000000000000000000000000000c0',
  erc1155Metadata: null,
  tokenId: '0x00000000000000000000000000000000000000000000000000000000000000c0',
  asset: 'BAYC',
  category: 'erc721',
  rawContract: {
    value: null,
    address: '0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d',
    decimal: null
  }
}
```

Hooray! You have successfully used pagination to get the latest transfer of the BAYC contract!

If you enjoyed this tutorial for retrieving a contract's latest transfer event, give us a tweet [@AlchemyPlatform](https://twitter.com/AlchemyPlatform)!  And don't forget to join our [Discord server](https://www.alchemy.com/discord) to meet other blockchain devs, builders, and entrepreneurs!&#x20;

