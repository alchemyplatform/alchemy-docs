---
description: Returns trace at given position.
---

# trace\_get

## **Parameters**

1. `Hash` - Transaction hash.
2. `Array` - Index positions of the traces.

```bash
params: [
  "0x17104ac9d3312d8c136b7f44d4b8b47852618065ebfa534bd2d3b5ef218ca1f3",
  ["0x0"]
]
```

## **Returns**

* `Object` - Trace object

## **Example**

### Request

{% tabs %}
{% tab title="Curl" %}
```bash
curl https://eth-mainnet.alchemyapi.io/v2/your-api-key \
-X POST \
-H "Content-Type: application/json" \
-d '{"method":"trace_get","params":["0x17104ac9d3312d8c136b7f44d4b8b47852618065ebfa534bd2d3b5ef218ca1f3",["0x0"]],"id":1,"jsonrpc":"2.0"}'
```
{% endtab %}

{% tab title="Postman" %}
```http
URL: https://eth-mainnet.alchemyapi.io/v2/your-api-key
RequestType: POST
Body: 
{
    "jsonrpc":"2.0",
    "method":"trace_get",
    "params":["0x17104ac9d3312d8c136b7f44d4b8b47852618065ebfa534bd2d3b5ef218ca1f3",["0x0"]],
    "id":1
}
```
{% endtab %}
{% endtabs %}

### Response

```javascript
{
  "id": 1,
  "jsonrpc": "2.0",
  "result": {
    "action": {
      "callType": "call",
      "from": "0x1c39ba39e4735cb65978d4db400ddd70a72dc750",
      "gas": "0x13e99",
      "input": "0x16c72721",
      "to": "0x2bd2326c993dfaef84f696526064ff22eba5b362",
      "value": "0x0"
    },
    "blockHash": "0x7eb25504e4c202cf3d62fd585d3e238f592c780cca82dacb2ed3cb5b38883add",
    "blockNumber": 3068185,
    "result": {
      "gasUsed": "0x183",
      "output": "0x0000000000000000000000000000000000000000000000000000000000000001"
    },
    "subtraces": 0,
    "traceAddress": [
      0
    ],
    "transactionHash": "0x17104ac9d3312d8c136b7f44d4b8b47852618065ebfa534bd2d3b5ef218ca1f3",
    "transactionPosition": 2,
    "type": "call"
  }
}
```

##
