---
description: >-
  Webhooks for address activity, mined transactions, dropped transactions, and
  gas price on Ethereum, Polygon, Optimism, and Arbitrum.
---

# Notify API

_**Want to learn more about how to use Alchemy Notify? Check out this** _ [_**guide on using Alchemy Notify and webhooks**_](using-notify.md)_**:**_

{% content-ref url="using-notify.md" %}
[using-notify.md](using-notify.md)
{% endcontent-ref %}

## When to use the Notify API

We recommend using the Alchemy Notify API to automate the creation of webhooks, especially when dealing with Address Activity Webhooks for **10+ addresses,** otherwise, you can easily create webhooks from within the [dashboard](https://dashboard.alchemyapi.io/notify)!

## Notify API Parameters

There are several parameters to understand when using the Notify API.

#### **`X-Alchemy-Token`**

Your Alchemy authentication token (`X-Alchemy-Token`) can be found in the upper right corner of your dashboard [Notify page](https://dashboard.alchemyapi.io/notify) under the "AUTH TOKEN" button.

#### **`app_id`**

Your `app_id` can be found within the URL of your specific app. For example, given the URL [https://dashboard.alchemyapi.io/apps/xfu8frt3wf94j7h5](https://dashboard.alchemyapi.io/apps/xfu8frt3wf94j7h5) your `app_id` would be `xfu8frt3wf94j7h5`

#### **`webhook_type`**

Each type of webhook is represented as a different string enum:

* "MINED\_TRANSACTION"
* "DROPPED\_TRANSACTION"
* "ADDRESS\_ACTIVITY"
* "GAS\_PRICE"

#### **`network`**

Each type of supported network is represented as a different string enum:

* "ETH\_MAINNET"
* "ETH\_GOERLI"
* "ETH\_ROPSTEN"
* "ETH\_RINKEBY"
* "ETH\_KOVAN"
* "MATIC\_MAINNET"
* "MATIC\_MUMBAI"
* "ARB\_MAINNET"
* "ARB\_RINKEBY"
* "OPT\_MAINNET"
* "OPT\_KOVAN"

**`webhook_id`**

This is a unique identifier for the webhook. You can find the `webhook_id` by first getting all your webhooks using the endpoint below, then looking at the parameter `"id"` for the specific webhook you want.

## API Endpoints&#x20;

The following endpoints are supported for [all networks](./#network).

{% hint style="info" %}
### V1 vs. V2

All API Endpoints below are supported for both V1 and V2 versions of Alchemy Notify, however, the response payloads for both versions will differ, see the [the difference between V1 and V2 question](using-notify.md#whats-the-difference-between-notify-v1-and-v2) for more info.

_**NOTE:**  **We highly recommend switching over to V2 webhooks, all net-new webhooks created after Tuesday, April 26th, 2022 will be V2.**_&#x20;
{% endhint %}

{% swagger baseUrl="https://dashboard.alchemyapi.io" path="/api/team-webhooks" method="get" summary="Get all webhooks" %}
{% swagger-description %}
This endpoint allows you to get all webhooks from every app on your team.
{% endswagger-description %}

{% swagger-parameter in="header" name="X-Alchemy-Token *REQUIRED*" type="String" required="true" %}
Alchemy 

[Auth token](./#x-alchemy-token)

 to use the Notify API 
{% endswagger-parameter %}

{% swagger-response status="200" description="Returns list of webhook objects" %}
{% tabs %}
{% tab title="Example" %}
* `data`: list of webhooks for your team
  * `id`: unique ID for given webhook&#x20;
  * ``[`app_id`](./#app\_id): ID for alchemy app
  * ``[`network`](./#network): Network for given webhook
  * ``[`webhook_type`](./#webhook\_type): Type of webhook
  * `webhook_url`: URL endpoint where webhook is sent
  * `is_active`: (`boolean`) `true` if webhook is active, `false` if not active.
  * `time_created`: timestamp webhook was created&#x20;
  * `version`: `V1` or `V2`

```
{
    "data": [
        {
            "id": 3,
            "app_id": "nd7cdkfe3cb4",
            "network": "ETH_MAINNET",
            "webhook_type": "MINED_TRANSACTION",
            "webhook_url": "https://webhook.site/f850be75-1672-483c-8c05-00c45c881da4",
            "is_active": true,
            "time_created": 1585779080000,
            "version":"V1"
        },
        {
            "id": 17,
            "app_id": "pd63r8git3dlll0n",
            "network": "ETH_MAINNET",
            "webhook_type": "ADDRESS_ACTIVITY",
            "webhook_url": "http://www.YOUR-APP-URL.com",
            "is_active": true,
            "time_created": 1596635655000,
            "version":"V1"
        }
    ]
}
```
{% endtab %}
{% endtabs %}
{% endswagger-response %}
{% endswagger %}

### Example Request

{% tabs %}
{% tab title="cURL" %}
```
curl https://dashboard.alchemyapi.io/api/team-webhooks \
-X GET \
-H "X-Alchemy-Token":"your-X-Alchemy-Token"
```
{% endtab %}
{% endtabs %}

{% swagger baseUrl="https://dashboard.alchemyapi.io" path="/api/webhook-addresses" method="get" summary="Get all addresses for an Address Activity webhook" %}
{% swagger-description %}
Paginated endpoint to list all of the addresses a given Address Activity webhook is subscribed to.
{% endswagger-description %}

{% swagger-parameter in="query" name="webhook_id   *REQUIRED*" required="true" type="String" %}
ID of the address activity webhook
{% endswagger-parameter %}

{% swagger-parameter in="query" name="limit" type="Integer" %}
Number of items per page 

\


(Default: 100)
{% endswagger-parameter %}

{% swagger-parameter in="query" name="after" type="String" %}
Page cursor for the next page 

\


(Default: first page)
{% endswagger-parameter %}

{% swagger-parameter in="header" name="X-Alchemy-Token *REQUIRED*" required="true" %}
Alchemy 

[Auth token](./#x-alchemy-token)

 to use the Notify API 
{% endswagger-parameter %}

{% swagger-response status="200" description="List of addresses and pagination info  " %}
{% tabs %}
{% tab title="First Tab" %}
* `data`: list of addresses associated with given webhook
* `pagination`: information for pagination&#x20;
  * `cursors`:
    * `after`: page cursor for next page
  * `total_count`: total number of addresses&#x20;

```
{
  "data": [
    "0xF2250E2eD4a774D54d238B75643175C4D0c24057",
    "0x7a250d5630b4cf539739df2c5dacb4c659f2488d"
  ],
  "pagination": {
    "cursors": {},
    "total_count": 2
  }
}
```
{% endtab %}
{% endtabs %}
{% endswagger-response %}
{% endswagger %}

### Example Request

{% tabs %}
{% tab title="cURL" %}
```
curl --location --request GET 'https://dashboard.alchemyapi.io/api/webhook-addresses?webhook_id=148415' \
--header 'X-Alchemy-Token: your-X-Alchemy-Token'
```
{% endtab %}
{% endtabs %}

{% swagger baseUrl="https://dashboard.alchemyapi.io" path="/api/create-webhook" method="post" summary="Create webhook" %}
{% swagger-description %}
This endpoint allows you to create a webhook.
{% endswagger-description %}

{% swagger-parameter in="header" name="X-Alchemy-Token *REQUIRED*" type="string" required="true" %}
Alchemy 

[Auth token](./#x-alchemy-token)

 to use the Notify API 
{% endswagger-parameter %}

{% swagger-parameter in="body" name="app_id" type="string" required="false" %}


[App Id](./#app_id)

.
{% endswagger-parameter %}

{% swagger-parameter in="body" name="webhook_type *REQUIRED*" type="string" required="true" %}
Webhook type, see 

[above](./#webhook_type)

 for options 
{% endswagger-parameter %}

{% swagger-parameter in="body" name="webhook_url *REQUIRED*" type="string" required="true" %}
URL where requests are sent.
{% endswagger-parameter %}

{% swagger-parameter in="body" name="addresses" type="array" required="false" %}
List of addresses you want to track. Required for address activity webhooks only.
{% endswagger-parameter %}

{% swagger-parameter in="body" name="gas_price_low" type="integer" required="false" %}
If the gas price (in 

[gwei](../../resources/web3-glossary.md#why-cant-i-invite-a-user-who-is-already-on-a-team)

) is lower than this threshold, send a notification every minute. For gas price webhooks only.
{% endswagger-parameter %}

{% swagger-parameter in="body" name="gas_price_high" type="integer" required="false" %}
If the gas price (in 10x 

[gwei](../../resources/web3-glossary.md#why-cant-i-invite-a-user-who-is-already-on-a-team)

) is higher than this threshold, send a notification every minute. For gas price webhooks only.
{% endswagger-parameter %}

{% swagger-parameter in="body" name="gas_price_type" type="integer" required="false" %}
Selects the metric to be used as the threshold price.



SAFE\_LOW = 0

AVERAGE = 1

FAST = 2

FASTEST = 3



For gas price webhooks only.
{% endswagger-parameter %}

{% swagger-response status="200" description="Webhook creation data" %}
{% tabs %}
{% tab title="Example" %}
* `data`: confirmation of webhook creation
* `id`: unique webhook id&#x20;
* `app_id`: [App id ](./#app\_id)
* `network`: [network](./#network) for webhook
* `webhook_type`: Webhook type, see [above](./#webhook\_type) for options&#x20;
* `webhook_url`: URL where requests are sent.
* `is_active`: (`boolean`) `true` if webhook is active, `false` if not active.
* `time_created`: timestamp webhook was created&#x20;
* `addresses`: list of addresses being tracked, `null` if not address activity webhook
* `gas_price_low`: low end of gas price threshold, `null` if not gas price webhook
* `gas_price_high`: high end of gas price threshold, `null` if not gas price webhook
* `gas_price_type`: metric used for gas price threshold, `null` if not gas price webhook

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
{% endtab %}
{% endtabs %}
{% endswagger-response %}
{% endswagger %}

### Example Request

{% tabs %}
{% tab title="cURL" %}
```
curl https://dashboard.alchemyapi.io/api/create-webhook \
-X POST \
-H "X-Alchemy-Token":"your-X-Alchemy-Token" \
-d '{"app_id":"your-app_id","webhook_type":"MINED_TRANSACTION","webhook_url":"https://webhook.site/7bf2c41e-846e-45a7-8c17-556dd7f5103c"}'
```
{% endtab %}
{% endtabs %}

{% swagger baseUrl="https://dashboard.alchemyapi.io" path="/api/update-webhook-addresses" method="patch" summary="Add & remove webhook addresses " %}
{% swagger-description %}
Add or remove addresses from a specific webhook.
{% endswagger-description %}

{% swagger-parameter in="header" name="X-Alchemy-Token *REQUIRED*" type="string" required="true" %}
Alchemy 

[Auth token](./#x-alchemy-token)

 to use the Notify API 
{% endswagger-parameter %}

{% swagger-parameter in="body" name="webhook_id *REQUIRED*" type="string" required="true" %}
ID of the address activity webhook
{% endswagger-parameter %}

{% swagger-parameter in="body" name="addresses_to_add" type="array" required="false" %}
List of addresses to add, use [] if none.
{% endswagger-parameter %}

{% swagger-parameter in="body" name="addresses_to_remove" type="array" required="false" %}
List of addresses to remove, use [] if none.
{% endswagger-parameter %}

{% swagger-response status="200" description="empty list " %}
```
{}
```
{% endswagger-response %}
{% endswagger %}

### **Example Request**

{% tabs %}
{% tab title="cURL" %}
```
curl 'https://dashboard.alchemyapi.io/api/update-webhook-addresses' \
-X PATCH \
-H 'X-Alchemy-Token: your-X-Alchemy-Token' \
--data-raw '{"webhook_id":"wh_90yojhoxuer87l3t","addresses_to_add":["0xfdb16996831753d5331ff813c29a93c76834a0ad","0x48ea66f94518534ecbc863fbf521896d52b025d9", "0x6f8d0c2a2c3a189803f5c6482c88be46a55058c1"], "addresses_to_remove":[]}'
```
{% endtab %}
{% endtabs %}

{% swagger baseUrl="https://dashboard.alchemyapi.io" path="/api/update-webhook-addresses" method="put" summary="Replace webhook addresses" %}
{% swagger-description %}
Replace entire list of addresses tracked in a given webhook
{% endswagger-description %}

{% swagger-parameter in="header" name="X-Alchemy-Token *REQUIRED*" type="string" required="true" %}
Alchemy 

[Auth token](./#x-alchemy-token)

 to use the Notify API 
{% endswagger-parameter %}

{% swagger-parameter in="body" name="webhook_id" type="string" required="false" %}
ID of the address activity webhook
{% endswagger-parameter %}

{% swagger-parameter in="body" name="addresses" type="array" required="false" %}
New list of addresses to track. This 

**replaces**

 any existing addresses.
{% endswagger-parameter %}

{% swagger-response status="200" description="empty list" %}
```
{}
```
{% endswagger-response %}
{% endswagger %}

### Example Request

{% tabs %}
{% tab title="cURL" %}
```
curl https://dashboard.alchemyapi.io/api/update-webhook-addresses \
-X PUT \
-H "X-Alchemy-Token":"your-X-Alchemy-Token" \ 
-d '{"webhook_id":104,"addresses":["0x6f8d0c2a2c3a189803f5c6482c88be46a55058c1","0xfdb16996831753d5331ff813c29a93c76834a0ad"]}'
```
{% endtab %}
{% endtabs %}

{% swagger baseUrl="https://dashboard.alchemyapi.io" path="/api/update-webhook" method="put" summary="Update webhook status " %}
{% swagger-description %}
Allows you to set status of webhooks to 

`active`

 or 

`inactive`
{% endswagger-description %}

{% swagger-parameter in="header" name="X-Alchemy-Token *REQUIRED*" type="string" required="true" %}
Alchemy 

[Auth token](./#x-alchemy-token)

 to use the Notify API 
{% endswagger-parameter %}

{% swagger-parameter in="body" name="webhook_id" type="string" required="false" %}
ID of the address activity webhook
{% endswagger-parameter %}

{% swagger-parameter in="body" name="is_active" type="boolean" required="false" %}
`True` - set webhook to active state

`False` - set webhook to inactive state
{% endswagger-parameter %}

{% swagger-response status="200" description="Updated webhook status" %}
{% tabs %}
{% tab title="Example" %}
`data`: confirmation of updated webhook

* `id`: unique ID for given webhook&#x20;
* ``[`network`](./#network): Network for given webhook
* ``[`webhook_type`](./#webhook\_type): Type of webhook
* `webhook_url`: URL endpoint where webhook is sent
* `is_active`: (`boolean`) `true` if webhook is active, `false` if not active.
* `time_created`: timestamp webhook was created&#x20;
* `signing_key`: [signing key](using-notify.md#1.-find-your-signing-key) for given webhook
* `version`: `V1` or `V2`

```
{
    "data": {
        "id": "wh_tncylsr32dj4u9dm",
        "network": "ETH_RINKEBY",
        "webhook_type": "ADDRESS_ACTIVITY",
        "webhook_url": "https://webhook.site/f850be75-1672-483c-8c05-00c45c881da4",
        "is_active": false,
        "time_created": 1645059504000,
        "signing_key": "whsec_GhvsyyrfZZbGOsk4CSOvC9NI",
        "version": "V2"
    }
}
```
{% endtab %}
{% endtabs %}
{% endswagger-response %}
{% endswagger %}

### Example Request

{% tabs %}
{% tab title="cURL" %}
```
curl --location --request PUT 'https://dashboard.alchemyapi.io/api/update-webhook' \
--header 'X-Alchemy-Token: your-X-Alchemy-Token' \
--data-raw '{"webhook_id":"wh_tncylsr32dj4u9dm" ,"is_active":false}'
```
{% endtab %}
{% endtabs %}

{% swagger baseUrl="https://dashboard.alchemyapi.io" path="/api/delete-webhook" method="delete" summary="Delete webhook" %}
{% swagger-description %}
Delete a webhook.
{% endswagger-description %}

{% swagger-parameter in="header" name="X-Alchemy-Token *REQUIRED*" type="string" required="true" %}
Alchemy 

[Auth token](./#x-alchemy-token)

 to use the Notify API 
{% endswagger-parameter %}

{% swagger-parameter in="body" name="webhook_id" type="string" required="false" %}
ID of the address activity webhook
{% endswagger-parameter %}

{% swagger-response status="200" description="empty list " %}
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

There are four types of webhooks to receive notifications for:

1. [Mined Transactions](using-notify.md#mined-transactions) (all networks)
2. [Dropped Transactions](using-notify.md#dropped-transactions) (all networks)
3. [Address Activity](using-notify.md#address-activity) (all networks)&#x20;
4. [Gas Price](using-notify.md#4.-gas-price) (V1 only, Ethereum)&#x20;

To see in depth explanations for each of the Alchemy Notify webhooks check out the [Using Webhooks](using-notify.md) guide.

## Other Resources&#x20;

See [frequently asked questions](using-notify.md#common-questions) on the using Alchemy Notify/Webhooks page for information on:

* [Capcity Limit](using-notify.md#capacity-limit)
* [Webhook IP Addresses](using-notify.md#webhook-ip-addresses)
* [Migrating from Notify V1 to V2](using-notify.md#migrating-from-notify-v1-to-v2)
* [Best practices](using-notify.md#what-are-some-best-practices-when-using-webhooks-with-a-large-number-of-addresses)&#x20;

{% content-ref url="using-notify.md" %}
[using-notify.md](using-notify.md)
{% endcontent-ref %}
