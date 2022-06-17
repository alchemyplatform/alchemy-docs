---
description: Returns transaction details for a confirmed transaction
---

# getTransaction

## **Parameters**

* `<base-58 encoded string>` - transaction signature
* `<object>` - (optional) Config object:
  * `encoding:` \<string> - (optional) encoding for tx data; Either `"json"`, `"jsonParsed"`, `"base58"` (_slow_), `"base64"`. (default is `"json"`)&#x20;
  * `commitment:` \<object> - (optional) Configures the commitment level of the blocks queried\
    Accepts one of the following strings: \[`"finalized"`, `"confirmed"`, `"processed"]` \
    For more info, refer to this [doc](https://docs.solana.com/developing/clients/jsonrpc-api#configuring-state-commitment).
  * `maxSupportedTransactionVersion:` \<number> -(optional)  set the max transaction version to return in responses. If the requested transaction is a higher version, an error will be returned.

## **Results**

{% tabs %}
{% tab title="Tx Success" %}
* `<object>`&#x20;
  * `slot:` \<u64> - the slot this transaction was processed in
  * `transaction:` \<object|\[string,encoding]`>` - tx object, either in JSON format or encoded binary data, depending on encoding parameter
  * `blockTime:` \<i64 | null> - estimated production time, as Unix timestamp (seconds since the Unix epoch) of when the transaction was processed.&#x20;
  * `meta:` \<object | null> - transaction status metadata object:
    * `err:` \<object | null> - reported error if transaction failed
    * `fee:` \<u64> - fee this transaction was charged, as u64 integer
    * `preBalances:` \<array of u64> - account balances from before the transaction was processed
    * `postBalances:` \<array of u64> - account balances after the transaction was processed
    * `innerInstructions:` \<array|null> - List of inner instructions or `null` if inner instruction recording was not enabled during this transaction
    * `preTokenBalances:` \<array|undefined> - List of token balances from before the transaction was processed or omitted if token balance recording was not yet enabled during this transaction
    * `postTokenBalances:` \<array|undefined> - List of token balances from after the transaction was processed or omitted if token balance recording was not yet enabled during this transaction
    * `logMessages:` \<array|null> - array of string log messages or `null` if log message recording was not enabled during this transaction
    * `rewards:` \<array of JSON objects> - present if rewards are requested:
      * `pubkey:` \<base-58 encoded string> - The public key of the account that received the reward
      * `lamports:` \<i64>- number of reward lamports credited or debited by the account
      * `postBalance:` \<u64> - account balance in lamports after the reward was applied
      * `rewardType:` \<string> - type of reward:  `"rent"`
      * `commission:` \<u8|undefined> - vote account commission when the reward was credited, only present for voting and staking rewards
    * `loadedAddresses:` \<object|undefined> - Transaction addresses loaded from address lookup tables. Undefined if `maxSupportedTransactionVersion` is not set in request params.
      * `writable:` \<array\[base-58 encoded string]> - Ordered list of addresses for writable loaded accounts
      * `readonly:` \<array\[base-58 encoded string]> - Ordered list of addresses for read only loaded accounts
  * `version:` <"legacy"|number|undefined> - Transaction version. Undefined if `maxSupportedTransactionVersion` is not set in request params.
{% endtab %}

{% tab title="Tx Failed" %}
* `<null>` - if transaction is not found or not confirmed
{% endtab %}
{% endtabs %}

### Request

{% tabs %}
{% tab title="cURL" %}
```python
curl --location --request POST 'https://solana-mainnet.g.alchemy.com/v2/alch-demo/' \
--header 'Content-Type: application/json' \
--data-raw '{
    "method": "getTransaction",
    "jsonrpc": "2.0",
    "params": [
        "FhGuWorGjyu1sAMvn53GWb96apbExf8HvX18MVwexMQxmo2sweuSfFpoApJbMT19ijDHRRUk6kDbvE1kgNfRkse",
        {
            "commitment": "confirmed"
        }
    ],
    "id": "a225dff3-7356-46c2-be70-d0bf77a60e12"
}'
```
{% endtab %}
{% endtabs %}

### Response

```javascript
{
    "jsonrpc": "2.0",
    "result": {
        "blockTime": 1655319302,
        "meta": {
            "err": null,
            "fee": 5000,
            "innerInstructions": [
                {
                    "index": 1,
                    "instructions": [
                        {
                            "accounts": [
                                26,
                                13,
                                19,
                                15,
                                16,
                                0
                            ],
                            "data": "63S77LdPnZrhcJ2wGjQ7xuV",
                            "programIdIndex": 21
                        },
                        {
                            "accounts": [
                                14,
                                16,
                                0
                            ],
                            "data": "3QCBRJNuTemd",
                            "programIdIndex": 26
                        },
                        {
                            "accounts": [
                                2,
                                12,
                                19
                            ],
                            "data": "3KiXXdFFB5Km",
                            "programIdIndex": 26
                        }
                    ]
                },
                {
                    "index": 2,
                    "instructions": [
                        {
                            "accounts": [
                                10,
                                20,
                                0,
                                12,
                                18,
                                6,
                                1,
                                4,
                                26
                            ],
                            "data": "dETZL4omNMDLJHiCgf9wKM",
                            "programIdIndex": 22
                        },
                ...................
                
                                            3,
                            9,
                            5,
                            24,
                            14,
                            12,
                            0
                        ],
                        "data": "3987sfmq8Uv3CmdUFAociw18iE9Ag7yfzTcb",
                        "programIdIndex": 25
                    },
                    {
                        "accounts": [
                            22,
                            10,
                            20,
                            12,
                            18,
                            6,
                            1,
                            4,
                            0,
                            26,
                            11
                        ],
                        "data": "AmqpnQAj6p7kZBSvn95ZLamBu",
                        "programIdIndex": 25
                    }
                ],
                "recentBlockhash": "8HUFHpe2knwEmMrvDnybybfwGULSQzNG2UpuReWWJyTd"
            },
            "signatures": [
                "FhGuWorGjyu1sAMvn53GWb96apbExf8HvX18MVwexMQxmo2sweuSfFpoApJbMT19ijDHRRUk6kDbvE1kgNfRkse"
            ]
        }
    },
    "id": "a225dff3-7356-46c2-be70-d0bf77a60e12"
}
```

