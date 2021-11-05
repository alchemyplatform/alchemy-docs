---
description: >-
  The Transfers API allows you to easily fetch historical transactions for any
  address without having to scan the entire chain and index everything for each
  of your users.
---

# Transfers API

Transfers are a representation of value being exchanged between two accounts. Often times users wish to see the historical transactions associated with a specific account or address. This is currently an extremely challenging and inefficient task, requiring users to scan the entire blockchain and index everything to search for transactions associated with the desired address. However, with the Transfers API users can query all types of historical transactions for a given address in a single request.&#x20;

**If you don't have an account yet, **[**you can sign up with Alchemy for free**](https://alchemy.com/?r=affiliate:4cf7f72f-9238-45c4-a230-6840fcd048ae)**. **

{% hint style="success" %}
**TIP:  **Check out[ this tutorial](../../tutorials/transfers-tutorial.md) on [integrating historical transaction data into your dApp](../../tutorials/transfers-tutorial.md)  to learn how to get started using the Transfers API!&#x20;
{% endhint %}

## Types of Transfers

There are five main types of transfers that are captured when using this API. &#x20;

### 1. External Eth Transfers

These are top level ethereum transactions that occur with a from address being an external (user created) address. External addresses have private keys and are accessed by users.&#x20;

### 2. ERC20 Transfers

Event logs for ERC20 transfers.&#x20;

{% hint style="info" %}
**NOTE: **ERC20 Transfers are also included in the "`token`" category
{% endhint %}

### 3. ERC721 Transfers

Event logs for ERC721 transfers.&#x20;

{% hint style="info" %}
**NOTE: **ERC721 Transfers are also included in the "`token`" category
{% endhint %}

### 4. ERC1155 Transfers&#x20;

These are event logs for ERC1155 transfers.&#x20;

### 5. Internal Eth Transfers

These are transfers that occur where the `fromAddress` is an internal (smart contract) address.  (ex: a smart contract calling another smart contract or smart contract calling another external address).&#x20;

{% hint style="info" %}
**NOTE:  **For efficiency, we do not return **internal transfers with 0 value** as they don't provide useful information without digging deeper into the internal transaction itself. If you are interested in these type of events see our [Trace API](trace-api.md).&#x20;

