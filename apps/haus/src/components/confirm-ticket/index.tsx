'use client'

import React, { useContext, useEffect } from 'react'
import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation'
import { useAccount, useWriteContract, useEnsName } from 'wagmi'
import { EAS, SchemaEncoder } from '@ethereum-attestation-service/eas-sdk'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import IconButton from '@mui/material/IconButton'
import Divider from '@mui/material/Divider'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import EventIcon from '@mui/icons-material/Event'
// import { useMutation } from '@tanstack/react-query'

import { getEventById } from '@/utils/helper'
import { TicketContext } from '@/store/ticket'
// import api from '@/services/api'
import { abi } from '@/abi/redeem-resolver'

import VerifyWorldId from '../verify-world-id'
import { useEthersSigner } from '@/utils/ethers'

// const chainId = process.env.NEXT_PUBLIC_CHAIN_ID || 11155420
const resolverAddress = process.env.NEXT_PUBLIC_RESOLVER_ADDRESS
const EAS_ADDRESS = process.env.NEXT_PUBLIC_EAS_CONTRACT_ADDRESS
const SCHEMA_UID = process.env.NEXT_PUBLIC_SCHEMA_TICKET_UID
// const PROVIDER = process.env.NEXT_PUBLIC_EAS_PROVIDER_URL || 'https://sepolia.optimism.io'

function generateSeatNumber() {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const letter = letters[Math.floor(Math.random() * letters.length)]
  const number = ('000' + Math.floor(Math.random() * 1000)).slice(-3)
  return letter + number
}

function ConfirmTicket({ setStep }: { setStep: (step: number) => void }) {
  const { id } = useParams<{ id: string }>()
  const event = getEventById(id)
  const context = useContext(TicketContext)
  const signer = useEthersSigner()
  // const { connectors, connect } = useConnect()
  // const { address, connector, isConnected } = useAccount()

  const { address } = useAccount()
  const { data: ensName } = useEnsName({ address })

  const { data: hash, writeContract } = useWriteContract()

  const router = useRouter()

  // const { mutateAsync: confirmOrder } = useMutation({
  //   mutationFn: (payload: {
  //     id: string
  //     eventId: string
  //     worldProof: string
  //     holderName: string
  //     type: string
  //     seatNumber: string
  //     entryFor: number
  //     recipient: string
  //   }) => {
  //     return api.post<{ attestation_id: string }>(`/attestation/`, payload)
  //   },
  //   onSuccess: () => {
  //     router.push(`/event/${id}/complete`)
  //   },
  // })

  const createOfflineAttest = async (payload: any) => {
    if (!signer) return

    console.log('EAS_ADDRESS', EAS_ADDRESS)
    // Initialize the sdk with the address of the EAS Schema contract address
    const easInstance = new EAS(EAS_ADDRESS as string, { signer })

    // Use eas offchain
    const offchain = await easInstance.getOffchain()

    // Connects an ethers style provider/signingProvider to perform read/write functions.
    easInstance.connect(signer)

    // Initialize SchemaEncoder with the schema string
    const schemaEncoder = new SchemaEncoder(
      'string id,string event_id,string world_proof,string holder_name,string type,string seat_number,uint8 entry_for',
    )
    const encodedData = schemaEncoder.encodeData([
      { name: 'id', value: payload.id, type: 'string' },
      { name: 'event_id', value: payload.eventId, type: 'string' },
      { name: 'world_proof', value: payload.worldProof, type: 'string' },
      { name: 'holder_name', value: payload.holderName, type: 'string' },
      { name: 'type', value: payload.type, type: 'string' },
      { name: 'seat_number', value: payload.seatNumber, type: 'string' },
      { name: 'entry_for', value: payload.entryFor, type: 'uint8' },
    ])

    console.log('SCHEMA_UID', SCHEMA_UID)

    const offchainAttestation = await offchain.signOffchainAttestation(
      {
        recipient: address as `0x${string}`,
        // Unix timestamp of when attestation expires. (0 for no expiration)
        expirationTime: 0n,
        // Unix timestamp of current time
        time: BigInt(Math.floor(Date.now() / 1000)),
        revocable: true, // Be aware that if your schema is not revocable, this MUST be false
        schema: SCHEMA_UID as string,
        refUID: '0x0000000000000000000000000000000000000000000000000000000000000000',
        data: encodedData,
      },
      signer,
    )

    console.log('offchainAttestation', offchainAttestation)
    return offchainAttestation
  }

  const purchaseTicket = async (payload: any) => {
    if (!resolverAddress) return
    await writeContract({
      address: resolverAddress as '0x${string}',
      abi,
      functionName: 'purchase',
      args: [
        payload.eventId,
        payload.seatNumber,
        payload.type,
        payload.worldProof,
        payload.attestationId,
      ],
    })
  }

  useEffect(() => {
    if (!hash) return
    router.push(`/event/${id}/complete`)
  }, [hash, router, id])

  return (
    <Box
      py={4}
      style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 64px)' }}
    >
      <Container maxWidth="lg">
        <Stack
          direction="row"
          alignItems="center"
          gap={2}
          mb={2}
        >
          <IconButton onClick={() => setStep(0)}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h5">Order Summary</Typography>
        </Stack>
        <Stack gap={2}>
          <Typography variant="h6">Event Details</Typography>
          <Stack gap={2}>
            <Stack
              direction="row"
              gap={2}
            >
              <Image
                src={event?.image || ''}
                alt={event?.name || ''}
                width={163}
                height={85}
              />
              <Stack
                direction="column"
                gap={1}
              >
                <Typography
                  fontWeight="bold"
                  variant="body1"
                >
                  {event?.name}
                </Typography>
                <Stack
                  direction="row"
                  gap={1}
                  alignItems="center"
                >
                  <LocationOnIcon fontSize="small" />
                  <Typography
                    variant="body1"
                    component="span"
                  >
                    {event?.location}
                  </Typography>
                </Stack>
                <Stack
                  direction="row"
                  gap={1}
                  alignItems="center"
                >
                  <EventIcon fontSize="small" />
                  <Typography
                    variant="body1"
                    component="span"
                  >
                    {event?.date} &middot; {event?.time}
                  </Typography>
                </Stack>
              </Stack>
            </Stack>
            <Divider />
            {context?.selectedTickets.map((ticket) => (
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                key={ticket.type}
              >
                <Typography variant="body1">Ticket</Typography>
                <Typography variant="body1">
                  {ticket.quantity} x {ticket.price} ({ticket.type})
                </Typography>
              </Stack>
            ))}
            <Divider />
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="body1">Total</Typography>
              <Typography variant="body1">
                {context?.calculateTotalPrice(event?.tickets || [])} ETH
              </Typography>
            </Stack>
          </Stack>
          <Stack
            direction="row"
            justifyContent="flex-end"
          >
            <VerifyWorldId
              label="Pay"
              onSuccess={async (item) => {
                const seatNumber = generateSeatNumber()
                console.log(item)
                const payload = {
                  id: event?.id || '',
                  eventId: event?.id || '',
                  worldProof: item.proof,
                  holderName: ensName || 'Anonymous',
                  type: event?.tickets[0].type || '',
                  seatNumber,
                  entryFor: 1,
                  recipient: address || '',
                }
                console.log(payload)

                const attestation = await createOfflineAttest(payload)
                if (!attestation) return

                await purchaseTicket({ ...payload, attestationId: attestation.uid })
              }}
              onError={console.error}
            />
          </Stack>
          {hash && <Box>Transaction Hash: {hash}</Box>}
        </Stack>
      </Container>
    </Box>
  )
}

export default ConfirmTicket
