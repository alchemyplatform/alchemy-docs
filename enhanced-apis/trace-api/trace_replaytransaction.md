---
description: Replays a transaction, returning the traces.
---

# trace\_replayTransaction

## **Parameters**

1. `Hash` - Transaction hash.
2. `Array` - Type of trace, one or more of: `"vmTrace"`, `"trace"`, `"stateDiff"`.

```bash
params: [
  "0x02d4a872e096445e80d05276ee756cefef7f3b376bcec14246469c0cd97dad8f",
  ["trace"]
]
```

## **Returns**

* `Object` - Block traces.

## [**Example**](https://composer.alchemyapi.io/?composer\_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22trace\_replayTransaction%22%2C%22paramValues%22%3A%5B%220x02d4a872e096445e80d05276ee756cefef7f3b376bcec14246469c0cd97dad8f%22%2C%5B%22trace%22%5D%5D%7D)

### Request

{% tabs %}
{% tab title="Curl" %}
```bash
curl https://eth-mainnet.alchemyapi.io/v2/your-api-key \
-X POST \
-H "Content-Type: application/json" \
-d '{"method":"trace_replayTransaction","params":["0x02d4a872e096445e80d05276ee756cefef7f3b376bcec14246469c0cd97dad8f",["trace"]],"id":1,"jsonrpc":"2.0"}'
```
{% endtab %}

{% tab title="Postman" %}
```http
URL: https://eth-mainnet.alchemyapi.io/v2/your-api-key
RequestType: POST
Body: 
{
    "jsonrpc":"2.0",
    "method":"trace_replayTransaction",
    "params":["0x02d4a872e096445e80d05276ee756cefef7f3b376bcec14246469c0cd97dad8f",["trace"]],
    "id":1
}
```
{% endtab %}
{% endtabs %}

### Response

```java
{
  "jsonrpc": "2.0",
  "result": {
    "output": "0x",
    "stateDiff": null,
    "trace": [
      {
        "action": {
          "callType": "call",
          "from": "0x00a63d34051602b2cb268ea344d4b8bc4767f2d4",
          "gas": "0x0",
          "input": "0x",
          "to": "0x87cc0d78ee64a9f11b5affdd9ea523872eae14e4",
          "value": "0x810e988a393f2000"
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
    "vmTrace": null
  },
  "id": 0
}
```

##
