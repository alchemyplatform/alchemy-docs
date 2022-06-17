---
description: Returns the total supply of an SPL Token type.
---

# getTokenSupply

## **Parameters**

* `<base-58 encoded string>` - Pubkey of token Mint to query
* `<object>` - (optional) Config object:
  * `commitment:` \<object> - (optional) Configures the commitment level of the blocks queried\
    Accepts one of the following strings: \[`"finalized"`, `"confirmed"`, `"processed"]` \
    For more info, refer to this [doc](https://docs.solana.com/developing/clients/jsonrpc-api#configuring-state-commitment).

## **Results**

* `amount:` \<u64 string> - the raw balance without decimals
* `decimals:` \<u8> - number of base 10 digits to the right of the decimal place
* `uiAmountString: <string>` - the balance as a string, using mint-prescribed decimals

## Example&#x20;

### Request

{% tabs %}
{% tab title="cURL" %}
```python
curl --location --request POST 'https://solana-mainnet.g.alchemy.com/v2/alch-demo/' \
--header 'Content-Type: application/json' \
--data-raw '{
    "jsonrpc": "2.0",
    "id": 1,
    "method": "getTokenSupply",
    "params": [
        "HfYFjMKNZygfMC8LsQ8LtpPsPxEJoXJx4M6tqi75Hajo"
    ]
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
            "slot": 137571639
        },
        "value": {
            "amount": "999999999997060679",
            "decimals": 9,
            "uiAmount": 9.999999999970608E8,
            "uiAmountString": "999999999.997060679"
        }
    },
    "id": 1
}
```
