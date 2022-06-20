---
description: Get all transaction receipts for a given block on Ethereum.
---

# eth\_getBlockReceipts - Ethereum

{% hint style="warning" %}
**NOTE:** This endpoint is currently only supported on **Ethereum Mainnet**.&#x20;

_For higher reliability, we recommend using_ [_`alchemy_getTransactionReceipts`_](../../enhanced-apis/transaction-receipts-api.md) _instead of `eth_getBlockReceipts.`_&#x20;
{% endhint %}

## Parameters

* `string` - Block number or block hash to fetch transaction receipts for, or the string '`earliest`', '`latest`' or '`pending`'.

```
params: ["0x7e5814a31cc6cccfc8fb739450314ef433ae097dd862161da15bf9627fd63df9"]
```

## Returns

* `result` - _**\[array]**_ List of all the transaction receipt objects within the given block
  * `transactionHash`: _**\[string]**_, 32 Byte hash of the transaction.
  * `transactionIndex`: _**\[string]**_ Integer of the transactions index position in the block.
  * `blockHash`: _**\[string]**_ 32 Byte hash of the block where this transaction was in.
  * `blockNumber`: _**\[string]**_ Block number where this transaction was in.
  * `from`: _**\[string]**_ 20 Byte address of the sender.
  * `to`: _**\[string]**_ 20 Byte address of the receiver. `null` when it's a contract creation transaction.
  * `cumulativeGasUsed`: _**\[string]**_ The total amount of gas used when this transaction was executed in the block.
  * `gasUsed`: _**\[string]**_ The amount of gas used by this specific transaction alone.
  * `contractAddress`: _**\[string]**_ 20 Byte contract address created, if the transaction was a contract creation, otherwise `null`.
  * `logs`: _**\[array]**_ List of log objects, which this transaction generated.
  * `logsBloom`: _**\[string]**_ 256 Byte Bloom filter for light clients to quickly retrieve related logs.
  * `effectiveGasPrice`: _**\[string]**_ The actual value per gas deducted from the senders account. Omitted for pre-EIP1559 transactions.&#x20;

## **Example**

For a no-code example of `eth_getBlockReceipts`, check out the [composer request](https://composer.alchemyapi.io/?share=eJwdxr0OgjAQAOB3uZmhpaV.ow.g4OBijDmuVyFQSqBGE\_O7a9y\_N9CA4wJBNLBwfZZt\_jtzHUo8YmYI8PPtzvUwF5pOTDyudYcGVtwwn3F\_8A7hAuJluXNSo5JEhogSudRb5XUnlNSctFLIwtsYnWmlkRFl1ydvWpuiUTF5uH6\_Vh0tGA--).&#x20;

### **Request**

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
    	const receipts = await web3.eth.getBlockReceipts({
	    string: '0x7e5814a31cc6cccfc8fb739450314ef433ae097dd862161da15bf9627fd63df9',
	  });
    
	// Print the output to console
	console.log(receipts);
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
    	const receipts = await provider.getBlockReceipts({
	    string: '0x7e5814a31cc6cccfc8fb739450314ef433ae097dd862161da15bf9627fd63df9',
	  });
    
	// Print the output to console
	console.log(receipts);
   }

main()
```
{% endtab %}

{% tab title="Curl" %}
```shell
curl https://eth-mainnet.alchemyapi.io/v2/your-api-key \
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0", "id":1, "method":"eth_getBlockReceipts","params":["0x7e5814a31cc6cccfc8fb739450314ef433ae097dd862161da15bf9627fd63df9"]'
```
{% endtab %}
{% endtabs %}

### **Response**

```
{
  "jsonrpc":"2.0"
  "id":0
  "result":[
    {
      "transactionHash": "0x04ae8960f7247f4c4577883d781842d3f5d4454d43eab3f3decaaea06680fe60",
      "blockHash": "0x7e5814a31cc6cccfc8fb739450314ef433ae097dd862161da15bf9627fd63df9",
      "blockNumber": "0xd8ee52",
      "contractAddress": null,
      "cumulativeGasUsed": "0xc9a1",
      "effectiveGasPrice": "0x1bf08eb000",
      "from": "0xdfd5293d8e347dfe59e90efd55b2956a1343963d",
      "gasUsed": "0xc9a1",
      "logs": [
        {
          "blockHash": "0x7e5814a31cc6cccfc8fb739450314ef433ae097dd862161da15bf9627fd63df9",
          "address": "0xbb0e17ef65f82ab018d8edd776e8dd940327b28b",
          "logIndex": "0x0",
          "data": "0x00000000000000000000000000000000000000000000000088250d4b376b9800",
          "removed": false,
          "topics": [
            "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
            "0x000000000000000000000000dfd5293d8e347dfe59e90efd55b2956a1343963d",
            "0x00000000000000000000000053b8feb8bdff4d016dc4ec1570b894e007867d43"
          ],
          "blockNumber": "0xd8ee52",
          "transactionIndex": "0x0",
          "transactionHash": "0x04ae8960f7247f4c4577883d781842d3f5d4454d43eab3f3decaaea06680fe60"
        }
      ],
      "logsBloom": "0x00000000000000000000000000000000000000000000000000000000800000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000001000000000000000000000000000000000000000000000000000400000010000000000000000000000000000000000002000000000000000000000000001000000000008000000080000000000000000000000000000400000000000000000000000000000002000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
      "status": "0x1",
      "to": "0xbb0e17ef65f82ab018d8edd776e8dd940327b28b",
      "transactionIndex": "0x0",
      "type": "0x0"
    }
    .
    .
    .
```

{% content-ref url="./" %}
[.](./)
{% endcontent-ref %}
