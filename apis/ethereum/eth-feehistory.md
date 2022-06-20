---
description: Returns a collection of historical gas information
---

# eth\_feeHistory - Ethereum

Returns a collection of historical gas information from which you can decide what to submit as your `maxFeePerGas` and/or `maxPriorityFeePerGas`. This method was introduced with [EIP 1559](https://blog.alchemy.com/blog/eip-1559).

**Parameters**

* `BLOCKCOUNT` - Number of blocks in the requested range. Between 1 and 1024 blocks can be requested in a single query. Less than requested may be returned if not all blocks are available.
* `NEWESTBLOCK` - Highest number block of the requested range.
* `REWARDPERCENTILES` - (optional) A monotonically increasing list of percentile values to sample from each block's effective priority fees per gas in ascending order, weighted by gas used.

**Returns**

`Object`

* `OLDESTBLOCK` - Lowest number block of the returned range.
* `BASEFEEPERGAS` - An array of block base fees per gas. This includes the next block after the newest of the returned range, because this value can be derived from the newest block. Zeroes are returned for pre-EIP-1559 blocks.
* `GASUSEDRATIO` - An array of block gas used ratios. These are calculated as the ratio of gasUsed and gasLimit.
* `REWARD` - (Optional) An array of effective priority fee per gas data points from a single block. All zeroes are returned if the block is empty.

**Example**

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
    	const hist = await web3.eth.feeHistory({
	    block_count: 4,
	    newest_block: "latest",
	    reward_percentiles: [25, 75],
	  }) 

	// Print the output to console
  	console.log(hist);
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
   	const hist = await provider.feeHistory({
	    block_count: 4,
	    newest_block: "latest",
	    reward_percentiles: [25, 75],
	  }) 

	// Print the output to console
  	console.log(hist);
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
hist = web3.eth.fee_history({
	    'block_count': 4,
	    'newest_block': "latest",
	    'reward_percentiles': [25, 75],
		})

# Print the output to console
print(hist)
```
{% endtab %}

{% tab title="Curl" %}
```bash
curl https://eth-rinkeby.alchemyapi.io/v2/your-api-key \
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"eth_feeHistory","params":[4, "latest", [25, 75]],"id":1}'
```
{% endtab %}

{% tab title="Postman" %}
```http
URL: https://eth-mainnet.alchemyapi.io/v2/your-api-key
RequestType: POST
Body: 
{
    "jsonrpc":"2.0",
    "method":"eth_feeHistory",
    "params":[4, "latest", [25, 75]],
    "id":1
}
```
{% endtab %}
{% endtabs %}

Result

```javascript
{
  "id": "1",
  "jsonrpc": "2.0",
  "result": {
    "oldestBlock": 10762137,
    "reward": [
      [
        "0x4a817c7ee",
        "0x4a817c7ee"
      ], [
        "0x773593f0",
        "0x773593f5"
      ], [
        "0x0",
        "0x0"
      ], [
        "0x773593f5",
        "0x773bae75"
      ]
    ],
    "baseFeePerGas": [
      "0x12",
      "0x10",
      "0x10",
      "0xe",
      "0xd"
    ],
    "gasUsedRatio": [
      0.026089875,
      0.406803,
      0,
      0.0866665
    ]
  }
}
```

{% embed url="https://docs.alchemy.com/alchemy/apis/ethereum" %}
