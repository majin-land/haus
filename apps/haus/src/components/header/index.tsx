import * as React from 'react'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { Stack } from '@mui/material'
import Login from '../login'
import Wallet from '../wallet'

export default function Header() {

  return (
    <Toolbar sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <Container
        maxWidth="lg"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      > 
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          noWrap
          sx={{ flex: 1 }}
        >
          Haus
        </Typography>
        <Stack gap={2} direction="row" alignItems="center">
          <Wallet />
        </Stack>
      </Container>
    </Toolbar>
  )
}