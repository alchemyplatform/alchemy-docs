---
description: All the possible HTTP requests you can make when using the Notify API.
---

# Notify API

_**Want to learn more about Alchemy Notify? Check out this **_[_**guide on using Alchemy Notify and webhooks**_](../../guides/using-notify.md)_**:**_

{% content-ref url="../../guides/using-notify.md" %}
[using-notify.md](../../guides/using-notify.md)
{% endcontent-ref %}

We recommend using this Notify API to automate the creation of webhooks and when dealing with Address Activity Webhooks for **10+ addresses,** otherwise, you can easily create webhooks from the [dashboard](https://dashboard.alchemyapi.io/notify)!

{% hint style="info" %}
## `Note on API Parameters `

#### `X-Alchemy-Token`

Your Alchemy authentication token (`X-Alchemy-Token`) can be found in the upper right corner of your dashboard [Notify page](https://dashboard.alchemyapi.io/notify) under the "AUTH TOKEN" button.

#### `app_id`

Your `app_id` can be found within the URL of your specific app. For example, given the URL [https://dashboard.alchemyapi.io/apps/xfu8frt3wf94j7h5](https://dashboard.alchemyapi.io/apps/xfu8frt3wf94j7h5) your `app_id` would be `xfu8frt3wf94j7h5`

#### `webhook_type`

Each type of webhook is represented as a different integer:

* Mined Transactions: 0
* Dropped Transactions: 1
* Address Activity: 4
* Gas Price: 5

#### `webhook_id`

This is a unique identifier for the webhook. You can find the webhook\_id by first getting all your webhooks using the endpoint below, then looking at the parameter `"id"` for the specific webhook you want.&#x20;
{% endhint %}

{% swagger baseUrl="https://dashboard.alchemyapi.io" path="/api/team-webhooks" method="get" summary="Get all webhooks" %}
{% swagger-description %}
This endpoint allows you to get all webhooks from every app on your team.
{% endswagger-description %}

{% swagger-parameter in="header" name="X-Alchemy-Token" type="string" %}
Alchemy Auth token to use the Notify API (see note above).
{% endswagger-parameter %}

{% swagger-response status="200" description="Sample Response:   " %}
```
{
    "data": [
        {
            "id": 3,
            "app_id": "nd7cdkfe3cb4",
            "network": 0,
            "webhook_type": 1,
            "webhook_url": "http://www.YOUR-APP-URL.com",
            "is_active": true,
            "time_created": 1585779080000,
            "addresses": null
        },
        {
            "id": 17,
            "app_id": "pd63r8git3dlll0n",
            "network": 0,
            "webhook_type": 4,
            "webhook_url": "http://www.YOUR-APP-URL.com",
            "is_active": true,
            "time_created": 1596635655000,
            "addresses": [
                "0xfdb16996831753d5331ff813c29a93c76834a0ad",
                "0x6b175474e89094c44da98b954eedeac495271d0f",
                "0x48ea66f94518534ecbc863fbf521896d52b025d9",
                "0xdac17f958d2ee523a2206206994597c13d831ec7",
                "0x6f8d0c2a2c3a189803f5c6482c88be46a55058c1"
            ]
        }
    ]
}
```
{% endswagger-response %}
{% endswagger %}

#### Example Request

```
curl https://dashboard.alchemyapi.io/api/team-webhooks \
-X GET \
-H "X-Alchemy-Token":"your-X-Alchemy-Token"
```

{% swagger baseUrl="https://dashboard.alchemyapi.io" path="/api/create-webhook" method="post" summary="Create webhook" %}
{% swagger-description %}
This endpoint allows you to create a webhook.
{% endswagger-description %}

{% swagger-parameter in="header" name="X-Alchemy-Token" type="string" %}
Alchemy Auth token to use the Notify API (see note above for how to find it)
{% endswagger-parameter %}

{% swagger-parameter in="body" name="app_id" type="string" %}
App Id. See note above on where to find it.
{% endswagger-parameter %}

{% swagger-parameter in="body" name="webhook_type" type="integer" %}
An Integer representing webhook type.

\


Dropped Transactions: 1

\


Mined Transactions: 2

\


Address Activity: 4

\


Gas Price: 5

\



{% endswagger-parameter %}

{% swagger-parameter in="body" name="webhook_url" type="string" %}
URL where requests should be sent.
{% endswagger-parameter %}

{% swagger-parameter in="body" name="addresses" type="array" %}
List of addresses you want to track. For address activity webhooks only.
{% endswagger-parameter %}

{% swagger-parameter in="body" name="gas_price_low" type="integer" %}
If the gas price (in 10x gwei) is lower than this threshold, send a notification every minute. For gas price webhooks only.
{% endswagger-parameter %}

{% swagger-parameter in="body" name="gas_price_high" type="integer" %}
If the gas price (in 10x gwei) is higher than this threshold, send a notification every minute. For gas price webhooks only.
{% endswagger-parameter %}

{% swagger-parameter in="body" name="gas_price_type" type="integer" %}
Selects the metric to be used as the threshold price. 

\


SAFE_LOW = 0

\


AVERAGE = 1

\


FAST = 2

\


FASTEST = 3

\


For gas price webhooks only.
{% endswagger-parameter %}

{% swagger-response status="200" description="Sample response." %}
```
{
  "data": {
    "id": 103,
    "app_id": "nfu9f1t9fwf15r36",
    "network": 0,
    "webhook_type": 1,
    "webhook_url": "https://webhook.site/7bf2c41e-846e-45a7-8c17-556dd7f5103c",
    "is_active": true,
    "time_created": 1602618909000,
    "addresses": null,
    "gas_price_low": null,
    "gas_price_high": null,
    "gas_price_type": null
  }
}
```
{% endswagger-response %}
{% endswagger %}

#### Example Request&#x20;

Here is an example request for creating a dropped transaction webhook

```
curl https://dashboard.alchemyapi.io/api/create-webhook \
-X POST \
-H "X-Alchemy-Token":"your-X-Alchemy-Token" \
-d '{"app_id":"your-app_id","webhook_type":1,"webhook_url":"https://webhook.site/7bf2c41e-846e-45a7-8c17-556dd7f5103c"}'
```

{% swagger baseUrl="https://dashboard.alchemyapi.io" path="/api/update-webhook-addresses" method="patch" summary="Add/remove webhook addresses " %}
{% swagger-description %}
Add or remove addresses from a specific webhook. 
{% endswagger-description %}

{% swagger-parameter in="header" name="X-Alchemy-Token" type="string" %}
Alchemy Auth token to use the Notify API
{% endswagger-parameter %}

{% swagger-parameter in="body" name="webhook_id" type="number" %}
Identifier for the webhook. See note above on how to find it.
{% endswagger-parameter %}

{% swagger-parameter in="body" name="addresses_to_add" type="array" %}
List of addresses to add, use [] if none.
{% endswagger-parameter %}

{% swagger-parameter in="body" name="addresses_to_remove" type="array" %}
List of addresses to remove, use [] if none.
{% endswagger-parameter %}

{% swagger-response status="200" description="" %}
```
{}
```
{% endswagger-response %}
{% endswagger %}

**Example Request**

```
curl https://dashboard.alchemyapi.io/api/update-webhook-addresses \
-X PATCH \
-H "X-Alchemy-Token":"your-X-Alchemy-Token" \ 
-d '{"webhook_id":27,"addresses_to_add":["0xfdb16996831753d5331ff813c29a93c76834a0ad","0x48ea66f94518534ecbc863fbf521896d52b025d9", "0x6f8d0c2a2c3a189803f5c6482c88be46a55058c1"], "addresses_to_remove":[]}'
```

{% swagger baseUrl="https://dashboard.alchemyapi.io" path="/api/update-webhook" method="put" summary="" %}
{% swagger-description %}

{% endswagger-description %}

{% swagger-parameter in="path" name="" type="string" %}

{% endswagger-parameter %}

{% swagger-response status="200" description="" %}
```
```
{% endswagger-response %}
{% endswagger %}

{% swagger baseUrl="https://dashboard.alchemyapi.io" path="/api/update-webhook-addresses" method="put" summary="Update webhook addresses" %}
{% swagger-description %}
Used to update webhook addresses, replacing any existing addresses. 
{% endswagger-description %}

{% swagger-parameter in="header" name="X-Alchemy-Token" type="string" %}
Alchemy Auth token to use the Notify API
{% endswagger-parameter %}

{% swagger-parameter in="body" name="webhook_id" type="integer" %}
Identifier for the webhook. See note above on how to find it.
{% endswagger-parameter %}

{% swagger-parameter in="body" name="addresses" type="array" %}
New list of addresses to track. This replaces any existing addresses.
{% endswagger-parameter %}

{% swagger-response status="200" description="" %}
```
{}
```
{% endswagger-response %}
{% endswagger %}

#### Example Request&#x20;

```
curl https://dashboard.alchemyapi.io/api/update-webhook-addresses \
-X PUT \
-H "X-Alchemy-Token":"your-X-Alchemy-Token" \ 
-d '{"webhook_id":104,"addresses":["0x6f8d0c2a2c3a189803f5c6482c88be46a55058c1","0xfdb16996831753d5331ff813c29a93c76834a0ad"]}'
```

{% swagger baseUrl="https://dashboard.alchemyapi.io" path="/api/update-webhook" method="put" summary="" %}
{% swagger-description %}
Allows you to set active status of webhooks to 

`active`

 or 

`inactive`

. 
{% endswagger-description %}

{% swagger-parameter in="header" name="X-Alchemy-Token" type="string" %}
Alchemy Auth token to use the Notify API
{% endswagger-parameter %}

{% swagger-parameter in="body" name="webhook_id" type="integer" %}
Identifier for the webhook. See note above on how to find it
{% endswagger-parameter %}

{% swagger-parameter in="body" name="is_active" type="boolean" %}
True - set webhook to active state

\


False - set webhook to inactive state
{% endswagger-parameter %}

{% swagger-response status="200" description="" %}
```
{}
```
{% endswagger-response %}
{% endswagger %}

#### Example Request

```
curl https://dashboard.alchemyapi.io/api/update-webhook \
-X PUT \
-H "X-Alchemy-Token":"your-X-Alchemy-Token" \ 
-d '{"webhook_id":104,"is_active":False}'
```

{% swagger baseUrl="https://dashboard.alchemyapi.io" path="/api/delete-webhook" method="delete" summary="Delete webhook" %}
{% swagger-description %}
Delete a webhook.
{% endswagger-description %}

{% swagger-parameter in="header" name="X-Alchemy-Token" type="string" %}
Auth token for Notify API
{% endswagger-parameter %}

{% swagger-parameter in="body" name="webhook_id" type="integer" %}
Identifier for the webhook. See note above on how to find it.
{% endswagger-parameter %}

{% swagger-response status="200" description="" %}
```
{}
```
{% endswagger-response %}
{% endswagger %}

#### Example Request

```
curl https://dashboard.alchemyapi.io/api/delete-webhook?webhook_id=104 \
-X DELETE \
-H "X-Alchemy-Token":"your-X-Alchemy-Token" \
```

## Types of Webhooks

To see in depth explanations for each of the Alchemy Notify webhooks check out the [Using Webhooks](../../guides/using-notify.md) guide.&#x20;

### Mined Transaction <a href="mined-transactions" id="mined-transactions"></a>

The Mined Transaction Webhook is used to notify your app anytime a transaction sent through your API key gets successfully mined. This is extremely useful if you want to notify customers the moment their transactions goes through.

#### Example Response

```
{
  "app": "Demo", 
  "network": "MAINNET",
  "webhookType": "MINED_TRANSACTION",
  "fullTransaction": {
    "hash": "0x5a4bf6970980a9381e6d6c78d96ab278035bbff58c383ffe96a0a2bbc7c02a4b",
    "blockHash": "0xaa20f7bde5be60603f11a45fc4923aab7552be775403fc00c2e6b805e6297dbe",
    "blockNumber": "0x989680",
    "from": "0x8a9d69aa686fa0f9bbdec21294f67d4d9cfb4a3e",
    "gas": "0x5208",
    "gasPrice": "0x165a0bc00",
    "input": "0x",
    "nonce": "0x2f",
    "r": "0x575d26288c1e3aa63e80eea927f54d5ad587ad795ad830149837258344a87d7c",
    "s": "0x25f5a3abf22f5b8ef6ed307a76e670f0c9fb4a71fab2621fce8b52da2ab8fe82",
    "to": "0xd69b8ff1888e78d9c337c2f2e6b3bf3e7357800e",
    "transactionIndex": "0x66",
    "v": "0x1c",
    "value": "0x1bc16d674ec80000"
  },
  "timestamp": "2020-07-29T00:29:18.414Z"
}
```

### Dropped Transactions <a href="dropped-transactions" id="dropped-transactions"></a>

The Dropped Transactions Webhook is used to notify your app anytime a transaction send through your API key gets dropped.

#### Example Response

```
{
  "app": "Alchemy Mainnet",
  "network": "MAINNET",
  "webhookType": "DROPPED_TRANSACTION",
  "timestamp": "2020-06-08T22:12:57.126Z",
  "fullTransaction": {
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
```

### Address Activity <a href="address-activity" id="address-activity"></a>

The Address Activity Webhook allows you to track all ETH, ERC20 and ERC721 [transfer events](../../guides/eth\_getlogs.md#what-are-transfers) for as many Ethereum addresses as you'd like. This provides your app with real-time state changes when an address sends or receives tokens. For more details on this API specification check out the page below.

{% content-ref url="../../guides/using-notify.md" %}
[using-notify.md](../../guides/using-notify.md)
{% endcontent-ref %}

{% hint style="info" %}
If you are looking for historical activity, check out the [Transfers API](transfers-api.md)!&#x20;
{% endhint %}

**Example Response**

```
{
  "app": "Test webhooks",
  "network": "MAINNET",
  "webhookType": "ADDRESS_ACTIVITY",
  "timestamp": null,
  "activity": [
    {
      "blockNum": "0xcec92a",
      "hash": "0xbcbbd7c7de7b835939fb14d4ebe4d31ea6167f4c27c6f0940bb3fa1a90867abe",
      "fromAddress": "0x86005b57be708e031ea60acf9d3852377e74a6c9",
      "toAddress": "0x7a250d5630b4cf539739df2c5dacb4c659f2488d",
      "value": 0.1,
      "erc721TokenId": null,
      "erc1155Metadata": null,
      "asset": "WETH",
      "category": "token",
      "rawContract": {
        "rawValue": "0x000000000000000000000000000000000000000000000000016345785d8a0000",
        "address": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        "decimals": 18
      },
      "typeTraceAddress": null,
      "log": {
        "address": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        "topics": [
          "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
          "0x00000000000000000000000086005b57be708e031ea60acf9d3852377e74a6c9",
          "0x0000000000000000000000007a250d5630b4cf539739df2c5dacb4c659f2488d"
        ],
        "data": "0x000000000000000000000000000000000000000000000000016345785d8a0000",
        "blockNumber": "0xcec92a",
        "transactionHash": "0xbcbbd7c7de7b835939fb14d4ebe4d31ea6167f4c27c6f0940bb3fa1a90867abe",
        "transactionIndex": "0x4",
        "blockHash": "0xb75dbed0d0c362fad4171c0e6bebb6e14288b871c02b82a3fc97ca8e05ed2fe2",
        "logIndex": "0x11",
        "removed": false
      }
    },
    {
      "fromAddress": "0xca92a49187edce00ba235634b4ca13e89abb33fe",
      "toAddress": "0x9f5c880690e8a9dc7ce1142e304515eeb8b55e8f",
      "blockNum": "0x97c8c1",
      "category": "token",
      "hash": "0x5f07f0a4ebb894ac2e4d5f0e03b50bfa7e1933f3c7641795500c806f77d9e592",
      "value": null,
      "erc721TokenId": "0x1",
      "asset": "API",
      "rawContract": {
        "rawValue": "0x",
        "address": "0x4c4a07f737bf57f6632b6cab089b78f62385acae",
        "decimals": null
      }
      "typeTraceAddress": null
      "log": null
    },
    {
      "blockNum": "0xbe09fa",
      "hash": "0x1635135c035cd81320e444f4dd88296f408ee7305c3e07f7863e3142d017ec45",
      "fromAddress": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
      "toAddress": "0xe592427a0aece92de3edee1f18e0157c05861564",
      "value": 0.33974794305157613,
      "asset": "ETH",
      "category": "internal",
      "erc721TokenId": null,
      "typeTraceAddress": "call_1_1_0",
      "rawContract": {
        "rawValue": "0x4b706f442c2433c",
        "address": null,
        "decimals": 18
      }
      "log": null
    },
    {
      "fromAddress": "0x38f22e75642b91568ba9bdbf94c9c843b38f2721",
      "toAddress": "0x7a250d5630b4cf539739df2c5dacb4c659f2488d",
      "blockNum": "0xbe09fb",
      "hash": "0x9ff35291bcc0a1b359c1360c8a9f7eef0d7c48a1db5d0520aedebf2c8a8e3eb6",
      "category": "external",
      "value": 0.2,
      "erc721TokenId": null,
      "asset": "ETH",
      "rawContract": {
        "rawValue": "0x2c68af0bb140000",
        "address": null,
        "decimals": 18
      },
      "typeTraceAddress": null
      "log": null
    },
  ]
}
```

### Gas Price

The Gas Price Webhook allows you to receive a notification every minute when the Mainnet gas price rises above or drops below a certain threshold that you can select. It works by pulling the current gas prices from [ETH Gas Station](https://ethgasstation.info) every minute.

Gas prices typically fall in a range, where a lower gas price means that the transaction will take longer to be mined, and a higher gas price means that the transaction will be mined more quickly. The Execution Speed metric allows you to specify a metric in that range that you would like to receive notifications, corresponding to ETH Gas Station's [Price Type metric documented here](https://docs.ethgasstation.info/gas-price). For example, selecting an Average Execution Speed means that you will receive notifications when a gas price typically mined in under 5 minutes rises above or drops below your selected threshold

**Example Response**

```
{
  "app": "Alchemy Mainnet",
  "network": "MAINNET",
  "timestamp": "2020-09-09T15:14:19.175Z",
  "gasPriceMetadata": {
    "fast": 160,
    "fastest": 167,
    "safeLow": 147,
    "average": 150,
    "block_time": 11.894736842105264,
    "blockNum": 10828228,
    "speed": 0.9968284026882861,
    "safeLowWait": 14.6,
    "avgWait": 3.9,
    "fastWait": 0.4,
    "fastestWait": 0.4
  }
}
```

For instructions on how to set up webhooks from the dashboard check out the page below:

{% content-ref url="../../guides/using-notify.md" %}
[using-notify.md](../../guides/using-notify.md)
{% endcontent-ref %}
