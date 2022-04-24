---
description: >-
  In this tutorial, we'll teach you how to create a full stack dApp by
  connecting your Hello World smart contract to a React frontend using Metamask
  and Web3 tools.
---

# 📱 Integrating Your Smart Contract with the Frontend

You'll need to have finished part 1 [creating and deploying a smart contract](./), part 2 [interacting with your smart contract](interacting-with-a-smart-contract.md), and part 3 [submitting your smart contract to Etherscan](https://docs.alchemy.com/alchemy/tutorials/hello-world-smart-contract/submitting-your-smart-contract-to-etherscan) before starting part 4 below.

## Part 4: Marrying Web2 & Web3: connecting your smart contract to a frontend project

🎉Woooo! You finally made it to the last part of this tutorial series: creating a full stack decentralized application (dApp) by connecting your Hello World smart contract to a frontend project and interacting with it.

By the end of this tutorial, you'll know how to:

* Connect a Metamask wallet to your dApp project
* Read data from your smart contract using the [Alchemy Web3](https://docs.alchemy.com/alchemy/documentation/alchemy-web3) API
* Sign Ethereum transactions using Metamask

For this dApp, we'll be using [React](https://reactjs.org) as our frontend framework; however, it's important to note that we won't be spending much time breaking down its fundamentals, as we'll mostly be focusing on bringing Web3 functionality to our project.

{% hint style="info" %}
As a prerequisite, you should have a beginner-level understanding of React—know how components, props, useState/useEffect, and basic function calling works. If you've never heard of any of those terms before, we recommend that you check out this [Intro to React tutorial](https://reactjs.org/tutorial/tutorial.html). For the more visual learners, we highly recommend this awesome Net Ninja [Full Modern React Tutorial](https://www.youtube.com/playlist?list=PL4cUxeGkcC9gZD-Tvwfod2gaISzfRiP9d) video series.
{% endhint %}

What are we here for? Let's get started! 😎

## Step 1: Clone the starter files

First, go to the [hello-world-part-four github repository](https://github.com/alchemyplatform/hello-world-part-four-tutorial) to get the starter files for this project. Clone this repository into your local environment.

{% hint style="info" %}
Don't know how to clone a repository? Check out [this guide](https://docs.github.com/en/github/creating-cloning-and-archiving-repositories/cloning-a-repository) from Github.
{% endhint %}

When you open this cloned `hello-world-part-four` repository, you'll notice that it contains two folders: `starter-files` and `completed`.

* `starter-files` contains the starter files (essentially the React UI) for this project. In this tutorial, **we will be working in this directory**, as you learn how to bring this UI to life by connecting it to your Ethereum wallet and the Hello World smart contract that you published on Etherscan in [Part 3](https://docs.alchemy.com/alchemy/tutorials/hello-world-smart-contract/submitting-your-smart-contract-to-etherscan).
* `completed` contains the entire completed tutorial and is there for you as a **reference** **if you get stuck.**

Next, open your copy of `starter-files` to your favorite code editor (at Alchemy, we we're big fans of [VSCode](https://code.visualstudio.com/download)), and then navigate into your `src` folder:

![The "src" folder](<../../.gitbook/assets/image (17).png>)

All of the code we'll write will live under the `src` folder. We'll be editing the `HelloWorld.js` component and the `util/interact.js` javascript files to give our project Web3 functionality.

## Step 2: Check out the starter files

Before we start coding, it's super important that we figure out what's already provided for us in the starter files.

### Get your react project running

Let's start by running the React project in our browser. The beauty of React is that once we have our project running in our browser, any changes we save will be updated live in our browser.

To get the project running, navigate to the root directory of the `starter-files` folder, and the run `npm install` in your terminal to install the dependencies of the project:

```bash
cd starter-files
npm install
```

Once those have finished installing, run `npm start` in your terminal:

```bash
npm start
```

Doing so should open [http://localhost:3000/](http://localhost:3000) in your browser, where you'll see the frontend for our project. It should consist of one field (a place to update the message stored in your smart contract), a "Connect Wallet" button, and an "Update" button.

![What your UI should look like](<../../.gitbook/assets/image (16).png>)

If you try clicking "Connect Wallet" or "Update" buttons, you'll notice that they don't work—that's because we still need to program their functionality! :)

### The `HelloWorld.js` component

{% hint style="warning" %}
**NOTE:** Make sure you're in the `starter-files` folder and not the `completed`folder!
{% endhint %}

Let's go back into the `src` folder in our editor and open the `HelloWorld.js` file. It's super important that we understand everything in this file, as it is the primary React component we will be working on.

At the top of this file, you'll notice we have several import statements that are necessary to get our project running, including the React library, useEffect and useState hooks, some items from the `./util/interact.js` (we'll describe them in more details soon!), and the Alchemy logo. 🧙‍♂️

{% code title="HelloWorld.js" %}
```javascript
import React from "react";
import { useEffect, useState } from "react";
import {
  helloWorldContract,
  connectWallet,
  updateMessage,
  loadCurrentMessage,
  getCurrentWalletConnected,
} from "./util/interact.js";

import alchemylogo from "./alchemylogo.svg";
```
{% endcode %}

Next, we have our state variables that we will update after specific events.

{% code title="HelloWorld.js" %}
```javascript
//State variables
const [walletAddress, setWallet] = useState("");
const [status, setStatus] = useState("");
const [message, setMessage] = useState("No connection to the network.");
const [newMessage, setNewMessage] = useState("");
```
{% endcode %}

{% hint style="info" %}
Never heard of React state variables or state hooks? Check out [these](https://reactjs.org/docs/hooks-state.html) docs.
{% endhint %}

Here's what each of the variables represents:

* `walletAddress` - a string that stores the user's wallet address
* `status`- a string that stores a helpful message that guides the user on how to interact with the dApp
* `message` - a string that stores the current message in the smart contract
* `newMessage` - a string that stores the new message that will be written to the smart contract

After the state variables, you'll see five un-implemented functions: `useEffect` ,`addSmartContractListener`, `addWalletListener` , `connectWalletPressed`, and `onUpdatePressed`. We'll explain what they do below:

{% code title="HelloWorld.js" %}
```javascript
  //called only once
  useEffect(() => { //TODO: implement

  }, []);

  function addSmartContractListener() { //TODO: implement

  }

  function addWalletListener() { //TODO: implement

  }

  const connectWalletPressed = async () => { //TODO: implement

  };

  const onUpdatePressed = async () => { //TODO: implement

  };
```
{% endcode %}

* [`useEffect`](https://reactjs.org/docs/hooks-effect.html)- this is a React hook that is called after your component is rendered.  Because it has an empty array `[]` prop passed into it (see line 4),  it will only be called on the component's _first_ render. Here we'll load the current message stored in our smart contract, call our smart contract and wallet listeners, and update our UI to reflect whether a wallet is already connected.&#x20;
* `addSmartContractListener`- this function sets up a listener that will watch for our HelloWorld contract's `UpdatedMessages` event and update our UI when the message is changed in our smart contract.&#x20;
* `addWalletListener`-  this function sets up a listener that detects changes in the user's Metamask wallet state, such as when the user disconnects their wallet or switches addresses.
* `connectWalletPressed`- this function will be called to connect the user's Metamask wallet to our dApp.
* `onUpdatePressed` - this function will be called when the user wants to update the message stored in the smart contract.

Near the end of this file, we have the UI of our component.

{% code title="HelloWorld.js" %}
```javascript
//the UI of our component
return (
    <div id="container">
      <img id="logo" src={alchemylogo}></img>
      <button id="walletButton" onClick={connectWalletPressed}>
        {walletAddress.length > 0 ? (
          "Connected: " +
          String(walletAddress).substring(0, 6) +
          "..." +
          String(walletAddress).substring(38)
        ) : (
          <span>Connect Wallet</span>
        )}
      </button>

      <h2 style={{ paddingTop: "50px" }}>Current Message:</h2>
      <p>{message}</p>

      <h2 style={{ paddingTop: "18px" }}>New Message:</h2>

      <div>
        <input
          type="text"
          placeholder="Update the message in your smart contract."
          onChange={(e) => setNewMessage(e.target.value)}
          value={newMessage}
        />
        <p id="status">{status}</p>

        <button id="publishButton" onClick={onUpdatePressed}>
          Update
        </button>
      </div>
    </div>
  );
```
{% endcode %}

If you scan this code carefully, you'll notice where we use our various state variables in our UI:

* On lines 6-12, if the user's wallet is connected (i.e. `walletAddress.length > 0`), we display a truncated version of the user `walletAddress` in the button with ID "walletButton;"  otherwise it simply says "Connect Wallet."
* On line 17, we display the current message stored in the smart contract, which is captured in the `message` string.
* On lines 23-26, we use a [controlled component](https://reactjs.org/docs/forms.html#controlled-components) to update our `newMessage` state variable when the input in the text field changes.

In addition to our state variables, you'll also see that `connectWalletPressed` and `onUpdatePressed` functions are called when the buttons with IDs `publishButton` and `walletButton` are clicked respectively.

Finally, let's address where is this `HelloWorld.js` component added.

If you go to the `App.js` file, which is the main component in React that acts as a container for all other components, you'll see that our `HelloWorld.js` component is injected on line 7.

Last but not least, let's check out one more file provided for you, the `interact.js` file.

### The `interact.js` file

Because we want to prescribe to the [M-V-C](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller) paradigm, we'll want a separate file that contains all our functions to manage the logic, data, and rules of our dApp, and then be able to export those functions to our frontend (our `HelloWorld.js` component).

👆🏽This is the exact purpose of our `interact.js` file!

Navigate to the `util` folder in your `src` directory, and you'll notice we've included a file called `interact.js` that will contain all of our smart contract interaction and wallet functions and variables.

{% code title="interact.js" %}
```javascript
//export const helloWorldContract;

export const loadCurrentMessage = async () => {

};

export const connectWallet = async () => {

};

const getCurrentWalletConnected = async () => { 

};


export const updateMessage = async (message) => {

};
```
{% endcode %}

You'll notice at the top of the file that we've commented out the `helloWorldContract` object. Later in this tutorial, we will uncomment this object and instantiate our smart contract in this variable, which we will then export into our `HelloWorld.js` component.

The four unimplemented functions after our `helloWorldContract` object do the following:

* `loadCurrentMessage` - this function handles the logic of loading the current message stored in the smart contract. It will make a _read_ call to the Hello World smart contract using the [Alchemy Web3 API](https://github.com/alchemyplatform/alchemy-web3).
* `connectWallet` - this function will connect the user's Metamask to our dApp.
* `getCurrentWalletConnected` - this function will check if an Ethereum account is already connected to our dApp on page load and update our UI accordingly.
* `updateMessage` - this function will update the message stored in the smart contract. It will make a _write_ call to the Hello World smart contract, so the user's Metamask wallet will have to sign an Ethereum transaction to update the message.

Now that we understand what we're working with, let's figure out how to read from our smart contract!

## Step 3: Read from your smart contract

To read from your smart contract, you'll need to successfully set up:

* An API connection to the Ethereum chain
* A loaded instance of your smart contract
* A function to call to your smart contract function
* A listener to watch for updates when the data you're reading from the smart contract changes

This may sounds like a lot of steps, but don't worry! We'll walk you through how to do each of them step-by-step! :)

### Establish an API connection to the Ethereum chain

So remember how in Part 2 of this tutorial, we used our [Alchemy Web3 key to read from our smart contract](https://docs.alchemy.com/alchemy/tutorials/hello-world-smart-contract/interacting-with-a-smart-contract#step-1-install-web3-library)? You'll also need an Alchemy Web3 key in your dApp to read from the chain.

If you don't have it already, first install [Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3) by navigating to the root directory of your `starter-files` and running the following in your terminal:

```
npm install @alch/alchemy-web3
```

{% hint style="info" %}
[Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3) is a wrapper around [Web3.js](https://web3js.readthedocs.io/en/v1.2.9/), providing enhanced API methods and other crucial benefits to make your life as a web3 developer easier. It is designed to require minimal configuration so you can start using it in your app right away!
{% endhint %}

Then, install the [dotenv](https://www.npmjs.com/package/dotenv) package in your project directory, so we have a secure place to store our API key after we fetch it.

```
npm install dotenv --save
```

For our dApp, **we'll be using our Websockets API key** instead of our HTTP API key, as it will allow us to set up a listener that detects when the message stored in the smart contract changes.

![Copy the websockets url](../../.gitbook/assets/hehe.gif)

Once you have your API key, create a `.env` file in your root directory and add your Alchemy Websockets url to it. Afterwards, your `.env` file should look like so:

```javascript
REACT_APP_ALCHEMY_KEY = wss://eth-ropsten.ws.alchemyapi.io/v2/<key>
```

Now, we're ready to set up our Alchemy Web3 endpoint in our dApp! Let's go back to our `interact.js`, which is nested inside our `util` folder and add the following code at the top of the file:

{% code title="interact.js" %}
```javascript
require('dotenv').config();
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY;
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(alchemyKey); 

//export const helloWorldContract;
```
{% endcode %}

Above, we first imported the Alchemy key from our `.env` file and then passed our `alchemyKey` to `createAlchemyWeb3` to establish our Alchemy Web3 endpoint.

With this endpoint ready, it's time to load our smart contract!

### Loading your Hello World smart contract

To load your Hello World smart contract, you'll need its contract address and ABI, both of which can be found on Etherscan if you completed [Part 3 of this tutorial.](https://docs.alchemy.com/alchemy/tutorials/hello-world-smart-contract/submitting-your-smart-contract-to-etherscan)

![How to get your contract ABI from Etherscan](../../.gitbook/assets/contract-abi.gif)

{% hint style="success" %}
If you skipped Part 3 of this tutorial, you can use the HelloWorld contract with address [0x6f3f635A9762B47954229Ea479b4541eAF402A6A](https://ropsten.etherscan.io/address/0x6f3f635a9762b47954229ea479b4541eaf402a6a#code).

It's ABI can be found [here](https://ropsten.etherscan.io/address/0x6f3f635a9762b47954229ea479b4541eaf402a6a#code).
{% endhint %}

A contract ABI is necessary for specifying which function a contract will invoke as well ensuring that the function will return data in the format you're expecting. Once we've copied our contract ABI, let's save it as a JSON file called `contract-abi.json` in your `src` directory.

![Your contract-abi.json should be stored in your src folder.](<../../.gitbook/assets/image (22).png>)

Armed with our contract address, ABI, and Alchemy Web3 endpoint, we can use the [contract method](https://web3js.readthedocs.io/en/v1.2.0/web3-eth-contract.html?highlight=constructor#web3-eth-contract) to load an instance of our smart contract. Import your contract ABI into the `interact.js` file and add your contract address.

{% code title="interact.js" %}
```javascript
const contractABI = require("../contract-abi.json");
const contractAddress = "0x6f3f635A9762B47954229Ea479b4541eAF402A6A";
```
{% endcode %}

We can now finally uncomment our `helloWorldContract` variable, and load the smart contract using our AlchemyWeb3 endpoint:

{% code title="interact.js" %}
```javascript
export const helloWorldContract = new web3.eth.Contract(
  contractABI,
  contractAddress
);
```
{% endcode %}

To recap, the first 12 lines of your `interact.js` should now look like this:

{% code title="interact.js" %}
```javascript
require('dotenv').config();
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY;
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(alchemyKey); 

const contractABI = require('../contract-abi.json')
const contractAddress = "0x6f3f635A9762B47954229Ea479b4541eAF402A6A";

export const helloWorldContract = new web3.eth.Contract(
  contractABI,
  contractAddress
);
```
{% endcode %}

Now that we have our contract loaded, we can implement our `loadCurrentMessage` function!

### Implementing `loadCurrentMessage` in your `interact.js` file

This function is super simple. Just like we do in [Part 2 of this tutorial series](https://docs.alchemy.com/alchemy/tutorials/hello-world-smart-contract/interacting-with-a-smart-contract#step-5-read-the-init-message), here we're going make a simple async web3 call to read from our contract. Our function will return the message stored in the smart contract:

Update the `loadCurrentMessage` in your `interact.js` file to the following:

{% code title="interact.js" %}
```javascript
export const loadCurrentMessage = async () => { 
    const message = await helloWorldContract.methods.message().call(); 
    return message;
};
```
{% endcode %}

Since we want to display this smart contract in our UI, let's update the `useEffect` function in our `HelloWorld.js` component to the following:

{% code title="HelloWorld.js" %}
```javascript
//called only once
useEffect(() => {
  async function fetchMessage() {
    const message = await loadCurrentMessage();
    setMessage(message);
  }
  fetchMessage();
}, []);
```
{% endcode %}

Note, we only want our `loadCurrentMessage` to be called once during the component's first render. We'll soon implement `addSmartContractListener` to automatically update the UI after the message in the smart contract changes.

Before we dive into our listener, let's check out what we have so far! Save your `HelloWorld.js` and `interact.js` files, and then go to [http://localhost:3000/](http://localhost:3000)

You'll notice that the current message no longer says "No connection to the network." Instead it reflects the message stored in the smart contract. Sick!

![Your UI should now reflect the message stored in the smart contract](<../../.gitbook/assets/image (12).png>)

Now speaking of that listener...

### Implement `addSmartContractListener`

If you think back to the `HelloWorld.sol` file we wrote in [Part 1 of this tutorial series](https://docs.alchemy.com/alchemy/tutorials/hello-world-smart-contract#step-10-write-our-contract), you'll recall that there is a smart contract event called `UpdatedMessages` that is emitted after our smart contract's `update` function is invoked (see lines 9 and 27):

{% code title="HelloWorld.sol" %}
```javascript
// Specifies the version of Solidity, using semantic versioning.
// Learn more: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity ^0.7.3;

// Defines a contract named `HelloWorld`.
// A contract is a collection of functions and data (its state). Once deployed, a contract resides at a specific address on the Ethereum blockchain. Learn more: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

   //Emitted when update function is called
   //Smart contract events are a way for your contract to communicate that something happened on the blockchain to your app front-end, which can be 'listening' for certain events and take action when they happen.
   event UpdatedMessages(string oldStr, string newStr);

   // Declares a state variable `message` of type `string`.
   // State variables are variables whose values are permanently stored in contract storage. The keyword `public` makes variables accessible from outside a contract and creates a function that other contracts or clients can call to access the value.
   string public message;

   // Similar to many class-based object-oriented languages, a constructor is a special function that is only executed upon contract creation.
   // Constructors are used to initialize the contract's data. Learn more:https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constructors
   constructor(string memory initMessage) {

      // Accepts a string argument `initMessage` and sets the value into the contract's `message` storage variable).
      message = initMessage;
   }

   // A public function that accepts a string argument and updates the `message` storage variable.
   function update(string memory newMessage) public {
      string memory oldMsg = message;
      message = newMessage;
      emit UpdatedMessages(oldMsg, newMessage);
   }
}
```
{% endcode %}

{% hint style="info" %}
Smart contract events are a way for your contract to communicate that something happened (i.e. there was an _event_) on the blockchain to your front-end application, which can be 'listening' for specific events and take action when they happen.
{% endhint %}

The `addSmartContractListener` function is going to specifically listen for our Hello World smart contract's `UpdatedMessages` event, and update our UI to display the new message.

Modify `addSmartContractListener` to the following:

{% code title="HelloWorld.js" %}
```javascript
  function addSmartContractListener() {
    helloWorldContract.events.UpdatedMessages({}, (error, data) => {
      if (error) {
        setStatus("😥 " + error.message);
      } else {
        setMessage(data.returnValues[1]);
        setNewMessage("");
        setStatus("🎉 Your message has been updated!");
      }
    });
  }
```
{% endcode %}

Let's break down what happens when the listener detects an event:

* If an error occurs when the event is emitted, it will be reflected in the UI via our `status` state variable.
* Otherwise, we will use the `data` object returned. The `data.returnValues` is an array indexed at zero where the first element in the array stores the previous message and second element stores the updated one. Altogether, on a successful event we'll set our `message` string to the updated message, clear the `newMessage` string, and update our `status` state variable to reflect that a new message has been published on our smart contract.

Finally, let's call our listener in our `useEffect` function so it is initialized on the `HelloWorld.js` component's first render. Altogether, your `useEffect` function should look like this:

{% code title="HelloWorld.js" %}
```javascript
useEffect(() => {
  async function fetchMessage() {
    const message = await loadCurrentMessage();
    setMessage(message);  
  }
  fetchMessage();
  addSmartContractListener();
}, []);
```
{% endcode %}

Now that we're able to read from our smart contract, it would be great to figure out how to write to it too! However, to write to our dApp, we must first have an Ethereum wallet connected to it.

So, next we'll tackle setting up our Ethereum wallet (Metamask) and then connecting it to our dApp!

## Step 4: Set up your Ethereum wallet

To write anything to the Ethereum chain, users must sign transactions using their virtual wallet's private keys. For this tutorial, we’ll use [Metamask](https://metamask.io), a virtual wallet in the browser used to manage your Ethereum account address, as it makes this transaction signing super easy for the end-user.

{% hint style="info" %}
If you want to understand more about how transactions on Ethereum work, check out [this page](https://ethereum.org/en/developers/docs/transactions/) from the Ethereum foundation.
{% endhint %}

### Download Metamask

You can download and create a Metamask account for free [here](https://metamask.io/download.html). When you are creating an account, or if you already have an account, make sure to switch over to the “Ropsten Test Network” in the upper right (so that we’re not dealing with real money).

![Sample Metamask Wallet](<../../.gitbook/assets/image (4).png>)

### Add ether from a Faucet <a href="step-4-add-ether-from-a-faucet" id="step-4-add-ether-from-a-faucet"></a>

To sign a transaction on the Ethereum blockchain, we’ll need some fake Eth. To get Eth you can go to the [Ropsten faucet](https://fauceth.komputing.org) and enter your Ropsten account address, then click “Send Ropsten Eth.” You should see Eth in your Metamask account soon after!

### Check your Balance <a href="step-5-check-your-balance" id="step-5-check-your-balance"></a>

To double check our balance is there, let’s make an [eth\_getBalance](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth\_getbalance) request using [Alchemy’s composer tool](https://composer.alchemyapi.io/?composer\_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth\_getBalance%22%2C%22paramValues%22%3A%5B%22%22%2C%22latest%22%5D%7D). This will return the amount of Eth in our wallet. After you input your Metamask account address and click “Send Request”, you should see a response like this:

```
{"jsonrpc": "2.0", "id": 0, "result": "0xde0b6b3a7640000"}
```

{% hint style="info" %}
**NOTE:** This result is in wei not eth. Wei is used as the smallest denomination of ether. The conversion from wei to eth is: 1 eth = 10¹⁸ wei. So if we convert 0xde0b6b3a7640000 to decimal we get 1\*10¹⁸ which equals 1 eth.
{% endhint %}

Phew! Our fake money is all there! 🤑

## Step 5: Connect Metamask to your UI

Now that our Metamask wallet is set up, let's connect our dApp to it!

### The `connectWallet` function

In our `interact.js`file, let's implement the `connectWallet` function, which we can then call in our `HelloWorld.js` component.

Let's modify `connectWallet` to the following:

{% code title="interact.js" %}
```javascript
export const connectWallet = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const obj = {
        status: "👆🏽 Write a message in the text-field above.",
        address: addressArray[0],
      };
      return obj;
    } catch (err) {
      return {
        address: "",
        status: "😥 " + err.message,
      };
    }
  } else {
    return {
      address: "",
      status: (
        <span>
          <p>
            {" "}
            🦊{" "}
            <a target="_blank" href={`https://metamask.io/download.html`}>
              You must install Metamask, a virtual Ethereum wallet, in your
              browser.
            </a>
          </p>
        </span>
      ),
    };
  }
};
```
{% endcode %}

So what does this giant block of code do exactly?

Well, first, it checks if it `window.ethereum` is enabled in your browser.

{% hint style="info" %}
`window.ethereum` is a global API injected by Metamask and other wallet providers that allows websites to request users' Ethereum accounts. If approved, it can read data from the blockchains the user is connected to, and suggest that the user sign messages and transactions . Check out the [Metamask docs](https://docs.metamask.io/guide/ethereum-provider.html#table-of-contents) for more info!
{% endhint %}

If `window.ethereum` _is not_ present, then that means Metamask is not installed. This results in a JSON object being returned, where `address` returned is an empty string, and the `status` JSX object relays that the user must install Metamask.

Now if `window.ethereum` _is_ present, then that's when things get interesting.

Using a try/catch loop, we'll try to connect to Metamask by calling[`window.ethereum.request({ method: "eth_requestAccounts" });`](https://docs.metamask.io/guide/rpc-api.html#eth-requestaccounts) Calling this function will open up Metamask in the browser, whereby the user will be prompted to connect their wallet to your dApp.

* If the user chooses to connect, `method: "eth_requestAccounts"`  will return an array that contains all of the user's account addresses that connected to the dApp. Altogether, our `connectWallet` function will return a JSON object that contains the _first_ `address` in this array (see line 9) and a `status` message that prompts the user to write a message to the smart contract.
* If the user rejects the connection, then the JSON object will contain an empty string for the `address` returned and a `status` message that reflects that the user rejected the connection.

Now that we've written this `connectWallet` function, the next step is to call it to our `HelloWorld.js`component.

### Add the `connectWallet` function to your `HelloWorld.js` UI Component <a href="import-connect-wallet-pressed-into-minter-jss-connect-wallet-function" id="import-connect-wallet-pressed-into-minter-jss-connect-wallet-function"></a>

Navigate to the `connectWalletPressed` function in `HelloWorld.js`, and update it to the following:

{% code title="HelloWorld.js" %}
```javascript
  const connectWalletPressed = async () => {
    const walletResponse = await connectWallet();
    setStatus(walletResponse.status);
    setWallet(walletResponse.address);
  };
```
{% endcode %}

Notice how most of our functionality is abstracted away to our `HelloWorld.js` component from the `interact.js` file? This is so we comply with the M-V-C paradigm!

In `connectWalletPressed`, we simply make an await call to our imported `connectWallet` function, and using its response, we update our `status` and `walletAddress` variables via their state hooks.

Now, let's save both files (`HelloWorld.js` and `interact.js`) and test out our UI so far.

Open your browser on the [http://localhost:3000/](http://localhost:3000) page, and press the "Connect Wallet" button on the top right of the page.

If you have Metamask installed, you should be prompted to connect your wallet to your dApp. Accept the invitation to connect.

You should see that the wallet button now reflects that your address is connected! Yasssss 🔥

Next, try refreshing the page... this is strange. Our wallet button is prompting us to connect Metamask, even though it is already connected...

![The problem on page reload](../../.gitbook/assets/the-problem.gif)

However, have no fear! We easily can address that (get it? 😅) by implementing `getCurrentWalletConnected`, which will check if an address is already connected to our dApp and update our UI accordingly!

### The `getCurrentWalletConnected` function

Update your `getCurrentWalletConnected` function in the `interact.js` file to the following:

{% code title="interact.js" %}
```javascript
export const getCurrentWalletConnected = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_accounts",
      });
      if (addressArray.length > 0) {
        return {
          address: addressArray[0],
          status: "👆🏽 Write a message in the text-field above.",
        };
      } else {
        return {
          address: "",
          status: "🦊 Connect to Metamask using the top right button.",
        };
      }
    } catch (err) {
      return {
        address: "",
        status: "😥 " + err.message,
      };
    }
  } else {
    return {
      address: "",
      status: (
        <span>
          <p>
            {" "}
            🦊{" "}
            <a target="_blank" href={`https://metamask.io/download.html`}>
              You must install Metamask, a virtual Ethereum wallet, in your
              browser.
            </a>
          </p>
        </span>
      ),
    };
  }
};
```
{% endcode %}

This code is _very_ similar to the `connectWallet` function we just wrote in the previous step.

The main difference is that instead of calling the method `eth_requestAccounts`, which opens Metamask for the user to connect their wallet, here we call the method `eth_accounts`, which simply returns an array containing the Metamask addresses currently connected to our dApp.

To see this function in action, let's call it in our `useEffect` function of our `HelloWorld.js` component:

{% code title="HelloWorld.js" %}
```javascript
useEffect(() => {
  async function fetchMessage() {
    const message = await loadCurrentMessage();
    setMessage(message);
  }
  fetchMessage();
  addSmartContractListener();

  async function fetchWallet() {
    const {address, status} = await getCurrentWalletConnected();
    setWallet(address);
    setStatus(status); 
  }
  fetchWallet();
}, []);
```
{% endcode %}

Notice, we use the response of our call to `getCurrentWalletConnected` to update our `walletAddress` and `status` state variables.

Now that you've added this code, let's try refreshing our browser window.

![It's working!!!!!](../../.gitbook/assets/yasss.gif)

Niceeeee! The button should say that you're connected, and show a preview of your connected wallet's address - even after you refresh!

### Implement `addWalletListener`

The final step in our dApp wallet setup is implementing the wallet listener so our UI updates when our wallet's state changes, such as when the user disconnects or switches accounts.

In your `HelloWorld.js` file, modify your `addWalletListener` function as the following:

{% code title="HelloWorld.js" %}
```javascript
function addWalletListener() {
  if (window.ethereum) {
    window.ethereum.on("accountsChanged", (accounts) => {
      if (accounts.length > 0) {
        setWallet(accounts[0]);
        setStatus("👆🏽 Write a message in the text-field above.");
      } else {
        setWallet("");
        setStatus("🦊 Connect to Metamask using the top right button.");
      }
    });
  } else {
    setStatus(
      <p>
        {" "}
        🦊{" "}
        <a target="_blank" href={`https://metamask.io/download.html`}>
          You must install Metamask, a virtual Ethereum wallet, in your
          browser.
        </a>
      </p>
    );
  }
}
```
{% endcode %}

I bet you don't even need our help to understand what's going on here at this point 😉, but for thoroughness purposes, let's quickly break it down:

* First, our function checks if `window.ethereum` is enabled (i.e. Metamask is installed).
  * If it's not, we simply set our `status`  state variable to a JSX string that prompts the user to install Metamask.
  * If it is enabled, we set up the listener `window.ethereum.on("accountsChanged")` on line 3 that listens for state changes in the Metamask wallet, which include when the user connects an additional account to the dApp, switches accounts, or disconnects an account. If there is at least one account connected, the `walletAddress` state variable is updated as the first account in the `accounts` array returned by the listener. Otherwise, `walletAddress` is set as an empty string.&#x20;

Last but not least, we must call it in our `useEffect` function:

{% code title="HelloWorld.js" %}
```javascript
useEffect(() => {
  async function fetchMessage() {
    const message = await loadCurrentMessage();
    setMessage(message);
  }
  fetchMessage();
  addSmartContractListener();

  async function fetchWallet() {
    const {address, status} = await getCurrentWalletConnected();
    setWallet(address)
    setStatus(status); 
  }
  fetchWallet();
  addWalletListener(); 
}, []);
```
{% endcode %}

And that's it! We've successfully completed programming all of our wallet functionality! Now onto our last task: updating the message stored in our smart contract!

## Step 6: Implement the `updateMessage` function

🏃🏽‍♀️Alrighty fam, we've arrived at the home stretch! In the `updateMessage` of your `interact.js` file, we're going to do the following:

1. Make sure the message we wish to publish in our smart contact is valid
2. Sign our transaction using Metamask
3. Call this function from our `HelloWorld.js` frontend component

This won't take very long; let's finish this dApp!

### Input error handling

Naturally, it makes sense to have some sort of input error handling at the start of the function.

We'll want our function to return early if there is no Metamask extension installed, there is no wallet connected (i.e. the `address` passed in is an empty string), or the `message` is an empty string. Let's add the following error handling to `updateMessage`:

{% code title="interact.js" %}
```javascript
export const updateMessage = async (address, message) => {
  if (!window.ethereum || address === null) {
    return {
      status:
        "💡 Connect your Metamask wallet to update the message on the blockchain.",
    };
  }

  if (message.trim() === "") {
    return {
      status: "❌ Your message cannot be an empty string.",
    };
  }
};
```
{% endcode %}

Now that it have proper input error handling, it's time to sign the transaction via Metamask!

### Signing our transaction

If you're already comfortable with traditional web3 Ethereum transactions, the code we write next will be very familiar. Below your input error handling code, add the following to `updateMessage`:

{% code title="interact.js" %}
```javascript
//set up transaction parameters
 const transactionParameters = {
    to: contractAddress, // Required except during contract publications.
    from: address, // must match user's active address.
    data: helloWorldContract.methods.update(message).encodeABI(),
  };

//sign the transaction
  try {
    const txHash = await window.ethereum.request({
      method: "eth_sendTransaction",
      params: [transactionParameters],
    });
    return {
      status: (
        <span>
          ✅{" "}
          <a target="_blank" href={`https://ropsten.etherscan.io/tx/${txHash}`}>
            View the status of your transaction on Etherscan!
          </a>
          <br />
          ℹ️ Once the transaction is verified by the network, the message will
          be updated automatically.
        </span>
      ),
    };
  } catch (error) {
    return {
      status: "😥 " + error.message,
    };
  }
```
{% endcode %}

Let's breakdown what's happening. First, we set up our transactions parameters, where:

* `to` specifies the recipient address (our smart contract)
* `from` specifies the signer of the transaction, the `address` variable we passed into our function
* `data`  contains the call to our Hello World smart contract's `update` method, receiving our `message` string variable as input

Then, we make an await call, `window.ethereum.request`, where we ask Metamask to sign the transaction. Notice, on lines 11 and 12, we're specifying our eth method, `eth_sendTransaction`and passing in our `transactionParameters`.

At this point, Metamask will open up in the browser, and prompt the user to sign or reject the transaction.

* If the transaction is successful, the function will return a JSON object where the `status` JSX string prompts the user to check out Etherscan for more information about their transaction.
* If the transaction fails, the function will return a JSON object where the `status` string relays the error message.

Altogether, our `updateMessage` function should look like this:

{% code title="interact.js" %}
```javascript
export const updateMessage = async (address, message) => {

  //input error handling
  if (!window.ethereum || address === null) {
    return {
      status:
        "💡 Connect your Metamask wallet to update the message on the blockchain.",
    };
  }

  if (message.trim() === "") {
    return {
      status: "❌ Your message cannot be an empty string.",
    };
  }

  //set up transaction parameters
  const transactionParameters = {
    to: contractAddress, // Required except during contract publications.
    from: address, // must match user's active address.
    data: helloWorldContract.methods.update(message).encodeABI(),
  };

  //sign the transaction
  try {
    const txHash = await window.ethereum.request({
      method: "eth_sendTransaction",
      params: [transactionParameters],
    });
    return {
      status: (
        <span>
          ✅{" "}
          <a target="_blank" href={`https://ropsten.etherscan.io/tx/${txHash}`}>
            View the status of your transaction on Etherscan!
          </a>
          <br />
          ℹ️ Once the transaction is verified by the network, the message will
          be updated automatically.
        </span>
      ),
    };
  } catch (error) {
    return {
      status: "😥 " + error.message,
    };
  }
};
```
{% endcode %}

Last but not least, we need to connect our `updateMessage` function to our `HelloWorld.js` component.

### Connect `updateMessage` to the `HelloWorld.js` frontend

Our `onUpdatePressed` function should make an await call to the imported `updateMessage` function and modify the `status` state variable to reflect whether our transaction succeeded or failed:

{% code title="HelloWorld.js" %}
```javascript
const onUpdatePressed = async () => {
    const { status } = await updateMessage(walletAddress, newMessage);
    setStatus(status);
};
```
{% endcode %}

It's super clean and simple. 😌And guess what...YOUR DAPP IS COMPLETE!!!

Let's test out the "Update" button!

![DApp "Update" button demo](../../.gitbook/assets/finished.gif)

## Step 7: Make your own custom dApp 🚀

Wooooo, you made it to the end of the tutorial! To recap, you learned how to:

* Connect a Metamask wallet to your dApp project
* Read data from your smart contract using the [Alchemy Web3](https://docs.alchemy.com/alchemy/documentation/alchemy-web3) API
* Sign Ethereum transactions using Metamask

Now you're fully equipped to apply the skills from this tutorial to build out your own custom dApp project! As always, if you have any questions, don't hesitate to reach out to us for help in the [Alchemy Discord](https://discord.gg/gWuC7zB). 🧙‍♂️
