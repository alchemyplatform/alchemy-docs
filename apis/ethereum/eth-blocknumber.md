---
description: Returns the number of the most recent block.
---

# eth\_blockNumber - Ethereum

## Parameters

none

## Returns

`QUANTITY` - integer of the current block number the client is on.

## [Example](eth-blocknumber.md#parameters)

Try out an example request using [the Alchemy Composer tool](https://composer.alchemyapi.io/?composer\_state=%7B%22chain%22%3A0%2C%22network%22%3A0%2C%22methodName%22%3A%22eth\_getBlockByNumber%22%2C%22paramValues%22%3A%5B%22latest%22%2Cfalse%5D%7D)!

Or check out the example below:

### Request

{% tabs %}
{% tab title="alchemyweb3.js" %}
```javascript
// Installation instructions: https://github.com/alchemyplatform/alchemy-web3

async function main() {
    const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
    const web3 = createAlchemyWeb3("https://eth-mainnet.alchemyapi.io/v2/your-api-key");
    const blockNumber = await web3.eth.getBlockNumber();
    console.log(blockNumber);
   }
main();
```
{% endtab %}

{% tab title="ethers.js" %}
```javascript
// Installation instructions: https://docs.ethers.io/v5/getting-started/#installing

async function main() {
   const { ethers } = require("ethers");
   const provider = new ethers.providers.JsonRpcProvider("https://eth-mainnet.alchemyapi.io/v2/your-api-key");
   const blockNumber = await provider.getBlockNumber();
   console.log(blockNumber);
main()
```
{% endtab %}

{% tab title="web3.py" %}
```python
# Installation Instructions: https://web3py.readthedocs.io/en/latest/quickstart.html#installation

from web3 import Web3, HTTPProvider

web3 = Web3(Web3.HTTPProvider('https://eth-mainnet.alchemyapi.io/v2/your-api-key'))
blockNumber = web3.eth.blockNumber
print(blockNumber)
```
{% endtab %}

{% tab title="Curl" %}
```bash
curl https://eth-mainnet.alchemyapi.io/v2/your-api-key \
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":0}'
```
{% endtab %}

{% tab title="Postman" %}
```http
URL: https://eth-mainnet.alchemyapi.io/v2/your-api-key
RequestType: POST
Body: 
{
    "jsonrpc":"2.0",
    "method":"eth_blockNumber",
    "params":[],
    "id":0
}
```
{% endtab %}
{% endtabs %}

### Result

```javascript
{
  "jsonrpc": "2.0",
  "id": 0,
  "result": "0xa1c054"
}
```

{% content-ref url="./" %}
[.](./)
{% endcontent-ref %}
