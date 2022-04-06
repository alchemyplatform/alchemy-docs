---
description: Returns the balance of the account of a given address.
---

# eth\_getBalance

### Parameters

1. `DATA`, 20 Bytes - address to check for balance.
2. `QUANTITY|TAG` - integer block number, or the string `"latest"`, `"earliest"` or `"pending"`, see the [default block parameter](https://eth.wiki/json-rpc/API#the-default-block-parameter).

```javascript
params: [
   '0xc94770007dda54cF92009BFF0dE90c06F603a09f',
   'latest'
]
```

### Returns

`QUANTITY` - hex value of the current ETH balance for the given address, measured in wei.

### [Example](https://composer.alchemyapi.io/?composer\_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth\_getBalance%22%2C%22paramValues%22%3A%5B%220xc94770007dda54cF92009BFF0dE90c06F603a09f%22%2C%22latest%22%5D%7D)

Request

{% tabs %}
{% tab title="Curl" %}
```bash
curl https://eth-mainnet.alchemyapi.io/v2/your-api-key \
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"eth_getBalance","params":["0xc94770007dda54cF92009BFF0dE90c06F603a09f", "latest"],"id":0}'
```
{% endtab %}

{% tab title="Postman" %}
```http
URL: https://eth-mainnet.alchemyapi.io/v2/your-api-key
RequestType: POST
Body: 
{
    "jsonrpc":"2.0",
    "method":"eth_getBalance",
    "params":["0xc94770007dda54cF92009BFF0dE90c06F603a09f", "latest"],
    "id":0
}
```
{% endtab %}
{% endtabs %}

Result

```javascript
{
  "jsonrpc": "2.0",
  "id": 0,
  "result": "0x7c2562030800"
}
```

### Converting eth\_getBalance response into ETH

To convert the hex string response, measured in [Wei](../../resources/web3-glossary.md#wei)  to a decimal value measured in ETH we need to complete two steps:

1. Convert the hex response into decimal (Wei)
2. Convert the [Wei](../../resources/web3-glossary.md#wei) decimal into ETH decimal (10^18 wei = 1 eth)

Depending on what library or language you are using, there are several options here.

{% tabs %}
{% tab title="Python" %}
```python
# conversion from hex string to decimal
dec = int("hex strong response",16)

# conversion from Wei to to ETH
ethBalance = dec*(10**18)
```
{% endtab %}

{% tab title="JavaScript" %}
```javascript
// conversion from hex string to decimal
dec = parseInt("hex strong response", 16)

// conversion from Wei to to ETH
ethBalance = dec*(10**18)
```
{% endtab %}
{% endtabs %}
