---
description: Returns the current ethereum protocol version.
---

# eth\_protocolVersion - Ethereum

### Parameters

none

### Returns

`String` - The current ethereum protocol version.

### [Example](https://composer.alchemyapi.io/?composer\_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth\_protocolVersion%22%2C%22paramValues%22%3A%5B%5D%7D)

Request

{% tabs %}
{% tab title="alchemyweb3.js" %}
```javascript
// Installation instructions: https://github.com/alchemyplatform/alchemy-web3

async function main() {
    // Import the AlchemyWeb3 library. Filepath to functions: 
	// /@alch/alchemy-web3/dist/alchemyWeb3.js
	const { createAlchemyWeb3 } = require("@alch/alchemy-web3");

   	// Replace with your Alchemy API key:
	const apiKey = "demo";
	
	// Initialize an alchemy-web3 instance:
	const web3 = createAlchemyWeb3(
	  `https://eth-mainnet.g.alchemy.com/v2/${apiKey}`);
	
	// Query the blockchain 
    	const version = await web3.eth.protocolVersion(); 
    
	// Print the output to console
	console.log(version);
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
   	const version = await provider.protocolVersion(); 
    
	// Print the output to console
	console.log(version);
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
version = web3.eth.protocol_version() 

# Print the output to console
print(version)
```
{% endtab %}

{% tab title="Curl" %}
```bash
curl https://eth-mainnet.alchemyapi.io/v2/your-api-key \
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"eth_protocolVersion","params":[],"id":0}'
```
{% endtab %}

{% tab title="Postman" %}
```http
URL: https://eth-mainnet.alchemyapi.io/v2/your-api-key
RequestType: POST
Body: 
{
    "jsonrpc":"2.0",
    "method":"eth_protocolVersion",
    "params":[]
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
  "result": "0x40"
}
```

{% embed url="https://docs.alchemy.com/alchemy/apis/ethereum" %}
