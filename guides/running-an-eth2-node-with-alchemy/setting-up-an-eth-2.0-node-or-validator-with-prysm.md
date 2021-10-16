---
description: >-
  A quick guide to setting up your Eth2 node or validator on Prysm with Alchemy
  as your web3 provider.
---

# Setting up an Eth 2.0 Node or Validator with Prysm

This guide assumes you have already generated your validator keys and have submitted your initial 32 Eth to the beacon chain. If you have not done so, [please follow this guide](https://app.gitbook.com/@alchemyapi/s/alchemy/~/drafts/-Mhzhhn69TnxCLAdq3aC/guides/running-an-eth2-node-with-alchemy).

To learn more about Prysm, check out their [Eth2 Documentation](https://docs.prylabs.network/docs/getting-started).

{% hint style="info" %}
**Note**: The instructions below were adopted from the [Prysm Getting Started Guide](https://docs.prylabs.network/docs/mainnet/joining-eth2).
{% endhint %}

## Running an Eth2 node <a id="running-an-eth-2-node"></a>

### 1. Get Prysm <a id="s-1-get-prysm"></a>

Follow [this guide](https://docs.prylabs.network/docs/install/install-with-script/) to install Prysm using an installation script, or if you prefer [Docker](https://docs.docker.com/get-docker/) check out [these instructions](https://docs.prylabs.network/docs/install/install-with-docker/).

### 2. Connect eth2 node to eth1 node \(Alchemy\) <a id="s-2-connect-eth-2-node-to-eth-1-node-alchemy"></a>

During the transition period from eth1 to eth2, beacon nodes will need to monitor the eth1 chain for data. Additionally, eth2 validators are required to "burn" 32 of their ETH into an eth1 smart contract in order to become validators, which requires connection to an eth1 node.

This is where you can connect your eth2 node to Alchemy mainnet or Goerli testnet.

All you have to do is specify the `--http-web3provider` flag to your Alchemy HTTP endpoint when running your Prysm node:

#### Using the Prysm installation script: <a id="using-the-prysm-installation-script"></a>

{% tabs %}
{% tab title="Mainnet" %}
```text
./prysm.sh beacon-chain --http-web3provider=https://eth-mainnet.alchemyapi.io/v2/YOUR-API-KEY
```
{% endtab %}

{% tab title="Testnet" %}
```
./prysm.sh beacon-chain --http-web3provider=https://eth-goerli.alchemyapi.io/v2/YOUR-API-KEY --pyrmont
```
{% endtab %}
{% endtabs %}

#### Using Docker:

{% tabs %}
{% tab title="Mainnet" %}
```text
docker run -it -v $HOME/.eth2:/data -p 4000:4000 -p 13000:13000 -p 12000:12000/udp --name beacon-node \
 gcr.io/prysmaticlabs/prysm/beacon-chain:stable \
 --datadir=/data \
 --rpc-host=0.0.0.0 \
 --monitoring-host=0.0.0.0 \
 --http-web3provider=https://eth-mainnet.alchemyapi.io/v2/YOUR-API-KEY
```
{% endtab %}

{% tab title="Testnet" %}
```
docker run -it -v $HOME/.eth2:/data -p 4000:4000 -p 13000:13000 -p 12000:12000/udp --name beacon-node \
 gcr.io/prysmaticlabs/prysm/beacon-chain:stable \
 --datadir=/data \
 --rpc-host=0.0.0.0 \
 --monitoring-host=0.0.0.0 \
 --http-web3provider=https://eth-mainnet.alchemyapi.io/v2/YOUR-API-KEY
 --pyrmont
```
{% endtab %}
{% endtabs %}

Congrats! Now you've officially started running an eth2 Beacon node! 🎉

## Running an eth 2.0 validator <a id="running-an-eth-2-0-validator"></a>

Complete steps 1 and 2 from above.

### For Testnet Validators

If you want to be a validator in the Pyrmont eth2 testnet prior to jumping into mainnet, you'll still need to stake 32 testnet ETH. You can request testnet ETH by joining the [Prysm discord server](https://discord.com/invite/hmq4y2P) or requesting from a [faucet](https://goerli-faucet.slock.it/). 

### 1. Follow the [official eth2 onboarding](https://launchpad.ethereum.org/overview) <a id="s-3-follow-the-official-eth-2-onboarding"></a>

The Eth2 Launchpad has a [step by step process](https://launchpad.ethereum.org/overview) for establishing your validator:

* [**For Eth2 mainnet**](https://launchpad.ethereum.org/overview)\*\*\*\*
* \*\*\*\*[**For Prymont testnet**](https://pyrmont.launchpad.ethereum.org/overview)\*\*\*\*

### 2. [Import validator accounts into Prysm](https://docs.prylabs.network/docs/mainnet/joining-eth2#step-5-import-your-validator-accounts-into-prysm) <a id="s-4-import-validator-accounts-into-prysm"></a>

Copy the path to the `validator_keys` folder under the `eth2.0-deposit-cli` directory you created during the onboarding process. For example, if your eth2.0-deposit-cli installation is in your `$HOME` \(or `%LOCALAPPDATA%` on Windows\) directory, you can then run the following commands for your operating system.

**Using the Prysm installation script:**

{% tabs %}
{% tab title="Mainnet" %}
```text
./prysm.sh validator accounts import --keys-dir=$HOME/eth2.0-deposit-cli/validator_keys
```
{% endtab %}

{% tab title="Testnet" %}
```
./prysm.sh validator accounts import --keys-dir=$HOME/eth2.0-deposit-cli/validator_keys --pyrmont
```
{% endtab %}
{% endtabs %}

**Using Docker**

{% tabs %}
{% tab title="Mainnet" %}
```text
docker run -it -v $HOME/eth2.0-deposit-cli/validator_keys:/keys \
 -v $HOME/Eth2Validators/prysm-wallet-v2:/wallet \
 --name validator \
 gcr.io/prysmaticlabs/prysm/validator:stable \
 accounts import --keys-dir=/keys --wallet-dir=/wallet
```
{% endtab %}

{% tab title="Testnet" %}
```
docker run -it -v $HOME/eth2.0-deposit-cli/validator_keys:/keys \
  -v $HOME/Eth2Validators/prysm-wallet-v2:/wallet \
  --name validator \
  gcr.io/prysmaticlabs/prysm/validator:stable \
  accounts import --keys-dir=/keys --wallet-dir=/wallet --pyrmont
```
{% endtab %}
{% endtabs %}

### 3. Run your validator <a id="s-5-run-your-validator"></a>

In a separate terminal window \(from your beacon node\), start running the validator using the command below:

**Using the Prysm installation script**

{% tabs %}
{% tab title="Mainnet" %}
```text
./prysm.sh validator
```
{% endtab %}

{% tab title="Testnet" %}
```
./prysm.sh validator --pyrmont
```
{% endtab %}
{% endtabs %}

**Using Docker**

{% tabs %}
{% tab title="Mainnet" %}
```text
docker run -it -v $HOME/Eth2Validators/prysm-wallet-v2:/wallet \
 -v $HOME/Eth2:/validatorDB \
 --network="host" --name validator \
 gcr.io/prysmaticlabs/prysm/validator:stable \
 --beacon-rpc-provider=127.0.0.1:4000 \
 --wallet-dir=/wallet \
 --datadir=/validatorDB
```
{% endtab %}

{% tab title="Testnet" %}
```
docker run -it -v $HOME/Eth2Validators/prysm-wallet-v2:/wallet \
  -v $HOME/Eth2:/validatorDB \
  --network="host" --name validator \
  gcr.io/prysmaticlabs/prysm/validator:stable \
  --beacon-rpc-provider=127.0.0.1:4000 \
  --wallet-dir=/wallet \
  --datadir=/validatorDB \
  --pyrmont
```
{% endtab %}
{% endtabs %}

### 4. Be ready for your validator assignment <a id="s-6-be-ready-for-your-validator-assignment"></a>

Keep both terminal windows running so that your validator can receive tasks and execute validator responsibilities. You should already be aware of all the responsibilities and [staking logistics](https://docs.ethhub.io/ethereum-roadmap/ethereum-2.0/proof-of-stake/#staking-logistics) for being a validator.

You can check the status of your validator using block explorers: [beaconcha.in](https://beaconcha.in/) and [beacon.etherscan.io](https://beacon.etherscan.io/).

**You are now officially an Ethereum 2.0 validator, congrats!** 🎉

