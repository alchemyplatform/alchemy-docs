---
description: Returns the current solana versions running on the node
---

# getVersion

## **Parameters**

None

## **Result**

* `solana-core`: \<string>, software version of solana-core
* `feature-set`: \<u64>, unique identifier of the current software's feature set

## Example

### Request

{% tabs %}
{% tab title="cURL" %}
```python
curl --location --request POST 'https://solana-mainnet.g.alchemy.com/v2/demo' \
--header 'Content-Type: application/json' \
--data-raw '{
    "jsonrpc": "2.0",
    "id": 1,
    "method": "getVersion"
}'
```
{% endtab %}
{% endtabs %}

### Response

```javascript
{
    "jsonrpc": "2.0",
    "result": {
        "feature-set": 2945818700,
        "solana-core": "1.9.21"
    },
    "id": 1
}
```
