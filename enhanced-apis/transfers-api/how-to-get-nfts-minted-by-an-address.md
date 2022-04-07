---
description: >-
  Learn how to get a list of ERC-721 and ERC-1155 NFT mints for a user address
  in a single request.
---

# How to get NFTs minted by an address

**In this tutorial, we’ll be using Alchemy’s** [**Transfers API** ](../transfers-api.md)**to fetch all NFTs minted by a particular account address.**

Developers and NFT enthusiasts alike often seek to find NFTs minted by influencers or to compile analyses of NFTs minted over time. Beyond data analytics, this functionality allows NFT marketplaces and websites to filter by NFTs originally minted by the current owner, giving customers a more feature-rich experience!\
\
Without simple API endpoints like the [Alchemy Transfers API](../transfers-api.md), this data compilation process can be quite challenging.

## **Detecting NFT Mint Events**

1. [Select an address for finding NFT mints](how-to-get-nfts-minted-by-an-address.md#1.-select-an-address-for-finding-nft-mints)\
   This address can be a contract address or a user-owned address and will be used in the _**to**_** ** parameter in our request
2.  [Pick a block range for your query](how-to-get-nfts-minted-by-an-address.md#2.-pick-a-block-range-for-your-query)

    Set the `fromBlock` and `toBlock` for our transaction history range, this will specify the time period we want to get transactions over&#x20;
3. [Specify/filter for only ERC-721 and ERC-1155 NFT minting events](how-to-get-nfts-minted-by-an-address.md#3.-specify-filter-for-only-erc-721-and-erc-1155-nft-minting-events)\
   We can filter transactions by external, internal, or token type. In this example, we only want to see NFT data. Learn more about transfer types [here](https://docs.alchemy.com/alchemy/enhanced-apis/transfers-api#types-of-transfers)!&#x20;
4.  [Send API request!](how-to-get-nfts-minted-by-an-address.md#4.-send-api-request)

    Check the [Composer tool](https://composer.alchemyapi.io/?composer\_state=%7B%22chain%22%3A0%2C%22network%22%3A0%2C%22methodName%22%3A%22alchemy\_getAssetTransfers%22%2C%22paramValues%22%3A%5B%7B%22excludeZeroValue%22%3Atrue%2C%22fromBlock%22%3A%220x0%22%2C%22toBlock%22%3A%22latest%22%2C%22fromAddress%22%3A%220x0000000000000000000000000000000000000000%22%2C%22toAddress%22%3A%220x5c43B1eD97e52d009611D89b74fA829FE4ac56b1%22%2C%22category%22%3A%5B%22external%22%2C%22erc721%22%2C%22erc1155%22%5D%7D%5D%7D) to see the request from the browser
5. [Decoding API response](how-to-get-nfts-minted-by-an-address.md#5.-decoding-api-response)

For more detailed information on the [Alchemy Transfers API](https://docs.alchemy.com/alchemy/enhanced-apis/transfers-api), please refer to its [docs page](../transfers-api.md)!

## **Using the** [**Transfers API**](../transfers-api.md) **to get NFT Minting Events**

Before using the [Transfers API](../transfers-api.md) for querying a user’s NFT mints, here's a quick recap on what the API is doing behind the scenes.&#x20;

When an NFT is minted by a user, it is transferred from the address: 0x0000000000000000000000000000000000000000, where all NFT mints on Ethereum originate from, to the user's address. This on-chain minting emits a standard [transfer event](https://docs.alchemy.com/alchemy/enhanced-apis/transfers-api#types-of-transfers) since the asset has traveled from one account to another. Then, with the [Transfers API](../transfers-api.md), you can easily filter for specific types of transfer events, including NFT mints!

### **1.** _Select an address for finding NFT mints_

* `fromAddress`: where the transaction originated from, in our case that’s always 0x0000000000000000000000000000000000000000. This allows us to find transfers from the 0x00 address to our target address.
* `toAddress`: the address we want to see mints from (NFTs go **to** the address that minted them)

### **2.** _Pick a block range for your query_

* &#x20;`fromBlock`: the start of the block range we want to fetch NFT mints over
* `toBlock`: the end of the block range we want to fetch NFT mints over. You can use `"latest"` if you want the query to include NFT data up to the most recent block.&#x20;

{% hint style="info" %}
When querying the full history of an address’s on-chain interactions, we suggest looking back to the very beginning or the 0th block (**0x0**).&#x20;
{% endhint %}

### **3.**  _Specify/filter for only ERC-721 and ERC-1155 NFT minting events_

* `category`: the type of transfer events we care about, in our case we want to see NFTs which are ERC721 and ERC1155 events

Since we are looking for minting events, we pass in the following strings as a list: **\["`external`",  "`erc721`", " `erc1155`"]**\
\
\- We use `external` since we are looking for the transfer of an NFT from an address to another address, both of which are not smart contracts.

\- We pass in `erc721` & `erc1155` since we are looking for the transfers of NFTs that adhere to the ERC-721 and ERC-1155 standards.&#x20;

### **4. **_**Send API request!**_

**For a no-code view of the API request check out the** [**Composer tool**](https://composer.alchemyapi.io/?composer\_state=%7B%22chain%22%3A0%2C%22network%22%3A0%2C%22methodName%22%3A%22alchemy\_getAssetTransfers%22%2C%22paramValues%22%3A%5B%7B%22excludeZeroValue%22%3Atrue%2C%22fromBlock%22%3A%220x0%22%2C%22toBlock%22%3A%22latest%22%2C%22fromAddress%22%3A%220x0000000000000000000000000000000000000000%22%2C%22toAddress%22%3A%220x5c43B1eD97e52d009611D89b74fA829FE4ac56b1%22%2C%22category%22%3A%5B%22external%22%2C%22erc721%22%2C%22erc1155%22%5D%7D%5D%7D).

{% tabs %}
{% tab title="Alchemy Web3.js (Recommended)" %}
{% embed url="https://github.com/alchemyplatform/transfers_api_javascript_scripts/blob/main/alchemy-web3-finding-nftmints-script.js" %}

If you don't already have Alchemy Web3 installed, you can install the `alchemy-web3` module to easily interact with Alchemy APIs. We highly recommend using the `alchemy-web3` sdk because you also get websocket support, retries, and other benefits without the complexity!

For full documentation on `alchemy-web3`, check the [Github repo](https://github.com/alchemyplatform/alchemy-web3).\


#### 1. Create a file.

In your current directory, create a new file called `alchemy-web3-transfers-to-script.js`

Use your favorite file browser, code editor, or just directly in the terminal using the `touch` command like this:

```javascript
touch alchemy-web3-finding-nftmints-script.js
```

####

#### 2. Write script!

Copy and paste in the following code snippet into your new file: `alchemy-web3-finding-nftmints-script.js`\
``

```javascript
import { createAlchemyWeb3 } from "@alch/alchemy-web3";

// Replace with your Alchemy api key:
const apiKey = "demo";

// Initialize an alchemy-web3 instance:
const web3 = createAlchemyWeb3(
  `https://eth-mainnet.alchemyapi.io/v2/${apiKey}`,
);

const res = await web3.alchemy.getAssetTransfers({
  fromBlock: "0x0",
  fromAddress: "0x0000000000000000000000000000000000000000",
  toAddress: "0x5c43B1eD97e52d009611D89b74fA829FE4ac56b1"
})

// Print contract address and tokenId for each NFT:
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

####

#### 3. Run script!

Now, on your command line, you can execute the script by calling:

```javascript
node alchemy-web3-finding-nftmints-script.js
```
{% endtab %}

{% tab title="Node-Fetch" %}
If you're using`node-fetch` a lightweight, common module that brings the Fetch API to Node.js and allows us to make our HTTP requests, here's a code snipper for the request you'd make!

{% embed url="https://github.com/alchemyplatform/transfers_api_javascript_scripts/blob/main/fetch-finding-nftmints-script.js" %}

#### 1. Create a file.

In your current directory, create a new file called `fetch-transfers-from-script.js` using your favorite file browser, code editor, or just directly in the terminal using the `touch` command like this:

```
touch fetch-finding-nftmints-script.js
```

####

#### 2. Write script!

Copy and paste in the following code snippet into your new file: `fetch-finding-nftmints-script.js`

```javascript
import fetch from 'node-fetch';

  let data = JSON.stringify({
  "jsonrpc": "2.0",
  "id": 0,
  "method": "alchemy_getAssetTransfers",
  "params": [
    {
      "fromBlock": "0x0",
      "fromAddress": "0x0000000000000000000000000000000000000000",
      "toAddress": "0x5c43B1eD97e52d009611D89b74fA829FE4ac56b1",
    }
  ]
});


  var requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: data,
    redirect: 'follow'
  };

  const apiKey = "demo"
  const baseURL = `https://eth-mainnet.alchemyapi.io/v2/${apiKey}`;
  const fetchURL = `${baseURL}`;

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



#### 3. Run script!

Now, on your command line, you can execute the script by calling:

```javascript
node fetch-finding-nftmints-script.js
```
{% endtab %}

{% tab title="Axios" %}
If you're using Javascript `axios`, a promise-based HTTP client for the browser and Node.js which allows us to make a raw request to the Alchemy API, here's a code snipper for the request you'd make!

{% embed url="https://github.com/alchemyplatform/transfers_api_javascript_scripts/blob/main/axios-finding-nftmints-script.js" %}

#### 1. Create a file.

In your current directory, create a new file called `axios-transfers-from-script.js` using your favorite file browser, code editor, or just directly in the terminal using the `touch` command.&#x20;

```
touch axios-finding-nftmints-script.js
```

####

#### 2. Write script!

Copy and paste in the following code snippet into your new file: `axios-finding-nftmints-script.js`

```javascript
import axios from 'axios';

  let data = JSON.stringify({
  "jsonrpc": "2.0",
  "id": 0,
  "method": "alchemy_getAssetTransfers",
  "params": [
    {
      "fromBlock": "0x0",
      "fromAddress": "0x0000000000000000000000000000000000000000",
      "toAddress": "0x5c43B1eD97e52d009611D89b74fA829FE4ac56b1",
    }
  ]
});


  var requestOptions = {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data: data,
  };

  const apiKey = "demo"
  const baseURL = `https://eth-mainnet.alchemyapi.io/v2/${apiKey}`;
  const axiosURL = `${baseURL}`;

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

####

#### 3. Run script!

Now, on your command line, you can execute the script by calling:

```javascript
node axios-finding-nftmints-script.js
```
{% endtab %}
{% endtabs %}

### **5.**  _Decoding API response_

Now that we have made a query and can see the response, let's learn how to handle the returned data.

#### Raw API Response:

Without parsing the response, we have a console log that looks a bit as follows.

```javascript
{
  transfers: [
    {
      blockNum: '0xb7389b',
      hash: '0xfde2a5157eda40b90514751f74e3c7314f452a41890b19a342ee147f5336dfd6',
      from: '0x0000000000000000000000000000000000000000',
      to: '0xe9b29ae1b4da8ba5b1de76bfe775fbc5e25bc69a',
      value: 0.245,
      erc721TokenId: null,
      erc1155Metadata: null,
      tokenId: null,
      asset: 'ETH',
      category: 'external',
      rawContract: [Object]
    },
    
    ......
    
    {
      blockNum: '0xcf5dea',
      hash: '0x701f837467ae3112d787ddedf8051c4996ea82914f7a7735cb3db2d805799286',
      from: '0x0000000000000000000000000000000000000000',
      to: '0x92560c178ce069cc014138ed3c2f5221ba71f58a',
      value: 152.89962568845024,
      erc721TokenId: null,
      erc1155Metadata: null,
      tokenId: null,
      asset: 'ENS',
      category: 'token',
      rawContract: [Object]
    },
    {
      blockNum: '0xd14898',
      hash: '0x2f5d93a9db65548eb43794aa43698acd653e6b2df35c6028b8599a234f2c6dc0',
      from: '0x0000000000000000000000000000000000000000',
      to: '0x83abecf7204d5afc1bea5df734f085f2535a9976',
      value: 27579.060635486854,
      erc721TokenId: null,
      erc1155Metadata: null,
      tokenId: null,
      asset: 'PEOPLE',
      category: 'token',
      rawContract: [Object]
    }
  ]
}
```

#### Understanding API Response:

* `blockNum`: the block number where an NFT mint event occurred&#x20;
* `hash`: the transaction hash of NFT minting transaction
* `from`: where the transaction originated from, in our case that’s always 0x0000000000000000000000000000000000000000
* `to`: the address we want to see mints from (NFTs go **to** the address that minted them)
* `value`:  the ETH transferred as part of the NFT mint \[`null` if ERC721 transfer]
* `erc721TokenId`: the ERC721 token \[`null` if not an ERC721 token transfer]
* `erc1155Metadata`: a list of objects containing the ERC1155 `tokenId`  and `value` \[`null` if not an ERC1155 transfer]
* `tokenId`: the token ID for ERC721 tokens
* `asset`: `ETH` or the token's symbol.&#x20;
* `rawContract`
  * `value`: `null` since we're looking at ERC721 & ERC1155 transfer
  * `address`: NFT contract address
  * `decimal`:  `null`

#### Breaking down the API Response

A few of the many different response objects you may be interested in parsing are: NFT contract standard (ERC721 or ERC1155), `contractAddress`, and `tokenId`

Let's walk through the sample code provided above to understand how to parse the returned JSON object.

With our queried response saved as a JSON object, we now effectively index through the transfers. In particular, we first access the transfers list and then iterate across a few key parameters: `erc1155Metadata` , `tokenId`, and `rawContract`

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

In this code block, as we iterate through the transfers list, we have a simple if-else statement that checks for whether each returned NFT is ERC1155 or not. Given that we are only looking at ERC721 and ERC1155 contracts, any NFTs that return a null for `erc1155Metadata` means that we are handling a ERC721 contract. In this case, we can simply print the `tokenId` and associated `rawContract.address`. Otherwise, we know we are working with a ERC1155 contract and will in turn again iterate through all tokens within the contract!

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

And that's it! You've now learned how to fetch NFT mints for an address on Ethereum!
