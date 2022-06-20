---
description: >-
  Creates a new message call transaction or a contract creation for signed
  transactions.
---

# eth\_sendRawTransaction - Ethereum

{% hint style="warning" %}
Alchemy does not store keys, so transactions sent via Alchemy must be signed ahead of time using another provider like [ethers](https://docs.ethers.io/v5/api/signer/) (via `eth_signTransaction`) and sent with `eth_sendRawTransaction`.
{% endhint %}

### Parameters

`DATA`, The signed transaction data.

```javascript
params: ["0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675"]
```

### Returns

`DATA`, 32 Bytes - the transaction hash, or the zero hash if the transaction is not yet available.

Use [`eth_getTransactionReceipt`](https://docs.alchemy.com/alchemy/apis/ethereum/eth-gettransactionreceipt#returns) to get the contract address after the transaction was mined when you created a contract.

**Example**

{% hint style="danger" %}
**Note:** Since `eth_sendRawTransaction` is a request used for writing to the blockchain and changes its state, it is impossible to execute the same request twice. This means if you were to copy the example given below you will not get the expected response.
{% endhint %}

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
    	const hash = await web3.eth.sendRawTransaction({
	    signed_data: '0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675',
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
    	const hash = await provider.sendRawTransaction({
	    signed_data: '0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675',
	  }); 
    
	// Print the output to console
	console.log(hash);
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
txnhash = web3.eth.send_raw_transaction({
	    signed_txn.rawTransaction: "0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675",
	  }) 

# Print the output to console
print(txnhash)
```
{% endtab %}

{% tab title="Curl" %}
```bash
curl https://eth-mainnet.alchemyapi.io/v2/your-api-key \
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"eth_sendRawTransaction","params":["0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675"],"id":1}'
```
{% endtab %}

{% tab title="Postman" %}
```http
URL: https://eth-mainnet.alchemyapi.io/v2/your-api-key
RequestType: POST
Body: 
{
    "jsonrpc":"2.0",
    "method":"eth_sendRawTransaction",
    "params":["0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675"],
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
  "result": "0xe670ec64341771606e55d6b4ca35a1a6b75ee3d5145a99d05921026d1527331"
}


```

{% hint style="info" %}
**Common Error Code:**\
****`-32000`&#x20;

"transaction underpriced"

* transaction was sent with too low gas. Re-send the transaction with higher gas
{% endhint %}

{% embed url="https://docs.alchemy.com/alchemy/apis/ethereum" %}
