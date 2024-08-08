"use client"

import * as React from 'react'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import CardActions from '@mui/material/CardActions'
import { useRouter } from 'next/navigation'

interface FeaturedPostProps {
event: {
    date: string;
    image: string;
    imageLabel: string;
    title: string;
    location: string;
    price: string;
  }
}

export default function Event(props: FeaturedPostProps) {
  const router = useRouter()
  const { event } = props

  const handleClick = () => {
    router.push(`/event/1`)
  }

  return (
    <Grid item md={3}>
      <Card sx={{ minWidth: 285 }}>
        <CardMedia
          component="img"
          height="140"
          image={event.image}
          alt={event.imageLabel}
        />
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={2.5} sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography
                variant="subtitle1"
                textAlign="center"
              >
                {event.date}
              </Typography>
            </Grid>
            <Grid item xs={9.5}>
              <Box>
                <Typography variant="h6">
                  {event.title}
                </Typography>
                <Typography variant="subtitle1">
                  {event.price}
                </Typography>
                <Typography variant="subtitle1">
                  {event.location}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
        <CardActions>
          <Button fullWidth size="small" onClick={handleClick}>Get Ticket</Button>
        </CardActions>
      </Card>
    </Grid>
  )
}