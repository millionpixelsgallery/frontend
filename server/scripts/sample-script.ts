// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import '@nomiclabs/hardhat-ethers'
import hre from 'hardhat'
import { ethers } from 'ethers'

const iteration = 1

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const Vault = await hre.ethers.getContractFactory('Vault')
  const Pixels = await hre.ethers.getContractFactory('Pixels')

  const accounts = await hre.ethers.getSigners()
  const vault = await Vault.deploy(
    accounts.slice(1, 4).map((account) => account.address),
    [ethers.BigNumber.from(3000000), ethers.BigNumber.from(3000000), ethers.BigNumber.from(4000000)]
  )
  await vault.deployed()
  console.log('Vault deployed to:', vault.address)

  const pixels = await Pixels.deploy(`mpg-test-${iteration}`, vault.address, 200, 100)
  await pixels.deployed()

  console.log('Pixel deployed to:', pixels.address)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
