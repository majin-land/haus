'use client'

import { base } from 'viem/chains'

import { OnchainKitProvider } from '@coinbase/onchainkit'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'; 
import { WagmiProvider } from 'wagmi'; 
import { wagmiConfig } from './wagmi'; 
import '@coinbase/onchainkit/styles.css'

const queryClient = new QueryClient(); 

const BaseProvider = ({ apiKey, children }: { apiKey: string, children: React.ReactNode }) => {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <OnchainKitProvider apiKey={apiKey} chain={base}>
        {children}
        </OnchainKitProvider>
      </QueryClientProvider>
    </WagmiProvider> 
  )

}

export default BaseProvider