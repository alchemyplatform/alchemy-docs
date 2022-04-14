---
description: >-
  In one request, fetch all ERC-721 and ERC-1155 NFTs minted by a given Ethereum
  address, user or contract, over any time period.
---

# How to get NFTs minted by an address

Some of the reasons why you'd want to get NFTs minted by an address include:

* Displaying all NFTs minted by a user (created and sent to their address)
* Displaying all NFTs minted by a contract (shows you how many have been created)
* Understand  ****  which NFTs were "first owned" or originally minted by a given address&#x20;

Surprisingly, this type of information is not easy to gather with the current [Ethereum API](../../apis/ethereum/). That's why Alchemy builds a higher level [Enhanced APIs](broken-reference) to make building in Web3 much easier.&#x20;

In this tutorial, we'll be leveraging Alchemy's [Transfers API ](../transfers-api.md)(`alchemy_getAssetTransfers`) to fetch all NFTs minted by a particular account address.

## **What happens when NFTs are minted?**

Under the hood, when an NFT is minted, it is transferred from the [null **** address](https://etherscan.io/address/0x0000000000000000000000000000000000000000): 0x0000000000000000000000000000000000000000 to the user account or contract that minted it.

All token **creations** and **destructions** typically are **from** and **to** the null address respectively, so it's a good filter when looking for mint or burn events.&#x20;

This on-chain minting emits a standard [transfer event](../transfers-api.md#what-are-transfers) since the asset is being _transferred_ from one account to another.&#x20;

Since we can filter for transfer events using the [Transfers API](../transfers-api.md), we can easily fetch NFT mints with the right parameter specification!

## How to get NFT Mint Events

In order to fetch NFTs minted by a given address we'll need to specify a few things in our [`alchemy_getAssetTransfers`](../transfers-api.md#alchemy\_getassettransfers-ethereum-mainnet) request:

* `fromAddress`: where the transaction originated from, in our case that’s always 0x0000000000000000000000000000000000000000
* `toAddress`: the address we want to see mints from (NFTs go **to** the address that minted them)
* `fromBlock`: the starting time range we want to fetch NFT mints over (defaults to `latest`)
* `toBlock` : the ending time range we want to fetch NFT mints over (defaults to `latest`)
* `category` : the type of transfer events we care about, in our case we want to see NFTs which are ERC721 and ERC1155 events&#x20;

Once we've specified these inputs we can send the request!&#x20;

## **Example: Getting NFT Mint Events**&#x20;

To demonstrate how to get the NFT mint events from an address we're going to walk through an example using address [0x5c43B1eD97e52d009611D89b74fA829FE4ac56b1](https://etherscan.io/address/0x5c43B1eD97e52d009611D89b74fA829FE4ac56b1) and get all NFT mint events from block 0 to latest.&#x20;

{% hint style="success" %}
### **No-code Example**

For a no-code demonstration of this request, check out Alchemy's [Composer tool](https://composer.alchemyapi.io/?composer\_state=%7B%22chain%22%3A0%2C%22network%22%3A0%2C%22methodName%22%3A%22alchemy\_getAssetTransfers%22%2C%22paramValues%22%3A%5B%7B%22excludeZeroValue%22%3Atrue%2C%22fromBlock%22%3A%220x0%22%2C%22toBlock%22%3A%22latest%22%2C%22fromAddress%22%3A%220x0000000000000000000000000000000000000000%22%2C%22toAddress%22%3A%220x5c43B1eD97e52d009611D89b74fA829FE4ac56b1%22%2C%22category%22%3A%5B%22external%22%2C%22erc721%22%2C%22erc1155%22%5D%7D%5D%7D)!
{% endhint %}

&#x20;Follow along with any of the code examples below to make the request.&#x20;

{% tabs %}
{% tab title="Alchemy Web3.js (Recommended)" %}
Check out the complete script at the GitHub Repo below, or follow along with the instructions to write the script from scratch.

{% embed url="https://github.com/alchemyplatform/transfers_api_javascript_scripts/blob/main/javascript/alchemyweb3/nft-mints/nft-mints-alchemyweb3.js" %}
NFT Mints GitHub Repo
{% endembed %}

**1. Install** [**AlchemyWeb3.js**](https://github.com/alchemyplatform/alchemy-web3)****

If you don't already have AlchemyWeb3.js installed, you can follow the instructions [here](https://github.com/alchemyplatform/alchemy-web3).

#### 2. Create a file for the script

In your current directory, create a new file called `nft-mints-alchemyweb3.js`

Use your favorite file browser, code editor, or just directly in the terminal using the `touch` command like this:

```javascript
touch nft-mints-alchemyweb3.js
```

#### 3. Write script!

Copy and paste in the following code snippet into your new file: `nft-mints-alchemyweb3.js`

{% code title="nft-mints-alchemyweb3.js" %}
```javascript
import { createAlchemyWeb3 } from "@alch/alchemy-web3";

// Replace with your Alchemy API key:
const apiKey = "demo";

// Address we want get NFT mints from
const toAddress = "0x5c43B1eD97e52d009611D89b74fA829FE4ac56b1";

// Initialize an alchemy-web3 instance:
const web3 = createAlchemyWeb3(
  `https://eth-mainnet.alchemyapi.io/v2/${apiKey}`,
);

const res = await web3.alchemy.getAssetTransfers({
  fromBlock: "0x0",
  fromAddress: "0x0000000000000000000000000000000000000000",
  toAddress: toAddress,
  excludeZeroValue:true,
  category: ["erc721","erc1155"]
})

// Print contract address and tokenId for each NFT (ERC721 or ERC1155):
for (const events of res.transfers) {
    if (events.erc1155Metadata == null) {
      console.log("ERC-721 Token Minted: ID- ", events.tokenId, " Contract- ", events.rawContract.address);
    }
    else{
      for (const erc1155 of events.erc1155Metadata) {
      console.log("ERC-1155 Token Minted: ID- ", erc1155.tokenId, " Contract- ", events.rawContract.address);
      }
    }
}
```
{% endcode %}

####

#### 3. Run script!

Now, on your command line, you can run the script by calling:

```javascript
node nft-mints-alchemyweb3.js
```
{% endtab %}

{% tab title="Node-Fetch" %}
If you're using [`node-fetch`](https://www.npmjs.com/package/node-fetch) a lightweight, common module that brings the Fetch API to Node.js and allows us to make our HTTP requests, below is a code snippet for the request you'd make!

{% embed url="https://github.com/alchemyplatform/transfers_api_javascript_scripts/blob/main/javascript/fetch/nft-mints/nft-mints-fetch.js" %}
NFT Mints GitHub Repo
{% endembed %}

#### 1. Create a file.

In your current directory, create a new file called `nft-mints-fetch.js` using your favorite file browser, code editor, or just directly in the terminal using the `touch` command like this:

```
touch nft-mints-fetch.js
```

####

#### 2. Write script!

Copy and paste in the following code snippet into your new file: `nft-mints-fetch.js`=

{% code title="nft-mints-fetch.js" %}
```javascript
import fetch from 'node-fetch';

  // Replace with your Alchemy API key:
  const apiKey = "demo"
  const baseURL = `https://eth-mainnet.alchemyapi.io/v2/${apiKey}`;
  const fetchURL = `${baseURL}`;

  // Address we want get NFT mints from
  const toAddress = "0x5c43B1eD97e52d009611D89b74fA829FE4ac56b1";

  let data = JSON.stringify({
  "jsonrpc": "2.0",
  "id": 0,
  "method": "alchemy_getAssetTransfers",
  "params": [
    {
      "fromBlock": "0x0",
      "fromAddress": "0x0000000000000000000000000000000000000000",
      "toAddress": toAddress,
      "excludeZeroValue":true,
      "category": ["erc721","erc1155"]
    }
  ]
});


  var requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: data,
    redirect: 'follow'
  };

  fetch(fetchURL, requestOptions)
    .then((res) => {
      return res.json()
    })
    .then((jsonResponse) => {
      //Print token name / asset value
      //console.log(jsonResponse)
      for (const events of jsonResponse.result.transfers) {
          if (events.erc1155Metadata == null) {
            console.log("ERC-721 Token Minted: ID- ", events.tokenId, " Contract- ", events.rawContract.address);
          }
          else{
            for (const erc1155 of events.erc1155Metadata) {
            console.log("ERC-1155 Token Minted: ID- ", erc1155.tokenId, " Contract- ", events.rawContract.address);
            }
          }
      }
    })
    .catch((err) => {
      // handle error
      console.error(err);
    });

```
{% endcode %}



#### 3. Run script!

Now, on your command line, you can execute the script by calling:

```javascript
node nft-mints-fetch.js
```
{% endtab %}

{% tab title="Axios" %}
If you're using Javascript [`axios`](https://www.axios.com), a promise-based HTTP client for the browser and Node.js which allows us to make a raw request to the Alchemy API, below is a code snippet for the request you'd make!

{% embed url="https://github.com/alchemyplatform/transfers_api_javascript_scripts/blob/main/javascript/axios/nft-mints/nft-mints-axios.js" %}
NFT Mints GitHub Repo
{% endembed %}

#### 1. Create a file.

In your current directory, create a new file called `nft-mints-axios.js` using your favorite file browser, code editor, or just directly in the terminal using the `touch` command.&#x20;

```
touch nft-mints-axios.js
```

####

#### 2. Write script!

Copy and paste in the following code snippet into your new file: `nft-mints-axios.js`

{% code title="nft-mints-axios.js" %}
```javascript
import axios from 'axios';

  // Replace with your Alchemy API key:
  const apiKey = "demo"
  const baseURL = `https://eth-mainnet.alchemyapi.io/v2/${apiKey}`;
  const axiosURL = `${baseURL}`;

  // Address we want get NFT mints from
  const toAddress = "0x5c43B1eD97e52d009611D89b74fA829FE4ac56b1";

  let data = JSON.stringify({
  "jsonrpc": "2.0",
  "id": 0,
  "method": "alchemy_getAssetTransfers",
  "params": [
    {
      "fromBlock": "0x0",
      "fromAddress": "0x0000000000000000000000000000000000000000",
      "toAddress": toAddress,
      "excludeZeroValue":true,
      "category": ["erc721","erc1155"]
    }
  ]
});


  var requestOptions = {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data: data,
  };

  const res = await axios(axiosURL, requestOptions);

  // Print contract address and tokenId for each NFT:
  for (const events of res.data.result.transfers) {
      if (events.erc1155Metadata == null) {
        console.log("ERC-721 Token Minted: ID- ", events.tokenId, " Contract- ", events.rawContract.address);
      }
      else{
        for (const erc1155 of events.erc1155Metadata) {
        console.log("ERC-1155 Token Minted: ID- ", erc1155.tokenId, " Contract- ", events.rawContract.address);
        }
      }
  }
```
{% endcode %}

####

#### 3. Run script!

Now, on your command line, you can execute the script by calling:

```javascript
node nft-mints-axios.js
```
{% endtab %}
{% endtabs %}

## How to process the API response

Now that we have made a query and can see the response, let's learn how to handle the returned data.

### Raw API Response:

Without parsing the response, we have a console log that looks like this:

```javascript
{
  [
  {
    "blockNum": "0xc75329",
    "hash": "0xd89b54cb5aca6f501d43ee3363dcc892d31d1c185c9059c22d686ca0a1b93314",
    "from": "0x0000000000000000000000000000000000000000",
    "to": "0x5c43b1ed97e52d009611d89b74fa829fe4ac56b1",
    "value": null,
    "erc721TokenId": "0x0000000000000000000000000000000000000000000000000000000000000012",
    "erc1155Metadata": null,
    "tokenId": "0x0000000000000000000000000000000000000000000000000000000000000012",
    "asset": "BURN",
    "category": "erc721",
    "rawContract": {
      "value": null,
      "address": "0x18a808dd312736fc75eb967fc61990af726f04e4",
      "decimal": null
    }
  },
  ...
  {
    "blockNum": "0xd8315a",
    "hash": "0x270aa9026d69b0924341e0ce60b24182f1f2af8a4bcc752b8e65595bdeca565f",
    "from": "0x0000000000000000000000000000000000000000",
    "to": "0x5c43b1ed97e52d009611d89b74fa829fe4ac56b1",
    "value": null,
    "erc721TokenId": "0x00000000000000000000000000000000000000000000000000000000000000fb",
    "erc1155Metadata": null,
    "tokenId": "0x00000000000000000000000000000000000000000000000000000000000000fb",
    "asset": null,
    "category": "erc721",
    "rawContract": {
      "value": null,
      "address": "0x947600ad1ad2fadf88faf7d30193d363208fc76d",
      "decimal": null
    }
  }
]
}
```

### Understanding API Response:

Below are the components of the each transfer in our response.&#x20;

* `blockNum`: the block number where an NFT mint event occurred, in `hex`&#x20;
* `hash`: the transaction hash of NFT minting transaction
* `from`: where the transaction originated from, in our case that’s always 0x0000000000000000000000000000000000000000
* `to`: the address we want to see mints from (NFTs go to **** the address that minted them), should be the same address specified in our request
* `value`:  the amount of ETH transferred, should always be `null` in our case since we're only looking at NFT mints, not sales&#x20;
* `erc721TokenId`: the ERC721 token ID. `null` if not an ERC721 token transfer.
* `erc1155Metadata`: a list of objects containing the ERC1155 `tokenId`  and `value`. `null` if not an ERC1155 transfer
* `tokenId`: the token ID for ERC721 tokens or other NFT token standards&#x20;
* `asset`: `ETH` or the token's symbol. `null` if not defined in the contract and not available from other sources.
* `rawContract`
  * `value`: `null` since we're looking at ERC721 & ERC1155 transfer
  * `address`: NFT contract address
  * `decimal`:  `null`

### Printing out the token `type`, `tokenId` and contract `address`&#x20;

There's lots of information we can pull from this response. One example you may be interested in displaying are: NFT contract standard (`ERC721` or `ERC1155`), `contractAddress`, and `tokenId`

With our queried response saved as a JSON object, we can index through the transfers. In particular, we first access the transfers list and then iterate accross a few key parameters: `erc1155Metadata` , `tokenId`, and `rawContract`.&#x20;

The steps we want to take are:

1. Loop through all transfers in the result
2. Check whether the returned transfer is ERC1155 or not
   1. If so, loop through tokens within ERC1155
      1. print `tokenId` and `address` for each
   2. If not, assume transfer is ERC721
      1. print `tokenID` of contract and address&#x20;

{% code title="nft-mints.js" %}
```javascript
  for (const events of res.data.result.transfers) {
      if (events.erc1155Metadata == null) {
        console.log("ERC-721 Token Minted: ID- ", events.tokenId, " Contract- ", events.rawContract.address);
      }
      else{
        for (const erc1155 of events.erc1155Metadata) {
        console.log("ERC-1155 Token Minted: ID- ", erc1155.tokenId, " Contract- ", events.rawContract.address);
        }
      }
  }
```
{% endcode %}

If you followed along, your response should look like the following:

```python
ERC-721 Token Minted: ID-  0x0000000000000000000000000000000000000000000000000000000000000012  Contract-  0x18a808dd312736fc75eb967fc61990af726f04e4
ERC-721 Token Minted: ID-  0x000000000000000000000000000000000000000000000000000000000000003c  Contract-  0x82c7c02a52b75387db14fa375938496cbb984388
ERC-721 Token Minted: ID-  0x000000000000000000000000000000000000000000000000000000000000004d  Contract-  0x82c7c02a52b75387db14fa375938496cbb984388
ERC-721 Token Minted: ID-  0x0000000000000000000000000000000000000000000000000000000000000348  Contract-  0x7ecb204fed7e386386cab46a1fcb823ec5067ad5
ERC-721 Token Minted: ID-  0x0000000000000000000000000000000000000000000000000000000000000349  Contract-  0x7ecb204fed7e386386cab46a1fcb823ec5067ad5
ERC-721 Token Minted: ID-  0x000000000000000000000000000000000000000000000000000000000000034a  Contract-  0x7ecb204fed7e386386cab46a1fcb823ec5067ad5
ERC-1155 Token Minted: ID-  0x01  Contract-  0xc4c377565a4b9eb6e657c2422bd33b6e4859b041
ERC-721 Token Minted: ID-  0x0000000000000000000000000000000000000000000000000000000000000b6e  Contract-  0x72d47d4d24018ec9048a9b0ae226f1c525b7e794
ERC-721 Token Minted: ID-  0x000000000000000000000000000000000000000000000000000000000000026d  Contract-  0x947600ad1ad2fadf88faf7d30193d363208fc76d
ERC-721 Token Minted: ID-  0x00000000000000000000000000000000000000000000000000000000000000fb  Contract-  0x947600ad1ad2fadf88faf7d30193d363208fc76d
```

And that's it! You've now learned how to fetch NFT mints for an address on Ethereum!\
\
If you enjoyed this tutorial for getting address transaction history on Ethereum, give us a tweet [@AlchemyPlatform](https://twitter.com/AlchemyPlatform)!  (Or give the author [@crypt0zeke](https://twitter.com/crypt0zeke) a shoutout!)

Also, join our [Discord server](https://www.alchemy.com/discord) to meet other blockchain devs, builders, and entrepreneurs!&#x20;
