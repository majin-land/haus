"use client"
import Box from '@mui/material/Box'
import React, { useState } from 'react'

import ConfirmTicket from '../confirm-ticket'
import TicketOptions from '../ticket-options'

function BookingEventPage() {
  const [step, setStep] = useState(0)

  return (
    <Box>
      {step === 0 && <TicketOptions setStep={setStep} />}
      {step === 1 && <ConfirmTicket setStep={setStep} />}
    </Box>
  )
}

export default BookingEventPage