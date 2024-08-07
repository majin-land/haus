"use client"
import { Alert, Box, Button, Container, Divider, IconButton, Stack, TextField, Typography } from '@mui/material'
import React from 'react'
import { useRouter } from 'next/navigation'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

function ConfirmTicket() {
  const router = useRouter()

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
            Contact Information
          </Typography>
        </Stack>
        <Stack direction="row" divider={<Divider orientation="vertical" flexItem />} spacing={2}>
          <Stack>
            <Alert severity="info">
              E-tickets will be sent to your email address, please make sure your email address is correct.
            </Alert>
            <Stack py={4} gap={2}>
              <Stack direction="row" spacing={2}>
                <TextField
                  required
                  fullWidth
                  size="small"
                  placeholder="First Name"
                />
                <TextField
                  required
                  fullWidth
                  size="small"
                  placeholder="Last Name"
                />
              </Stack>
              <Stack direction="row" spacing={2}>
                <TextField
                  required
                  fullWidth
                  size="small"
                  placeholder="Email"
                />
                <TextField
                  required
                  fullWidth
                  size="small"
                  placeholder="Phone Number"
                />
              </Stack>
            </Stack>
            <Stack direction="row" justifyContent="flex-end">
              <Button
                sx={{ width: 120 }}
                onClick={() => console.log('press')}
                variant="contained"
                size="large"
              > 
                Pay
              </Button>
            </Stack>
          </Stack>
          <Stack gap={2} width="40%">
            <Typography variant="h6">
              Event Details
            </Typography>
            <Stack gap={2}>
              <Stack direction="column">
                <Typography variant="body1">
                  Drive In Senja: Back to the Future
                </Typography>
                <Typography variant="body1">
                  Parkiran Utama Mall @ Alam Sutera
                </Typography>
                <Typography variant="body1">
                  September 22, 2021 · 20.00 - 21.56 WIB
                </Typography>
              </Stack>
              <Divider />
              <Typography variant="h6">
                Order Summary
              </Typography>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="body1">
                  Ticket Type
                </Typography>
                <Typography variant="body1">
                  2 x General
                </Typography>
              </Stack>
              <Divider />
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="body1">
                  Ticket Price
                </Typography>
                <Typography variant="body1">
                  2 x $200
                </Typography>
              </Stack>
              <Divider />
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="body1">
                  Total
                </Typography>
                <Typography variant="body1">
                  $400
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Container>
    </Box>
  )
}

export default ConfirmTicket