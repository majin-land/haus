import * as React from 'react'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'

export default function Hero() {
  return (
    <Paper
      sx={{
        mb: 4,
        height: '464px',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundImage: 'url(hero.png)',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '-48px',
      }}
    >
      <Typography
        variant="h3"
        color="primary"
        fontWeight="bold"
        textAlign="center"
        pt={15}
      >
        Exclusive events, priceless moments
      </Typography>
    </Paper>
  )
}
