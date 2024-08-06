import * as React from 'react'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'

export default function Footer() {

  return (
    <Box component="footer" sx={{ bgcolor: 'background.paper', py: 6 }}>
      <Container maxWidth="lg">
				<Typography variant="body2" color="text.secondary" align="right">
					© {new Date().getFullYear()} Haus incorporated
				</Typography>
      </Container>
    </Box>
  )
}