---
description: Guide for using the Alchemy Tranfers API on Layer 2s
---

# Layer 2: Transfers API

{% hint style="info" %}
#### **NOTE:** The information below only applies to the Alchemy Transfers API on Polygon.&#x20;
{% endhint %}

The Transfers API allows you to easily fetch historical transactions for any address without having to scan the entire chain and index everything for each of your users.  With this Polygon API endpoint, users can now query all types of historical MATIC transactions for a given address in a single request.

## Types of Transfers <a href="#types-of-transfers" id="types-of-transfers"></a>

### 1. External MATIC Transfers <a href="#1.-external-eth-transfers" id="1.-external-eth-transfers"></a>

These are top-level Polygon transactions that occur with a from address being an external (user-created) address. External addresses have private keys and are accessed by users.

### 2. Token Transfers <a href="#2.-erc20-transfers" id="2.-erc20-transfers"></a>

Event logs for **ERC20** (fungible tokens), **ERC721** (NFTs), and **ERC1155** (hybrid fungible and non-fungible tokens) transfers.

### 3. Internal MATIC Transfers  <a href="#3.-erc721-transfers" id="3.-erc721-transfers"></a>

These are transfers that occur where the `fromAddress` is an internal (smart contract) address. (ex: a smart contract calling another smart contract or smart contract calling another external address).

