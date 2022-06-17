---
description: Returns the current inflation governor
---

# getInflationGovernor

## Parameters

* `commitment:` \<object> - (optional) Configures the commitment level of the blocks queried\
  Accepts one of the following strings: \[`"finalized"`, `"confirmed"`, `"processed"]` \
  For more info, refer to this [doc](https://docs.solana.com/developing/clients/jsonrpc-api#configuring-state-commitment).

## Returns

* `initial:` \<f64>, the initial inflation percentage from time 0
* `terminal:` \<f64>, terminal inflation percentage
* `taper:` \<f64>, rate per year at which inflation is lowered. Rate reduction is derived using the target slot time in genesis config
* `foundation:` \<f64>, percentage of total inflation allocated to the foundation
* `foundationTerm:` \<f64>, duration of foundation pool inflation in years

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
    "method": "getInflationGovernor"
}'
```
{% endtab %}
{% endtabs %}

### Response

```javascript
{
    "jsonrpc": "2.0",
    "result": {
        "foundation": 0.0,
        "foundationTerm": 0.0,
        "initial": 0.08,
        "taper": 0.15,
        "terminal": 0.015
    },
    "id": 1
}
```
