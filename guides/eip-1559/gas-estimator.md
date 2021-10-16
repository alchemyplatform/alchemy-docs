---
description: >-
  Tutorial for how to build a gas fee estimation tool for Ethereum using
  EIP-1559 methods.
---

# 📊 How to Build a Gas Fee Estimator using EIP-1559

Many apps like to offer users the option to set their own gas fee bids with a "slow" "average" and "fast" option. In this article we will take a look at how you might go about building these options with the `eth_feeHistory` API post London fork. We will also discuss the `eth_maxPriorityFeePerGas` method and replicate the calculation it performs. Then we will discuss how you might productionize such a calculator.

### Why are we doing this? <a href="why-are-we-doing-this" id="why-are-we-doing-this"></a>

Before diving into implementation, let's discuss why we should bother at all. Before the London fork, the gas price calculators only needed to look at the gas price of transactions in previous blocks to determine what the spread of bids should look like for the current block. Post London fork, the gas prices are split into base fees and priority fees. Since the base fee is a fixed rate set by the protocol, the only bid that we need to estimate is what to bid for priority fee. Thus, the calculators need to be updated.

### The two important metrics <a href="the-two-important-metrics" id="the-two-important-metrics"></a>

Our first pass at building a fee calculator will look at the past X blocks and ask two questions about them:

(1) How full was this block?

(2) How much did transactions have to bid to be included in this block?

These are the two relevant pieces of information to determine how much we should bid to be included in the pending block. So before we build, let's understand these metrics a bit more in-depth. Here is a call to the `eth_feeHistory` API and it's result:

```
const historicalBlocks = 4;
web3.eth.getFeeHistory(historicalBlocks, "pending", [25, 50, 75]).then(console.log);
```

The above call means, "Give me the fee history information starting from the pending block and looking backward 4 blocks. For each block also give me the 25th, 50th, and 75th percentiles of priority fees for transactions in the block". The raw result looks like this:

```
{
  oldestBlock: 12966149,
  reward: [
    [ '0x6fb9cbef7', '0x161dea08f7', '0x28be4928f7' ],
    [ '0x10378b36e1', '0x1bdbc6aae1', '0x20fb1406e1' ],
    [ '0x112fcac6f6', '0x1dfe0c2cf6', '0x287841aef6' ],
    [ '0x1dfc552db', '0x59971f2db', '0xd8400c6db' ]
  ],
  baseFeePerGas: [
    '0x1d1b1b8f09',
    '0x1e5962991f',
    '0x1d6123090a',
    '0x210ced0925',
    '0x252e208712'
  ],
  gasUsedRatio: [
    0.6708618436856891,
    0.3721915376646354,
    0.9998122039490063,
    0.9998039574899923
  ]
}
```

To make things easier, let's create a formatter that turns these hex strings into numbers and also groups the results by block. For completion's sake, here is our formatter (feel free to ignore and move on):

```
function formatFeeHistory(result, includePending) {
  let blockNum = result.oldestBlock;
  let index = 0;
  const blocks = [];
  while (blockNum < result.oldestBlock + historicalBlocks) {
    blocks.push({
      number: blockNum,
      baseFeePerGas: Number(result.baseFeePerGas[index]),
      gasUsedRatio: Number(result.gasUsedRatio[index]),
      priorityFeePerGas: result.reward[index].map(x => Number(x)),
    });
    blockNum += 1;
    index += 1;
  }
  if (includePending) {
    blocks.push({
      number: "pending",
      baseFeePerGas: Number(result.baseFeePerGas[historicalBlocks]),
      gasUsedRatio: NaN,
      priorityFeePerGas: [],
    });
  }
  return blocks;
}
```

Now when we run the `eth_feeHistory` results through the formatter:

```
const historicalBlocks = 4;
web3.eth.getFeeHistory(historicalBlocks, "pending", [25, 50, 75]).then((feeHistory) => {
  const blocks = formatFeeHistory(feeHistory, false);
  console.log(blocks);
});
```

We get:

```
[
  {
    number: 12966164,
    baseFeePerGas: 315777006840,
    gasUsedRatio: 0.9922326809477219,
    priorityFeePerGas: [ 34222993160, 34222993160, 63222993160 ]
  },
  {
    number: 12966165,
    baseFeePerGas: 354635947504,
    gasUsedRatio: 0.22772779167798343,
    priorityFeePerGas: [ 20000000000, 38044555767, 38364052496 ]
  },
  {
    number: 12966166,
    baseFeePerGas: 330496570085,
    gasUsedRatio: 0.8876034775653597,
    priorityFeePerGas: [ 9503429915, 19503429915, 36503429915 ]
  },
  {
    number: 12966167,
    baseFeePerGas: 362521975057,
    gasUsedRatio: 0.9909446241177369,
    priorityFeePerGas: [ 18478024943, 37478024943, 81478024943 ]
  }
]
```

