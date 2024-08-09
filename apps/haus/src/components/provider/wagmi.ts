import { http, createConfig } from 'wagmi'
import { optimismSepolia } from 'wagmi/chains'
import { coinbaseWallet } from 'wagmi/connectors'

export const wagmiConfig = createConfig({
  chains: [optimismSepolia],
  multiInjectedProviderDiscovery: false,
  connectors: [
    coinbaseWallet({
      appName: 'Haus',
      preference: 'smartWalletOnly', // set this to `all` to use EOAs as well
      version: '4',
    }),
  ],
  ssr: true,
  transports: {
    [optimismSepolia.id]: http(),
  },
})
