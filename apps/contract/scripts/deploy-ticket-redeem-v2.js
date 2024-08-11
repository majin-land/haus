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

  const RedeemResolverV2 = await ethers.getContractFactory('RedeemResolverV2')
  const redeemResolverV2 = await RedeemResolverV2.deploy('0x4200000000000000000000000000000000000021', '0xcDbFCE45c57b31Dc8B196aB58F74E2b8e478fc7e')

  console.log('RedeemResolverV2 details:', redeemResolverV2)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
