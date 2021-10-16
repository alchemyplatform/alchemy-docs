---
description: API for fetching all transactions in a particular block.
---

# Block API

## `parity_getBlockReceipts`

Get receipts from all transactions from particular block, instead of fetching the receipts one-by-one.

### **Parameters**

1. `Quantity` or `Tag` - integer of a block number, or the string `'earliest'`, `'latest'` or `'pending'`, as in the default block parameter.

```text
params: ["0x8D2B29"]
```

### **Returns**

* `Array` - The list of all the transaction’s receipts of the given block

### **Example**

**Request**

{% tabs %}
{% tab title="Curl" %}
```bash
curl https://eth-mainnet.alchemyapi.io/v2/your-api-key \
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0", "id":1, "method":"parity_getBlockReceipts","params":["0x8D2B29"]}'
```
{% endtab %}
{% endtabs %}

**Response**

```text
{
  "id": 1,
  "jsonrpc": "2.0",
  "result": [
    {
      "blockHash": "0x64d67cf84d95f8dfa1e1c3b5a5260aaf801ac99529b4ec3ae19bb06ba78c7bd5",
      "blockNumber": "0x8d2b29",
      "contractAddress": null,
      "cumulativeGasUsed": "0x5208",
      "effectiveGasPrice": "0x12a05f200",
      "from": "0x4d6bb4ed029b33cf25d0810b029bd8b1a6bcab7b",
      "gasUsed": "0x5208",
      "logs": [],
      "logsBloom": "0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
      "root": null,
      "status": "0x1",
      "to": "0xe9c245293dac615c11a5bf26fcec91c3617645e4",
      "transactionHash": "0x1eba82fb5e8426b520c49a5d8dc6c24157e8f45fb9102aca4a99f5617c1539fc",
      "transactionIndex": "0x0"
    },
    {
      "blockHash": "0x64d67cf84d95f8dfa1e1c3b5a5260aaf801ac99529b4ec3ae19bb06ba78c7bd5",
      "blockNumber": "0x8d2b29",
      "contractAddress": null,
      "cumulativeGasUsed": "0x3fc28",
      "effectiveGasPrice": "0x12a05f200",
      "from": "0x0caf0d921b2bd24ca04e1f06344e976af223783b",
      "gasUsed": "0x3aa20",
      "logs": [],
      "logsBloom": "0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
      "root": null,
      "status": "0x1",
      "to": "0xf2bb17cb59746cae43d65eec233925b6584cddef",
      "transactionHash": "0x70a50d28db69e5c7a8686141f282530d52e7e3c625296dc53eb5684afa727886",
      "transactionIndex": "0x1"
    }
  ]
}
```

