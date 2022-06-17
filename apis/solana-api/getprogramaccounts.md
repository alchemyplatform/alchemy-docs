---
description: Returns all accounts owned by the provided program Pubkey
---

# getProgramAccounts

## **Parameters**

* \<base-58 encoded strings> - Pubkey of program
*   `<object>` - (optional) Config object:

    * `encoding:` (optional) _\<string>_ - data encoding for each returned transaction

    Accepts one of the following strings:\
    \[`"json"` _(Default)_, `"jsonParsed"`, `"base58"` (_slow_), `"base64",` `"base64+zstd"`] \
    &#x20;`"jsonParsed"` encoding attempts to use program-specific parsers to make the `transaction.message.instructions` list more human-readable; if a parser cannot be found, the instruction falls back to default JSON.&#x20;

    * `dataSlice:` (optional) \<object> - limit the returned account data using the provided `offset: <usize>` and `length: <usize>` fields; only available for "base58", "base64" or "base64+zstd" encodings.
    * `filters:` (optional)  \<array> - filter results using various [filter objects](https://docs.solana.com/developing/clients/jsonrpc-api#filters); account must meet all filter criteria to be included in results
      * `memcmp:` \<object> - compares a provided series of bytes with program account data at a particular offset. Fields:
        * `offset:` \<usize> - offset into program account data to start comparison
        * `bytes:` \<string> - data to match, as base-58 encoded string and limited to less than 129 bytes
      * `dataSize: <u64>` - compares the program account data length with the provided data size
    * `withContext:` (optional)  \<bool> - wrap the result in an RpcResponse JSON object.
    * `minContextSlot:` (optional)  \<number> - set the minimum slot that the request can be evaluated at.

## **Result**

* `pubkey:` \<base-58 encoded string> - the account Pubkey
* `account:` \<object> - a JSON object, with the following sub fields
  * `lamports:` \<u64>, number of lamports assigned to this account
  * `owner:` < base-58 encoded string>, Pubkey of the program this account has been assigned to
  * `data:` <\[string, encoding]|object>, data associated with the account, either as encoded binary data or JSON format `{<program>: <state>}`, depending on encoding parameter
  * `executable:` \<bool>, boolean indicating if the account contains a program (and is strictly read-only)
  * `rentEpoch:` \<u64>, the epoch at which this account will next owe rent

## Example

### Request

{% tabs %}
{% tab title="cURL" %}
```python
curl --location --request POST 'https://solana-mainnet.g.alchemy.com/v2/alch-demo/' \
--header 'Content-Type: application/json' \
--data-raw '{
    "method": "getProgramAccounts",
    "jsonrpc": "2.0",
    "params": [
        "Stake11111111111111111111111111111111111111",
        {
            "encoding": "jsonParsed",
            "commitment": "recent",
            "filters": [
                {
                    "memcmp": {
                        "offset": 44,
                        "bytes": "65qFmhCmDgXjg1duFdcpYyPheWyWGyusZhy3Y8khMoYm"
                    }
                }
            ]
        }
    ],
    "id": "566965b3-7c1a-4338-b424-430b3240976e"
}'
```
{% endtab %}
{% endtabs %}

### Response

```javascript
{
  "jsonrpc": "2.0",
  "result": [
    {
      "account": {
        "data": "2R9jLfiAQ9bgdcw6h8s44439",
        "executable": false,
        "lamports": 15298080,
        "owner": "4Nd1mBQtrMJVYVfKf2PJy9NZUZdTAsp7D4xWLs4gDB4T",
        "rentEpoch": 28
      },
      "pubkey": "CxELquR1gPP8wHe33gZ4QxqGB3sZ9RSwsJ2KshVewkFY"
    }
  ],
  "id": 1
}
```
