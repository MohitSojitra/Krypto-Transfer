const main = async () => {
  // We get the contract to deploy
  const Transaction = await hre.ethers.getContractFactory('Transaction')
  const transaction = await Transaction.deploy()

  await transaction.deployed()

  console.log('Transaction deployed to:', transaction.address)
}

const runMain = async () => {
  try {
    await main()
    process.exit(0)
  } catch (error) {
    process.exit(1)
  }
}

runMain()
