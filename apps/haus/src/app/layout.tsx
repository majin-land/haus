import * as React from 'react'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'

import BaseProvider from '@/components/provider/base'

import theme from '@/theme'
import Header from '@/components/header'
import Footer from '@/components/footer'

const BASE_KEY = process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY || ''

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
          <AppRouterCacheProvider options={{ enableCssLayer: true }}>
            <ThemeProvider theme={theme}>
              <BaseProvider apiKey={BASE_KEY}>
                {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                <CssBaseline />
                <Header />
                {props.children}
                <Footer />
              </BaseProvider>
            </ThemeProvider>
          </AppRouterCacheProvider>
      </body>
    </html>
  )
}