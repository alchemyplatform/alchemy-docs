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
{% tab title="Curl" %}
```
curl 'https://eth-mainnet.g.alchemy.com/your-api-key/v1/getNFTMetadata?contractAddress=0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d&tokenId=2&tokenType=erc721&&refreshCache=true'
```
{% endtab %}

{% tab title="JavaScript - Fetch" %}
```javascript
var requestOptions = {
  method: 'GET',
  redirect: 'follow'
};

fetch("https://eth-mainnet.g.alchemy.com/demo/v1/getNFTMetadata?contractAddress=0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d&tokenId=2&tokenType=erc721&refreshCache=true", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
```
{% endtab %}

{% tab title="JavaScript - jQuery" %}
```javascript
var settings = {
  "url": "https://eth-mainnet.g.alchemy.com/demo/v1/getNFTMetadata?contractAddress=0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d&tokenId=2&tokenType=erc721&refreshCache=true",
  "method": "GET",
  "timeout": 0,
};

$.ajax(settings).done(function (response) {
  console.log(response);
});
```
{% endtab %}

{% tab title="Postman" %}
```http
URL: https://eth-mainnet.g.alchemy.com/demo/v1/getNFTMetadata?contractAddress=0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d&tokenId=2&tokenType=erc721&refreshCache=true
RequestType: GET
```
{% endtab %}
{% endtabs %}

### Response

```json
{
    "contract": {
        "address": "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d"
    },
    "id": {
        "tokenId": "2",
        "tokenMetadata": {
            "tokenType": "ERC721"
        }
    },
    "title": "",
    "description": "",
    "tokenUri": {
        "raw": "ipfs://QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq/2",
        "gateway": "https://ipfs.io/ipfs/QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq/2"
    },
    "media": [
        {
            "uri": {
                "raw": "ipfs://QmcJYkCKK7QPmYWjp4FD2e3Lv5WCGFuHNUByvGKBaytif4",
                "gateway": "https://ipfs.io/ipfs/QmcJYkCKK7QPmYWjp4FD2e3Lv5WCGFuHNUByvGKBaytif4"
            }
        }
    ],
    "metadata": {
        "image": "ipfs://QmcJYkCKK7QPmYWjp4FD2e3Lv5WCGFuHNUByvGKBaytif4",
        "attributes": [
            {
                "value": "3d",
                "trait_type": "Eyes"
            },
            {
                "value": "Bored Cigarette",
                "trait_type": "Mouth"
            },
            {
                "value": "Robot",
                "trait_type": "Fur"
            },
            {
                "value": "Sea Captain's Hat",
                "trait_type": "Hat"
            },
            {
                "value": "Aquamarine",
                "trait_type": "Background"
            }
        ]
    },
    "timeLastUpdated": "2022-01-25T19:56:50.580Z"
}
```
