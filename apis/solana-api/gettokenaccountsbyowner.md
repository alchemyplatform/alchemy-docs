---
description: Returns all SPL Token accounts by token owner.
---

# getTokenAccountsByOwner

## **Parameters**

* \<base-58 encoded string> - Pubkey of queried SPL token account owner
*   `<object>` - Either:

    * `mint:` \<base-58 encoded string> - Pubkey of the specific token Mint to limit accounts to&#x20;

    &#x20;      OR

    * `programId:`\<base-58 encoded string> - Pubkey of the Token program that owns the accounts
* `<object>` - (optional) Config object:
  * `commitment:` (optional) Configures the commitment level of the blocks queried\
    Accepts one of the following strings: \[`"finalized"`, `"confirmed"`, `"processed"]` \
    For more info, refer to this [doc](https://docs.solana.com/developing/clients/jsonrpc-api#configuring-state-commitment).
  *   `encoding:` (optional) _\<string>_ - data encoding for each returned transaction

      Accepts one of the following strings:\
      \[`"json"` _(Default)_, `"jsonParsed"`, `"base58"` (_slow_), `"base64"`] \
      &#x20;`"jsonParsed"` encoding attempts to use program-specific parsers to make the `transaction.message.instructions` list more human-readable; if a parser cannot be found, the instruction falls back to default JSON.&#x20;
  * `dataSlice:` (optional) \<object> - limits the returned account data using the provided `offset: <usize>` and `length: <usize>` fields; only available for "base58", "base64" or "base64+zstd" encodings.
  * `minContextSlot:` (optional)  \<number> - sets the minimum slot that the request can be evaluated at.

## **Results**

* `pubkey:` \<base-58 encoded string> - the account Pubkey&#x20;
* `account:` \<object> - a JSON object, with the following sub fields:
  * `lamports:` \<u64>, number of lamports assigned to this account
  * `owner:`\<base-58 encoded string>, Pubkey of the program this account has been assigned to
  * `data:` \<object>, Token state data associated with the account, either as encoded binary data or in JSON format `{<program>: <state>}`
  * `executable:` \<bool>, boolean indicating if the account contains a program (and is strictly read-only)
  * `rentEpoch:` \<u64>, the epoch at which this account will next owe rent

## Example&#x20;

### Request

{% tabs %}
{% tab title="cURL" %}
```python
curl --location --request POST 'https://solana-mainnet.g.alchemy.com/v2/alch-demo/' \
--header 'Content-Type: application/json' \
--data-raw '{
    "method": "getTokenAccountsByOwner",
    "id": 1,
    "jsonrpc": "2.0",
    "params": [
        "J27ma1MPBRvmPJxLqBqQGNECMXDm9L6abFa4duKiPosa",
        {
            "mint": "2FPyTwcZLUg1MDrwsyoP4D6s1tM7hAkHYRjkNb5w6Pxk"
        },
        {
            "encoding": "jsonParsed"
        }
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
            "slot": 137568828
        },
        "value": [
            {
                "account": {
                    "data": {
                        "parsed": {
                            "info": {
                                "isNative": false,
                                "mint": "2FPyTwcZLUg1MDrwsyoP4D6s1tM7hAkHYRjkNb5w6Pxk",
                                "owner": "J27ma1MPBRvmPJxLqBqQGNECMXDm9L6abFa4duKiPosa",
                                "state": "initialized",
                                "tokenAmount": {
                                    "amount": "821",
                                    "decimals": 6,
                                    "uiAmount": 8.21E-4,
                                    "uiAmountString": "0.000821"
                                }
                            },
                            "type": "account"
                        },
                        "program": "spl-token",
                        "space": 165
                    },
                    "executable": false,
                    "lamports": 2039280,
                    "owner": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
                    "rentEpoch": 318
                },
                "pubkey": "Exo9AH6fNchE43GaJB85FT7ToYiuKnKzYDyW5mFeTXRR"
            }
        ]
    },
    "id": 1
}
```
