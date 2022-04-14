---
description: >-
  Replays all transactions in a block returning the requested traces for each
  transaction.
---

# trace\_replayBlockTransactions

## **Parameters**

1. `Quantity` or `Tag` - Integer of a block number, or the string `'earliest'`, `'latest'` or `'pending'`.
2. `Array` - Type of trace, one or more of: `"vmTrace"`, `"trace"`, `"stateDiff"`.

```bash
params: [
  "0x2ed119",
  ["trace"]
]
```

## **Returns**

* `Array` - Block transactions traces.

## [**Example**](https://composer.alchemyapi.io/?composer\_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22trace\_replayBlockTransactions%22%2C%22paramValues%22%3A%5B%220x2ed119%22%2C%5B%22trace%22%5D%5D%7D)

### Request

{% tabs %}
{% tab title="Curl" %}
```bash
curl https://eth-mainnet.alchemyapi.io/v2/your-api-key \
-X POST \
-H "Content-Type: application/json" \
-d '{"method":"trace_replayBlockTransactions","params":["0x2ed119",["trace"]],"id":1,"jsonrpc":"2.0"}'
```
{% endtab %}

{% tab title="Postman" %}
```http
URL: https://eth-mainnet.alchemyapi.io/v2/your-api-key
RequestType: POST
Body: 
{
    "jsonrpc":"2.0",
    "method":"trace_replayBlockTransactions",
    "params":["0x2ed119",["trace"]],
    "id":1
}
```
{% endtab %}
{% endtabs %}

### Response

```java
{
  "jsonrpc": "2.0",
  "result": [
    {
      "output": "0x",
      "stateDiff": null,
      "trace": [
        {
          "action": {
            "callType": "call",
            "from": "0xaa7b131dc60b80d3cf5e59b5a21a666aa039c951",
            "gas": "0x0",
            "input": "0x",
            "to": "0xd40aba8166a212d6892125f079c33e6f5ca19814",
            "value": "0x4768d7effc3fbe"
          },
          "result": {
            "gasUsed": "0x0",
            "output": "0x"
          },
          "subtraces": 0,
          "traceAddress": [],
          "type": "call"
        }
      ],
      "transactionHash": "0x07da28d752aba3b9dd7060005e554719c6205c8a3aea358599fc9b245c52f1f6",
      "vmTrace": null
    },
    {
      "output": "0x",
      "stateDiff": null,
      "trace": [
        {
          "action": {
            "callType": "call",
            "from": "0x4f11ba23bb526c0486d83c6a8f18f632f3fc172a",
            "gas": "0x0",
            "input": "0x",
            "to": "0x7ed1e469fcb3ee19c0366d829e291451be638e59",
            "value": "0x446cde325fbfbe"
          },
          "result": {
            "gasUsed": "0x0",
            "output": "0x"
          },
          "subtraces": 0,
          "traceAddress": [],
          "type": "call"
        }
      ],
      "transactionHash": "0x056f11efb5da4ff7cf8523cfcef08393e5dd2ff3ab3223e4324426d285d7ae92",
      "vmTrace": null
    },
    {
      ...
    }
  ],
  "id": 0
}
```

##
