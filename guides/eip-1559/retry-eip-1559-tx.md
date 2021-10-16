---
description: >-
  This tutorial will walk through how to retry an Ethereum transactions using
  EIP-1559 methods.
---

# 🔄 Retrying an EIP 1559 transaction

When you submit a transaction with a gas price that is too low to be included in the block, the transaction can be pending for a very long time. You might then want to update the transaction's gas price in order to get it mined. This concept becomes a bit more complex when it comes to EIP 1559.

Legacy transactions (pre-London fork) only need a `gasPrice` field in order to place a bid on gas price. Post-London, with EIP 1559, transactions can include one or both of `maxPriorityFeePerGas` (a tip to the miner) or `maxFeePerGas` (a total fee including tip to the miner). For the purposes of this tutorial, we will assume you have submitted a transaction with one or both of these fields at least once before.

As with legacy transactions, the way to update an EIP 1559 transaction is to make a new transaction call _with the same nonce_ as your pending transaction, but with an updated gas price. In legacy transactions, you only needed to submit an updated `gasPrice`, which needed to be at least 10% higher than the pending transaction's price in order for minders to reconsider the transaction. The purpose is to convince miners that you are willing to pay more.

Post-London you have to submit an updated `maxPriorityFeePerGas` , or "tip". This is the amount that will go to the miner. Just as in legacy transactions, the tip needs to increase by at least 10% to be re-considered.

This new setup can be a tad problematic. If, for instance, you are using a fee estimator like [Eth Gas Station](https://ethgasstation.info), then you are likely submitting transactions with _only_ the `maxFeePerGas` field. Meaning that you are not explicitly setting a tip — you are letting the system fill in a default for you. This is problematic because to update your transaction you need to submit a new `maxPriorityFeePerGas`. So in this instance you will need to fetch your pending transaction, check the `maxPriorityFeePerGas` field, and then submit a new transaction with the same nonce and an increased tip. You will also need to increase your `maxFeePerGas` by the same amount.

In the next sections we will discuss updating a transaction that contained one or both of the EIP 1559 fields.

### Submit the initial transaction with an explicitly low tip amount <a href="submit-the-initial-transaction-with-an-explicitly-low-tip-amount" id="submit-the-initial-transaction-with-an-explicitly-low-tip-amount"></a>

To start, we will submit a transaction that is destined to fail. The code below is pseudocode, we assume that you have your own working code that you need to update.

```
sendTx(web3, {
  gas: estimatedGas,
  maxPriorityFeePerGas: 15,
  to: toAddress,
  value: 100,
});
```

This transaction is destined to fail because we've set `maxPriorityFeePerGas` to 15. No self-respecting miner would accept a 15 wei tip. I mean, they might, but it's really really really really unlikely.

### Update the priority fee <a href="update-the-priority-fee" id="update-the-priority-fee"></a>

Since we've set the tip explicitly using `maxPriorityFeePerGas` it's simple for us to update it. In order to update the tip you have to submit a transaction with the same nonce, just as with legacy transactions.

First let's see what a failed tip update looks like. Recall that you need to increase the tip by at least 10% for the update to be considered.

Here is an attempt to _lower_ the tip, which obviously won't work.

```
sendTx(web3, {
  nonce: sameNonceAsOriginalTransaction,
  gas: estimatedGas,
  maxPriorityFeePerGas: 14,
  to: toAddress,
  value: 100,
});
```

Which results in

```
Error: Returned error: replacement transaction underpriced
```

This is obvious because we lowered the tip from an already low amount. Let's see what happens if we try to update it by less than 10%.

```
sendTx(web3, {
  nonce: sameNonceAsOriginalTransaction,
  gas: estimatedGas,
  maxPriorityFeePerGas: 16,
  to: toAddress,
  value: 100,
});
```

Which has the same error response

```
Error: Returned error: replacement transaction underpriced
```

And now a successful update:

```
sendTx(web3, {
  nonce: sameNonceAsOriginalTransaction,
  gas: estimatedGas,
  maxPriorityFeePerGas: 18,
  to: toAddress,
  value: 100,
});
```

Nice! That works.

### Retrying a transaction where you did not submit a priority fee <a href="retrying-a-transaction-where-you-did-not-submit-a-priority-fee" id="retrying-a-transaction-where-you-did-not-submit-a-priority-fee"></a>

In the previous section we basically did the same thing you would do to update a legacy transaction. But if you used a gas estimator to submit your initial transaction then it is likely that you only submitted the `maxFeePerGas` field with no explicit `maxPriorityFeePerGas`. In this instance, updating the transaction is slightly more complicated.

Recall that when you submit a transaction with _only_ the `maxFeePerGas` field, then a default is filled in for the `maxPriorityFeePerGas` field. The default depends on what node provider you are using. When you submit an updated transaction with a new `maxFeePerGas`, your node provider will very likely _not_ fill in an updated priority fee. That means that no matter how much you bump the `maxFeePerGas`, your updated transaction will continue to fail. To complicate matters further, when you are submitting a transaction update it is likely that the `baseFeePerGas` also changed.

Luckily, the math here turns out to be very simple. Recall that

```
maxFeePerGas = baseFeePerGas + maxPriorityFeePerGas;
```

To submit the update, first retrieve an updated `maxFeePerGas` estimate from Eth Gas Station (or other estimator). Now that we know the new total, we just need to know the new `baseFeePerGas` and then we can calculate the new tip to submit.

If you're using the alchemy web3 client, then you can fetch the base fee from the pending block like so:

```
const pendingBlock = await web3.eth.getBlock("pending");
pendingBlock.baseFeePerGas;
```

Then subtract the base fee from the max fee and we're good to go!

```
maxPriorityFeePerGas = maxFeePerGas - baseFeePerGas
```

Submit the transaction again with the same nonce and the updated `maxFeePerGas` and `maxPriorityFeePerGas` fields, and you will successfully retry the transaction!

**If you're interested in learning more, or have feedback, suggestions, or questions, reach out to us in **[**Discord**](https://alchemy.com/discord)**! Get started with Alchemy today by **[**signing up for free**](https://alchemy.com/?r=affiliate:5494a54b-6ae1-4d33-9016-c331c0dcdc1f)**.**
