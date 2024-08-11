'use client'

import React, { useContext, useEffect, useState } from 'react'
import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation'
import { useAccount, useWriteContract, useEnsName } from 'wagmi'
import { parseEther } from 'viem'
// import { EAS, SchemaEncoder } from '@ethereum-attestation-service/eas-sdk'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import IconButton from '@mui/material/IconButton'
import Divider from '@mui/material/Divider'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import EventIcon from '@mui/icons-material/Event'
import { useMutation } from '@tanstack/react-query'

import { getEventById } from '@/utils/helper'
import { TicketContext } from '@/store/ticket'
import api from '@/services/api'
import { abi } from '@/abi/purchase-ticket'

import VerifyWorldId from '../verify-world-id'
import { LoadingPage } from '../loading-page'
// import { useEthersSigner } from '@/utils/ethers'

// const chainId = process.env.NEXT_PUBLIC_CHAIN_ID || 11155420

const purchaseAddress = process.env.NEXT_PUBLIC_PURCHASE_TICKET
// const resolverAddress = process.env.NEXT_PUBLIC_RESOLVER_ADDRESS
// const EAS_ADDRESS = process.env.NEXT_PUBLIC_EAS_CONTRACT_ADDRESS
// const SCHEMA_UID = process.env.NEXT_PUBLIC_SCHEMA_TICKET_UID
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

  // const signer = useEthersSigner()
  // const { connectors, connect } = useConnect()
  // const { address, connector, isConnected } = useAccount()

  const [payload, setPayload] = useState<any>(null)

  const { address } = useAccount()
  const { data: ensName } = useEnsName({ address })

  const { data: hash, writeContract } = useWriteContract()

  const router = useRouter()

  const { mutateAsync: confirmOrder, isPending } = useMutation({
    mutationFn: (payload: {
      id: string
      eventId: string
      worldProof: string
      holderName: string
      type: string
      seatNumber: string
      entryFor: number
      recipient: string
    }) => {
      return api.post<{ attestation_id: string }>(`/attestation/`, payload)
    },
    onSuccess: () => {
      router.push(`/event/${id}/complete`)
    },
  })

  const purchaseTicket = async (payload: any) => {
    try {
      if (!purchaseAddress) return
      await writeContract({
        address: purchaseAddress as '0x${string}',
        abi,
        functionName: 'purchase',
        args: [payload.eventId, payload.seatNumber, payload.type, payload.worldProof],
        value: parseEther(String(payload.price)),
      })
    } catch (error) {
      console.error(error)
    }
  }

  const generateAttestation = async () => {
    await confirmOrder(payload)
    router.push(`/event/${id}/complete`)
  }

  const triggerFlow = async (item: any) => {
    const seatNumber = generateSeatNumber()
    const payload = {
      id: event?.id || '',
      eventId: event?.id || '',
      worldProof: item.proof,
      holderName: ensName || 'Anonymous',
      type: event?.tickets[0].type || '',
      price: event?.tickets[0].price || 0,
      seatNumber,
      entryFor: 1,
      recipient: address || '',
    }
    setPayload(payload)

    await purchaseTicket({ ...payload })
  }

  useEffect(() => {
    if (!hash) return
    generateAttestation()
  }, [hash])

  if (isPending) return <LoadingPage />

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
                await triggerFlow(item)
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
