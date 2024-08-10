'use client'

import * as React from 'react'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import CardActions from '@mui/material/CardActions'
import { useRouter } from 'next/navigation'
import { CardMedia, Stack, Tooltip } from '@mui/material'
import { useAccount, useConnect } from 'wagmi'

import LocationOnIcon from '@mui/icons-material/LocationOn'
import EventIcon from '@mui/icons-material/Event'
import PaymentIcon from '@mui/icons-material/Payment'
import { IEvent, formatPriceRange } from '@/utils/helper'

import { connectorCoinBaseWallet } from '../provider/wagmi'

interface EventProps {
  event: IEvent
}

export default function Event(props: EventProps) {
  const router = useRouter()
  const { address } = useAccount()
  const { connect } = useConnect()
  const { event } = props

  const handleClick = () => {
    if (address) {
      router.push(`/event/${event.id}`)
      return
    }

    connect({ connector: connectorCoinBaseWallet })
  }

  return (
    <Grid
      item
      md={3}
    >
      <Card sx={{ minWidth: 285 }}>
        <CardMedia
          component="img"
          alt={event.image}
          sx={{ height: 184 }}
          image={event.image}
        />
        <CardContent>
          <Stack spacing={1}>
            <Tooltip title={event.name}>
              <Typography
                fontWeight="bold"
                variant="body1"
                sx={{
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {event.name}
              </Typography>
            </Tooltip>
            <Stack
              direction="row"
              gap={1}
              alignItems="center"
            >
              <PaymentIcon fontSize="small" />
              <Typography
                variant="body2"
                component="span"
              >
                {formatPriceRange(event.tickets)} ETH
              </Typography>
            </Stack>
            <Tooltip title={event.location}>
              <Stack
                direction="row"
                gap={1}
                alignItems="center"
              >
                <LocationOnIcon fontSize="small" />
                <Typography
                  variant="body2"
                  component="span"
                  sx={{
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {event.location}
                </Typography>
              </Stack>
            </Tooltip>
            <Stack
              direction="row"
              gap={1}
              alignItems="center"
            >
              <EventIcon fontSize="small" />
              <Typography
                variant="body2"
                component="span"
              >
                {event.date} &middot; {event.time}
              </Typography>
            </Stack>
          </Stack>
        </CardContent>
        <CardActions>
          <Button
            fullWidth
            size="medium"
            variant="outlined"
            onClick={handleClick}
          >
            Get Ticket
          </Button>
        </CardActions>
      </Card>
    </Grid>
  )
}
