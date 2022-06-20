---
description: Returns code at a given address.
---

# eth\_getCode - Ethereum

This method can be used to [distinguish between contract addresses and wallet addresses](../../resources/faq.md#how-do-i-distinguish-between-a-contract-address-and-a-wallet-address).

### Parameters

* `DATA`, 20 Bytes - address.
* `QUANTITY|TAG` - integer block number, or the string "latest", "earliest" or "pending", see the [default block parameter](https://eth.wiki/json-rpc/API#the-default-block-parameter).

```javascript
params: [
    '0xb59f67a8bff5d8cd03f6ac17265c550ed8f33907',
    'latest'
]
```

### Returns

* `DATA` - the code from the given address.

### [Example](https://composer.alchemyapi.io/?composer\_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth\_getCode%22%2C%22paramValues%22%3A%5B%220xb59f67a8bff5d8cd03f6ac17265c550ed8f33907%22%2C%22latest%22%5D%7D)

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
    	const code = await web3.eth.getCode({
	    address: '0xb59f67a8bff5d8cd03f6ac17265c550ed8f33907',
		tag: 'latest',
	  }); 
    
	// Print the output to console
	console.log(code);
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
    	const code = await provider.getCode({
	    address: '0xb59f67a8bff5d8cd03f6ac17265c550ed8f33907',
		tag: 'latest',
	  }); 
    
	// Print the output to console
	console.log(code);
   }

main()
```
{% endtab %}

{% tab title="web3,py" %}
```python
# Installation Instructions: https://web3py.readthedocs.io/en/latest/quickstart.html#installation

from web3 import Web3, HTTPProvider

#Replace with your Alchemy API key:
apiKey = "demo"

# Initialize a Web3.py instance
web3 = Web3(Web3.HTTPProvider('https://eth-mainnet.alchemyapi.io/v2/'+apiKey))

# Query the blockchain (replace example parameters)
code = web3.eth.get_Code({
	    account: "0xb59f67a8bff5d8cd03f6ac17265c550ed8f33907", #can be a checksum address or ENS
	  }) 

# Print the output to console
print(code)
```
{% endtab %}

{% tab title="Curl" %}
```bash
curl https://eth-mainnet.alchemyapi.io/v2/your-api-key \
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"eth_getCode","params":["0xb59f67a8bff5d8cd03f6ac17265c550ed8f33907", "latest"],"id":0}'
```
{% endtab %}

{% tab title="Postman" %}
```http
URL: https://eth-mainnet.alchemyapi.io/v2/your-api-key
RequestType: POST
Body: 
{
    "jsonrpc":"2.0",
    "method":"eth_getCode",
    "params":["0xb59f67a8bff5d8cd03f6ac17265c550ed8f33907", "latest"],
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
  "result": "0x606060405236156100965763ffffffff7c010000000000000000000000000000000000000000000000000000000060003504166306fdde0381146100a557806313af40351461012f57806318160ddd1461014e578063313ce5671461017357806370a082311461019c57806375ad319a146101bb5780638da5cb5b146101ee57806395d89b411461021d578063a9059cbb14610230575b34156100a157600080fd5bfe5b005b34156100b057600080fd5b6100b8610252565b60405160208082528190810183818151815260200191508051906020019080838360005b838110156100f45780820151838201526020016100dc565b50505050905090810190601f1680156101215780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b341561013a57600080fd5b6100a3600160a060020a0360043516610289565b341561015957600080fd5b61016161030f565b60405190815260200160405180910390f35b341561017e57600080fd5b610186610315565b60405160ff909116815260200160405180910390f35b34156101a757600080fd5b610161600160a060020a036004351661031a565b34156101c657600080fd5b6101da600160a060020a0360043516610335565b604051901515815260200160405180910390f35b34156101f957600080fd5b61020161038e565b604051600160a060020a03909116815260200160405180910390f35b341561022857600080fd5b6100b861039d565b341561023b57600080fd5b6101da600160a060020a03600435166024356103d4565b60408051908101604052601881527f444f5420416c6c6f636174696f6e20496e64696361746f720000000000000000602082015281565b60005433600160a060020a039081169116146102a457600080fd5b600054600160a060020a0380831691167f70aea8d848e8a90fb7661b227dc522eb6395c3dac71b63cb59edd5c9899b236460405160405180910390a36000805473ffffffffffffffffffffffffffffffffffffffff1916600160a060020a0392909216919091179055565b60015481565b600381565b600160a060020a031660009081526002602052604090205490565b33600160a060020a03811660009081526002602052604081206001015490919060ff16151561036357600080fd5b5050600160a060020a031660009081526002602052604090206001908101805460ff19168217905590565b600054600160a060020a031681565b60408051908101604052600381527f444f540000000000000000000000000000000000000000000000000000000000602082015281565b33600160a060020a03811660009081526002602052604081205490919083908190101561040057600080fd5b33600160a060020a03811660009081526002602052604090206001015460ff16151561042b57600080fd5b85600160a060020a031633600160a060020a03167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef8760405190815260200160405180910390a3600160a060020a033381166000908152600260205260408082208054899003905591881681522080548601905560019350505050929150505600a165627a7a72305820228dfae3e67abcdc7f73fb3f83a7d23f45acd853774acad9d2e1ac83b940fbe90029"
}
```

{% embed url="https://docs.alchemy.com/alchemy/apis/ethereum" %}