{% hint style="warning" %}
**NOTE:** External and internal MATIC transfers are not currently supported by the Transfers API on Polygon. Please free to [upvote and comment](https://roadmap.alchemy.com/b/feature-requests/support-internal-external-transfers-on-polygon) to add this to our roadmap.
{% endhint %}

## `alchemy_getAssetTransfers` <a href="#alchemy_getassettransfers" id="alchemy_getassettransfers"></a>

{% hint style="info" %}
**NOTE:**`alchemy_getAssetTransfers` for Polygon is available on MATIC mainnet and Mumbai testnet.
{% endhint %}

#### Parameters <a href="#parameters" id="parameters"></a>

* Parameters:
  * Object - An object with the following fields (required):
    * `fromBlock`: inclusive from block (hex string or `latest`). optional (defaults to`latest`)
    * `toBlock`: inclusive to block (hex string or `latest`). optional (defaults to `latest`)
    * `fromAddress`: from address (hex string). optional (default wildcard - any address)
    * `toAddress`: to address (hex string). optional (default wildcard - any address)
    * `contractAddresses`: list of contract addresses (hex strings) for `token` transfers. optional (default wildcard - any address)
    * `category`: Optional array of categories, can be any of the following: "`external`", "`internal`", "`token`", "`erc20`", "`erc721`", "`erc1155`" (defaults to the following categories: \["`external`", "`internal`", "`token`"])
    * `excludeZeroValue:` a`Boolean` to exclude transfers with zero value. optional (default `true`)
    * `maxCount`: max hex string number of results to return per call. optional (default and max`1000` or `0x3e8`)
    * `pageKey`: `uuid` for [pagination](https://docs.alchemy.com/alchemy/enhanced-apis/transfers-api#pagination). optional. If more results are available, a uuid pageKey will be returned in the response. Pass that uuid into `pageKey` to fetch the next 1000 or `maxCount.`

{% hint style="info" %}
**NOTE**: `fromAddress` and `toAddress` are `AND`ed together when filtering.
{% endhint %}

{% hint style="info" %}
**NOTE**: `contractAddresses` are `OR` ed together. This filter will then be `AND`ed with `fromAddress` and `toAddress`.
{% endhint %}

#### Returns <a href="#returns" id="returns"></a>

* Response Payload:
  * `id`: json-rpc id
  * `jsonrpc`: json-rpc version
  * `result`: an object with the following fields:
    * `pageKey`: uuid of next page of results (if exists, else blank).
    * `transfers:` array of objects (defined below) - sorted in ascending order by block number, ties broken by category (`external` , `internal`, `token`)
* Object schema:
  * `category`: "`external`", "`internal`", "`token`", "`erc20`", "`erc721`", "`erc1155`" - label for the transfer
    * "`token`" includes "`erc20`" and "`erc721`" transfers
  * `blockNum`: the block where the transfer occurred (hex string).
  * `from`: from address of transfer (hex string).
  * `to`: to address of transfer (hex string). `null` if contract creation.
  * `value`: converted asset transfer value as a number (raw value divided by contract decimal). `null` if ERC721 transfer or contract decimal not available.
  * `erc721TokenId`: raw ERC721 token id (hex string). `null` if not an ERC721 token transfer
  * `erc1155Metadata`: A list of objects containing the ERC1155 `tokenId` (hex string) and `value` (hex string). `null` if not an ERC1155 transfer
  * `asset`: `ETH` or the token's symbol. `null` if not defined in the contract and not available from other sources.
  * `hash`: transaction hash (hex string).
  * `rawContract`
    * `value`: raw transfer value (hex string). `null` if ERC721 or ERC1155 transfer
    * `address`: contract address (hex string). `null` if `external` or `internal` transfer
    * `decimal`: contract decimal (hex string). `null` if not defined in the contract and not available from other sources.

#### [​Example​](https://bit.ly/3ofZsYM) <a href="#example" id="example"></a>

#### Request <a href="#example" id="example"></a>

{% tabs %}
{% tab title="Curl" %}
```bash
curl https://polygon-mainnet.alchemyapi.io/v2/your-api-key \
-X POST \
-H "Content-Type: application/json" \
-d'{"jsonrpc":"2.0", "id": 1, "method":"alchemy_getAssetTransfers","params":[{"fromBlock": "0xA97AB8", "toBlock": "0xA97CAC", "fromAddress": "0x3f5CE5FBFe3E9af3971dD833D26bA9b5C936f0bE", "contracts": ["0x7fc66500c84a76ad7e9c93437bfc5ac33e2ddae9"], "category": ["external", "internal", "token"], "maxCount": "0x5"}]}'
```
{% endtab %}

{% tab title="Postman" %}
```http
URL: https://eth-mainnet.alchemyapi.io/v2/your-api-key
RequestType: POST
Body: 
{
  "jsonrpc": "2.0",
  "id": 0,
  "method": "alchemy_getAssetTransfers",
  "params": [
    {
      "fromBlock": "0xA97AB8",
      "toBlock": "0xA97CAC",
      "fromAddress": "0x3f5CE5FBFe3E9af3971dD833D26bA9b5C936f0bE",
      "contractAddresses": [
        "0x7fc66500c84a76ad7e9c93437bfc5ac33e2ddae9"
      ],
      "maxCount": "0x5",
      "excludeZeroValue": true,
      "category": [
        "external",
        "token"
      ]
    }
  ]
}
```
{% endtab %}
{% endtabs %}



#### Response <a href="#returns" id="returns"></a>

```
{
"id":0
    "result":{
        "transfers":[
            0:{
                "blockNum":"0x16c5378"
                "hash":"0x1e85ace98f4fc4ad7b1b64465df81d0a275d494421e553e23a238b156f42b17f"
                "from":"0x5350e1068f0e138ff306990b16fa4910d970c692"
                "to":"0x9d2b758e3ffd2569c6956676fae7f8b71a53ffb5"
                "value":NULL
                "erc721TokenId":NULL
                "erc1155Metadata":NULL
                "tokenId":NULL
                "asset":NULL
                "category":"erc20"
                "rawContract":{...}
            }
        ]
    }
"jsonrpc":"2.0"
}
```

## Pagination <a href="#pagination" id="pagination"></a>

There are two cases in which pagination will be required:

1. If you have a specific number of responses that you want to receive in a given payload
2. If you receive a response with more than 1000 results.

In the first case, you should use the `maxCount` parameter in your request to specify the number of responses you wish to receive. If there are more results than specified in `maxCount`, you will receive a value for `pageKey` in your result which you should use to fetch the next response load by putting the returned `pageKey` value in the `pageKey` parameter of your next request. Continue to do so until a `pageKey` is no longer returned (meaning you've fetched all the results).In the second case, you will also receive a value for `pageKey` in the response, which you should use to fetch the next 1000 (or however many is left) by putting the returned `pageKey` value in the `pageKey` parameter of your next request.**NOTE:** Each page key has a TTL (Time to Live) of 10 minutes so if you receive a response with a `pageKey` value you must send the next request (with the `pageKey`) within the 10 minute window, otherwise you will have to restart the entire request cycle.
