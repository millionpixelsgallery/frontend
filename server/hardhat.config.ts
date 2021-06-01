import '@nomiclabs/hardhat-waffle'
import '@nomiclabs/hardhat-web3'
import { task } from 'hardhat/config'
// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task('accounts', 'Prints the list of accounts', async (args, hre) => {
  const accounts = await hre.ethers.getSigners()

  for (const account of accounts) {
    console.log(account.address)
  }
})

task('balance', "Prints an account's balance")
  .addParam('account', "The account's address")
  .setAction(async (args, hre) => {
    const account = hre.web3.utils.toChecksumAddress(args.account)
    const balance = await hre.web3.eth.getBalance(account)

    console.log(hre.web3.utils.fromWei(balance, 'ether'), 'ETH')
  })

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: {
    version: '0.8.0',
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  // networks: {
  //   hardhat: {
  //     allowUnlimitedContractSize: true,
  //     blockGasLimit: 0x1fffffffffffff,
  //   }
  // }
}
