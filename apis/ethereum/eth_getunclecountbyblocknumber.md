---
description: Returns the number of uncles in a block matching the give block number.
---

# eth\_getUncleCountByBlockNumber - Ethereum

### Parameters

`QUANTITY|TAG` - integer of a block number, or the string "latest", "earliest" or "pending", see the [default block parameter](https://eth.wiki/json-rpc/API#the-default-block-parameter).

```javascript
 params: [ 
  '0xe8', // 232 
 ]
```

### Returns

`QUANTITY` - integer of the number of uncles in this block.

### [Example](https://composer.alchemyapi.io/?composer\_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth\_getUncleCountByBlockNumber%22%2C%22paramValues%22%3A%5B%220xe8%22%5D%7D)

Request

{% tabs %}
{% tab title="alchemyweb3.js" %}
```javascript
// Installation instructions: https://github.com/alchemyplatform/alchemy-web3

async function main() {
	// alchemy-token-api/alchemy-web3-script.js
	import { createAlchemyWeb3 } from "@alch/alchemy-web3";
	
	// Replace with your Alchemy API key:
	const apiKey = "demo";
	
	// Initialize an alchemy-web3 instance:
	const web3 = createAlchemyWeb3(
	  `https://eth-mainnet.g.alchemy.com/v2/${apiKey}`,);
	
	// Query the blockchain (replace example parameters)
    	const count = await web3.eth.getUncleCountByBlockNumber({
	    block_number: '0xe8', // 232 
	  }) 

	// Print the output to console
  	console.log(count);
   }

main();
```
{% endtab %}

{% tab title="ethers.js" %}
```javascript
// Installation instructions: https://docs.ethers.io/v5/getting-started/#installing

async function main() {
   const { ethers } = require("ethers");
   
	// Replace with your Alchemy API key:
	const apiKey = "demo";

	// Initialize an ethers instance
	const provider = new ethers.providers.AlchemyProvider("homestead", apiKey);

	// Query the blockchain (replace example parameters)
    	const count = await provider.getUncleCountByBlockNumber({
	    block_number: '0xe8', // 232 
	  }) 

	// Print the output to console
  	console.log(count);
   }

main()
```
{% endtab %}

{% tab title="web3.py" %}
```python
# Installation Instructions: https://web3py.readthedocs.io/en/latest/quickstart.html#installation

from web3 import Web3, HTTPProvider

#Replace with your Alchemy API key:
apiKey = "demo"

# Initialize a Web3.py instance
web3 = Web3(Web3.HTTPProvider('https://eth-mainnet.alchemyapi.io/v2/'+apiKey))

# Query the blockchain (replace example parameters)
count = web3.eth.net.get_uncle_count({
	    'block_number': 56160
	  })  

# Print the output to console
print(count)
```
{% endtab %}

{% tab title="Curl" %}
```bash
curl https://eth-mainnet.alchemyapi.io/v2/your-api-key \
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"eth_getUncleCountByBlockNumber","params":["0xe8"],"id":1}'
```
{% endtab %}

{% tab title="Postman" %}
```http
URL: https://eth-mainnet.alchemyapi.io/v2/your-api-key
RequestType: POST
Body: 
{
    "jsonrpc":"2.0",
    "method":"eth_getUncleCountByBlockNumber",
    "params":["0xe8"],
    "id":1
}
```
{% endtab %}
{% endtabs %}

Result

```javascript
{
  "jsonrpc": "2.0",
  "id": 0,
  "result": "0x0"
}
```

{% embed url="https://docs.alchemy.com/alchemy/apis/ethereum" %}
