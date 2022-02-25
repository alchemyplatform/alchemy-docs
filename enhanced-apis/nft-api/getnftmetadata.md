---
description: Gets the metadata associated with a given NFT.
---

# getNFTMetadata

_**NOTE:** This endpoint offers multi-chain support._ [_Check chains currently available_](https://docs.alchemy.com/alchemy/apis/feature-support-by-chain) _for the NFT API._

## Parameters

* `contractAddress`: _**\[string]**_ address of NFT contract
* `tokenId`: _**\[integer]**_ Id for NFT&#x20;
* `tokenType` : _**\[string]**_ (optional) "`ERC721`" or "`ERC1155`"; specifies type of token to query for

{% hint style="success" %}
API requests will perform faster if `tokenType` is specified!
{% endhint %}

## Returns

* JSON Object containing the following fields and potentially more fields.
  * `contract`: contract for returned NFT
    * `address`: address of NFT contract&#x20;
  * `id`
    * `tokenId`: Id for NFT (integer)&#x20;
    * `tokenMetadata`
      * `tokenType`: "`ERC721`" or "`ERC1155`"
  * `tokenUri`:
    * `raw:` uri representing the location of the NFT's original metadata blob. This is a backup for you to parse when the `metadata` field is not automatically populated.
    * `gateway:` public gateway uri for the raw uri above.
  * `metadata`: relevant metadata for NFT contract. This is useful for viewing image url, traits, etc. without having to follow the metadata blob url in `tokenUri` to parse manually.&#x20;
  * `timeLastUpdated`: ISO timestamp of the last cache refresh for the information returned in the `metadata` field.

{% hint style="warning" %}
**Note on `metadata`:**

Some NFT contracts may not have metadata specified. You may need to parse the response on a case-by-case basis. &#x20;
{% endhint %}

## Example

{% hint style="info" %}
The example below is for Ethereum Mainnet. If you are using Polygon you'll need to use your polygon endpoint instead: `https://polygon-mainnet.alchemyapi.io/v2/your-api-key/getNFTs`...
{% endhint %}

### Request

****[**Alchemy Composer Example**](https://composer.alchemyapi.io/?composer\_state=%7B%22chain%22%3A0%2C%22network%22%3A0%2C%22methodName%22%3A%22getNFTMetadata%22%2C%22paramValues%22%3A%5B%7B%22Contract%20Address%22%3A%220x5180db8F5c931aaE63c74266b211F580155ecac8%22%2C%22Token%20ID%22%3A%221590%22%7D%5D%7D)****

{% tabs %}
{% tab title="Alchemy Web3.js" %}
```javascript
// Installation: https://github.com/alchemyplatform/alchemy-web3

import { createAlchemyWeb3 } from "@alch/alchemy-web3";

// Using HTTPS
const web3 = createAlchemyWeb3(
  "https://eth-mainnet.alchemyapi.io/v2/demo",
);


// Fetch metadata for a particular NFT:
console.log("fetching metadata for a crypto coven NFT...");
const response = await web3.alchemy.getNftMetadata({
  contractAddress: "0x5180db8F5c931aaE63c74266b211F580155ecac8",
  tokenId: "1590"
})

console.log(metadata);

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
  const baseURL = `https://eth-mainnet.alchemyapi.io/v2/${apiKey}/getNFTMetadata`;
  const contractAddr = "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d";
  const tokenId = "2";
  const tokenType = "erc721";
  const fetchURL = `${baseURL}?contractAddress=${contractAddr}&tokenId=${tokenId}&tokenType=${tokenType}`;

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
const baseURL = `https://eth-mainnet.alchemyapi.io/v2/${apiKey}/getNFTMetadata`;
const contractAddr = "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d";
const tokenId = "2";
const tokenType = "erc721";

var config = {
  method: 'get',
  url: `${baseURL}?contractAddress=${contractAddr}&tokenId=${tokenId}&tokenType=${tokenType}`,
  headers: { }
};

axios(config)
.then(response => console.log(JSON.stringify(response.data, null, 2)))
.catch(error => console.log(error));
```
{% endtab %}

{% tab title="Postman" %}
```http
URL: https://eth-mainnet.alchemyapi.io/v2/demo/getNFTMetadata?contractAddress=0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d&tokenId=2&tokenType=erc721
RequestType: GET
```
{% endtab %}

{% tab title="Curl" %}
```
curl 'https://eth-mainnet.alchemyapi.io/v2/demo/getNFTMetadata?contractAddress=0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d&tokenId=2&tokenType=erc721'
```
{% endtab %}
{% endtabs %}

If you're having trouble running requests via Alchemy Web3.js, Fetch, or Axios, please refer to: [**NFT API Quickstart Guide** ](../../guides/nft-api-quickstart-guide.md)****

### Response

```json
{
  contract: { address: '0x5180db8f5c931aae63c74266b211f580155ecac8' },
  id: { tokenId: '1590', tokenMetadata: { tokenType: 'ERC721' } },
  title: 'balsa vault',
  description: 'You are a WITCH with eyes that hold eons. You write poems filled with charms. Your magic spawns from a few hours of sleep. You arch your back into a bridge between the living and the dead. SHINE!',
  tokenUri: {
    raw: 'ipfs://QmZHKZDavkvNfA9gSAg7HALv8jF7BJaKjUc9U2LSuvUySB/1590.json',
    gateway: 'https://ipfs.io/ipfs/QmZHKZDavkvNfA9gSAg7HALv8jF7BJaKjUc9U2LSuvUySB/1590.json'
  },
  media: [ { uri: [Object] } ],
  metadata: {
    image: 'https://cryptocoven.s3.amazonaws.com/a7875f5758f85544dcaab79a8a1ca406.png',
    external_url: 'https://www.cryptocoven.xyz/witches/1590',
    background_color: '',
    coven: {
      skills: [Object],
      name: 'balsa vault',
      description: [Object],
      styles: [Array],
      id: 1590,
      type: 'necromancer',
      hash: 'a7875f5758f85544dcaab79a8a1ca406',
      birthChart: [Object]
    },
    name: 'balsa vault',
    description: 'You are a WITCH with eyes that hold eons. You write poems filled with charms. Your magic spawns from a few hours of sleep. You arch your back into a bridge between the living and the dead. SHINE!',
    attributes: [
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object]
    ]
  },
  timeLastUpdated: '2022-01-25T07:41:32.003Z'
}

```
