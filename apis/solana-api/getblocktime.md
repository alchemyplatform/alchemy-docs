---
description: Returns the estimated production time of a block.
---

# getBlockTime

## **Parameters**

* `<u64>` - slot integer for a block

## **Results**

* `<i64>` - estimated production time, as a Unix timestamp (seconds since the Unix epoch. If timestamp is not availabe for this block, returns `<null>`&#x20;

## Example

### Request

{% tabs %}
{% tab title="cURL" %}
```python
curl --location --request POST 'https://solana-mainnet.g.alchemy.com/v2/demo' \
--header 'Content-Type: application/json' \
--data-raw '{"jsonrpc":"2.0","id":1, "method":"getBlockTime","params":[100000000]}'
```
{% endtab %}
{% endtabs %}

### Response

```javascript
{
    "jsonrpc": "2.0",
    "result": 1633504705,
    "id": 1
}

```
