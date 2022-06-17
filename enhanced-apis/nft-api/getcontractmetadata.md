---
description: Queries NFT high-level collection/contract level information
---

# getContractMetadata

This endpoint is supported only on the following chains and networks:

* **Ethereum**: Mainnet

_To see chain support across all features, check out the_ [_feature matrix_](../../apis/feature-support-by-chain.md)_._

## Parameters

* `contractAddress`: _**\[string hexadecimal]**_ - contract address for the NFT collection

## Returns

* `address`: _**\[string hexadecimal]**_ contract address for the queried NFT collection
* `contractMetadata:` _**\[object]**_
  * `name:` _**\[string]**_ NFT contract name&#x20;
  * `symbol:` _**\[string]**_ NFT contract symbol abbreviation
  * `totalSupply:` _**\[string]**_ total number of NFTs in a given NFT collection

## Example

### Request

{% tabs %}
{% tab title="Node - Fetch" %}
```javascript
import fetch from 'node-fetch';

  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };

  const apiKey = "demo"
  const baseURL = `https://eth-mainnet.alchemyapi.io/nft/v2/${apiKey}/getContractMetadata`;
  const contractAddr = "0x61fce80d72363b731425c3a2a46a1a5fed9814b2";
  const fetchURL = `${baseURL}?contractAddress=${contractAddr}`

  fetch(fetchURL, requestOptions)
    .then(response => response.json())
    .then(response => JSON.stringify(response, null, 2))
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
```
{% endtab %}

{% tab title="Node - Axios" %}
```javascript
import axios from 'axios';

// replace with your Alchemy api key
const apiKey = "demo";
const baseURL = `https://eth-mainnet.alchemyapi.io/nft/v2/${apiKey}/getContractMetadata`;
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
```python
URL: https://eth-mainnet.g.alchemy.com/nft/v2/demo/getContractMetadata/?contractAddress=0x61fce80d72363b731425c3a2a46a1a5fed9814b2
RequestType: GET
```
{% endtab %}

{% tab title="CURL" %}
```url
curl --location --request GET 'https://eth-mainnet.g.alchemy.com/nft/v2/demo/getContractMetadata/?contractAddress=0x61fce80d72363b731425c3a2a46a1a5fed9814b2'
```
{% endtab %}
{% endtabs %}

### Response

```javascript
{
    "address": "0x61fce80d72363b731425c3a2a46a1a5fed9814b2",
    "contractMetadata": {
        "name": "CyborgMercenariesCm",
        "symbol": "CYBORG",
        "totalSupply": "7842"
    }
}
```
