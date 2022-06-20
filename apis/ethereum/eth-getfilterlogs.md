---
description: >-
  Returns an array of all logs matching filter with given id. Can compute the
  same results with an eth_getLogs call (see hint below).
---

# eth\_getFilterLogs - Ethereum

{% hint style="warning" %}
This method only works for filters creates with [`eth_newFilter`](https://docs.alchemy.com/alchemy/apis/ethereum/eth-newfilter)not for filters created using [`eth_newBlockFilter`](https://docs.alchemy.com/alchemy/apis/ethereum/eth-newblockfilter) or [`eth_newPendingTransactionFilter`](https://docs.alchemy.com/alchemy/apis/ethereum/eth-newpendingtransactionfilter), which will return `"filter not found".`

#### eth\_getLogs vs. eth\_getFilterLogs

These two computations will return the same results:

1. Calling `eth_getLogs` with params `[<options>]`
2. Calling `eth_newFilter` with params `[<options>]`, getting a filter id `<filterId>` back, then calling `eth_getFilterLogs` with params `[<filterId>]`
{% endhint %}

### **Parameters**

1. `QUANTITY` - The filter id.

```javascript
params: [
  "0xfe704947a3cd3ca12541458a4321c869"
]
```

### **Returns**

See [`eth_getFilterChanges`](https://docs.alchemy.com/alchemy/apis/ethereum/eth-getfilterchanges#returns)

### [**Example**](https://composer.alchemyapi.io/?composer\_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth\_getFilterLogs%22%2C%22paramValues%22%3A%5B%220xfe704947a3cd3ca12541458a4321c869%22%5D%7D)

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
    	const logs = await web3.eth.getFilterLogs({
	    id: "0xfe704947a3cd3ca12541458a4321c869" 
	  }) 

	// Print the output to console
  	console.log(logs);
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
    	const logs = await provider.getFilterLogs({
	    id: "0xfe704947a3cd3ca12541458a4321c869" 
	  }) 

	// Print the output to console
  	console.log(logs);
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
logs = web3.eth.net.get_filter_logs({
	    id: "0xfe704947a3cd3ca12541458a4321c869" 
	  })  

# Print the output to console
print(logs)
```
{% endtab %}

{% tab title="Curl" %}
```bash
curl https://eth-mainnet.alchemyapi.io/v2/your-api-key \
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"eth_getFilterLogs","params":["0xfe704947a3cd3ca12541458a4321c869"],"id":74}'
```
{% endtab %}

{% tab title="Postman" %}
```http
URL: https://eth-mainnet.alchemyapi.io/v2/your-api-key
RequestType: POST
Body: 
{
    "jsonrpc":"2.0",
    "method":"eth_getFilterLogs",
    "params":["0xfe704947a3cd3ca12541458a4321c869"],
    "id":74
}
```
{% endtab %}
{% endtabs %}

Result

```javascript
{
    "jsonrpc": "2.0",
    "id": 73,
    "result": [{
        "address": "0xb5a5f22694352c15b00323844ad545abb2b11028",
        "blockHash": "0x99e8663c7b6d8bba3c7627a17d774238eae3e793dee30008debb2699666657de",
        "blockNumber": "0x5d12ab",
        "data": "0x0000000000000000000000000000000000000000000000a247d7a2955b61d000",
        "logIndex": "0x0",
        "removed": false,
        "topics": ["0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef", "0x000000000000000000000000bdc0afe57b8e9468aa95396da2ab2063e595f37e", "0x0000000000000000000000007503e090dc2b64a88f034fb45e247cbd82b8741e"],
        "transactionHash": "0xa74c2432c9cf7dbb875a385a2411fd8f13ca9ec12216864b1a1ead3c99de99cd",
        "transactionIndex": "0x3"
    }, {
        "address": "0xe38165c9f6deb144afc9c32c206b024817e1496d",
        "blockHash": "0x99e8663c7b6d8bba3c7627a17d774238eae3e793dee30008debb2699666657de",
        "blockNumber": "0x5d12ab",
        "data": "0x0000000000000000000000000000000000000000000000000000000025c6b720",
        "logIndex": "0x3",
        "removed": false,
        "topics": ["0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef", "0x00000000000000000000000080e73e47173b2d00b531bf83bc39e710157125c3", "0x0000000000000000000000008f6cc93795969e5bbbf07c66dfee7d41ad24f1ef"],
        "transactionHash": "0x9e8f1cb1facb9a11a1cf947634053a0b2d557399f926b12127aa10497a2f0153",
        "transactionIndex": "0x5"
    }
}
```

{% embed url="https://docs.alchemy.com/alchemy/apis/ethereum" %}
