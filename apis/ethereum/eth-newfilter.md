---
description: >-
  Creates a filter object, based on filter options, to notify when the state
  changes (logs).
---

# eth\_newFilter - Ethereum

Unlike [`eth_newBlockFilter`](eth-newblockfilter.md)which notifies you of all **new** blocks, you can pass in filter options to track new logs matching the topics specified.&#x20;

To check if the state has changed, call [`eth_getFilterChanges`](https://docs.alchemy.com/alchemy/apis/ethereum/eth-getfilterchanges)``

{% hint style="info" %}
**A note on specifying topic filters:**

Topics are order-dependent. A transaction with a log with topics \[A, B] will be matched by the following topic filters:

* `[]` “anything”
* `[A]` “A in first position (and anything after)”
* `[null, B]` “anything in first position AND B in second position (and anything after)”
* `[A, B]` “A in first position AND B in second position (and anything after)”
* `[[A, B], [A, B]]` “(A OR B) in first position AND (A OR B) in second position (and anything after)”
{% endhint %}

### **Parameters**

* `Object` - The filter options:
  1. `fromBlock`: `QUANTITY|TAG` - (optional, default: `"latest"`) Integer block number, or `"latest"` for the last mined block or `"pending"`, `"earliest"` for not yet mined transactions.
  2. `toBlock`: `QUANTITY|TAG` - (optional, default: `"latest"`) Integer block number, or `"latest"` for the last mined block or `"pending"`, `"earliest"` for not yet mined transactions.
  3. `address`: `DATA|Array`, 20 Bytes - (optional) Contract address or a list of addresses from which logs should originate.
  4. `topics`: `Array of DATA`, - (optional) Array of 32 Bytes `DATA` topics. Topics are order-dependent. Each topic can also be an array of DATA with “or” options.

```javascript
params: [{
  "fromBlock": "0x1",
  "toBlock": "0x2",
  "address": "0x8888f1f195afa192cfee860698584c030f4c9db1",
  "topics": ["0x000000000000000000000000a94f5374fce5edbc8e2a8697c15331677e6ebf0b", null, ["0x000000000000000000000000a94f5374fce5edbc8e2a8697c15331677e6ebf0b", "0x0000000000000000000000000aff3454fce5edbc8cca8697c15331677e6ebccc"]]
}]
```

### **Returns**

`QUANTITY` - A filter id.

### [**Example**](https://composer.alchemyapi.io/?composer\_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth\_newFilter%22%2C%22paramValues%22%3A%5B%7B%22fromBlock%22%3A%220x1%22%2C%22toBlock%22%3A%220x2%22%2C%22address%22%3A%220x8888f1f195afa192cfee860698584c030f4c9db1%22%2C%22topics%22%3A%22%5B%5C%220x000000000000000000000000a94f5374fce5edbc8e2a8697c15331677e6ebf0b%5C%22%2C%20null%2C%20%5B%5C%220x000000000000000000000000a94f5374fce5edbc8e2a8697c15331677e6ebf0b%5C%22%2C%20%5C%220x0000000000000000000000000aff3454fce5edbc8cca8697c15331677e6ebccc%5C%22%5D%5D%22%7D%5D%7D)

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
    const id = await web3.eth.newFilter({
  		"fromBlock": "0x1",
  		"toBlock": "0x2",
  		"address": "0x8888f1f195afa192cfee860698584c030f4c9db1",
 		"topics": ["0x000000000000000000000000a94f5374fce5edbc8e2a8697c15331677e6ebf0b", null, 
 		["0x000000000000000000000000a94f5374fce5edbc8e2a8697c15331677e6ebf0b", "0x0000000000000000000000000aff3454fce5edbc8cca8697c15331677e6ebccc"]]
		}); 
    
	// Print the output to console
	console.log(id);
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
    	const id = await provider.newFilter({
  			"fromBlock": "0x1",
  			"toBlock": "0x2",
  			"address": "0x8888f1f195afa192cfee860698584c030f4c9db1",
  			"topics": ["0x000000000000000000000000a94f5374fce5edbc8e2a8697c15331677e6ebf0b", null, 
  			["0x000000000000000000000000a94f5374fce5edbc8e2a8697c15331677e6ebf0b", "0x0000000000000000000000000aff3454fce5edbc8cca8697c15331677e6ebccc"]]}]
			}); 
    
	// Print the output to console
	console.log(id);
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
id = web3.eth.filter({
	'fromBlock': 0x1, 
	'toBlock': 0x2, 
	'address': '0x8888f1f195afa192cfee860698584c030f4c9db1'
	}) 

# Print the output to console
print(id)
```
{% endtab %}

{% tab title="Curl" %}
```bash
curl https://eth-mainnet.alchemyapi.io/v2/your-api-key \
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"eth_newFilter","params":[{"fromBlock": "0x1","toBlock": "0x2","address": "0x8888f1f195afa192cfee860698584c030f4c9db1","topics": ["0x000000000000000000000000a94f5374fce5edbc8e2a8697c15331677e6ebf0b", null, ["0x000000000000000000000000a94f5374fce5edbc8e2a8697c15331677e6ebf0b", "0x0000000000000000000000000aff3454fce5edbc8cca8697c15331677e6ebccc"]]}],"id":0}'
```
{% endtab %}

{% tab title="Postman" %}
```http
URL: https://eth-mainnet.alchemyapi.io/v2/your-api-key
RequestType: POST
Body: 
{
    "jsonrpc":"2.0",
    "method":"eth_newFilter",
    "params":[{"fromBlock": "0x1","toBlock": "0x2","address": "0x8888f1f195afa192cfee860698584c030f4c9db1","topics": ["0x000000000000000000000000a94f5374fce5edbc8e2a8697c15331677e6ebf0b", null, ["0x000000000000000000000000a94f5374fce5edbc8e2a8697c15331677e6ebf0b", "0x0000000000000000000000000aff3454fce5edbc8cca8697c15331677e6ebccc"]]}],
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
  "result": "0xdcc9a819f80efa9e1d215a9d41b2d22e"
}
```

{% embed url="https://docs.alchemy.com/alchemy/apis/ethereum" %}
