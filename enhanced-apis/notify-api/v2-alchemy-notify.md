---
description: >-
  Guide for using Version 2 of Alchemy Notify on Layer 2s (Polygon, Optimism,
  and Arbitrum).
---

# V2 Alchemy Notify

{% hint style="danger" %}
#### **Note:** The information below only applies to Alchemy Notify on Polygon, Optimism, and Arbitrum. For Webhooks on Ethereum see the [Using Alchemy Notify/Webhooks doc](using-notify.md).
{% endhint %}

To learn more about how webhooks work, check out [this guide](using-notify.md).&#x20;

## Types of Webhooks <a href="#types-of-wehooks" id="types-of-wehooks"></a>

There are three types of webhooks that are supported on Layer 2 chains: mined transactions, dropped transactions and address activity.&#x20;

### Webhook Format&#x20;

All webhook types have the same format:

* `webhookId`: Unique id for the webhook that this event was sent to&#x20;
* `id`: Unique id of the event itself&#x20;
* `createdAt`: Timestamp that the event was created
* `type`: Type of webhook event, can be `"MINED_TRANSACTION"`, `"DROPPED_TRANSACTION"`, or `"ADDRESS_ACTIVITY"`
* `event`: Object - event object, see mined transaction object, dropped transaction object and address activity object below

```
{
 "webhookId": "wh_octjglnywaupz6th",
 "id": "whevt_ogrc5v64myey69ux",
 "createdAt": "2021-12-07T03:52:45.899Z",
 "type": TYPE_STRING,
 "event": OBJECT
}
```

### 1. Mined Transactions <a href="#mined-transactions" id="mined-transactions"></a>

The Mined Transaction Webhook is used to notify your app anytime a transaction gets successfully mined that was sent through your Alchemy API key. This is extremely useful if you want to notify customers the moment their transactions goes through.

**Mined Transaction Event Object:**

`event`: Object - mined transaction object

* `appId`: Unique ID for Alchemy app that sent the transaction and is configured to this webhook
* `network`: Network for the event, can be `ARB_MAINNET`, `ARB_RINKEBY`, `MATIC_MAINNET`, `MATIC_MUMBAI`, `OPT_MAINNET`, `OPT_KOVAN`
* `transaction`: transaction object (same output as calling eth\_getTransactionByHash)

#### Example Response

```
{
 "webhookId": "wh_octjglnywaupz6th",
 "id": "whevt_ogrc5v64myey69ux",
 "createdAt": "2021-12-07T03:52:45.899Z",
 "type": "MINED_TRANSACTION",
 "event": {
  "appId": "j6tqmhfxlu9pa5r7",
  "network": "MATIC_MUMBAI",
  "transaction": {
   "blockHash": "0x0a50cb2068418da0d7746155be39cff624aaf6fca58fa7f86f139999947433db",
   "blockNumber": "0x154f434",
   "from": "0x829e20741ee472f628b260a591f9f78fb1a555f8",
   "gas": "0x5208",
   "gasPrice": "0xdf8475800",
   "hash": "0xc981aed4304084ddf2b82859c80dd31334fad3bcf2aa7ee15dfd646af0889b7d",
   "input": "0x",
   "nonce": "0x8",
   "to": "0x4577d79fc84838aee64ba8be8d250981dd4f3876",
   "transactionIndex": "0x1",
   "value": "0x0",
   "type": "0x0",
   "v": "0x27125",
   "r": "0xc07a6670796726674e213c4cf61763b59490b1b1c992b9323a1aad5e3c2cea88",
   "s": "0x22ce350c260b3dbd1ebc06ca00b18c127efd6c1b31136a104de1a6ea4aa3c0d2"
  }
 } 
}
```

### 2. Dropped Transactions <a href="#dropped-transactions" id="dropped-transactions"></a>

The Dropped Transactions Webhook is used to notify your app anytime a transaction gets dropped that was sent through your Alchemy API key.

**Dropped Transaction Event Object:**

`event`: Object - dropped transaction object