Which is much more readable. We asked for 4 blocks, so each element of the array is a single block. The 3 elements in the `priorityFeePerGas` field represent the 25th, 50th, and 75th percentiles of priority fees that were submitted in those blocks.

Great! Now let's return to our two metrics. Each block has a `gasUsedRatio`. This ratio refers to how full the block was. You can see that block 12966164 was 99% full, block 12966165 was 23% full, 12966166 was 88%, and 12966167 was 99%.

The other metric we wanted to know was how much a transaction had to bid to be included in the block. Looking in the `priorityFeePerGas` field, you can see that for block 12966164 the 25% percentile of transactions spent 34222993160 in priority fees, while the 75% percentile spent 63222993160 in priority fees. That's almost a 2x increase! The spread can be pretty drastic.

### Relationship between `gasUsedRatio` and `baseFeePerGas` <a href="relationship-between-gas-used-ratio-and-base-fee-per-gas" id="relationship-between-gas-used-ratio-and-base-fee-per-gas"></a>

Before we move on, let's take a moment to understand this extremely important relationship. The relationship between `gasUsedRatio` and `baseFeePerGas` is literally the crux of EIP 1559 and the London fork.

Notice in the output above that block 12966164 is almost completely full, with a `gasUsedRatio` of over 99%. It has a `baseFeePerGas` of 315777006840. The very next block (12966165) has a `baseFeePerGas` of 354635947504, an increase of approximately 12%.

This is the purpose of EIP 1559. Whenever a block is over half full, the network will increase the base fee of the next block. When a block is less than half full, the network will decrease the base fee. Notice that block 12966165 has a `gasUsedRatio` of approximately 23%, which means the subsequent block (12966166) has a lower base fee.

Great! Now that we've seen that in action let's move on with our fee estimator.

### Building the estimate <a href="building-the-estimate" id="building-the-estimate"></a>

We now have a handle on our two metrics: `gasUsedRatio` and `priorityFeePerGas` for historical blocks. Let's use them to create an estimate.

When creating an estimate we need to determine (a) how far back in time to look and (b) what percentiles of priority fees to look at.

For (a) let's do 4 blocks, since that will be approximately 1 minute of time. A nice round number.

For (b) Recall that the spread of fees paid in a block can be quite high, so it's very possible that a bid on the lower end will get accepted, particularly if the recent blocks haven't been overly full. Let's be optimistic! Let's target the 10th percentile.

OK here we go!

```
const historicalBlocks = 4;
web3.eth.getFeeHistory(historicalBlocks, "pending", [10]).then((feeHistory) => {
  const blocks = formatFeeHistory(feeHistory, false);
  const firstPercentialPriorityFees = blocks.map(b => b.priorityFeePerGas[0]);
  const sum = firstPercentialPriorityFees.reduce((a, v) => a + v);
  console.log("Manual estimate", sum/firstPercentialPriorityFees.length);
});
```

Note that we are taking the average of the 10th percentile priority fee across all the blocks. This gives the output:

```
Manual estimate: 9296204634
```

You can now include this estimate in the `maxPriorityFeePerGas` field on your transaction and you've got a decent chance of being included in the block.

### Comparing our estimate to `eth_maxPriorityFeePerGas` <a href="comparing-our-estimate-to-eth-max-priority-fee-per-gas" id="comparing-our-estimate-to-eth-max-priority-fee-per-gas"></a>

It was fun to build our own estimate, but now let's see how this compares to the official estimate provided by geth through the `eth_maxPriorityFeePerGas` method.

Geth looks 20 blocks behind and only considers the cheapest 3 transactions for each block, choosing the 60th percentile. That is a bit more custom than what `eth_feeHistory` exposes to us, but we'll do our best. I suspect the bottom 3 transactions would be approximately in the 1st percentile of priority fees, so here is our attempt at replication:

```
const historicalBlocks = 20;
web3.eth.getFeeHistory(historicalBlocks, "pending", [1]).then((feeHistory) => {
  const blocks = formatFeeHistory(feeHistory, false);
  const firstPercentialPriorityFees = blocks.map(b => b.priorityFeePerGas[0]);
  const sum = firstPercentialPriorityFees.reduce((a, v) => a + v);
  console.log("Manual estimate:", Math.round(sum/firstPercentialPriorityFees.length));
});
web3.eth.getMaxPriorityFeePerGas().then((f) => console.log("Geth estimate:  ", Number(f)));
```

And our output

```
Manual estimate: 3518856089
Geth estimate:   2375124957
```

Not bad!

### Giving a full estimate to users <a href="giving-a-full-estimate-to-users" id="giving-a-full-estimate-to-users"></a>

Thus far we have only built an estimate of the priority fee, which is the tip paid to miners. Pre-London fork, however, users have grown accustomed to receiving an estimate of the full fee they are paying, not just the tip. So let's include the base fee in our estimate calculations:

