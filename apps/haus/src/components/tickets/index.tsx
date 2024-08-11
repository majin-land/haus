'use client'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
} from '@mui/material'
import React, { useState } from 'react'
import QRCode from 'react-qr-code'
import { EVENTS } from '@/config/events'

const DialogTicket = ({ handleClose, selected }: { handleClose: () => void; selected: any }) => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<any>(null)

  const handleScan = async () => {
    if (!selected || !selected.attestation) return
    try {
      setLoading(true)
      const response = await fetch(`/api/attestation/${selected.attestation.id}`)
      const result = await response.json()
      setData(result)
      console.log(result)
    } catch (error) {
      console.error('Error verifying attestations:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog
      open={!!selected}
      onClose={handleClose}
    >
      <DialogTitle>{selected && selected.event ? selected.event.name : '-'}</DialogTitle>
      <DialogContent>
        <Stack
          alignItems="center"
          spacing={1}
        >
          {selected && selected.attestation && (
            <>
              {loading ? (
                <CircularProgress />
              ) : (
                <QRCode
                  value={`http://localhost:3000/api/attestation/${selected.attestation.id}`}
                />
              )}
              <Button onClick={handleScan}>Scan</Button>
            </>
          )}
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

const Ticket = ({ attestation, handleClickOpen }: any) => {
  const { decodedDataJson } = attestation
  console.log('decodedDataJson', decodedDataJson)
  const data = JSON.parse(decodedDataJson)
  const eventId = data.find((v: any) => v.name == 'event_id').value.value
  const seatNumber = data.find((v: any) => v.name == 'seat_number').value.value
  const event = EVENTS.find((e: any) => e.id == eventId)
  return (
    <Grid
      item
      xs={12}
      md={6}
      key={attestation.id}
    >
      <Box sx={styles.containerTicket}>
        {/* Right Section */}
        <Box sx={styles.rigthSection}>
          <Stack
            direction="column"
            height="100%"
            justifyContent="center"
          >
            <Typography variant="h3">{seatNumber}</Typography>
            <Typography variant="h6">Seat</Typography>
          </Stack>
          <Box sx={styles.roundedTop} />
          <Box sx={styles.roundedBottom} />
        </Box>

        {/* Left Section */}
        <Box sx={styles.leftSection}>
          <Box>
            <Typography
              variant="h6"
              mb={1}
            >
              {event ? event.name : '-'}
            </Typography>
            <Box sx={styles.boxDate}>
              <CalendarTodayIcon sx={styles.icon} />
              {event ? (
                <Box>
                  <Box>
                    <Typography sx={styles.text}>{event.date}</Typography>
                  </Box>
                  <Box>
                    <Typography sx={styles.text}>{event.time}</Typography>
                  </Box>
                </Box>
              ) : null}
            </Box>
            <Box sx={{ display: 'flex' }}>
              <LocationOnIcon sx={styles.icon} />
              <Typography sx={styles.text}>{event ? event.location : '-'}</Typography>
            </Box>
          </Box>
          <Button
            variant="contained"
            sx={styles.buttonTicket}
            onClick={() => {
              handleClickOpen({ attestation, event })
            }}
          >
            Ticket
          </Button>
        </Box>
      </Box>
    </Grid>
  )
}

function Tickets({ attestations }: any) {
  const [selected, setSelected] = React.useState(null)
  console.log('attestations', attestations)

  const handleClickOpen = (attestation: any) => {
    setSelected(attestation)
  }

  const handleClose = () => {
    setSelected(null)
  }

  return (
    <Container maxWidth="lg">
      <Typography
        variant="h4"
        sx={{
          pt: 2,
          mb: 4,
        }}
      >
        My Tickets
      </Typography>

      <Grid
        container
        spacing={4}
      >
        {attestations &&
          attestations.map((attestation: any) => (
            <Ticket
              key={attestation.id}
              attestation={attestation}
              handleClickOpen={handleClickOpen}
            />
          ))}
      </Grid>
      <DialogTicket
        selected={selected}
        handleClose={handleClose}
      />
    </Container>
  )
}

const styles = {
  containerTicket: {
    backgroundColor: '#DADAFB',
    display: 'flex',
    p: 3,
    position: 'relative',
    height: '100%',
    borderRadius: '10px',
  },
  icon: { fontSize: '20px', color: '#666', mr: 1, mt: 0.5 },
  text: { color: '#444', letterSpacing: '1px' },
  leftSection: {
    width: '75%',
    pl: 3,
    borderLeft: '3px dotted #999',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  boxDate: { display: 'flex', mb: 1 },
  buttonTicket: { mt: 2, alignSelf: 'flex-end' },
  rigthSection: { width: '25%', textAlign: 'center', position: 'relative' },
  roundedTop: {
    position: 'absolute',
    top: '-35px',
    right: '-16px',
    p: '16px',
    backgroundColor: 'white',
    borderRadius: '50%',
  },
  roundedBottom: {
    position: 'absolute',
    bottom: '-35px',
    right: '-16px',
    p: '16px',
    backgroundColor: 'white',
    borderRadius: '50%',
  },
}

export default Tickets
