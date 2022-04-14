---
description: Returns traces created at given block.
---

# trace\_block

## **Parameters**

1. `Quantity` or `Tag` - Integer of a block number, or the string `'earliest'`, `'latest'` or `'pending'`.

```bash
params: [
  "0x2ed119" // 3068185
]
```

## **Returns**

* `Array` - Block traces.

## **Example**

### Request

{% tabs %}
{% tab title="Curl" %}
```bash
curl https://eth-mainnet.alchemyapi.io/v2/your-api-key \
-X POST \
-H "Content-Type: application/json" \
-d '{"method":"trace_block","params":["0x2ed119"],"id":1,"jsonrpc":"2.0"}' 
```
{% endtab %}

{% tab title="Postman" %}
```http
URL: https://eth-mainnet.alchemyapi.io/v2/your-api-key
RequestType: POST
Body: 
{
    "jsonrpc":"2.0",
    "method":"trace_block",
    "params":["0x2ed119"],
    "id":1
}
```
{% endtab %}
{% endtabs %}

### Response

```javascript
{
  "jsonrpc": "2.0",
  "result": [
    {
      "action": {
        "callType": "call",
        "from": "0xaa7b131dc60b80d3cf5e59b5a21a666aa039c951",
        "gas": "0x0",
        "input": "0x",
        "to": "0xd40aba8166a212d6892125f079c33e6f5ca19814",
        "value": "0x4768d7effc3fbe"
      },
      "blockHash": "0x7eb25504e4c202cf3d62fd585d3e238f592c780cca82dacb2ed3cb5b38883add",
      "blockNumber": 3068185,
      "result": {
        "gasUsed": "0x0",
        "output": "0x"
      },
      "subtraces": 0,
      "traceAddress": [],
      "transactionHash": "0x07da28d752aba3b9dd7060005e554719c6205c8a3aea358599fc9b245c52f1f6",
      "transactionPosition": 0,
      "type": "call"
    },
    {
      "action": {
        "callType": "call",
        "from": "0x4f11ba23bb526c0486d83c6a8f18f632f3fc172a",
        "gas": "0x0",
        "input": "0x",
        "to": "0x7ed1e469fcb3ee19c0366d829e291451be638e59",
        "value": "0x446cde325fbfbe"
      },
      "blockHash": "0x7eb25504e4c202cf3d62fd585d3e238f592c780cca82dacb2ed3cb5b38883add",
      "blockNumber": 3068185,
      "result": {
        "gasUsed": "0x0",
        "output": "0x"
      },
      "subtraces": 0,
      "traceAddress": [],
      "transactionHash": "0x056f11efb5da4ff7cf8523cfcef08393e5dd2ff3ab3223e4324426d285d7ae92",
      "transactionPosition": 1,
      "type": "call"
    },
    {
     ...
    }
  ],
  "id": 0
}
```

##