* `appId`: Unique ID for Alchemy app that sent the transaction and is configured to this webhook
* `network`: Network for the event, can be `ARB_MAINNET`, `ARB_RINKEBY`, `MATIC_MAINNET`, `MATIC_MUMBAI`, `OPT_MAINNET`, `OPT_KOVAN`
* `transaction`: transaction object  (same output as calling [_**eth\_getTransactionByHash**_](../../apis/ethereum/eth\_gettransactionbyhash.md#returns))

**Example Response**

```
{
 "webhookId": "wh_octjglnywaupz6th",
 "id": "whevt_ogrc5v64myey69ux",
 "createdAt": "2021-12-07T03:52:45.899Z",
 "type": "DROPPED_TRANSACTION",
 "event": {
  "appId": "j6tqmhfxlu9pa5r7",
  "network": "OPT_MAINNET",
  "transaction": {
   "hash": "0x5a4bf6970980a9381e6d6c78d96ab278035bbff58c383ffe96a0a2bbc7c02a4b",
    "blockHash": null,
    "blockNumber": null,
    "from": "0x8a9d69aa686fa0f9bbdec21294f67d4d9cfb4a3e",
    "gas": "0x5208",
    "gasPrice": "0x165a0bc00",
    "input": "0x",
    "nonce": "0x2f",
    "r": "0x575d26288c1e3aa63e80eea927f54d5ad587ad795ad830149837258344a87d7c",
    "s": "0x25f5a3abf22f5b8ef6ed307a76e670f0c9fb4a71fab2621fce8b52da2ab8fe82",
    "to": "0xd69b8ff1888e78d9c337c2f2e6b3bf3e7357800e",
    "transactionIndex": null,
    "v": "0x1c",
    "value": "0x1bc16d674ec80000"
  }
 } 
}
```

### 3. Address Activity

The Address Activity Webhook allows you to track all ETH, ERC20 and ERC721 external and internal [transfer events](../../guides/eth\_getlogs.md#what-are-transfers) for as many Ethereum addresses as you'd like (regardless if the transactions were sent through Alchemy or not). This provides your app with real-time state changes when an address sends or receives tokens.

{% hint style="info" %}
If you are looking for historical activity, check out the [Transfers API](../transfers-api/)!
{% endhint %}

#### Types of Transfers

There are three main types of transfers that are captured when receiving an address activity response.

**1. External Eth Transfers**

These are top level Ethereum transactions that occur with a from address being an external (user created) address. External addresses have private keys and are accessed by users.

**2. Token Transfers (ERC20, ERC721, ERC1155)**

These are event logs for any ERC20, ERC721, and ERC1155 transfers.

**3. Internal Eth Transfers**

These are transfers that occur where the `fromAddress` is an internal (smart contract) address. (ex: a smart contract calling another smart contract or smart contract calling another external address).

{% hint style="warning" %}
**NOTE:** Internal transfers are not yet available for `ARB_MAINNET`, `ARB_RINKEBY`, `MATIC_MAINNET`, `MATIC_MUMBAI`, `OPT_MAINNET`, `OPT_KOVAN`
{% endhint %}

{% hint style="info" %}
**NOTE:** We do not include any internal transfers with call type`delegatecall` because although they have a "value" associated with them they do not actually _transfer_ that value (see[ Appendix H of the Ethereum Yellow Paper](https://ethereum.github.io/yellowpaper/paper.pdf) if you're curious). We also do not include miner rewards as an internal transfer.
{% endhint %}

**Address Activity Event Object:**

`event`: Object - address activity object

* `network`: Network for the event, can be `ARB_MAINNET`, `ARB_RINKEBY`, `MATIC_MAINNET`, `MATIC_MUMBAI`, `OPT_MAINNET`, `OPT_KOVAN`
* `activity`: List of transfers whose from or to address matches the address configured in the webhook
  * `fromAddress`: from address of transfer (hex string).
  * `toAddress`: to address of transfer (hex string). `null` if contract creation.
  * `blockNum`: the block where the transfer occurred (hex string).
  * `hash`: transaction hash (hex string).
  * `category`: `external`, `internal`, or `token`- label for the transfer
  * `value`: converted asset transfer value as a number (raw value divided by contract decimal). `null` if erc721 transfer or contract decimal not available.
  * `asset`: `ETH` or the token's symbol. `null` if not defined in the contract and not available from other sources.
  * `erc721TokenId`: raw erc721 token id (hex string). `null` if not an erc721 token transfer
  * `erc1155Metadata`: A list of objects containing the ERC1155 `tokenId` (hex string) and `value` (hex string). `null` if not an ERC1155 transfer
  * `rawContract`
    * `rawValue`: raw transfer value (hex string). `null` if erc721 transfer
    * `address`: contract address (hex string). `null` if `external` or `internal` transfer
    * `decimal`: contract decimal (hex string). `null` if not defined in the contract and not available from other sources.
  * `typeTraceAddress`: the type of internal transfer (`call`, `staticcall`, `create`, `suicide`) followed by the trace address (ex. `call_0_1`).`null` if not internal transfer. (note you can use this as a unique id for internal transfers since they will have the same parent hash)
  * `log` : log emitted for the `token` transfer event. `null` if `external` or `internal` transfer

**Example Response**

```
{
  "webhookId": "wh_octjglnywaupz6th",
  "id": "whevt_ogrc5v64myey69ux",
  "createdAt": "2022-02-28T17:48:53.306Z",
  "type": "ADDRESS_ACTIVITY",
  "event": {
    "network": "MATIC_MAINNET",
    "activity": [
      {
        "category": "token",
        "fromAddress": "0x59479de9d374bdbcba6c791e5d036591976fe422",
        "toAddress": "0x59479de9d374bdbcba6c791e5d036591976fe425",
        "erc721TokenId": "0x1",
        "rawContract": {
          "rawValue": "0x",
          "address": "0x93C46aA4DdfD0413d95D0eF3c478982997cE9861"
        },
        "log": {
          "removed": false,
          "address": "0x93C46aA4DdfD0413d95D0eF3c478982997cE9861",
          "data": "0x",
          "topics": [
            "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
            "0x00000000000000000000000059479de9d374bdbcba6c791e5d036591976fe422",
            "0x00000000000000000000000059479de9d374bdbcba6c791e5d036591976fe425",
            "0x0000000000000000000000000000000000000000000000000000000000000001"
          ]
        }
      }
    ]
  }
}
```

## Webhook Signature and Security

If you want to make your webhooks extra secure, you can verify that they originated from Alchemy by generating a HMAC SHA-256 hash code using your unique webhook signing key.

### 1. Find your signing key

Navigate to the [Notify page](https://dashboard.alchemyapi.io/notify) in your dashboard, click on the three dots for the webhook you want to  get the signature for and copy the "signing key".&#x20;

![](<../../.gitbook/assets/Screen Shot 2021-12-13 at 10.41.56 AM.png>)

### 2. Validate the signature received

Every outbound request will contain a hashed authentication signature in the header which is computed by concatenating your signing key and request body then generating a hash using the HMAC SHA256 hash algorithm.

In order to verify this signature came from Alchemy, you simply have to generate the HMAC SHA256 hash and compare it with the signature received.

#### Example Request Header

```http
POST /yourWebhookServer/push HTTP/1.1
Content-Type: application/json;
X-Alchemy-Signature: your-hashed-signature
```

#### Example Signature Validation Function

{% tabs %}
{% tab title="JavaScript" %}
```javascript
function isValidSignature(request) {    
    const signingKey = 'Signing key from by Alchemy dashboard for your Webhook';
    const headers = request.headers;
    const signature = headers['x-alchemy-signature']; // Lowercase for NodeJS
    const body = request.body;    
    const hmac = crypto.createHmac('sha256', token) // Create a HMAC SHA256 hash using the auth token
    hmac.update(JSON.stringify(body), 'utf8') // Update the token hash with the request body using utf8
    const digest = hmac.digest('hex');     
    return (signature === digest); // If signature equals your computed hash, return true
}
```
{% endtab %}

{% tab title="Python" %}
```python
import hmac 
import hashlib 
import json 
def isValidSignature(request):
     signingKey = 'Signing key from by Alchemy dashboard for your Webhook';
     headers = request['headers'];
     signature = headers['x-alchemy-signature'];
     body = request['body'];
     string_body = json.dumps(body, separators=(',', ':'))
     digest = hmac.new(
          bytes(token, 'utf-8'),
          msg=bytes(string_body, 'utf-8'), 
          digestmod=hashlib.sha256
     ).hexdigest()
return (signature == digest);
```
{% endtab %}
{% endtabs %}

## Webhook IP Addresses

As an added security measure, you can ensure your webhook notification originated from Alchemy by verifying that the event originated from one of the following IP addresses:

{% hint style="warning" %}
**NOTE:** This does not apply for test webhooks done through the Notify dashboard.
{% endhint %}

```
54.236.136.17
34.237.24.169
```
