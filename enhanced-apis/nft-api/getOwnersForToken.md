---
description: Get the owner(s) for a token.
---

# getOwnersForToken (BETA)

This endpoint is supported on the following chains and networks:

* **Ethereum**: Mainnet, Goerli
* **Polygon**: Mainnet and Mumbai

_To see chain support across all features, check out the_ [_feature matrix_](../../apis/feature-support-by-chain.md)_._

## Parameters

* `contractAddress`: _**string**_ - The address of the contract that the token belongs to. We currently support both ERC721 and ERC1155 contracts.
* `tokenId`: _**string**_ - The ID of the token. Can be in hex or decimal format.

## Returns

* `owners`: _**string\[]**_ - A list of strings representing addresses of the owners.
  * For ERC721 tokens the list will contain just a single owner.
  * For ERC1155 tokens the list may contain multiple owners if the ERC1155 token in question is semi-fungible or fungible.&#x20;

## Example

### Request

{% tabs %}
{% tab title="Fetch (JS)" %}
```javascript
import fetch from 'node-fetch';

  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };

  const apiKey = "demo"
  const baseURL = `https://eth-mainnet.alchemyapi.io/nft/v2/${apiKey}/getOwnersForToken`;
  const contractAddr = "0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D";
  const tokenId = "867";
  const fetchURL = `${baseURL}?contractAddress=${contractAddr}&tokenId=${tokenId}`;

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
const baseURL = `https://eth-mainnet.alchemyapi.io/nft/v2/${apiKey}/getOwnersForToken`;
const contractAddr = "0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D";
const tokenId = "867";

var config = {
  method: 'get',
  url: `${baseURL}?contractAddress=${contractAddr}&tokenId=${tokenId}`,
  headers: { }
};

axios(config)
.then(response => console.log(JSON.stringify(response.data, null, 2)))
.catch(error => console.log(error));
```
{% endtab %}

{% tab title="Postman" %}
```http
URL: https://eth-mainnet.g.alchemy.com/nft/v2/demo/getOwnersForToken?contractAddress=0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D&tokenId=867
RequestType: GET
```
{% endtab %}

{% tab title="Curl" %}
```
curl 'https://eth-mainnet.g.alchemy.com/nft/v2/demo/getOwnersForToken/?contractAddress=0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D&tokenId=867'
```
{% endtab %}
{% endtabs %}

If you're having trouble running requests via Alchemy Web3.js, Fetch, or Axios, please refer to: [**NFT API Quickstart Guide** ](nft-api-quickstart-guide.md)****

### Response

```json
{"owners":["0x54be3a794282c030b15e43ae2bb182e14c409c5e"]}
```
