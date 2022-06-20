---
description: Returns the balance of the account of a given address.
---

# eth\_getBalance - Ethereum

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
    	const balance = await web3.eth.getBalance('0xc94770007dda54cF92009BFF0dE90c06F603a09f', 'latest'); 
    
	// Print the output to console
	console.log(balance);
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
    	const balance = await provider.getBalance({
	    address: '0xc94770007dda54cF92009BFF0dE90c06F603a09f',
		tag: 'latest',
	  }); 
    
	// Print the output to console
	console.log(balance);
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
balance = web3.eth.get_Balance({
	    account: "0xc94770007dda54cF92009BFF0dE90c06F603a09f", #can be a checksum address or ENS
	  }) 

# Print the output to console
print(balance)
```
{% endtab %}

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

To convert the hex string response, measured in [Wei](../../resources/web3-glossary/#wei) to a decimal value measured in ETH we need to complete two steps:

1. Convert the hex response into decimal (Wei)
2. Convert the [Wei](../../resources/web3-glossary/#wei) decimal into ETH decimal (10^18 wei = 1 eth)

Depending on what library or language you are using, there are several options here.

{% tabs %}
{% tab title="Python" %}
```python
# conversion from hex string to decimal
wei_in_dec = int("hex strong response",16)

# conversion from Wei to ETH
ethBalance = wei_in_dec / (10**18)
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

{% embed url="https://docs.alchemy.com/alchemy/apis/ethereum" %}
