import * as React from 'react'
import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'

import Hero from '@/components/hero'
import Event from '@/components/event'
import Footer from '@/components/footer'

import { EVENTS } from '@/config'

export default function Home() {
  return (
    <>
      <Hero />
      <Container
        maxWidth="lg"
      > 
        <Typography variant="h4" mb={2}>
          Events
        </Typography>
        <Grid container spacing={4}>
          {EVENTS.map((event) => (
            <Event key={event.id} event={event} />
          ))}
        </Grid>
      </Container>
      <Footer />
    </>
  )
}
