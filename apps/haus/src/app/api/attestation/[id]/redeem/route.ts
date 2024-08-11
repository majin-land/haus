import { NextRequest, NextResponse } from 'next/server'
import { EAS, SchemaEncoder } from '@ethereum-attestation-service/eas-sdk'
import { ethers } from 'ethers'

const PRIVATE_KEY = process.env.WALLET_PRIVATE_KEY
const EAS_ADDRESS = process.env.EAS_CONTRACT_ADDRESS
const REDEEM_TICKET_SCHEMA_UID = process.env.REDEEM_TICKET_SCHEMA_UID
const PROVIDER = process.env.EAS_PROVIDER_URL || 'https://sepolia.optimism.io'

export async function GET(request: NextRequest, context: { params: { id: string } }) {
  try {
    const attestationUID = context.params.id
    const searchParams = request.nextUrl.searchParams
    const recipient = searchParams.get('recipient')

    if (!attestationUID || !recipient) {
      return NextResponse.json({ message: 'All field are required' }, { status: 400 })
    }
    // Initialize the sdk with the address of the EAS Schema contract address
    const easInstance = new EAS(EAS_ADDRESS as string)

    // Gets a default provider (in production use something else like infura/alchemy)
    const provider = ethers.getDefaultProvider(PROVIDER)
    const signer = new ethers.Wallet(PRIVATE_KEY as string, provider)

    // Connects an ethers style provider/signingProvider to perform read/write functions.
    easInstance.connect(signer)

    // Initialize SchemaEncoder with the schema string
    const schemaEncoder = new SchemaEncoder('bytes32 attestation_id,string redeemed_at')
    const encodedData = schemaEncoder.encodeData([
      { name: 'attestation_id', value: attestationUID, type: 'bytes32' },
      { name: 'redeemed_at', value: new Date().toString(), type: 'string' },
    ])
    const tx = await easInstance.attest({
      schema: REDEEM_TICKET_SCHEMA_UID as string,
      data: {
        recipient: recipient,
        expirationTime: 0n,
        revocable: true, // Be aware that if your schema is not revocable, this MUST be false
        data: encodedData,
      },
    })
    const newAttestationUID = await tx.wait()
    console.log('Redeemed Ticket Attestation UID:', newAttestationUID)

    return NextResponse.json({
      attestation_id: newAttestationUID,
    })
  } catch (error) {
    console.error('Error handling Redeem Ticket request', error)
    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 })
  }
}
