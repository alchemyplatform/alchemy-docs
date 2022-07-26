## Usage:
npm install<br />
npx hardhat compile

## Tasks:
npx hardhat account --address address<br />
Returns the balance and nonce of the wallet address for all networks included in the network array.

npx hardhat unlocktimer --set minutes<br />
Returns timestamp to set the unlock timer for the Vault contract.

## Scripts:
### Deploy Factory:
***Note: Must be deployed at the same nonce accross networks.***<br />
npx hardhat run scripts/deployFactory.js --network network

### Deploy Vault:
***Note: Before deploying change the owner address in the contract to your own wallet.***<br />
***Ensure you set the correct factory address and unlock time in the script file***<br />
***Do NOT set the owner to msg.sender as the deployment factory address is msg.sender***<br />
npx hardhat run scripts/vaultDeploy.js -- network network <br />
Deploys the Vault contract via the deployed Factory.

### Vault Deposit:
npx hardhat run scripts/vaultDeposit.js -- network network<br />
Deposits funds to the deployed Vault contract

### Vault Withdraw:
npx hardhat run scripts/vaultWithdraw.js -- network network<br />
Withdraws funds from the deployed Vault contract

## Available testnets the below factory address can be used: 
Goerli, Polygon Mumbai, Optimism Goerli, Arbitrum Rinkby 

## Factory deployed to: 
0x7B514ecfA2d02e085706d3EE6D63DE4a33CFc4e0
