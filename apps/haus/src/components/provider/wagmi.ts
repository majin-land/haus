import { http, createConfig } from 'wagmi'
import { optimismSepolia } from 'wagmi/chains'
import { coinbaseWallet } from 'wagmi/connectors'

export const connectorCoinBaseWallet = coinbaseWallet({
  appName: 'Haus',
  preference: 'all', // set this to `all` to use EOAs as well
  version: '4',
})

export const wagmiConfig = createConfig({
  chains: [optimismSepolia],
  multiInjectedProviderDiscovery: false,
  connectors: [connectorCoinBaseWallet],
  ssr: true,
  transports: {
    [optimismSepolia.id]: http(),
  },
})
