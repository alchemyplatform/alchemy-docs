---
description: Returns information about all the nodes participating in the cluster
---

# getClusterNodes

## **Parameters**

None

## **Result**

* `pubkey:` \<base-58 encoded string> - Node public key
* `gossip:` \<string | null> - Node gossip network address&#x20;
* `tpu:` \<string | null> - Node TPU network address
* `rpc:` \<string | null`>` - JSON RPC network address for the node, or `null` if the JSON RPC service is not enabled
* `version:` \<string | null> - The software version of the node, or `null` if the version information is not available
* `featureSet:` \<u32 | null > - The unique identifier of the node's feature set
* `shredVersion:` \<u16 | null> - The configured shred version for the node&#x20;

## Example

### Request

{% tabs %}
{% tab title="cURL" %}
```python
curl --location --request POST 'https://solana-mainnet.g.alchemy.com/v2/demo' \
--header 'Content-Type: application/json' \
--data-raw '{"jsonrpc":"2.0", "id":1, "method":"getClusterNodes"}'
```
{% endtab %}
{% endtabs %}

### Response

```javascript
{
    "jsonrpc": "2.0",
    "result": [
        {
            "featureSet": 2945818700,
            "gossip": "34.200.236.16:8001",
            "pubkey": "DeroCnnoUKvK1MdC7RCJw9YwAeegTNzcUzqYuQEomFsh",
            "rpc": "34.200.236.16:8545",
            "shredVersion": 3247,
            "tpu": "34.200.236.16:8004",
            "version": "1.9.21"
        },
        {
            "featureSet": 1070292356,
            "gossip": "147.28.133.51:8000",
            "pubkey": "fishfishrD9BwrQQiAcG6YeYZVUYVJf3tb9QGQPMJqF",
            "rpc": null,
            "shredVersion": 3247,
            "tpu": "147.28.133.51:8003",
            "version": "1.9.18"
        },
        {
            "featureSet": 2945818700,
            "gossip": "85.10.193.135:8001",
            "pubkey": "8XbwT1nJ8h4uP6t44X89ceXGaSTQ855tuzRGQHXC4ta",
            "rpc": null,
            "shredVersion": 3247,
            "tpu": "85.10.193.135:8004",
            "version": "1.9.22"
        }
        ..........
    ]
}
```
