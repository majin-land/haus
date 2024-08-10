import { NextResponse } from 'next/server'
import { EAS, SchemaEncoder } from '@ethereum-attestation-service/eas-sdk'
import { ethers } from 'ethers'
import { EAS_ADDRESS, SCHEMA_UID, PROVIDER } from '@/config'

const PRIVATE_KEY = process.env.WALLET_PRIVATE_KEY

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { id, eventId, worldProof, holderName, type, seatNumber, entryFor, recipient } = body

    if (
      !id ||
      !eventId ||
      !worldProof ||
      !holderName ||
      !type ||
      !seatNumber ||
      !entryFor ||
      !recipient
    ) {
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
    const schemaEncoder = new SchemaEncoder(
      'string id,string event_id,string world_proof,string holder_name,string type,string seat_number,uint8 entry_for',
    )
    const encodedData = schemaEncoder.encodeData([
      { name: 'id', value: id, type: 'string' },
      { name: 'event_id', value: eventId, type: 'string' },
      { name: 'world_proof', value: worldProof, type: 'string' },
      { name: 'holder_name', value: holderName, type: 'string' },
      { name: 'type', value: type, type: 'string' },
      { name: 'seat_number', value: seatNumber, type: 'string' },
      { name: 'entry_for', value: entryFor, type: 'uint8' },
    ])
    const tx = await easInstance.attest({
      schema: SCHEMA_UID as string,
      data: {
        recipient: recipient || '0x0000000000000000000000000000000000000000',
        expirationTime: BigInt(0),
        revocable: true, // Be aware that if your schema is not revocable, this MUST be false
        data: encodedData,
      },
    })
    const newAttestationUID = await tx.wait()
    console.log('New attestation UID:', newAttestationUID)

    return NextResponse.json({
      attestationUID: newAttestationUID,
    })
  } catch (error) {
    console.error('Error handling POST request', error)
    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 })
  }
}
