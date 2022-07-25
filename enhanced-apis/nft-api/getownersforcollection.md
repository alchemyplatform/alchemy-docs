---
description: Gets all owners for a given NFT contract
---

# getOwnersForCollection

This endpoint is supported on the following chains and networks:

* **Ethereum**: Mainnet, Goerli
* **Polygon**: Mainnet, Mumbai

_To see chain support across all features, check out the_ [_feature matrix_](../../apis/feature-support-by-chain.md)_._

## Parameters

* `contractAddress`: _**\[string]**_ - contract address for the NFT collection
* `withTokenBalances`: _**\[boolean]**_ `false` by default (optional); if boolean is set to `true` the query will include the token balances per token id for each owner



## Returns

{% tabs %}
{% tab title="(By Default)" %}
### Returns (by default)

* `ownerAddresses`: _**\[array]**_ list of all addresses that own one of the NFTs from the queried contract address.&#x20;
{% endtab %}

{% tab title="(withTokenBalances = true)" %}
`ownerAddresses`: _**\[array]**_ list of objects representing the token ownership for owners

* `ownerAddress`: _**\[string]** - ****_ the address of an owner for the collection
* `tokenBalances`: _**\[array]** -_ a list of the token ids and balances for the owner of the collection
  * `tokenId`: _**\[string]** - ****_ tokenId of the NFT in the collection that an owner has
  * `balance`: _**\[uint256]** -_ the number of the specified token in the collection that the user owns
{% endtab %}
{% endtabs %}

## Example

{% hint style="info" %}
The example below is for Ethereum Mainnet. If you are using Polygon you'll need to use your polygon endpoint instead: \
https://polygon-mainnet.g.alchemy.com/nft/`v2/your-api-key/getNFTs`...
{% endhint %}

### Request

{% tabs %}
{% tab title="Alchemy SDK" %}
```javascript
// Github: https://github.com/alchemyplatform/alchemy-sdk-js
// Setup: npm install @alch/alchemy-sdk
import { Network, Alchemy } from "@alch/alchemy-sdk";

// Optional Config object, but defaults to demo api-key and eth-mainnet.
const settings = {
  apiKey: "demo", // Replace with your Alchemy API Key.
  network: Network.ETH_MAINNET, // Replace with your network.
  maxRetries: 10,
};

const alchemy = new Alchemy(settings);

// Print total NFT count returned in the response:
alchemy
  .getOwnersForNftContract("0x61fce80d72363b731425c3a2a46a1a5fed9814b2")
  .then(console.log);
```
{% endtab %}

{% tab title="Fetch (JS)" %}
```javascript
import fetch from 'node-fetch';

  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };

  const apiKey = "demo"
  const baseURL = `https://eth-mainnet.alchemyapi.io/nft/v2/${apiKey}/getOwnersForCollection`;
  const contractAddr = "0x61fce80d72363b731425c3a2a46a1a5fed9814b2";
  const fetchURL = `${baseURL}?contractAddress=${contractAddr}`;

  fetch(fetchURL, requestOptions)
    .then(response => response.json())
    .then(response => JSON.stringify(response, null, 2))
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
```
{% endtab %}

{% tab title="Axios (JS)" %}
```javascript
import axios from 'axios';

// replace with your Alchemy api key
const apiKey = "demo";
const baseURL = `https://eth-mainnet.alchemyapi.io/nft/v2/${apiKey}/getOwnersForCollection`;
const contractAddr = "0x61fce80d72363b731425c3a2a46a1a5fed9814b2";

var config = {
  method: 'get',
  url: `${baseURL}?contractAddress=${contractAddr}`,
  headers: { }
};

axios(config)
.then(response => console.log(JSON.stringify(response.data, null, 2)))
.catch(error => console.log(error));
```
{% endtab %}

{% tab title="Postman" %}
```http
URL: https://eth-mainnet.g.alchemy.com/nft/v2/demo/getOwnersForCollection/?contractAddress=0x61fce80d72363b731425c3a2a46a1a5fed9814b2
RequestType: GET
```
{% endtab %}

{% tab title="Curl" %}
```
curl 'https://eth-mainnet.g.alchemy.com/nft/v2/demo/getOwnersForCollection/?contractAddress=0x61fce80d72363b731425c3a2a46a1a5fed9814b2'Response
```
{% endtab %}
{% endtabs %}

### Response

```json
{"ownerAddresses":
    ["0x001a61213d72f2f3c95ff743c80f472749ab8ad3",
    "0x003a1acce28eb335f3ff1e93a5b09cd4b598ef62",
    "0x00614efd868dabb5f92e15b0440d1f85ac0f9be1",
    "0x006f48d6ed87efd9e0bc56cc7a8703d0455c2858",
    "0x008b7903f1f0b825636739c7a3defb7eebc94f1d",
    "0x008c79f10cbd14070b106b05d5fd494e084ee8a5",
    "0x00ce8f7e0ec4f03a821e8cb3d84479d76151d0a9",
    "0x00f3a0fcc47ba9f7a757c255aaa6a286a524cef9"]
}
```

### Request (`withTokenBalances` = true)

{% tabs %}
{% tab title="Fetch (JS)" %}
```javascript
import fetch from 'node-fetch';

  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };

  const apiKey = "demo"
  const baseURL = `https://eth-mainnet.alchemyapi.io/nft/v2/${apiKey}/getOwnersForCollection`;
  const contractAddr = "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d";
  const fetchURL = `${baseURL}?contractAddress=${contractAddr}&withTokenBalances=true`;

  fetch(fetchURL, requestOptions)
    .then(response => response.json())
    .then(response => JSON.stringify(response, null, 2))
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
```
{% endtab %}

{% tab title="Axios (JS)" %}
```javascript
import axios from 'axios';

// replace with your Alchemy api key
const apiKey = "demo";
const baseURL = `https://eth-mainnet.alchemyapi.io/nft/v2/${apiKey}/getOwnersForCollection&withTokenBalances=true`;
const contractAddr = "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d";

var config = {
  method: 'get',
  url: `${baseURL}?contractAddress=${contractAddr}&withTokenBalances=true`,
  headers: { }
};

axios(config)
.then(response => console.log(JSON.stringify(response.data, null, 2)))
.catch(error => console.log(error));
```
{% endtab %}

{% tab title="Postman" %}
```http
URL: https://eth-mainnet.g.alchemy.com/nft/v2/demo/getOwnersForCollection/?contractAddress=0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d&withTokenBalances=true
RequestType: GET
```
{% endtab %}

{% tab title="Curl" %}
```
curl 'https://eth-mainnet.g.alchemy.com/nft/v2/demo/getOwnersForCollection/?contractAddress=0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d&withTokenBalances=true'
```
{% endtab %}
{% endtabs %}

### Response (`withTokenBalances` = true)

```json
{
    "ownerAddresses": [
        {
            "ownerAddress": "0x000001f568875f378bf6d170b790967fe429c81a",
            "tokenBalances": [
                { "tokenId": "9446", "balance": 1 }
            ]
        },
        {
            "ownerAddress": "0x0001bb2a72173f3a1aaae96bd0ddb1f8be4f91b7",
            "tokenBalances": [
                { "tokenId": "6927", "balance": 1 }
            ]
        },
        {
            "ownerAddress": "0x00bb9221daaaf8a703fa19f8ce4822fe8c1b87eb",
            "tokenBalances": [
                { "tokenId": "218", "balance": 1 },
                { "tokenId": "8832", "balance": 1 }
            ]
        },
    ]
}
```
