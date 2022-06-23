---
description: >-
  Learn how to fetch all ERC-721 and ERC-1155 NFTs transferred by a given
  Ethereum address over any time period.
---

# How to get all NFT transactions by an address

A few quick reasons why you'd want to get NFT transfer history by an address:

* Building an NFT activity page for all transfers/sales&#x20;
* Calculating the volume of NFTs traded by an address&#x20;

While this type of data cannot be easily queried via the [Ethereum API](../../apis/ethereum/), Alchemy builds higher-level [Enhanced APIs](broken-reference) to make Web3 interactions much easier.&#x20;

In this tutorial, we'll be leveraging Alchemy's [Transfers API ](./)(`alchemy_getAssetTransfers`) to query all NFT transfers by an address.

## **What happens when NFTs are transacted?**

Behind the scenes, whenever an NFT undergoes an on-chain sale or swap, any associated smart contract calls will emit a standard [transfer event](./#what-are-transfers) since the asset is ultimately being _transferred_ from one account to another.&#x20;

Since we can specifically filter for transfer events using the [Transfers API](./), we can easily fetch NFT transactions with the right combination of filter parameters!

## How to get NFT Transaction History&#x20;

In order to fetch NFT transaction history by a given address, we'll need to specify a few things in our [`alchemy_getAssetTransfers`](./#alchemy\_getassettransfers-ethereum-mainnet) request:

* `fromAddress`: where the NFT transaction originated from\
  \*when fetching NFT transaction history originating `from` an address we use this\*
* `toAddress`: the NFT recipient address \
  \*when fetching NFT transaction history by recipient address we use this\*
* `fromBlock`: the starting time range we want to fetch NFT transactions over (defaults to `latest`)
* `toBlock` : the ending time range we want to fetch NFT transactions over (defaults to `latest`)
* `category`: the type of transfer events we care about, in our case we want to see NFTs which are ERC721 and ERC1155 events&#x20;

Once we've specified these inputs we can send the request!

## **Example:** How to get NFT Transaction History **O**riginating `From` **An Address**

To demonstrate how to get the NFT transaction history from an address we're going to walk through an example using the address [0x5c43B1eD97e52d009611D89b74fA829FE4ac56b1](https://etherscan.io/address/0x5c43B1eD97e52d009611D89b74fA829FE4ac56b1) and getting all NFT transaction events from it spanning block 0 to the latest. &#x20;

{% hint style="success" %}
### **No-code Example**

For a no-code demonstration of this request, check out Alchemy's [Composer tool!](https://composer.alchemyapi.io/?share=eJxFjsFuwjAQRP9lzznYaUxIbkG0x56qHlohtNgbgrBjtHYECPHvLJEQt5nRzNPcwA54GKFVBYyUz5GPsw6Uh\_i\_MRC0gN4OFK7bPeUuJco.jGPqiRMUcELG8It\_ogTt.w3oYv3k6I84zim0mScqoOcYVj5awYO6KFnm\_PIeM6Us0bPUOceUBCY1Y6uPlaZ1U5MpnVLNQuv1stnVVd8ty\_brs0JrFjs9095DsVaQ\_8hX\_QTEti6fHRFaGwOb\_\_b\_APULUDQ-)
{% endhint %}

&#x20;Follow along with any of the code examples below to make the request.

{% tabs %}
{% tab title="Alchemy Web3.js (Recommended)" %}
{% embed url="https://github.com/alchemyplatform/transfers_api_javascript_scripts/blob/main/javascript/alchemyweb3/nft-tx-history/nft-tx-history-from-alchemyweb3.js" %}
NFT Tx History Github Repo
{% endembed %}

If you don't already have Alchemy Web3 installed, you can install the `alchemy-web3` module to easily interact with Alchemy APIs. We highly recommend using the `alchemy-web3` sdk because you also get websocket support, retries, and other benefits without the complexity!

For full documentation on `alchemy-web3`, check the [Github repo](https://github.com/alchemyplatform/alchemy-web3).

####

#### 1. Create a file.

In your current directory, create a new file called `nft-tx-history-from-alchemyweb3.js`

_****_\
_****_Use your favorite file browser, code editor, or just directly in the terminal using the `touch` command like this:

```
touch nft-tx-history-from-alchemyweb3.js
```

\
**2. Write script!**

Copy and paste in the following code snippet into your new file: `nft-tx-history-from-alchemyweb3.js`\
``

{% code title="nft-tx-history-from-alchemyweb3.js" %}
```javascript
import axios from 'axios';

  // Address we want get NFT txs from
  const address = "0x5c43B1eD97e52d009611D89b74fA829FE4ac56b1";

  let data = JSON.stringify({
  "jsonrpc": "2.0",
  "id": 0,
  "method": "alchemy_getAssetTransfers",
  "params": [
    {
      "fromBlock": "0x0",
      "fromAddress": address,
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
{% endcode %}



#### 3. Run script!

Now, on your command line, you can execute the script by calling:

```javascript
node nft-tx-history-from-alchemyweb3.js
```
{% endtab %}

{% tab title="Node Fetch" %}
If you're using`node-fetch` a lightweight, common module that brings the Fetch API to Node.js and allows us to make our HTTP requests, here's a code snipper for the request you'd make!

{% embed url="https://github.com/alchemyplatform/transfers_api_javascript_scripts/blob/main/javascript/fetch/nft-tx-history/nft-tx-history-from-fetch.js" %}
NFT Tx History Github Repo
{% endembed %}

#### 1. Create a file.

In your current directory, create a new file called `nft-tx-history-from-fetch.js` using your favorite file browser, code editor, or just directly in the terminal using the `touch` command like this:

```
touch nft-tx-history-from-fetch.js
```

####

#### 2. Write script!

Copy and paste in the following code snippet into your new file: `nft-tx-history-from-fetch.js`

{% code title="nft-tx-history-from-fetch.js" %}
```javascript
import fetch from 'node-fetch';

  // Address we want get NFT txs from
  const address = "0x5c43B1eD97e52d009611D89b74fA829FE4ac56b1";

  let data = JSON.stringify({
  "jsonrpc": "2.0",
  "id": 0,
  "method": "alchemy_getAssetTransfers",
  "params": [
    {
      "fromBlock": "0x0",
      "fromAddress": address,
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
{% endcode %}



#### 3. Run script!

Now, on your command line, you can execute the script by calling:

```javascript
node nft-tx-history-from-fetch.js
```
{% endtab %}

{% tab title="Axios" %}
If you're using Javascript `axios`, a promise-based HTTP client for the browser and Node.js which allows us to make a raw request to the Alchemy API, here's a code snipper for the request you'd make!

{% embed url="https://github.com/alchemyplatform/transfers_api_javascript_scripts/blob/main/javascript/axios/nft-tx-history/nft-tx-history-from-axios.js" %}
NFT Tx History Github Repo
{% endembed %}



#### 1. Create a file.

In your current directory, create a new file called `nft-tx-history-from-axios.js` using your favorite file browser, code editor, or just directly in the terminal using the `touch` command.&#x20;

```
touch nft-tx-history-from-axios.js
```



#### 2. Write script!

Copy and paste in the following code snippet into your new file: `nft-tx-history-from-axios.js`

{% code title="nft-tx-history-from-axios.js" %}
```javascript
import axios from 'axios';

  let data = JSON.stringify({
  "jsonrpc": "2.0",
  "id": 0,
  "method": "alchemy_getAssetTransfers",
  "params": [
    {
      "fromBlock": "0x0",
      "fromAddress": "0x5c43B1eD97e52d009611D89b74fA829FE4ac56b1",
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

  axios(axiosURL, requestOptions)
    .then(response => console.log(JSON.stringify(response.data, null, 2)))
    .catch(error => console.log(error));
```
{% endcode %}

####

#### 3. Run script!

Now, on your command line, you can execute the script by calling:

```javascript
node nft-tx-history-from-axios.js
```
{% endtab %}
{% endtabs %}

## How to process the API response

Now that we have made a query and can see the response, let's learn how to handle the returned data.

### Raw API Response:

Without parsing the response, we have a command-line print-out that looks like this:

```json
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

Below are each of the components in our response.&#x20;

* `blockNum`: the block number where an NFT transaction occurred, in `hex`&#x20;
* `hash`: the transaction hash of NFT transaction
* `from`: where the transaction originated from
* `to`: where the NFT was received
* `value`:  the amount of ETH transferred, should always be `null` in our case since we're only looking at NFT transfer events which typically only transfer the NFT and not ETH
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

With our queried response saved as a JSON object, we can index through the transfers. In particular, we first access the transfers list and then iterate across a few key parameters: `erc1155Metadata` , `tokenId`, and `rawContract`.&#x20;

The steps we want to take are:

1. Loop through all transfers in the result
2. Check whether the returned transfer is ERC1155 or not
   1. If so, loop through tokens within ERC1155
      1. print `tokenId` and `address` for each
   2. If not, assume transfer is ERC721
      1. print `tokenID` of contract and address

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

If you followed along thus far, your response should look like the following:

```json
ERC-721 Token Minted: ID-  0x000000000000000000000000000000000000000000000000000000000000034a  Contract-  0x7ecb204fed7e386386cab46a1fcb823ec5067ad5
ERC-721 Token Minted: ID-  0x0000000000000000000000000000000000000000000000000000000000000349  Contract-  0x7ecb204fed7e386386cab46a1fcb823ec5067ad5
ERC-721 Token Minted: ID-  0x0000000000000000000000000000000000000000000000000000000000000348  Contract-  0x7ecb204fed7e386386cab46a1fcb823ec5067ad5
ERC-721 Token Minted: ID-  0x0000000000000000000000000000000000000000000000000000000000000b6e  Contract-  0x72d47d4d24018ec9048a9b0ae226f1c525b7e794s

```

And that's it! You've now learned how to fetch NFT transaction history given an address on Ethereum!\
\
If you enjoyed this tutorial, give us a tweet [@AlchemyPlatform](https://twitter.com/AlchemyPlatform)!  \
(Or give the author [@crypt0zeke](https://twitter.com/crypt0zeke) some love!)

Also, join our [Discord server](https://www.alchemy.com/discord) to meet other blockchain devs, builders, and entrepreneurs!&#x20;
