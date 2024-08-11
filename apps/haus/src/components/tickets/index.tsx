'use client'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid } from '@mui/material'
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

const events = [
  {
    name: 'Verifiable Summit @ ETH Warsaw 2024',
    date: 'Sep 4 2024',
    time: '2:30 PM - 10:30 PM',
    location: 'National Library, al. Niepodległości 213, Warsaw, Poland',
  },
]

function Tickets() {
  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
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
        {events.map((event, index) => (
          <Grid
            item
            xs={12}
            md={6}
            key={index}
          >
            <Box sx={styles.containerTicket}>
              {/* Right Section */}
              <Box sx={styles.rigthSection}>
                <Stack
                  direction="column"
                  height="100%"
                  justifyContent="center"
                >
                  <Typography variant="h2">23</Typography>
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
                    {event.name}
                  </Typography>
                  <Box sx={styles.boxDate}>
                    <CalendarTodayIcon sx={styles.icon} />
                    <Typography sx={styles.text}>
                      {event.date} <br /> {event.time}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex' }}>
                    <LocationOnIcon sx={styles.icon} />
                    <Typography sx={styles.text}>{event.location}</Typography>
                  </Box>
                </Box>
                <Button
                  variant="contained"
                  sx={styles.buttonTicket}
                  onClick={handleClickOpen}
                >
                  Ticket
                </Button>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
      <DialogTicket
        open={open}
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
  text: { color: '#888', letterSpacing: '1px' },
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
