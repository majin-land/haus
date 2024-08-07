import * as React from 'react'
import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'

import Hero from '@/components/hero'
import Event from '@/components/event'
import Footer from '@/components/footer'
import { Box } from '@mui/material'

const events = [
  {
    title: 'Featured post',
    date: 'Nov 12',
    price: '$100 - $200',
    description:
      'This is a wider card with supporting text below as a natural lead-in to additional content.',
    image: 'https://picsum.photos/200/200',
    imageLabel: 'Image Text',
    location: 'San Francisco, CA',
  },
  {
    title: 'Post title',
    date: 'Nov 11',
    price: '$100 - $200',
    description:
      'This is a wider card with supporting text below as a natural lead-in to additional content.',
    image: 'https://picsum.photos/200/300',
    imageLabel: 'Image Text',
    location: 'San Francisco, CA',
  },
];

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
          {events.map((event) => (
            <Event key={event.title} event={event} />
          ))}
        </Grid>
      </Container>
      <Footer />
    </>
  )
}