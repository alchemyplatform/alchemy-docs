---
description: >-
  Send a single private transaction through Flashbots. Private transactions are
  sent directly to miners and not included in the public mempool.
---

# eth\_sendPrivateTransaction - Ethereum

`eth_sendPrivateTransaction` attempts to send your transaction to miners on every block for a maximum of 25 blocks. No need to listen for the next block. For more info about this method, check out the [official Flashbots documentation](https://docs.flashbots.net/flashbots-auction/searchers/advanced/rpc-endpoint#eth\_sendprivatetransaction).&#x20;

{% hint style="warning" %}
**NOTE:** This method is currently only supported on **Ethereum mainnet**.&#x20;
{% endhint %}

### Parameters

* `tx`: _**\[string]**_ Raw, signed transaction&#x20;
* `maxBlockNumber`: _**\[string] (optional)**_ Hex-encoded number for highest block number in which the transaction should be included.&#x20;
* `preferences`: _**\[object] (optional)**_&#x20;
  * `fast`: _**\[boolean] (optional)**_ Sends **** transaction with [fast mode ](https://docs.flashbots.net/flashbots-protect/rpc/fast-mode)when `true`.

### Response&#x20;

* `result`: _**\[string]**_ Transaction hash

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
    	const hash = await web3.eth.sendPrivateTransaction({
	    signed_data: '0x7e5814a',
		maxBlockNumber: '0xcd23a0',
		preferences: { "fast": true },
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
    	const hash = await provider.sendPrivateTransaction({
	     signed_data: '0x7e5814a',
	     maxBlockNumber: '0xcd23a0',
	     preferences: { "fast": true },
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
-d '{"jsonrpc":"2.0","method":"eth_sendPrivateTransaction","params":[{"tx": "0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675","maxBlockNumber": "0xcd23a0","preferences": { "fast": true }}],"id":1}'
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
    "params":[{"tx": "0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675","maxBlockNumber": "0xcd23a0","preferences": { "fast": true }}],"id":1}'
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
  "result": "0x45df1bc3de765927b053ec029fc9d15d6321945b23cac0614eb0b5e61f3a2f2a" // tx hash
}
```

## FAQ&#x20;

### What is Flashbots?

Flashbots is a research and development organization working on mitigating the negative externalities of current Maximal Extractable Value (MEV) techniques and avoiding the existential risks MEV could cause to state-rich blockchains like Ethereum.

### What are private transactions?

Private transactions are transactions sent directly to miners, and thus, are not discoverable in public mempools. They are often used to protect transactions from being frontrun.

### How do private transactions work?

Private transactions are sent to a special type of node called MEV-Geth (created and maintained by Flashbots) that do not connect to other nodes until the transaction is mined on chain. Miners also run MEV-Geth to receive private transactions without exposing them to the public before they are confirmed.&#x20;

To learn how to send a private transaction yourself, check out the tutorial below:

{% content-ref url="../../tutorials/send-private-transaction.md" %}
[send-private-transaction.md](../../tutorials/send-private-transaction.md)
{% endcontent-ref %}

### How can I cancel my private transaction after it is sent?

You can cancel private transactions after they are sent but before they are mined by using the [eth\_cancelPrivateTransaction](eth\_cancelPrivateTransaction.md) method and passing in your transaction hash.&#x20;

### How does Flashbots reputation work with Alchemy?

Alchemy manages your Flashbots reputation automatically for you based on your application. There is currently no support for querying reputation status for Flashbots requests made via Alchemy but it's on our roadmap—[let us know](https://roadmap.alchemy.com/b/feature-requests/) if it would be useful for you! Learn more about reputation [here](https://docs.flashbots.net/flashbots-auction/searchers/advanced/reputation#querying-reputation).&#x20;

{% content-ref url="./" %}
[.](./)
{% endcontent-ref %}
