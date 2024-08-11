import React from 'react'
import { Box, Link, Typography } from '@mui/material'
import Image from 'next/image'

const ComplateTicket: React.FC = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      minHeight="calc(100vh - 64px)"
      textAlign="center"
    >
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        border="2px solid #3f51b5"
        borderRadius="8px"
        padding="8px 16px"
        marginBottom="24px"
      >
        <Typography
          variant="h4"
          component="h1"
          color="primary"
        >
          Completed!
        </Typography>
      </Box>

      <Image
        src="/success.png"
        alt="Successful Ticket"
        width={400}
        height={400}
        style={{ marginBottom: '24px' }}
      />

      <Typography
        variant="h6"
        component="p"
        gutterBottom
      >
        Check your ticket <Link href="/ticket">here</Link>
      </Typography>
    </Box>
  )
}

export default ComplateTicket
