// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
require('dotenv').config({ path: '../.env' })
const { ethers } = require('hardhat')

async function main() {
  const [deployer] = await ethers.getSigners()
  console.log('Deploying contracts with the account:', deployer.address)

  console.log('deployer', deployer)

  // const deployerBalance = (await deployer.getBalance()).toString()
  // console.log('Account balance:', deployerBalance)

  // if (deployerBalance === '0') return // deployment will fail

  const RedeemResolver = await ethers.getContractFactory('RedeemResolver')
  const redeemResolver = await RedeemResolver.deploy('0x4200000000000000000000000000000000000021')
  await redeemResolver.deployed()

  console.log('RedeemResolver deployed to:', redeemResolver.address)
  console.log('RedeemResolver details:', redeemResolver)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
