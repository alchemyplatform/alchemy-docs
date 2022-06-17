---
description: Returns the specific inflation values for the current epoch
---

# getInflationRate

## Parameters

None

## Returns

* `total:` \<f64>, total inflation
* `validator:` \<f64>, inflation allocated to validators
* `foundation:` \<f64>, inflation allocated to the foundation
* `epoch:` \<u64>, epoch for which these values are valid

## Example&#x20;

### Request

{% tabs %}
{% tab title="cURL" %}
```python
curl --location --request POST 'https://solana-mainnet.g.alchemy.com/v2/demo' \
--header 'Content-Type: application/json' \
--data-raw '{
    "jsonrpc": "2.0",
    "id": 1,
    "method": "getInflationRate"
}'
```
{% endtab %}
{% endtabs %}

### Response

```javascript
{
    "jsonrpc": "2.0",
    "result": {
        "epoch": 312,
        "foundation": 0.0,
        "total": 0.06919779484862386,
        "validator": 0.06919779484862386
    },
    "id": 1
}
```
