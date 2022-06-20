---
description: >-
  Generates and returns an estimate of how much gas is necessary to allow the
  transaction to complete. The transaction will not be added to the blockchain.
---

# eth\_estimateGas - Ethereum

{% hint style="info" %}
**Note:** The estimate may be significantly more than the amount of gas actually used by the transaction, for a variety of reasons including EVM mechanics and node performance. Estimates are served directly from nodes, we're not doing anything special to the value so the rest of the network is likely seeing the same.
{% endhint %}

### **Parameters**

* `Object` - The transaction call object
  * `from`: `DATA`, 20 Bytes - (optional) The address the transaction is sent from.
  * `to`: `DATA`, 20 Bytes - The address the transaction is directed to.
  * `gas`: `QUANTITY` - (optional) Integer of the gas provided for the transaction execution. `eth_estimateGas` consumes zero gas, but this parameter may be needed by some executions. **NOTE: this parameter has a cap of 550 Million gas per request.**
  * `gasPrice`: `QUANTITY` - (optional) Integer of the gasPrice used for each paid gas.
  * `value`: `QUANTITY` - (optional) Integer of the value sent with this transaction
  * `data`: `DATA` - (optional) Hash of the method signature and encoded parameters. For details see Ethereum Contract ABI
* `QUANTITY|TAG` - integer block number, or the string "latest", "earliest" or "pending", see the [default block parameter](https://eth.wiki/json-rpc/API#the-default-block-parameter).

{% hint style="warning" %}
**NOTE**

* `eth_estimateGas`\*\* \*\*will check the balance of the sender (to make sure that the sender has enough gas to complete the request). This means that even though the call doesn't consume any gas, the `from` address must have enough gas to execute the transaction.
* If no `gas` is specified geth uses the block gas limit from the pending block as an upper bound. As a result the returned estimate might not be enough to executed the call/transaction when the amount of actual gas needed is higher than the pending block gas limit.
{% endhint %}

### Returns

`QUANTITY` - the amount of gas used.

#### [Example](https://composer.alchemyapi.io/?composer\_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth\_estimateGas%22%2C%22paramValues%22%3A%5B%7B%22from%22%3A%220xb60e8dd61c5d32be8058bb8eb970870f07233155%22%2C%22to%22%3A%220xd46e8dd67c5d32be8058bb8eb970870f07244567%22%2C%22gasPrice%22%3A%220x9184e72a000%22%2C%22value%22%3A%220x9184e72a%22%2C%22data%22%3A%220xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675%22%2C%22gas%22%3A%220x76c0%22%7D%5D%7D)

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
    	const estGas = await web3.eth.estimateGas({
	    from: "0xge61df",
	    to: "0x087a5c",
	    data: "0xa9059c",
	    gasPrice: "0xa994f8",
	  }) 

	// Print the output to console
  	console.log(estGas);
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
	const provider = new ethers.providers.JsonRpcProvider('https://eth-mainnet.alchemyapi.io/v2/${apiKey}',);

	// Query the blockchain (replace example parameters)
    	const estGas = await provider.estimateGas({
	    from: "0xge61df",
	    to: "0x087a5c",
	    data: "0xa9059c",
	    gasPrice: "0xa994f8",
	  }) 

	// Print the output to console
  	console.log(estGas); 
   }

main()
```
{% endtab %}

{% tab title="web3.py" %}
```python
# Installation Instructions: https://web3py.readthedocs.io/en/latest/quickstart.html#installation

from web3 import Web3, HTTPProvider

#Replace with your Alchemy API key:
const apiKey = "demo";

# Initialize a Web3.py instance
web3 = Web3(Web3.HTTPProvider('https://eth-mainnet.alchemyapi.io/v2/${apiKey}'))

# Query the blockchain (replace example parameters)
estGas = web3.eth.estimate_gas({
     'to': '0xd3CdA913deB6f67', 
     'from':web3.eth.coinbase, 
     'value': 12345
     })

# Print the output to console
print(estGas)

```
{% endtab %}

{% tab title="Curl" %}
```bash
curl https://eth-mainnet.alchemyapi.io/v2/your-api-key \
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"eth_estimateGas","params":[{"from": "0x8D97689C9818892B700e27F316cc3E41e17fBeb9","to": "0xd3CdA913deB6f67967B99D67aCDFa1712C293601","value": "0x186a0"}],"id":1}'
```
{% endtab %}

{% tab title="Postman" %}
```http
URL: https://eth-mainnet.alchemyapi.io/v2/your-api-key
RequestType: POST
Body: 
{
    "jsonrpc":"2.0",
    "method":"eth_estimateGas",
    "params":[{
    "from": "0x8D97689C9818892B700e27F316cc3E41e17fBeb9",
    "to": "0xd3CdA913deB6f67967B99D67aCDFa1712C293601",
    "value": "0x186a0"
    }],
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
  "result": "0x5208" // 21000
}
```

{% embed url="https://docs.alchemy.com/alchemy/apis/ethereum" %}