```
const historicalBlocks = 20;
web3.eth.getFeeHistory(historicalBlocks, "pending", [1]).then((feeHistory) => {
  const blocks = formatFeeHistory(feeHistory, false);
  const firstPercentialPriorityFees = blocks.map(b => b.priorityFeePerGas[0]);
  const sum = firstPercentialPriorityFees.reduce((a, v) => a + v);
  const priorityFeePerGasEstimate = Math.round(sum/firstPercentialPriorityFees.length);
  web3.eth.getBlock("pending").then((block) => {
    const maxFeePerGasEstimate = Number(block.baseFeePerGas) + priorityFeePerGasEstimate;
    console.log("Manual estimate:", maxFeePerGasEstimate);
  });
});
```

With output

```
Manual estimate: 80868015872
```

To get the full estimate we are fetching the `baseFeePerGas` from the pending block, which is already known by the network. Then we add the tip on top of that. This is the full value (in Wei) that we can present to the end user. You might want to convert that to Gwei first, since that's normally what users see.

### Presenting three options <a href="presenting-three-options" id="presenting-three-options"></a>

It's time to finish up the estimator! Users are accustomed to having three options: slow, average, and fast. We can accomplish this by providing our `eth_feeHistory` call with 3 percentiles. Since we are doing the 1st percentile on the "slow" end, let's do the 99th percentile on the "fast" end, and of course "average" refers to the 50th percentile. So here we go!

```
function avg(arr) {
  const sum = arr.reduce((a, v) => a + v);
  return Math.round(sum/arr.length);
}

const historicalBlocks = 20;
web3.eth.getFeeHistory(historicalBlocks, "pending", [1, 50, 99]).then((feeHistory) => {
  const blocks = formatFeeHistory(feeHistory, false);

  const slow    = avg(blocks.map(b => b.priorityFeePerGas[0]));
  const average = avg(blocks.map(b => b.priorityFeePerGas[1]));
  const fast    = avg(blocks.map(b => b.priorityFeePerGas[2]));

  web3.eth.getBlock("pending").then((block) => {
    const baseFeePerGas = Number(block.baseFeePerGas);
    console.log("Manual estimate:", {
      slow: slow + baseFeePerGas,
      average: average + baseFeePerGas,
      fast: fast + baseFeePerGas,
    });
  });
});
```

With output:

```
Manual estimate: { slow: 61058837759, average: 70591575352, fast: 170359703066 }
```

Alright! Now you can present options to your users.

### Productionizing your estimator <a href="productionizing-your-estimator" id="productionizing-your-estimator"></a>

Well that was fun, but this code would not be particularly viable in production. Running these calculations every time we need an estimate is not practical for an application that might be serving thousands of transactions per second.

Geth consults what's known as an "Oracle", basically a software actor who's only job it is to keep track of historical blocks and keep the gas estimates up to date. Then geth will simply ask the oracle "what is the current estimate" and get back an immediate response. If you plan on building your own estimator I suggest you do the same.

### Some ideas for the reader <a href="some-ideas-for-the-reader" id="some-ideas-for-the-reader"></a>

Nobody knows the full implications of EIP 1559 yet and there is _**a ton**_ of room for innovation. In particular, gas fee estimation is far from a science. The knobs we've been given by the `eth_feeHistory` API are nice, but they don't tell the full story (as we've seen). Just look at the spread of fees within a single block! There is a ton of cost saving potential for better fee estimation.

For instance, we just built an estimator based on _historical_ data. But really, all we are trying to do is choose the lowest possible bid while still being in the top 4,000 transaction bids in the block.

What if we could just keep tabs on the pending transactions submitted to the pending block? Then we could continuously update our bid estimate to be the 3,500th lowest bid.

There are some implementation problems here. For one thing, pending transactions are broadcasted over the network, hopping from machine to machine. And a block is mined every 15 seconds. The chances that we see all the right data to update our bid in time might not be very high.

For another thing, it's not clear exactly how much savings there are to be had here in the long run. This would be a good bit of research for someone to do _hint_ _hint._

Another interesting area for fee "protection" would be to look at spikes in the `gasUsedRatio`. What happens when a block is 50% full and then the next one is 99% full? Lots of transactions get dropped. Perhaps there is a better predictor of these spikes?

Similarly what happens when a block is completely full and then the next one is empty? There was so much potential to submit cheap tips! In any case, thanks for reading all the way through 🎉

**If you're interested in learning more, or have feedback, suggestions, or questions, reach out to us in **[**Discord**](https://alchemy.com/discord)**! Get started with Alchemy today by **[**signing up for free**](https://alchemy.com/?r=affiliate:5494a54b-6ae1-4d33-9016-c331c0dcdc1f)**.**
