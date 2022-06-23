---
description: >-
  Returns information about a transaction by block number and transaction index
  position.
---

# eth\_getTransactionByBlockNumberAndIndex - Ethereum

### Parameters

* `QUANTITY|TAG` - a block number, or the string "earliest", "latest" or "pending", as in the [default block parameter](https://eth.wiki/json-rpc/API#the-default-block-parameter).
* `QUANTITY` - the transaction index position.

```javascript
 params: [ 
     'latest', // 668 
     '0x0' // 0 
 ]
```

### Returns

See [`eth_getTransactionByHash`](eth\_gettransactionbyhash.md)``

### [Example](https://composer.alchemyapi.io/?composer\_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth\_getTransactionByBlockNumberAndIndex%22%2C%22paramValues%22%3A%5B%22latest%22%2C%220x0%22%5D%7D)

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
    	const transaction = await web3.eth.getTransactionByBlockNumberAndIndex({
	     tag: 'latest',
	     quantity: '0x0',
	  });
    
	// Print the output to console
	console.log(transaction);
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
    const transaction = await provider.getTransactionByBlockNumberAndIndex({
	    tag: 'latest',
		quantity: '0x0',
	  }); 
    
	// Print the output to console
	console.log(transaction);
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
transaction = web3.eth.get_transaction_by_block({
	    block_identifier: "latest",
		index: '0',
	  }) 

# Print the output to console
print(transaction)
```
{% endtab %}

{% tab title="Curl" %}
```bash
curl https://eth-mainnet.alchemyapi.io/v2/your-api-key \
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"eth_getTransactionByBlockNumberAndIndex","params":["latest", "0x0"],"id":0}'
```
{% endtab %}

{% tab title="Postman" %}
```http
URL: https://eth-mainnet.alchemyapi.io/v2/your-api-key
RequestType: POST
Body: 
{
    "jsonrpc":"2.0",
    "method":"eth_getTransactionByBlockNumberAndIndex",
    "params":["latest", "0x0"],
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
  "result": {
    "blockHash": "0xf345d6ac2cb6290489915178fef0b2fc7f5a7312dd06773c77532de6740b2b4d",
    "blockNumber": "0xa1c0ff",
    "from": "0x79c384ac9c32e90f00a214c77caac1392ec8cdea",
    "gas": "0xafbe",
    "gasPrice": "0x1270b01800",
    "hash": "0x61b27f711f58ee3090c0976c7e90d2b7eafeb7b889f0db593234f04f8ce07f22",
    "input": "0xa9059cbb0000000000000000000000004b1a99467a284cc690e3237bc69105956816f7620000000000000000000000000000000000000000000000000000001919617600",
    "nonce": "0xa",
    "to": "0xf9e5af7b42d31d51677c75bbbd37c1986ec79aee",
    "transactionIndex": "0x0",
    "value": "0x0",
    "v": "0x1b",
    "r": "0x2123cdbd1130f726ebed55fd2295239778dd4161495d2733f374d7863fc42ab1",
    "s": "0x1f08fd53ff2c3969b88d5e622561d62a799ae68e36f5142689dbfde44bbe1bed"
  }
}
```

{% embed url="https://docs.alchemy.com/alchemy/apis/ethereum" %}
