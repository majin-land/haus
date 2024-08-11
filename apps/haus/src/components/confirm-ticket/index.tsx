'use client'

import React, { useContext } from 'react'
import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation'
import { useAccount, useEnsName } from 'wagmi'
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
import VerifyWorldId from '../verify-world-id'

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
  // const { connectors, connect } = useConnect()
  // const { address, connector, isConnected } = useAccount()
  const { address } = useAccount()
  const { data: ensName } = useEnsName({ address })
  const router = useRouter()
  const { mutateAsync: confirmOrder } = useMutation({
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
                // console.log('success', item)
                console.log({
                  id: event?.id || '',
                  eventId: event?.id || '',
                  worldProof: item.proof,
                  holderName: ensName || '',
                  type: event?.tickets[0].type || '',
                  seatNumber: generateSeatNumber(),
                  entryFor: 1,
                  recipient: address || '',
                })
                // connect({ connector: connectors[0] })
                const { data } = await confirmOrder({
                  id: event?.id || '',
                  eventId: event?.id || '',
                  worldProof: item.proof,
                  holderName: ensName || address || '',
                  type: event?.tickets[0].type || '',
                  seatNumber: generateSeatNumber(),
                  entryFor: 1,
                  recipient: address || '',
                })

                console.log('attestation_id: ', data?.attestation_id)
              }}
              onError={console.error}
            />
          </Stack>
        </Stack>
      </Container>
    </Box>
  )
}

export default ConfirmTicket
