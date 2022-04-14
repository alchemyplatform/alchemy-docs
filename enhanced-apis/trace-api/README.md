---
description: >-
  Alchemy provides access to Parity's trace module, which allows for deeper
  insight into transaction processing.
---

# Trace API

Parity Tracing API methods give Alchemy users access to the most detailed information about on-chain activity. For more information about use, see the [Parity/Open Ethereum Trace API Documentation](https://openethereum.github.io/JSONRPC-trace-module).

{% hint style="warning" %}
**NOTE:** Alchemy is the only service that provides access to these Trace API methods due to their high maintenance costs and specialized infrastructure. For this reason, they are currently only available to Alchemy users in Growth and Enterprise tiers. You can upgrade your plan [here](https://dashboard.alchemyapi.io/settings/billing) to access them.
{% endhint %}

These API methods allow you to get a full _externality_ trace on any transaction executed throughout the Ethereum chain. Unlike the log filtering API, you are able to search and filter based only upon address information. Information returned includes the execution of all `CREATE,` `SUICIDE` and all variants of `CALL` together with input data, output data, gas usage, amount transferred and the success status of each individual action.

{% hint style="info" %}
**NOTE:** The Trace API is only supported on **Mainnet, Ropsten, and Kovan.**&#x20;
{% endhint %}

## Types of Traces

### Transaction Trace (`trace`)

Basic trace of your transaction.

### Virtual Machine Execution Trace (`vmTrace`)

Provides a full trace of the VM’s state throughout the execution of the transaction, including for any subcalls.

### State Difference (`stateDiff`)

Provides information detailing all altered portions of the Ethereum state made due to the execution of the transaction.