Additionally, we do not include any **internal transfers with call type`delegatecall `**because although they have a _value  _associated with them they do not actually _transfer_  that value (see[ Appendix H of the Ethereum Yellow Paper](https://ethereum.github.io/yellowpaper/paper.pdf) if you're curious). We also do not include miner rewards as an internal transfer.
{% endhint %}

## `alchemy_getAssetTransfers`

{% hint style="warning" %}
**NOTE: **`alchemy_getAssetTransfers` is currently only available on **Mainnet**.
{% endhint %}

#### Parameters

* Parameters:
  * Object - An object with the following fields (required):
    * `fromBlock`: inclusive from block (hex string or `latest`). optional (defaults to`latest`)
    * `toBlock`: inclusive to block (hex string or `latest`). optional (defaults to `latest`)
    * `fromAddress`: from address (hex string). optional (default wildcard - any address)
    * `toAddress`: to address (hex string). optional (default wildcard - any address)
    * `contractAddresses`: list of contract addresses (hex strings) for `token `transfers. optional (default wildcard - any address)
    * `category`: Optional array of categories, can be any of the following: "`external`", "`internal`", "`token`", "`erc20`", "`erc721`", "`erc1155`" (defaults to the following categories: \["`external`", "`internal`", "`token`"])
    * `excludeZeroValue:` a`Boolean` to exclude transfers with zero value. optional (default `true`)
    * `maxCount`: max hex string number of results to return per call. optional (default and max`1000` or `0x3e8`)
    * `pageKey`: `uuid` for [pagination](transfers-api.md#pagination). optional. If more results are available, a uuid pageKey will be returned in the response. Pass that uuid into `pageKey` to fetch the next 1000 or `maxCount.`
* **NOTE**: `fromAddress` and `toAddress` are `AND`ed together when filtering.
* **NOTE**:` contractAddresses` are `OR` ed together. This filter will then be `AND`ed with `fromAddress` and `toAddress`.&#x20;

#### Returns

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

#### [Example](https://composer.alchemyapi.io/?composer\_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22alchemy\_getAssetTransfers%22%2C%22paramValues%22%3A%5B%7B%22fromBlock%22%3A%220xA97AB8%22%2C%22toBlock%22%3A%220xA97CAC%22%2C%22contractAddresses%22%3A%22%5B%5C%220x7fc66500c84a76ad7e9c93437bfc5ac33e2ddae9%5C%22%5D%22%2C%22maxCount%22%3A%225%22%2C%22fromAddress%22%3A%220x3f5CE5FBFe3E9af3971dD833D26bA9b5C936f0bE%22%2C%22excludeZeroValue%22%3Atrue%2C%22category%22%3A%5B%22external%22%2C%22token%22%5D%7D%5D%7D)

Request

{% tabs %}
{% tab title="Curl" %}
```bash
curl https://eth-mainnet.alchemyapi.io/v2/your-api-key \
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

Result

```javascript
{
  "id": 0,
  "result": {
    "transfers": [
      {
        "blockNum": "0xa97ae2",
        "hash": "0x6b0b85a7d202fbec16aea70f876298283b44b00629a3b472fbcadf2f9436e5fd",
        "from": "0x3f5ce5fbfe3e9af3971dd833d26ba9b5c936f0be",
        "to": "0xb4caa764e2bf087f1a7a0cec43250892022787d9",
        "value": 2.995,
        "erc721TokenId": null,
        "asset": "ETH",
        "category": "external",
        "rawContract": {
          "value": "0x299060a1be4b8000",
          "address": null,
          "decimal": "0x12"
        }
      },
      {
        "blockNum": "0xa97ae2",
        "hash": "0x8cc39a71b5da3abab46460a990f1e999e74428b4b075053f98d675656107f4f8",
        "from": "0x3f5ce5fbfe3e9af3971dd833d26ba9b5c936f0be",
        "to": "0x66ee6fc2c17b3a2624c06ae8783eb265a747a23d",
        "value": 0.1,
        "erc721TokenId": null,
        "asset": "ETH",
        "category": "external",
        "rawContract": {
          "value": "0x16345785d8a0000",
          "address": null,
          "decimal": "0x12"
        }
      },
      {
        "blockNum": "0xa97ae2",
        "hash": "0x8f8b1af8041b2c32eb4fb1b236c2523b28038c2a510ec48948749bc6bddf2824",
        "from": "0x3f5ce5fbfe3e9af3971dd833d26ba9b5c936f0be",
        "to": "0x8187d27641eaa9eca3a80f7a2f37af192fa43507",
        "value": 0.495,
        "erc721TokenId": null,
        "asset": "ETH",
        "category": "external",
        "rawContract": {
          "value": "0x6de97e09bd18000",
          "address": null,
          "decimal": "0x12"
        }
      },
      {
        "blockNum": "0xa97ae2",
        "hash": "0xb322ec7cf57d56b7250f36d7c59f0e7d96de05218ab402f345d4507829516f02",
        "from": "0x3f5ce5fbfe3e9af3971dd833d26ba9b5c936f0be",
        "to": "0xe535d87c42d21af3166eb00bbace668b13d55ec7",
        "value": 17.625,
        "erc721TokenId": null,
        "asset": "ETH",
        "category": "external",
        "rawContract": {
          "value": "0xf498941e66428000",
          "address": null,
          "decimal": "0x12"
        }
      },
      {
        "blockNum": "0xa97ae2",
        "hash": "0x56a00d5fac0dcacfe1cd950c49506712ec5bf319e246701321e8a92643da349d",
        "from": "0x3f5ce5fbfe3e9af3971dd833d26ba9b5c936f0be",
        "to": "0xfd5d6417fdcf02f0627aafa9e594a67d4485642d",
        "value": 5.73621309,
        "erc721TokenId": null,
        "asset": "ETH",
        "category": "external",
        "rawContract": {
          "value": "0x4f9b1f69e1655400",
          "address": null,
          "decimal": "0x12"
        }
      }
    ],
    "pageKey": "755207c2-d187-40fe-87aa-f43e71126777"
  },
  "jsonrpc": "2.0"
}
```

## Pagination&#x20;

There are two cases in which pagination will be required:

1. If you have a specific number of responses that you want to receive in a given payload
2. If you receive a response with more than 1000 results.

In the first case, you should use the `maxCount` parameter in your request to specify the number of responses you wish to receive. If there are more results than specified in `maxCount`, you will receive a value for `pageKey` in your result which you should use to fetch the next response load by putting the returned `pageKey` value in the `pageKey` parameter of your next request. Continue to do so until a `pageKey` is no longer returned (meaning you've fetched all the results).

In the second case, you will also receive a value for `pageKey` in the response, which you should use to fetch the next 1000 (or however many is left) by putting the returned `pageKey` value in the `pageKey` parameter of your next request.

{% hint style="danger" %}
**NOTE: **Each page key has a TTL (Time to Live) of 10 minutes so if you receive a response with a `pageKey` value  you must send the next request (with the `pageKey`) within the 10 minute window, otherwise you will have to restart the entire request cycle.&#x20;
{% endhint %}
