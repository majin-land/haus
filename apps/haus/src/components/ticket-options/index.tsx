"use client"
import React, { useContext } from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import EventIcon from '@mui/icons-material/Event'

import Container from '@mui/material/Container'
import { Box, Button, Card, CardContent, Divider, Grid, IconButton, MenuItem, Select, SelectChangeEvent, Stack, Typography } from '@mui/material'
import { useParams, useRouter } from 'next/navigation'
import { getEventById, IEvent, Ticket } from '@/utils/helper'
import { TicketContext } from '@/store/ticket'

const EventDetails = ({ event }: { event: IEvent | undefined }) => {
  const router = useRouter()

  return (
    <Box py={4}>
      <Stack direction="row" alignItems="center" gap={2} mb={2}>
        <IconButton onClick={() => router.back()}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h5">
          Ticket Options
        </Typography>
      </Stack>
      <Stack spacing={1}>
        <Stack spacing={1}>
          <Typography variant="h6">
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
          <Typography variant="body1">
            {event?.description}
          </Typography>
        </Stack>
      </Stack>
    </Box>
  )
}

const TypeTicket = ({ ticket }: { ticket: Ticket }) => {
  const context = useContext(TicketContext)
  const [seat, setSeat] = React.useState('')

  const handleChange = (event: SelectChangeEvent) => {
    context?.addSelectedTicket(ticket.type, Number(event.target.value), ticket.price)
    setSeat(event.target.value)
  }

  return (
    <Grid item md={3}>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Stack direction="row" justifyContent="space-between" alignItems="center" gap={3}>
            <Stack>
              <Typography variant="h6">
                {ticket.type}
              </Typography>
              <Typography variant="body1">
                {ticket.price} ETH
              </Typography>
            </Stack>
            <Select
              value={seat}
              displayEmpty
              onChange={handleChange}
              sx={{ height: 32 }}
            >
              <MenuItem value="">0</MenuItem>
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={4}>4</MenuItem>
              <MenuItem value={5}>5</MenuItem>
            </Select>
          </Stack>
        </CardContent>
      </Card>
    </Grid>
  )
}

const Footer = ({ totalPrice, setStep }: { totalPrice: number, setStep: (step: number) => void }) => {

  const handleClick = () => {
    setStep(1)
  }

  return (
    <Box component="footer" sx={{  backgroundColor: '#7F7DF3', p: '10px', mt: 'auto' }}>
      <Container maxWidth="lg">
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Stack direction="row" alignItems="center" gap={6}>
            <Typography variant="subtitle1" color="white">Total Price :</Typography>
            <Typography variant="h6" color="white">{totalPrice} ETH</Typography>
          </Stack>
          <Button
            onClick={handleClick}
            variant="contained"
            size="large"
            disabled={totalPrice === 0}
          >
            Buy Tickets
          </Button>
        </Stack>
      </Container>
    </Box>
  )
}

function TicketOptions({ setStep }: { setStep: (step: number) => void }) {
  const { id } = useParams<{ id: string }>()
  const event = getEventById(id)
  const context = useContext(TicketContext)

  return (
    <Box style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 64px)' }}>
      <Container
        maxWidth="lg"
      > 
        <EventDetails event={event} />
        <Divider />
        <Grid pt={4} container spacing={4}>
          {event?.tickets.map((ticket) => (
            <TypeTicket key={ticket.type} ticket={ticket} />
          ))}
        </Grid>
      </Container>
      <Footer
        setStep={setStep}
        totalPrice={context?.calculateTotalPrice(event?.tickets || []) || 0}
      />
    </Box>
  )
}

export default TicketOptions