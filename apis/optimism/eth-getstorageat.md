---
description: >-
  Returns the value from a storage position at a given address, or in other
  words, returns the state of the contract's storage, which may not be exposed
  via the contract's methods.
---

# eth\_getStorageAt - Optimism

#### Parameters

* `DATA`, 20 Bytes - address of the storage.
* `QUANTITY` - integer of the position in the storage.
* `QUANTITY|TAG` - integer block number, or the string "latest", "earliest" or "pending", see the [default block parameter](https://eth.wiki/json-rpc/API#the-default-block-parameter).

#### Returns

* `DATA` - the value at this storage position.

#### Example

Calculating the correct position depends on the storage to retrieve. Consider the following contract deployed at `0x295a70b2de5e3953354a6a8344e616ed314d7251` by address `0x391694e7e0b0cce554cb130d723a9d27458f9298`.

```javascript
contract Storage {
    uint pos0;
    mapping(address => uint) pos1;

    function Storage() {
        pos0 = 1234;
        pos1[msg.sender] = 5678;
    }
}
```

Retrieving the value of `pos0` is straight forward:

Request

{% tabs %}
{% tab title="Curl" %}
```bash
curl https://eth-mainnet.alchemyapi.io/v2/your-api-key \
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0", "method": "eth_getStorageAt", "params": ["0x295a70b2de5e3953354a6a8344e616ed314d7251", "0x0", "latest"], "id": 1}'
```
{% endtab %}

{% tab title="Postman" %}
```http
URL: https://eth-mainnet.alchemyapi.io/v2/your-api-key
RequestType: POST
Body: 
{
    "jsonrpc":"2.0",
    "method":"eth_getStorageAt",
    "params":["0x295a70b2de5e3953354a6a8344e616ed314d7251", "0x0", "latest"],
    "id":1
}
```
{% endtab %}
{% endtabs %}

Result

```javascript
{
    "jsonrpc": "2.0",
    "id": 1,
    "result": "0x0000000000000000000000000000000000000000000000000000000000000000"
}
```

{% embed url="https://docs.alchemy.com/alchemy/apis/optimism-api" %}
