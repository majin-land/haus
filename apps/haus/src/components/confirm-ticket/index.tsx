'use client'
import { Box, Button, Container, Divider, IconButton, Stack, Typography } from '@mui/material'
import React, { useContext } from 'react'
import { useParams } from 'next/navigation'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import EventIcon from '@mui/icons-material/Event'
import { getEventById } from '@/utils/helper'
import { TicketContext } from '@/store/ticket'
import { useConnect, useAccount, useEnsName } from 'wagmi'
import { useMutation } from '@tanstack/react-query'
import VerifyWorldId from '../verify-world-id'
import api from '@/services/api'

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
  const { connectors, connect } = useConnect()
  const { address, connector, isConnected } = useAccount()
  const { data: ensName } = useEnsName({ address })
  const { mutateAsync: confirmOrder, isLoading } = useMutation({
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
      return api.post<{ attestation_id: string }>(`/attestation/`, {
        id: '1',
        eventId: 'E12345',
        worldProof: payload.worldProof,
        holderName: 'John Doe',
        type: 'VIP',
        seatNumber: 'A1',
        entryFor: 1,
        recipient: '0xc6A73FEcBE0a36acF4D87C2d0246d7573466E868',
      })
    },
    onSuccess: () => {
      setStep(1)
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
              direction="column"
              gap={1}
            >
              <Typography variant="body1">{event?.name}</Typography>
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
            <Button
              sx={{ width: 120 }}
              onClick={() => {
                connect({ connector: connectors[0] })
              }}
              variant="contained"
              size="large"
            >
              Pay
            </Button>
            <VerifyWorldId
              label="Pay"
              onSuccess={async (item) => {
                // console.log('success', item)
                // connect({ connector: connectors[0] })
                const { data } = await confirmOrder({
                  id: event?.id || '',
                  eventId: event?.id || '',
                  worldProof: item.proof,
                  holderName: ensName || '',
                  type: event?.tickets[0].type || '',
                  seatNumber: generateSeatNumber(),
                  entryFor: 1,
                  recipient: address || '',
                })

                console.log('data', data)
              }}
              onError={console.log}
            />
          </Stack>
        </Stack>
      </Container>
    </Box>
  )
}

export default ConfirmTicket
