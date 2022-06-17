---
description: >-
  Uncle blocks are blocks that did not get mined onto the canonical chain. When
  two or more miners produce blocks at nearly the same time, uncle blocks are
  created.
---

# What are Uncle Blocks?

## What is an uncle block?

An uncle block is **a block that did not get mined onto the canonical chain.** Only one block can be mined and acknowledged as canonical on the blockchain. The remaining blocks are uncle blocks. When two or more miners produce blocks at nearly the same time, uncle blocks are created.

\
Uncle blocks are similar to orphan blocks on Bitcoin, but have subtle distinctions connected with the Ethereum protocol. Uncle blocks are valid blocks that the network has rejected. Miners get paid for producing an uncle block, unlike an orphan block, where miners don't get rewarded.

## Why do uncle blocks occur?

Uncle blocks occur **when two or more miners create blocks at almost the same time.**&#x20;

Uncle blocks occur because nodes on a network do not immediately accept a block into the blockchain. As a result, another miner can build and propagate their block at a similar time. To confirm the legitimacy of constructed blocks, they must be broadcast throughout the network to all nodes, which may cause latency concerns.

\
Ethereum introduces the uncle block technique to tackle the orphan block's security issues while improving transaction processing efficiency. \


## How often do uncle blocks happen?

Stale blocks are more common when nodes propagate blocks more slowly than substantial mining pools, resulting in a more significant prevalence of uncle blocks.

If the uncle rate rapidly increases and nodes leave the network, the gas limit may be too high, compromising network security.

## What are uncle block rewards?

Uncle block rewards **are rewards awarded to miners who create an uncle block included in a valid block added to the chain.**

\
Uncle blocks are similar to stale blocks in bitcoin, except instead of being ignored, uncle blocks are awarded dependent on how new they are, with the most significant payout being 4.375 eth. An example of this reward can be found [here](https://etherscan.io/block/1378035).

## How do uncle block rewards get mined?

When miners of the main chain block reference uncle blocks, both the miner of the main chain block and the miner of the uncle block receive an additional reward.

Each block in the main chain can reference up to two uncle blocks, with each uncle receiving 1/32 of an entire block reward. The reward provided to the uncle block miner, on the other hand, declines over time.

## What is the difference between an uncle block and an orphan block?

\
**The difference between an uncle block and an orphan block is that the Ethereum network rewards its uncle block miners.** In contrast, the Bitcoin network does not compensate/reward orphan block miners**.**
