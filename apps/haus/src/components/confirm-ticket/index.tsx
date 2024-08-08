"use client"
import { Box, Button, Container, Divider, IconButton, Stack, Typography } from '@mui/material'
import React, { useContext } from 'react'
import { useParams, useRouter } from 'next/navigation'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import EventIcon from '@mui/icons-material/Event'
import { getEventById } from '@/utils/helper'
import { TicketContext } from '@/store/ticket'

function ConfirmTicket() {
  const { id } = useParams<{ id: string }>()
  const event = getEventById(id)
  const router = useRouter()
  const context = useContext(TicketContext)

  return (
    <Box py={4} style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 64px)' }}>
      <Container
        maxWidth="lg"
      > 
        <Stack direction="row" alignItems="center" gap={2} mb={2}>
          <IconButton onClick={() => router.back()}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h5">
            Order Summary
          </Typography>
        </Stack>
        <Stack gap={2}>
          <Typography variant="h6">
            Event Details
          </Typography>
          <Stack gap={2}>
            <Stack direction="column" gap={1}>
              <Typography variant="body1">
                {event?.name}
              </Typography>
              <Stack direction="row" gap={1} alignItems="center">
                <LocationOnIcon fontSize="small" />
                <Typography variant="body1" component="span">
                  {event?.location}
                </Typography>
              </Stack>
              <Stack direction="row" gap={1} alignItems="center">
                <EventIcon fontSize="small" />
                <Typography variant="body1" component="span">
                  {event?.date} &middot; {event?.time}
                </Typography>
              </Stack>
            </Stack>
            <Divider />
            {context?.selectedTickets.map((ticket) => (
              <Stack direction="row" justifyContent="space-between" alignItems="center" key={ticket.type}>
                <Typography variant="body1">
                  Ticket
                </Typography>
                <Typography variant="body1">
                  {ticket.quantity} x {ticket.price} ({ticket.type})
                </Typography>
              </Stack>
            ))}
            <Divider />
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography variant="body1">
                Total
              </Typography>
              <Typography variant="body1">
                {context?.calculateTotalPrice(event?.tickets || [])} ETH
              </Typography>
            </Stack>
          </Stack>
          <Stack direction="row" justifyContent="flex-end">
            <Button
              sx={{ width: 120 }}
              onClick={() => router.push(`/event/${id}/complate`)}
              variant="contained"
              size="large"
            > 
              Pay
            </Button>
          </Stack>
        </Stack>
      </Container>
    </Box>
  )
}

export default ConfirmTicket