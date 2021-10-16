---
description: All words and definitions related to Blockchain and Ethereum.
---

# 📚 Blockchain Glossary

For more details check out the [Ethereum Wiki](https://eth.wiki/faqs/glossary) and the [Ethereum Book Glossary](https://cypherpunks-core.github.io/ethereumbook/glossary.html). 

## Blockchains

### **Blockchain**

In Ethereum, a blockchain is a sequence of blocks validated by the proof-of-work system, each linking to its predecessor all the way to the genesis block. This varies from the Bitcoin protocol in that it does not have a block size limit; it instead uses varying gas limits.

### **Address**

An address is the representation of a public key belonging to a particular user. Addresses are essentially contracts that can receive or send transactions on the blockchain. Note that in practice, the address is technically the hash of a public key (he rightmost 160 bits of a Keccak hash of an ECDSA public key).

### **Transaction**

A transaction is a digitally signed message authorizing some particular action associated with the blockchain. In a currency, the dominant transaction type is sending currency units or tokens to someone else; in other systems, actions like registering domain names, making and fulfilling trade offers and entering into contracts are also valid transaction types.

### **Block**

A block is a package of data that contains zero or more transactions; the hash of the previous block (“parent”); and optionally other data. Because each block (except for the initial “genesis block”) points to the previous block, the data structure that they form is called a “blockchain”.

### **State**

A state is the set of data that that represents information currently relevant to applications on the chain. A blockchain network strictly needs to keep track of the state of the chain. 

In a currency, this is simply balances; in more complex applications this could refer to other data structures that the application in question needs to keep track of (e.g. who has what domain name, what is the status of a given contract, etc). 

### Consensus 

When numerous nodes—usually most nodes on the network—all have the same blocks in their locally validated best blockchain they have achieved consensus. 

### Post-state

The post-state of a block is the state after executing all transactions in the ancestors of the block, starting from the genesis going up to and including the transactions in that block itself.

### **History**

The history is the past transactions and blocks. Note that the state is a deterministic function of the history.

### **Account**

An account is an object containing an address, balance, nonce, optional storage, and code. It can be a contract account or an externally owned account (EOA).

### **Proof of Work**

Proof of Work is the concept of requiring a non-insignificant but feasible amount of effort to produce some result. In Bitcoin, Ethereum, and many other crypto-ledgers, this means finding a hash that is smaller than some target value. 

The reason this is necessary is that in a decentralized system anyone can produce blocks, so in order to prevent the network from being flooded with blocks, and to provide a way of measuring consensus behind a particular version of the blockchain, it must in some way be _hard_ to produce a block. 

Because hashes are pseudorandom, finding a block whose hash is less than `0000000100000000000000000000000000000000000000000000000000000000` takes an average of 4.3 billion attempts. In all such systems, the target value self-adjusts so that on average one node in the network finds a block every N minutes (eg. N = 10 for Bitcoin and 1 for Ethereum).

### **Proof of Work Nonce**

A proof of work nonce is a technically meaningless (but super necessary) value in a block to show that the block satisfies the proof of work condition**.**

### **Mining**

Mining is the process of repeatedly aggregating transactions, constructing a block and trying different nonces until a nonce is found that satisfies the proof of work condition. If a miner gets lucky and produces a valid block, they are granted a certain number of coins as a reward as well as all of the transaction fees in the block. Once the valid block is found, all miners start trying to create a new block containing the hash of the newly generated block as their parent.

### **Stale**

A stale is a block that is created when there is already another block with the same parent out there; stales typically get discarded and are wasted effort.

### **Fork**

A fork occurs when two blocks are generated pointing to the same block as their parent, and some portion of miners see one block first and some see the other. This may lead to two blockchains growing at the same time. Generally, it is mathematically near-certain that a fork will resolve itself within four blocks as miners on one chain will eventually get lucky and that chain will grow longer and all miners switch to it; however, forks may last longer if miners disagree on whether or not a particular block is valid.

### **Double Spend**

A double spend is a deliberate fork, where a user with a large amount of mining power sends a transaction to purchase some product, then after receiving the product creates another transaction sending the same coins to themselves. The attacker then creates a block, at the same level as the block containing the original transaction but containing the second transaction instead, and starts mining on the fork. If the attacker has more than 50% of all mining power, the double spend is guaranteed to succeed eventually at any block depth. Below 50%, there is some probability of success, but it is usually only substantial at a depth up to about 2-5. For this reason, most cryptocurrency exchanges, gambling sites and financial services wait until six blocks have been produced (“six confirmations”) before accepting a payment.

### **Light Client** 

A Light client is a client that downloads only a small part of the blockchain, allowing users of low-power or low-storage hardware like smartphones and laptops to maintain almost the same guarantee of security by  selectively downloading small parts of the state without needing to spend megabytes of bandwidth and gigabytes of storage on full blockchain validation and maintenance.

### Web3

The third version of the web. First proposed by Dr. Gavin Wood, Web3 represents a new vision and focus for web applications: from centrally owned and managed applications, to applications built on decentralized protocols.

### Wallet

Software that holds secret keys. Used to access and control Ethereum accounts and interact with smart contracts. Keys need not be stored in a wallet, and can instead be retrieved from offline storage (e.g., a memory card or paper) for improved security. Despite the name, wallets never store the actual coins or tokens.

### DApp (Decentralized Application)

Decentralized application. Basically any app that is build using blockchain infrastructure. At a minimum, it is a smart contract and a web user interface. More broadly, a DApp is a web application that is built on top of open, decentralized, peer-to-peer infrastructure services. In addition, many DApps include decentralized storage and/or a message protocol and platform.

## Ethereum Blockchain

### **Serialization**

Serialization is the process of converting a data structure into a sequence of bytes. Ethereum internally uses an encoding format called recursive-length prefix encoding (RLP), described [here](https://eth.wiki/en/fundamentals/rlp).

### **Merkle-Patricia tree** (or **trie**)

A Merkle tree is a data structure which stores the state of every account. The trie is built by starting from each individual node, then splitting the nodes into groups of up to 16 and hashing each group, then making hashes of hashes and so forth until there is one final “root hash” for the entire trie. 

The trie has these important properties:

1. There is exactly one possible trie and therefore one possible root hash for each set of data.
2. It is very easy to update, add or remove nodes in the trie and generate the new root hash.
3. There is no way to modify any part of the tree without changing the root hash, so if the root hash is included in a signed document or a valid block, the signature or proof of work secures the entire tree
4. One can provide just the “branch” of a tree going down to a particular node as cryptographic proof that that node is indeed in the tree with that exact content.

Merkle trees are also used to store the internal storage of accounts as well as transactions and ommers. See [here](https://easythereentropy.wordpress.com/2014/06/04/understanding-the-ethereum-trie/) for a more detailed description.

### **Uncle**

See **Ommer **below**, **the gender-neutral alternative to aunt/uncle.

### **Ommer**

An ommer is a child of a parent of a parent of a block that is not the parent, or, in other words, a child of an ancestor that is not itself an ancestor. If A is an ommer of B, B is a **nibling** (niece/nephew) of A.** **When a miner finds a valid block, another miner may have published a competing block which is added to the tip of the blockchain. Unlike with Bitcoin, orphaned blocks in Ethereum can be included by newer blocks as ommers and receive a partial block reward.

### **Uncle Inclusion Mechanism**

The Uncle inclusion mechanism allows a block to include its uncles. This ensures that miners that create blocks that do not quite get included into the main chain can still get rewarded.

### **Account Nonce** 

An account nonce is a transaction counter in each account. This prevents replay attacks. For example, a transaction sending 20 coins from A to B can be replayed by B over and over to continually drain A’s balance, but the account nonce can prevent that. 

### **EVM Code**

EVM code stands for Ethereum Virtual Machine code. It is the programming language in which accounts on the Ethereum blockchain can contain code. The EVM code associated with an account is executed every time a message is sent to that account, and has the ability to read/write storage and send messages itself.

### **Transaction**

Data committed to the Ethereum Blockchain signed by an originating account, targeting a specific address. The transaction contains metadata such as the gas limit for that transaction.

### **Message**

A message is a sort of “virtual transaction” sent by EVM code from one account to another. 

It's important to note that “transactions” and “messages” in Ethereum are different. A “transaction” in Ethereum parlance specifically refers to a digitally signed piece of data, originating from a source other than executing EVM code, to be recorded in the blockchain. Every transaction triggers an associated message, but messages can also be sent by EVM code, in which case they are never represented in data anywhere.

### **Storage**

Storage is a key/value database contained in each account, where keys and values are both 32-byte strings but can otherwise contain anything.

### **Externally Owned Account**

An externally owned account is an account controlled by a private key. Externally owned accounts cannot contain EVM code.

### **Contract** 

A contract is an account which contains, and is controlled by EVM code. Contracts cannot be controlled by private keys directly, unless built into the EVM code, a contract has no owner once released.

### Zero address

A special Ethereum address, composed entirely of zeros, that is specified as the destination address of a contract creation transaction.

### Contract Creation Transaction

A special transaction, with the "zero address" as the recipient, that is used to register a contract and record it on the Ethereum blockchain.

### **Ether**

Ether is the primary internal cryptographic token of the Ethereum network. Ether is used to pay transaction and computation fees for Ethereum transactions.

### Wei

The smallest denomination of ether. 10^18 wei = 1 ether.

### **Gas**

Gas is a measurement roughly equivalent to computational steps. Every transaction is required to include a gas limit and a fee that it is willing to pay per gas; miners have the choice of including the transaction and collecting the fee or not. 

If the total number of gas used by the computation spawned by the transaction, including the original message and any sub-messages that may be triggered, is less than or equal to the gas limit, then the transaction processes. If the total gas exceeds the gas limit, then all changes are reverted, except that the transaction is still valid and the fee can still be collected by the miner. Every operation has a gas expenditure; for most operations it is \~3-10, although some expensive operations have expenditures up to 700 and a transaction itself has an expenditure of 21000.

### Bytecode

Instructions or code expressed in numeric format such that a virtual machine can efficiently interpret it. 

### **Testnet**

Short for "test network," a network used to simulate the behavior of the main Ethereum network.

### Reward

An amount of ether included in each new block as a reward by the network to the miner who found the proof-of-work solution

### InterPlanetary File System (IPFS)

A protocol, network, and open source project designed to create a content-addressable, peer-to-peer method of storing and sharing hypermedia in a distributed filesystem.

### Non-Fungible Token (NFT)

This is a token standard introduced by the ERC721 proposal. NFTs can be tracked and traded, but each token is unique and distinct; they are not interchangeable like ERC20 tokens. NFTs can represent ownership of digital or physical assets.

### HD wallet

A wallet using the hierarchical deterministic (HD) key creation and transfer protocol (BIP-32).

### HD wallet seed

A value used to generate the master private key and master chain code for an HD wallet. The wallet seed can be represented by mnemonic words, making it easier for humans to copy, back up, and restore private keys.

### Geth

Go Ethereum. One of the most prominent implementations of the Ethereum protocol, written in Go.

## **Alchemy **

### **Compute Units (CUs)**

Compute units or CUs represent the cost associated with given API calls. See the [Compute Units](../documentation/compute-units.md) page to learn more.

### **Rate Limit**

Rate limit is the cap on FCUs permitted. See the [Rate Limit](../guides/rate-limits.md) page to learn more.  

### **Alchemy Web3**

Alchemy Web3 is a drop-in replacement for web3.js, built and configured to work seamlessly with Alchemy and provide multiple advantages such as automatic retries and robust WebSocket support. See the [Alchemy web3](../documentation/alchemy-web3/) page to learn more.  

## Cryptography

### **Computational infeasibility**

A process is computationally infeasible if it would take an impracticably long time (eg. billions of years) to do it for anyone who might conceivably have an interest in carrying it out. Generally, 280 computational steps is considered the lower bound for computational infeasibility.

### **Hash**

A hash function (or hash algorithm) is a process by which a piece of data of arbitrary size (could be anything; a piece of text, a picture, or even a list of other hashes) is processed into a small piece of data (usually 32 bytes). This smaller piece of data looks completely random and you cannot recover any meaningful information about the original data from it, however, it has the important property that the result of hashing one particular document is always the same. 

Additionally, it is crucially important that it is computationally infeasible to find two documents that have the same hash. Generally, changing even one letter in a document will completely randomize the hash; for example, the SHA3 hash of “Saturday” is `c38bbc8e93c09f6ed3fe39b5135da91ad1a99d397ef16948606cdcbd14929f9d`, whereas the SHA3 hash of "Caturday" is `b4013c0eed56d5a0b448b02ec1d10dd18c1b3832068fbbdc65b98fa9b14b6dbf`. Hashes are usually used as a way of creating a globally agreed-upon identifier for a particular document that cannot be forged.

### **Encryption**

Encryption is a process by which a document (**plaintext**) is combined with a shorter string of data, called a **key**, to produce an output (**ciphertext**) which can be “decrypted” back into the original plaintext by someone else who has the key, but which is incomprehensible and computationally infeasible to decrypt for anyone who does not have the key.

### **Private (Secret) Key**

The secret value that allows Ethereum users to prove ownership of an account or contracts, by producing a digital signature.

### **Public Key Encryption**

A public key encryption is a special kind of encryption where there is a process for generating two keys at the same time (typically called a **private key** and a **public key**), such that documents encrypted using one key can be decrypted with the other. Generally, as suggested by the name, individuals publish their public keys and keep their private keys to themselves.

### **Digital Signature**

A digital signature is a virtual signing algorithm is a process by which a user can produce a short string of data called a “signature” of a document using a private key. With this signature, the corresponding public key, and the relevant document, anyone can verify that:

1. The document was “signed” by the owner of that particular private key.
2. The document was not changed after it was signed.

Note that this differs from traditional signatures where you can scribble extra text onto a document after you sign it and there’s no way to tell the difference; in a digital signature any change to the document will render the signature invalid.

## Smart Contracts

### **Smart contract**

A smart contract is a computer protocol meant to streamline the process of contracts by digitally enforcing, verifying, or otherwise managing them. Given the nature of the blockchain, all of these transactions are visible and verifiable through the code itself. [Smart contracts were first proposed in 1994 by Nick Szabo, an early contributor to Bitcoin.](http://www.fon.hum.uva.nl/rob/Courses/InformationInSpeech/CDROM/Literature/LOTwinterschool2006/szabo.best.vwh.net/smart.contracts.html)

You can think of a smart contract like a vending machine; you give it enough money (gas) and it will process a transaction for you. 

### **Trustless**

Trustless means that it does not require a third party to verify or manage. Smart contracts are primarily trustless, as they are meant to occur by themselves once the stipulations are met.

### **Self-executing**

Self-executing means it can function by itself, not controlled by any other party. Self-executing smart contracts would cut costs/overhead by removing the need for an arbitrator and trust towards a third party.

### **Oracles**

For smart contracts, oracles are a middle-ware product in which data outside of the blockchain (such as real world data from weather to stocks) is connected to it. That data is then used for conditions of smart contracts. Ethereum is self-contained, so oracles would allow smart contracts to branch out into real world applications by bringing the data to it. An example of this would be sports betting, where a smart contract would be resolved by receiving the scores of a sporting event. [Vitalik Buterin wrote an article about oracles and how they could be used with Ethereum.](https://blog.ethereum.org/2014/07/22/ethereum-and-oracles/)

## Casper and Scaling Research

### **Proof of Stake**

A method by which a cryptocurrency blockchain protocol aims to achieve distributed consensus. PoS asks users to prove ownership of a certain amount of cryptocurrency (their "stake" in the network) in order to be able to participate in the validation of transactions.

### **Security Deposit**

A security deposit is a quantity of ether that a user deposits into a mechanism (often a proof of stake consensus mechanism, though this can also be used for other applications) that a user  expects to be able to eventually withdraw and recover, but which can be taken away in the event of malfeasance from the user’s side.

### **Validator**

A validator is a participant in proof of stake consensus. Validators need to submit a security deposit in order to get included in the validator set.

### **Economic finality**

A block or state can be considered _economically_ _finalized_ if a client has proof that either

1.  The block is going to be part of the canonical chain forever or
2.  Those actors that caused the block to get reverted are guaranteed to be economically penalized by an amount equal to at least $X.

This value X is called the **cryptoeconomic security margin** of the finality mechanism.

### **Slashing Condition**

The slashing condition is a condition which, if triggered by a validator, causes the validator’s deposit to be destroyed.

### **Prepare** and C**ommit**

Prepare and commit are two types of messages that validators can send in many types of consensus protocols; see [https://medium.com/@VitalikButerin/minimal-slashing-conditions-20f0b500fc6c](https://medium.com/@VitalikButerin/minimal-slashing-conditions-20f0b500fc6c)..

### **Fault**

A fault is an action taken by a validator (or more generally, a participant in a mechanism) that they would not have taken had they correctly followed the protocol. 

### **Liveness Fault**

A liveness fault is a validator failing to submit a message that according to the protocol they should have submitted (or submitting a message later than they should have).

### **Censorship Fault**

A censorship fault is a validator failing to accept valid messages from other validator.

### **Equivocation**

An equivocation occurs when a validator sends two messages that contradict each other. More precisely, when a validator sends two messages that a validator running the correct algorithm could only send if it sends one message, “rewinds” its internal state to some point before sending that message, then at some future point in time sends the other message. One simple example is a transaction sender sending two transactions with the same nonce.

### **Invalidity Fault**

An invalidity fault is a validator sending a message that a computer running the correct algorithm could not possibly send, unless its internal state is manipulated with in some way other than rewinding.

### **Uniquely attributable fault**

A uniquely attributable fault is a fault such that there exists clear evidence which can be used to determine exactly which validator committed the fault. For example, liveness faults are not uniquely attributable because if a message from A fails to reach B, it could be because A failed to send that message, or because B failed to listen to it, whereas equivocation faults are uniquely attributable.

### **Fraud Proof**

Fraud proof is a set of data, usually a part of a block plus some extra “witness data” (eg. Merkle branches), that can be used to prove that a given block is invalid.

### **Data availability problem** and **Fisherman’s dilemma**

See [https://github.com/ethereum/research/wiki/A-note-on-data-availability-and-erasure-coding](https://github.com/ethereum/research/wiki/A-note-on-data-availability-and-erasure-coding)

### **Validity**

Validity is the property of a state that it is indeed the result of executing a valid history of transactions. 

### **Data Availability**

Data availability is the property of a state that any node connected to the network could download any specific part of the state that they wish to download.

### **Tight Coupling**

Chains A and B are tightly coupled if both:

1. Any state of A points to some state of B (and vice versa)
2. A state of A should not be considered admissible unless both that state itself and the state of B that it points to are valid and data-available.

### **Loose Coupling**

Chains A and B are loosely coupled if both:

1. Any state of A points to some state of B (and vice versa)
2. They are **not** tightly coupled.

### **Shard**

A shard is a subset of the state which is managed by different nodes from the nodes that manage other shards. Usually, shards must be tightly coupled, and **sidechains** must be loosely coupled.

## Non-blockchain

### **Whisper**

Whisper is an upcoming P2P messaging protocol.

### **Swarm**

Swarm is an upcoming P2P data storage protocol optimized for static web hosting.

### **Solidity**, **LLL**, **Serpent** and **Vyper**

These are programming languages for writing contract code which can be compiled into EVM code. 

* Serpent and Vyper are Python-like languages (the developer of the two currently recommends Vyper more)
  * Serpent can also be compiled into LLL (Lisp Like Language) 
* Solidity is a C+± like language (and is the most widely used)

### **PoC**

Proof-of-concept, another name for a pre-launch release. 

###  <a href="smart-contracts" id="smart-contracts"></a>
