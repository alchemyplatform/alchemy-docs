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

There are two types of webhooks that are supported on Layer 2 chains: mined transactions and dropped transactions.&#x20;

### Webhook Format&#x20;

Both webhook types have the same format:

* `webhookId`: Unique id for the webhook that this event was sent to&#x20;
* `id`: Unique id of the event itself&#x20;
* `createdAt`: Timestamp that the event was created
* `type`: Type of webhook event, can be `"MINED_TRANSACTION"` or `"DROPPED_TRANSACTION"`
* `event`: Object - event object, see mined transaction object and dropped transaction object.
  * `appId`: Unique ID for Alchemy app configured with this webhook
  * `network`: Network for the event, can be `ARB_MAINNET`, `ARB_RINKEBY`, `MATIC_MAINNET`, `MATIC_MUMBAI`, `OPT_MAINNET`, `OPT_KOVAN`
  * `transaction`: transaction object

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

## Webhook Signature and Security

If you want to make your webhooks extra secure, you can verify that they originated from Alchemy by generating a HMAC SHA-256 hash code using your unique webhook signing key.

### 1. Find your signing key

Navigate to the [Notify page](https://dashboard.alchemyapi.io/notify) in your dashboard, click on the three dots for the webhook you want to  get the signature for and copy the "signing key".&#x20;

![](<../.gitbook/assets/Screen Shot 2021-12-13 at 10.41.56 AM.png>)

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
