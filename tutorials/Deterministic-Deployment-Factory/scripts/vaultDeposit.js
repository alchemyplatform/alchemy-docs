const deposit = async () => {
  const depositAmount = ethers.utils.parseEther("0.001");
  console.log("Depositing", depositAmount / 10 ** 18 + "ETH...");
  
  const Vault = await ethers.getContractFactory("Vault");
  const vaultAddress = "0xREPLACE_ADDRESS" //Replace this with your Vault create2 address
  const vaultContract = await Vault.attach(vaultAddress); 

  const sendEther = await vaultContract.deposit({ value: depositAmount });
  const depositTxReciept = await sendEther.wait();
  console.log(depositTxReciept.events[0].args[0]._hex.toString() / 10 ** 18 + "ETH deposited!");
};

deposit()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
