const withdraw = async () => {
  const Vault = await ethers.getContractFactory("Vault");
  const vaultAddress = "0xREPLACE_ADDRESS"; //Replace this with your Vault create2 address
  const vault = await Vault.attach(vaultAddress);

  const withdraw = await vault.withdraw();
  const withdrawRes = await withdraw.wait();
  console.log(withdrawRes.events[0].args[0]._hex.toString() / 10 ** 18 + "ETH Withdrawn!");
};

withdraw()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });