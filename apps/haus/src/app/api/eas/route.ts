import { NextResponse } from 'next/server'
import { EAS, SchemaEncoder } from '@ethereum-attestation-service/eas-sdk'
import { ethers } from 'ethers'
import { EAS_ADDRESS, SCHEMA_UID, PROVIDER } from '@/config'

export const PRIVATE_KEY = process.env.WALLET_PRIVATE_KEY

export async function GET(request: Request) {
  // get attestation detail using attestation id
}

export async function POST(request: Request) {
  try {
    if (!PRIVATE_KEY || !EAS_ADDRESS) return
    const body = await request.json()
    const { id, eventId, holderName, type, seatNumber, entryFor, recipient } = body

    if (!id || !eventId || !holderName || !type || !seatNumber || !entryFor) {
      return NextResponse.json({ message: 'All field are required' }, { status: 400 })
    }
    // Initialize the sdk with the address of the EAS Schema contract address
    const easInstance = new EAS(EAS_ADDRESS)

    // Gets a default provider (in production use something else like infura/alchemy)
    const provider = ethers.getDefaultProvider(PROVIDER)
    const signer = new ethers.Wallet(PRIVATE_KEY, provider)

    // Connects an ethers style provider/signingProvider to perform read/write functions.
    easInstance.connect(signer)

    // Initialize SchemaEncoder with the schema string
    const schemaEncoder = new SchemaEncoder(
      'string id,string event_id,string holder_name,string type,uint16 seat_number,uint8 entry_for',
    )
    const encodedData = schemaEncoder.encodeData([
      { name: 'id', value: id, type: 'string' },
      { name: 'event_id', value: eventId, type: 'string' },
      { name: 'holder_name', value: holderName, type: 'string' },
      { name: 'type', value: type, type: 'string' },
      { name: 'seat_number', value: seatNumber, type: 'uint16' },
      { name: 'entry_for', value: entryFor, type: 'uint8' },
    ])
    const tx = await easInstance.attest({
      schema: SCHEMA_UID,
      data: {
        recipient,
        expirationTime: BigInt(0),
        revocable: true, // Be aware that if your schema is not revocable, this MUST be false
        data: encodedData,
      },
    })
    const newAttestationUID = await tx.wait()
    console.log('New attestation UID:', newAttestationUID)

    return NextResponse.json(`New attestation UID: ${newAttestationUID}`)
  } catch (error) {
    console.error('Error handling POST request', error)
    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 })
  }
}
