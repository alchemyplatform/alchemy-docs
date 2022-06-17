---
description: Returns the identity pubkey for the current node
---

# getIdentity

## Parameters

None

## Returns

* `identity:` \<base-58 encoded string>, the identity pubkey of the current node&#x20;

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
    "method": "getIdentity"
}'
```
{% endtab %}
{% endtabs %}

### Response

```javascript
{
    "jsonrpc": "2.0",
    "result": {
        "identity": "7R16NuTSjkDcigGxSceKuSoFBUApoyxWpBCQ1ErgASYR"
    },
    "id": 1
}
```
