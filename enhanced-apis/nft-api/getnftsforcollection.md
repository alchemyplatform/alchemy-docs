---
description: Gets all NFTs for a given NFT contract
---

# getNFTsForCollection

## Parameters

* `contractAddress`: _**\[string]**_ - contract address for the NFT collection
* `withMetadata`: _**\[boolean] -**_ (optional)  _****_  If set to `true`, returns NFT metadata; otherwise will only return tokenIds
* `startToken`: _**\[string]**_ - an offset used for pagination

{% hint style="info" %}
#### NOTE on`startToken`:&#x20;

The`startToken`serves as an analog for the _tokenId_ for the NFT. If no`startToken`is specified, the query will start from the lowest _tokenId_. \
\
You can pass in any _tokenId_ from the collection as an offset, or, alternatively, each response will return a `nextToken`that can be used to return the next page of results for the given NFT collection, if there are additional results.
{% endhint %}

## Returns

*   `nfts`: list of objects that represent NFTs stored under the queried contract address.&#x20;

    Object schema:

    * `id`
      * `tokenId`: Id for NFT (integer)&#x20;
      * `tokenMetadata`
        * `tokenType`: "`ERC721`" or "`ERC1155`"
    * `tokenUri`:
      * `raw:` uri representing the location of the NFT's original metadata blob. This is a backup for you to parse when the `metadata` field is not automatically populated.
      * `gateway:` public gateway uri for the raw uri above.
    * `metadata`: relevant metadata for NFT contract. This is useful for viewing image url, traits, etc. without having to follow the metadata blob url in `tokenUri` to parse manually.&#x20;
* `nextToken` : an offset used for pagination

## Example

{% hint style="info" %}
The example below is for Ethereum Mainnet. If you are using Polygon you'll need to use your polygon endpoint instead: `https://polygon-mainnet.alchemyapi.io/v2/your-api-key/getNFTs`...
{% endhint %}

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
  const baseURL = `https://eth-mainnet.alchemyapi.io/v2/${apiKey}/getNFTsForCollection`;
  const contractAddr = "0x61fce80d72363b731425c3a2a46a1a5fed9814b2";
  const cursorKey = "0x1ea2";
  const withMetadata = "false";
  const fetchURL = `${baseURL}?contractAddress=${contractAddr}&cursorKey=${tokenId}&withMetadata=${withMetadata}`;

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
const baseURL = `https://eth-mainnet.alchemyapi.io/v2/${apiKey}/getNFTsForCollection`;
const contractAddr = "0x61fce80d72363b731425c3a2a46a1a5fed9814b2";
const cursorKey = "0x1ea2";
const withMetadata = "false";

var config = {
  method: 'get',
  url: `${baseURL}?contractAddress=${contractAddr}&cursorKey=${tokenId}&withMetadata=${withMetadata}`,
  headers: { }
};

axios(config)
.then(response => console.log(JSON.stringify(response.data, null, 2)))
.catch(error => console.log(error));
```
{% endtab %}

{% tab title="Postman" %}
```http
URL: https://eth-mainnet.g.alchemy.com/v2/demo/getNFTsForCollection/?contractAddress=0x61fce80d72363b731425c3a2a46a1a5fed9814b2&cursorKey=0x1ea2&withMetadata=false
RequestType: GET
```
{% endtab %}

{% tab title="Curl" %}
```
curl 'https://eth-mainnet.g.alchemy.com/v2/demo/getNFTsForCollection/?contractAddress=0x61fce80d72363b731425c3a2a46a1a5fed9814b2&cursorKey=0x1ea2&withMetadata=false'
```
{% endtab %}
{% endtabs %}

If you're having trouble running requests via Alchemy Web3.js, Fetch, or Axios, please refer to: [**NFT API Quickstart Guide** ](../../guides/nft-api-quickstart-guide.md)****

### Response

```json
{"nfts":
    [{"id":{"tokenId":"0x1f"}},
    {"id":{"tokenId":"0x20"}},
    {"id":{"tokenId":"0x21"}},
    {"id":{"tokenId":"0x22"}},
    {"id":{"tokenId":"0x23"}},
    {"id":{"tokenId":"0x24"}},
    {"id":{"tokenId":"0x25"}},
    {"id":{"tokenId":"0x26"}},
    {"id":{"tokenId":"0x27"}},
    {"id":{"tokenId":"0x28"}},
    {"id":{"tokenId":"0x29"}},
    {"id":{"tokenId":"0x2a"}},
    {"id":{"tokenId":"0x2b"}},
    .....
    {"id":{"tokenId":"0x80"}},
    {"id":{"tokenId":"0x81"}},
    {"id":{"tokenId":"0x82"}}],
"nextToken":"0x83"}
```



