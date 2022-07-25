---
description: >-
  Triggers metadata refresh for an entire NFT collection and refreshes stale
  metadata after a collection reveal/collection changes
---

# reingestContract

{% hint style="warning" %}
This endpoint is currently in _BETA_.&#x20;
{% endhint %}

This endpoint is supported on the following chains and networks:

* **Ethereum**: Mainnet

_To see chain support across all features, check out the_ [_feature matrix_](../../apis/feature-support-by-chain.md)_._

## Parameters

* `contractAddress`: _**string**_ - The address of the NFT contract/collection that needs to be refreshed

## Returns

* `contractAddress`: _**string**_ - The address of the NFT contract/collection that is refreshing
* `reingestionState`: _**string**_ - The current state of the reingestion request
  * `"does_not_exist"` - The contract requested is not an NFT and does not contain proper metadata
  * `"already_queried"` - Contract already queried&#x20;
  * `"in_progress"` - Ingestion in progress
  * `"finished"` - Ingestion complete
  * `"queued"` - Ingestion request placed into queue and awaiting execution&#x20;
  * `"queue_failed"` - Queue job incomplete
* `progress`: _**string**_ - Percentage of tokens successfully refreshed

## Example

### Request

{% tabs %}
{% tab title="Alchemy SDK" %}
```javascript
// Github: https://github.com/alchemyplatform/alchemy-sdk-js
// Setup: npm install @alch/alchemy-sdk
import {
  Network,
} from "@alch/alchemy-sdk";

// Optional Config object, but defaults to demo api-key and eth-mainnet.
const settings = {
  apiKey: "demo", // Replace with your Alchemy API Key.
  network: Network.ETH_MAINNET, // Replace with your network.
  maxRetries: 10,
};

const alchemy = new Alchemy(settings);

// Print total NFT count returned in the response:
alchemy.reingestNftContract(
  "0x5180db8F5c931aaE63c74266b211F580155ecac8",
  "1590"
).then(console.log);
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
  const baseURL = `https://eth-mainnet.alchemyapi.io/nft/v2/${apiKey}/reingestContract`;
  const contractAddr = "0xE9FCa552b9eb110c2d170962aF740725F71F5644";
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
const baseURL = `https://eth-mainnet.alchemyapi.io/nft/v2/${apiKey}/reingestContract`;
const contractAddr = "0xE9FCa552b9eb110c2d170962aF740725F71F5644";

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
URL: https://eth-mainnet.g.alchemy.com/nft/v2/demo/reingestContract?contractAddress=0xE9FCa552b9eb110c2d170962aF740725F71F5644
RequestType: GET
```
{% endtab %}

{% tab title="Curl" %}
```
curl --location --request GET 'https://eth-mainnet.g.alchemy.com/nft/v2/demo/reingestContract?contractAddress=0xE9FCa552b9eb110c2d170962aF740725F71F5644' \
--data-raw ''
```
{% endtab %}
{% endtabs %}

If you're having trouble running requests via Alchemy Web3.js, Fetch, or Axios, please refer to: [**NFT API Quickstart Guide** ](nft-api-quickstart-guide.md)****

### Response

```json
{
    "contractAddress": "0xe9fca552b9eb110c2d170962af740725f71f5644",
    "reingestionState": "in_progress",
    "progress": null
}
```
