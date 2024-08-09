'use client'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Stack from '@mui/material/Stack'
import CardContent from '@mui/material/CardContent'
import CardActionArea from '@mui/material/CardActionArea'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import EventIcon from '@mui/icons-material/Event'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'
import React from 'react'
import QRCode from 'react-qr-code'

const DialogTicket = ({ handleClose, open }: { handleClose: () => void; open: boolean }) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
    >
      <DialogTitle>Drive In Senja: Back to the Future</DialogTitle>
      <DialogContent>
        <Stack
          alignItems="center"
          spacing={1}
        >
          <QRCode value="hey" />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleClose}
          autoFocus
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  )
}

function Tickets() {
  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Box style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 64px)' }}>
      <Container maxWidth="lg">
        <Box py={4}>
          <Typography variant="h5">My Tickets</Typography>
          <Box py={2}>
            <Card>
              <CardActionArea onClick={handleClickOpen}>
                <CardContent>
                  <Stack spacing={1}>
                    <Typography variant="h6">Drive In Senja: Back to the Future</Typography>
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
                        Parkiran Utama Mall @ Alam Sutera
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
                        September 22, 2021 &middot; 20.00 - 21.56 WIB
                      </Typography>
                    </Stack>
                  </Stack>
                </CardContent>
              </CardActionArea>
            </Card>
          </Box>
        </Box>
      </Container>
      <DialogTicket
        open={open}
        handleClose={handleClose}
      />
    </Box>
  )
}

export default Tickets
