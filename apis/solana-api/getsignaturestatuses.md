---
description: Returns the statuses of a list of signatures.
---

# getSignatureStatuses

## **Parameters**

* \<array of base-58 encoded string> -  An array of transaction signatures to confirm
* `<object>` - (optional) Configuration object containing the following field:
  * `searchTransactionHistory:` \<bool> - if true, a Solana node will search its ledger cache for any signatures not found in the recent status cache

## **Results**

{% tabs %}
{% tab title="Known Tx" %}
* `<object>`
  * `slot:` \<u64> - The slot the transaction was processed
  * `confirmations:` \<usize | null> - Number of blocks since signature confirmation, null if rooted, as well as finalized by a supermajority of the cluster
  * `err:` \<object | null> - Error if transaction failed, null if transaction succeeded.&#x20;
  * `confirmationStatus:` \<string | null> - The transaction's cluster confirmation status; either `processed`, `confirmed`, or `finalized`. See [Commitment](https://docs.solana.com/developing/clients/jsonrpc-api#configuring-state-commitment) for more on optimistic confirmation.
{% endtab %}

{% tab title="Unknown Tx" %}
* `<null>` - Unknown transaction
{% endtab %}
{% endtabs %}

## Example&#x20;

### Request

{% tabs %}
{% tab title="cURL" %}
```python
curl --location --request POST 'https://solana-mainnet.g.alchemy.com/v2/alch-demo/' \
--header 'Content-Type: application/json' \
--data-raw '{
    "method": "getSignatureStatuses",
    "jsonrpc": "2.0",
    "params": [
        [
            "28P1gdVq52uEbCHns4EL5DCMjU5PtcBo5M3Gju4FX8DLwjLPDchudttnQapAxYy5dkdVZ6sqa6pvtgC5mbKLqfQA"
        ],
        {
            "searchTransactionHistory": true
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
            "slot": 137569378
        },
        "value": [
            {
                "confirmationStatus": "finalized",
                "confirmations": null,
                "err": null,
                "slot": 137529522,
                "status": {
                    "Ok": null
                }
            }
        ]
    }
}
```
