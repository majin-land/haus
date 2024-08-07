import * as React from 'react'
import Toolbar from '@mui/material/Toolbar'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { Stack } from '@mui/material'

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
          <Button variant="outlined" size="medium">
            Login
          </Button>
          <Button variant="contained" size="medium">
            Sign up
          </Button>
        </Stack>
      </Container>
    </Toolbar>
  )
}