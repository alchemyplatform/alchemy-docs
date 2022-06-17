---
description: Returns the token balance of an SPL Token account.
---

# getTokenAccountBalance

## **Parameters**

* `<base-58 encoded string>` - Pubkey of queried token account
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
    "method": "getTokenAccountBalance",
    "jsonrpc": "2.0",
    "params": [
        "3Lz6rCrXdLybFiuJGJnEjv6Z2XtCh5n4proPGP2aBkA1"
    ],
    "id": "017a141e-9a15-4ce3-b039-865e7dc7da00"
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
            "slot": 137567036
        },
        "value": {
            "amount": "301922375078",
            "decimals": 6,
            "uiAmount": 301922.375078,
            "uiAmountString": "301922.375078"
        }
    },
    "id": "017a141e-9a15-4ce3-b039-865e7dc7da00"
}
```
