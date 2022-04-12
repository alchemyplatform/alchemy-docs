---
description: >-
  Returns metadata (name, symbol, decimals, logo) for a given token contract
  address.
---

# alchemy\_getTokenMetadata

`name` ,`symbol`and`decimals`are optional methods in the ERC-20 token standard. Therefore, not all contracts will respond correctly to calls requesting this information. While the incorrectness or absence of`name` and `symbol`can be an inconvenience, having the correct `decimals`is absolutely crucial in displaying token balances or converting user inputs accurately when communicating with the contract.

Alchemy maintains a regularly updated database of contract metadata, with values gathered and intelligently merged from the contracts themselves along with several other sources. Alchemy is therefore able to provide clean, accurate, up-to-date metadata for contracts that may be missing any of these methods or have changed their name or symbol since contract publication.

As a bonus, token logo images are available for many of the popular tokens.

## Parameters

1. `DATA`, 20 Bytes - The address of the token contract.

## Returns

`Object` - An object with the following fields:

* `name`: `String` - The token's name. `null` if not defined in the contract and not available from other sources.
* `symbol`: `String` - The token's symbol. `null` if not defined in the contract and not available from other sources.
* `decimals`: `Number` - The number of decimals of the token. `null` if not defined in the contract and not available from other sources.
* `logo`: `String` - URL of the token's logo image. `null` if not available.

## [Example](https://composer.alchemyapi.io/?composer\_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22alchemy\_getTokenMetadata%22%2C%22paramValues%22%3A%5B%220x1985365e9f78359a9B6AD760e32412f4a445E862%22%5D%7D)

### Request

{% tabs %}
{% tab title="Alchemy Web3" %}
```javascript
// alchemy-token-api/alchemy-web3-script.js
import { createAlchemyWeb3 } from "@alch/alchemy-web3";

// Replace with your Alchemy api key:
const apiKey = "demo";

// Initialize an alchemy-web3 instance:
const web3 = createAlchemyWeb3(
  `https://eth-mainnet.g.alchemy.com/v2/${apiKey}`,
);

// The token address we want to query for metadata:
const metadata = await web3.alchemy.getTokenMetadata("0x1985365e9f78359a9B6AD760e32412f4a445E862")

console.log("TOKEN METADATA->");
console.log(metadata);
```
{% endtab %}

{% tab title="Fetch (JS)" %}
```javascript
import fetch from 'node-fetch';

// Replace with your Alchemy API key:
const apiKey = "demo";
const fetchURL = `https://eth-mainnet.g.alchemy.com/v2/${apiKey}`;

// Replace with the token address you want to query:
const tokenAddr = "0x1985365e9f78359a9B6AD760e32412f4a445E862";

var raw = JSON.stringify({
  "jsonrpc": "2.0",
  "method": "alchemy_getTokenMetadata",
  "headers": {
    "Content-Type": "application/json"
  },
  "params": [
    `${tokenAddr}`
  ],
  "id": 42
});

var requestOptions = {
  method: 'POST',
  body: raw,
  redirect: 'follow'
};

// Make the request and print the formatted response:
fetch(fetchURL, requestOptions)
  .then(response => response.json())
  .then(response => JSON.stringify(response, null, 2))
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
```
{% endtab %}

{% tab title="Axios (JS)" %}
```javascript
// alchemy-token-api/axios-script.js
import axios from 'axios';

// Replace with your Alchemy API key:
const apiKey = "demo";
const baseURL = `https://eth-mainnet.g.alchemy.com/v2/${apiKey}`;
// Replace with the wallet address you want to query:
const tokenAddr = "0x1985365e9f78359a9B6AD760e32412f4a445E862";

var data = JSON.stringify({
  "jsonrpc": "2.0",
  "method": "alchemy_getTokenMetadata",
  "params": [
    `${tokenAddr}`
  ],
  "id": 42
});

var config = {
  method: 'post',
  url: baseURL,
  headers: {
    'Content-Type': 'application/json'
  },
  data : data
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data, null, 2))
})
.catch(function (error) {
  console.log(error);
});va
```
{% endtab %}

{% tab title="Curl" %}
```bash
curl https://eth-mainnet.alchemyapi.io/v2/your-api-key \
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"alchemy_getTokenMetadata","params": ["0x1985365e9f78359a9B6AD760e32412f4a445E862"], "id": 1}'
```
{% endtab %}

{% tab title="Postman" %}
```http
URL: https://eth-mainnet.alchemyapi.io/v2/your-api-key
RequestType: POST
Body: 
{
    "jsonrpc":"2.0",
    "method":"alchemy_getTokenMetadata",
    "params":["0x1985365e9f78359a9B6AD760e32412f4a445E862"],
    "id":1
}
```
{% endtab %}
{% endtabs %}

### Result

```javascript
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "logo": "https://static.alchemyapi.io/images/assets/1104.png",
    "symbol": "REP",
    "decimals": 18,
    "name": "Augur"
  }
}
```
