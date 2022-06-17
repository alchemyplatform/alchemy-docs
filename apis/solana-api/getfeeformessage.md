---
description: Get the fee the network will charge for a particular message
---

# getFeeForMessage

## Parameters

* `message:` \<Base-64  string> - encoded Message
* `commitment:` \<object> - (optional) Configures the commitment level of the blocks queried\
  Accepts one of the following strings: \[`"finalized"`, `"confirmed"`, `"processed"]` \
  For more info, refer to this [doc](https://docs.solana.com/developing/clients/jsonrpc-api#configuring-state-commitment).

## Returns

* `value:` \<u64>, fee corresponding to the message at the specified blockhash

## Example&#x20;

### Request

{% tabs %}
{% tab title="cURL" %}
```python
curl --location --request POST 'https://solana-mainnet.g.alchemy.com/v2/demo' \
--header 'Content-Type: application/json' \
--data-raw '{
    "id": 1,
    "jsonrpc": "2.0",
    "method": "getFeeForMessage",
    "params": ["AQABAgIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEBAQAA"]
}'
```
{% endtab %}
{% endtabs %}

### Response

```javascript
{
    "jsonrpc": "2.0",
    "result": {
        "context": {
            "slot": 135143215
        },
        "value": null
    },
    "id": 1
}
```
