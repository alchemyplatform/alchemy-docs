---
description: >-
  Returns the account info and associated stake for all the voting accounts in
  the current bank.
---

# getVoteAccounts

## **Parameters**

* `<object>` - (optional) Config object:
  * `commitment:` (optional) Configures the commitment level of the blocks queried\
    Accepts one of the following strings: \[`"finalized"`, `"confirmed"`, `"processed"]` \
    For more info, refer to this [doc](https://docs.solana.com/developing/clients/jsonrpc-api#configuring-state-commitment).
  * `votePubkey:` (optional)  \<base-58 encoded string> - Only return results for this validator vote address&#x20;
  * `keepUnstakedDelinquents:` (optional) \<bool> - Do not filter out delinquent validators with no stake
  * `delinquentSlotDistance:` (optional) \<u64> - Specify the number of slots behind the tip that a validator must fall to be considered delinquent. \
    **NOTE:** For the sake of consistency between ecosystem products, _it is **not** recommended that this argument be specified._

## **Result**

* `votePubkey:` \<base-58 encoded string string> - Vote account address
* `nodePubkey:` \<base-58 encoded string string> - Validator identity, as base-58 encoded string
* `activatedStake:` \<u64> - the stake, in lamports, delegated to this vote account and active in this epoch
* `epochVoteAccount:` \<bool> - whether the vote account is staked for this epoch
* `commission:` \<number>, percentage (0-100) of rewards payout owed to the vote account
* `lastVote:` \<u64> - Most recent slot voted on by this vote account
* `epochCredits:` \<array> - History of how many credits earned by the end of each epoch, as an array of arrays containing: `[epoch, credits, previousCredits]`

## Example

### Request

{% tabs %}
{% tab title="cURL" %}
```python
curl --location --request POST 'https://solana-mainnet.g.alchemy.com/v2/demo/' \
--header 'Content-Type: application/json' \
--data-raw '{
    "jsonrpc": "2.0",
    "id": 1,
    "method": "getVoteAccounts"
}'
```
{% endtab %}
{% endtabs %}

### Response

```javascript
{
  "jsonrpc": "2.0",
  "result": {
    "current": [
      {
        "commission": 0,
        "epochVoteAccount": true,
        "epochCredits": [
          [1, 64, 0],
          [2, 192, 64]
        ],
        "nodePubkey": "B97CCUW3AEZFGy6uUg6zUdnNYvnVq5VG8PUtb2HayTDD",
        "lastVote": 147,
        "activatedStake": 42,
        "votePubkey": "3ZT31jkAGhUaw8jsy4bTknwBMP8i4Eueh52By4zXcsVw"
      }
    ],
    "delinquent": [
      {
        "commission": 127,
        "epochVoteAccount": false,
        "epochCredits": [],
        "nodePubkey": "6ZPxeQaDo4bkZLRsdNrCzchNQr5LN9QMc9sipXv9Kw8f",
        "lastVote": 0,
        "activatedStake": 0,
        "votePubkey": "CmgCk4aMS7KW1SHX3s9K5tBJ6Yng2LBaC8MFov4wx9sm"
      }
    ]
  },
  "id": 1
}
```
