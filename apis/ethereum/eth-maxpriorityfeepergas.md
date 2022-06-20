---
description: >-
  Returns a fee per gas that is an estimate of how much you can pay as a
  priority fee, or "tip", to get a transaction included in the current block.
---

# eth\_maxPriorityFeePerGas - Ethereum

Generally you will use the value returned from this method to set the `maxFeePerGas` in a subsequent transaction that you are submitting. This method was introduced with [EIP 1559](https://blog.alchemy.com/blog/eip-1559).

{% hint style="danger" %}
\*\*NOTE: \*\*This method is not currently supported on Kovan
{% endhint %}

### Parameters

none

### **Returns**

`QUANTITY` - the estimated priority fee per gas.

#### **Example**

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
	
	// Query the blockchain (replace example parameters)
    	const fee = await web3.eth.maxPriorityFeePerGas(); 
    
	// Print the output to console
	console.log(fee);
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
    	const fee = await provider.maxPriorityFeePerGas(); 
    
	// Print the output to console
	console.log(fee);
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
fee = web3.eth.max_priority_fee() 

# Print the output to console
print(fee)
```
{% endtab %}

{% tab title="Curl" %}
```bash
curl https://eth-rinkeby.alchemyapi.io/v2/your-api-key \
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"eth_maxPriorityFeePerGas","params":[],"id":1}'
```
{% endtab %}

{% tab title="Postman" %}
```http
URL: https://eth-mainnet.alchemyapi.io/v2/your-api-key
RequestType: POST
Body: 
{
    "jsonrpc":"2.0",
    "method":"eth_maxPriorityFeePerGas",
    "params":[],
    "id":1
}
```
{% endtab %}
{% endtabs %}

Result

```javascript
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x12a05f1f9"
}
```

{% embed url="https://docs.alchemy.com/alchemy/apis/ethereum" %}
