---
description: >-
  Executes a new message call immediately without creating a transaction on the
  block chain.
---

# eth\_call - Ethereum

This is one of the most commonly used API calls. It is used to read from the blockchain which includes executing smart contracts, but does not publish anything to the blockchain. This call does not consume any Ether.

{% hint style="warning" %}
Starting from [Geth 1.9.13](https://github.com/ethereum/go-ethereum/pull/20783), `eth_call`will check the balance of the sender (to make sure that the sender has enough gas to complete the request) before executing the call, when one of the following conditions is true:

1. the `gas_price` parameter is populated, or
2. the contract function being called (i.e. in `data` modifies blockchain state)\


In these two cases, even though the `eth_call` requests don't consume any gas, the `from` address must have enough gas to execute the call as if it were a write transaction because `eth_call` is being used to simulate the transaction.
{% endhint %}

### Parameters

* `Object` - The transaction call object
  * `from`: `DATA`, 20 Bytes - (optional) The address the transaction is sent from.
  * `to`: `DATA`, 20 Bytes - The address the transaction is directed to.
  * `gas`: `QUANTITY` - (optional) Integer of the gas provided for the transaction execution. `eth_call` consumes zero gas, but this parameter may be needed by some executions. **NOTE: this parameter has a cap of 550 Million gas per request. Reach out to us at support@alchemy.com if you want to increase this limit!**
  * `gasPrice`: `QUANTITY` - (optional) Integer of the gasPrice used for each paid gas.
  * `value`: `QUANTITY` - (optional) Integer of the value sent with this transaction
  * `data`: `DATA` - (optional) Hash of the method signature and encoded parameters. For details see [Ethereum Contract ABI](https://docs.soliditylang.org/en/v0.7.0/abi-spec.html)
* `QUANTITY|TAG` - integer block number, or the string "latest", "earliest" or "pending" (see the [default block parameter](https://eth.wiki/json-rpc/API#the-default-block-parameter)), OR the `blockHash` (in accordance with [EIP-1898](https://eips.ethereum.org/EIPS/eip-1898)) **NOTE: the parameter is an object instead of a string and should be specified as: `{"blockHash": "0x<some-hash>"}.`** Learn more [here](https://eips.ethereum.org/EIPS/eip-1898).

{% hint style="danger" %}
**Note:** `eth_call` has a timeout restriction at the node level. Batching multiple `eth_call` together on-chain using pre-deployed smart contracts might result in unexpected timeouts that cause none of your calls to complete. Instead, consider serializing these calls, or using smaller batches if they fail with a node error code.
{% endhint %}

```javascript
params: [
    {
        "from": "0xb60e8dd61c5d32be8058bb8eb970870f07233155",
        "to": "0xd46e8dd67c5d32be8058bb8eb970870f07244567",
        "gas": "0x76c0",
        "gasPrice": "0x9184e72a000",
        "value": "0x9184e72a",
        "data": "0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675"
    }, 
    "latest"
]
```

### Returns

`DATA` - the return value of executed contract.

**Example**

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
    	const data = await web3.eth.call(
	    {
	        "from": "0xb60e8dd61c5d32be8058bb8eb970870f07233155",
	        "to": "0xd46e8dd67c5d32be8058bb8eb970870f07244567",
	        "gas": "0x76c0",
	        "gasPrice": "0x9184e72a000",
	        "value": "0x9184e72a",
	        "data": "0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675"
	    }, 
	    "latest"
	); 
    
	// Print the output to console
	console.log(data);
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
    const data = await provider.call(
	    {
	        "from": "0xb60e8dd61c5d32be8058bb8eb970870f07233155",
	        "to": "0xd46e8dd67c5d32be8058bb8eb970870f07244567",
	        "gas": "0x76c0",
	        "gasPrice": "0x9184e72a000",
	        "value": "0x9184e72a",
	        "data": "0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675"
	    }, 
	    "latest"
	); 
    
	// Print the output to console
	console.log(data);
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
data = web3.eth.call({
		'value': 0, 
		'gas': 21736, 
		'maxFeePerGas': 2000000000, 
		'maxPriorityFeePerGas': 1000000000, 
		'to': '0xc305c90',
		'data': '0x477a5c98'
		}) 

# Print the output to console
print(data)
```
{% endtab %}

{% tab title="Curl" %}
```bash
curl https://eth-mainnet.alchemyapi.io/v2/your-api-key \
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"eth_call","params":[{"from": "0xb60e8dd61c5d32be8058bb8eb970870f07233155","to": "0xd46e8dd67c5d32be8058bb8eb970870f07244567","gas": "0x76c0","gasPrice": "0x9184e72a000","value": "0x9184e72a","data": "0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675"}, "latest"],"id":1}'
```
{% endtab %}

{% tab title="Postman" %}
```http
URL: https://eth-mainnet.alchemyapi.io/v2/your-api-key
RequestType: POST
Body: 
{
    "jsonrpc":"2.0",
    "method":"eth_call",
    "params":[{"from": "0xb60e8dd61c5d32be8058bb8eb970870f07233155","to": "0xd46e8dd67c5d32be8058bb8eb970870f07244567","gas": "0x76c0","gasPrice": "0x9184e72a000","value": "0x9184e72a","data": "0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675"}, "latest"],
    "id":1
}
```
{% endtab %}
{% endtabs %}

Result

```javascript
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": "0x"
}
```

{% embed url="https://docs.alchemy.com/alchemy/apis/ethereum" %}
