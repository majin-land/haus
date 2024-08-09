import React from 'react'
import Link from 'next/link'
import { Box, Typography, Grid } from '@mui/material'
import EmailIcon from '@mui/icons-material/Email'
import PhoneIcon from '@mui/icons-material/Phone'

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

      <img
        src="/success.png"
        alt="Completed Illustration"
        style={{ marginBottom: '24px' }}
      />

      <Typography
        variant="h6"
        component="p"
        gutterBottom
      >
        Check your ticket <Link href="#">here</Link>
      </Typography>

      <Typography
        variant="body1"
        component="p"
        gutterBottom
      >
        Having trouble receiving the tickets?
      </Typography>

      <Grid
        container
        spacing={2}
        justifyContent="center"
      >
        <Grid item>
          <Box
            display="flex"
            alignItems="center"
          >
            <PhoneIcon color="primary" />
            <Typography
              variant="body1"
              component="span"
              marginLeft="8px"
            >
              +62 21 1234 9876
            </Typography>
          </Box>
        </Grid>
        <Grid item>
          <Box
            display="flex"
            alignItems="center"
          >
            <EmailIcon color="primary" />
            <Typography
              variant="body1"
              component="span"
              marginLeft="8px"
            >
              haus@team.com
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}

export default ComplateTicket
