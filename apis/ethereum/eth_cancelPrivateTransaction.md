---
description: >-
  Request to cancel private transactions on Ethereum that are sent via
  eth_sendPrivateTransaction
---

# eth\_cancelPrivateTransaction - Ethereum

`eth_cancelPrivateTransaction` stops private transactions from being submitted for future blocks. A transaction can only be cancelled if the request sent through the the same alchemy app/API key that the [`eth_sendPrivateTransaction`](eth-sendPrivateTransaction.md) call was sent to in first place.

{% hint style="warning" %}
**NOTE:** This method is currently only supported on **Ethereum mainnet**.&#x20;
{% endhint %}

### Parameters

* `txHash`: _**\[string]**_ transaction hash for private transaction to be cancelled&#x20;

### Response&#x20;

* `result`: _**\[boolean]**_ `true` if transaction was successfully cancelled, `false` if not

### Example&#x20;

#### Request

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
    	const hash = await web3.eth.cancelPrivateTransaction({
	    signed_data: '0x7e5814a'
	  }); 
    
	// Print the output to console
	console.log(hash);
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
    	const hash = await provider.cancelPrivateTransaction({
	    signed_data: '0x7e5814a'
	  }); 
    
	// Print the output to console
	console.log(hash);
   }

main()
```
{% endtab %}

{% tab title="cURL" %}
```shell
curl https://eth-mainnet.alchemyapi.io/v2/your-api-key \
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"eth_cancelPrivateTransaction","params":[{"txHash": "0x45df1bc3de765927b053ec029fc9d15d6321945b23cac0614eb0b5e61f3a2f2a"}],"id":1}'
```
{% endtab %}

{% tab title="Postman" %}
```html
URL: https://eth-mainnet.alchemyapi.io/v2/your-api-key
RequestType: POST
Body: 
{
    "jsonrpc":"2.0",
    "method":"eth_sendPrivateTransaction",
    "params":[{"txHash": "0x45df1bc3de765927b053ec029fc9d15d6321945b23cac0614eb0b5e61f3a2f2a"}],"id":1}'
    "id":1
}
```
{% endtab %}
{% endtabs %}

#### Response

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": true // true if tx successfully cancelled, false if not
}
```

## FAQ

### How to cancel a private transaction

You can cancel a private transaction by simply calling `eth_cancelPrivateTransaction` with the transaction hash of the transaction you wish to cancel. It is not guaranteed that the cancellation will persist if the transaction has already been mined.&#x20;
