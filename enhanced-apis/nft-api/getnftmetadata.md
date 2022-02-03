---
description: Gets the metadata associated with a given NFT.
---

# getNFTMetadata

{% hint style="info" %}
**NOTE:** This endpoint offers multi-chain support. [Check chains currently available](https://docs.alchemy.com/alchemy/introduction/getting-started) for the NFT API.
{% endhint %}

## Parameters

* `contractAddress`: address of NFT contract
* `tokenId`: Id for NFT (integer)
* `tokenType` : (optional) "`ERC721`" or "`ERC1155`" , type of token
  * request may perform faster if this parameter is specified&#x20;

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
  * `metadata`: \[NOT GUARANTEED\*] relevant metadata for NFT contract. This is useful for viewing image url, traits, etc. without having to follow the metadata blob url in `tokenUri` to parse manually.&#x20;
  * `timeLastUpdated`: ISO timestamp of the last cache refresh for the information returned in the `metadata` field.

{% hint style="danger" %}
\***Note on metadata**&#x20;

Some NFT contracts may not have metadata specified. You may need to parse the response on a case by case basis. &#x20;
{% endhint %}

## Example

{% hint style="danger" %}
#### Version

You must update your api\_key from your dashboard from V2 --> V1, ie

`https://eth-mainnet.g.alchemy.com/your-api-key/v2` should be `https://eth-mainnet.g.alchemy.com/your-api-key/v1`

#### Network

The example below is for Ethereum Mainnet. If you are using Polygon you'll need to use your polygon endpoint instead: `https://polygon-mainnet.g.alchemy.com/your-api-key/v1/getNFTs`...
{% endhint %}

### Request

{% tabs %}
{% tab title="Alchemy Web3.js" %}
```javascript
// Installation: https://github.com/alchemyplatform/alchemy-web3

import { createAlchemyWeb3 } from "@alch/alchemy-web3";

// Using HTTPS
const web3 = createAlchemyWeb3(
  "https://eth-mainnet.g.alchemy.com/v2/demo",
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
  const baseURL = `https://eth-mainnet.g.alchemy.com/${apiKey}/v1/getNFTMetadata`;
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
const baseURL = `https://eth-mainnet.g.alchemy.com/${apiKey}/v1/getNFTMetadata`;
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
URL: https://eth-mainnet.g.alchemy.com/demo/v1/getNFTMetadata?contractAddress=0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d&tokenId=2&tokenType=erc721
RequestType: GET
```
{% endtab %}

{% tab title="Curl" %}
```
curl 'https://eth-mainnet.g.alchemy.com/your-api-key/v1/getNFTMetadata?contractAddress=0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d&tokenId=2&tokenType=erc721'
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
