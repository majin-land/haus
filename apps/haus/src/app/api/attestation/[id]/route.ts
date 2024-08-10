import { NextResponse } from 'next/server'
import { EAS } from '@ethereum-attestation-service/eas-sdk'
import { ethers } from 'ethers'
import { EAS_ADDRESS, PROVIDER } from '@/config'

const PRIVATE_KEY = process.env.WALLET_PRIVATE_KEY

const customStringify = (obj) => {
  return JSON.stringify(obj, (key, value) => (typeof value === 'bigint' ? value.toString() : value))
}

export async function GET(request: Request, context: { params: { id: string } }) {
  try {
    const attestationUID = context.params.id

    if (!attestationUID) {
      return NextResponse.json({ message: 'Attestation UID is required' }, { status: 400 })
    }

    // Initialize the sdk with the address of the EAS Schema contract address
    const easInstance = new EAS(EAS_ADDRESS as string)

    // Gets a default provider (in production use something else like infura/alchemy)
    const provider = ethers.getDefaultProvider(PROVIDER)
    const signer = new ethers.Wallet(PRIVATE_KEY as string, provider)

    // Connects an ethers style provider/signingProvider to perform read/write functions.
    easInstance.connect(signer)

    const attestation = await easInstance.getAttestation(attestationUID)
    console.log('Attestation detail: ', attestation)

    const data = customStringify(attestation)

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error handling GET request', error)
    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 })
  }
}
