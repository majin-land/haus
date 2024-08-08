"use client"
import React from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import EventIcon from '@mui/icons-material/Event'

import Container from '@mui/material/Container'
import { Box, Button, Card, CardContent, Divider, Grid, IconButton, MenuItem, Select, SelectChangeEvent, Stack, Typography } from '@mui/material'
import { useRouter } from 'next/navigation'

const EventDetails = () => {
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
            Drive In Senja: Back to the Future
          </Typography>
          <Stack direction="row" gap={1} alignItems="center">
            <LocationOnIcon fontSize="small" />
            <Typography variant="body1" component="span">
              Parkiran Utama Mall @ Alam Sutera
            </Typography>
          </Stack>
          <Stack direction="row" gap={1} alignItems="center">
            <EventIcon fontSize="small" />
            <Typography variant="body1" component="span">
              September 22, 2021 &middot; 20.00 - 21.56 WIB
            </Typography>
          </Stack>
          <Typography variant="body1">
            Marty travels back in time using an eccentric scientist is time machine. However, he must make his high-school-aged parents fall in love in order to return to the present.
          </Typography>
        </Stack>
      </Stack>
    </Box>
  )
}

const TypeTicket = () => {
  const [seat, setSeat] = React.useState('')

  const handleChange = (event: SelectChangeEvent) => {
    setSeat(event.target.value)
  }

  return (
    <Grid item md={3}>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Stack direction="row" justifyContent="space-between" alignItems="center" gap={3}>
            <Stack>
              <Typography variant="h6">
                General
              </Typography>
              <Typography variant="body1">
                $100
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
            </Select>
          </Stack>
        </CardContent>
      </Card>
    </Grid>
  )
}

const Footer = () => {
  const router = useRouter()

  const handleClick = () => {
    router.push(`/event/1/confirm`)
  }

  return (
    <Box component="footer" sx={{  backgroundColor: '#7F7DF3', p: '10px', mt: 'auto' }}>
      <Container maxWidth="lg">
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Stack direction="row" alignItems="center" gap={6}>
            <Typography variant="subtitle1" color="white">Total Price :</Typography>
            <Typography variant="h6" color="white">$100</Typography>
          </Stack>
          <Button onClick={handleClick} variant="contained" size="large">
            Buy Tickets
          </Button>
        </Stack>
      </Container>
    </Box>
  )
}

function TicketOptions() {
  return (
    <Box style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 64px)' }}>
      <Container
        maxWidth="lg"
      > 
        <EventDetails />
        <Divider />
        <Grid pt={4} container spacing={4}>
          <TypeTicket />
        </Grid>
      </Container>
      <Footer />
    </Box>
  )
}

export default TicketOptions