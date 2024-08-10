import { NextResponse } from 'next/server'
import axios from 'axios'

const endpoint = 'https://optimism-sepolia.easscan.org/graphql'

export async function GET(request: Request, context: { params: { id: string } }) {
  const query = `
    query getAttestationById($where: AttestationWhereUniqueInput!) {
      getAttestation(where: $where) {
        decodedDataJson
        attester
        recipient
        id
        schemaId
      }
    }
  `

  try {
    const attestationUID = context.params.id

    if (!attestationUID) {
      return NextResponse.json({ message: 'Attestation UID is required' }, { status: 400 })
    }

    const response = await axios.post(
      endpoint,
      {
        query,
        variables: { where: { id: attestationUID } },
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )

    return NextResponse.json(response.data)
  } catch (error) {
    console.error('Error handling GET request', error)
    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 })
  }
}
