'use client'

import {
  ConnectWallet,
  Wallet,
  WalletDropdown,
  WalletDropdownLink,
  WalletDropdownDisconnect,
} from '@coinbase/onchainkit/wallet'
import { Address, Avatar, Name, Identity, EthBalance } from '@coinbase/onchainkit/identity'
import { color } from '@coinbase/onchainkit/theme'
import { Box } from '@mui/material'
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber'

const WalletComponents = () => {
  return (
    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
      <Wallet>
        <ConnectWallet className="rounded">
          <Avatar />
          <Name />
        </ConnectWallet>
        <WalletDropdown>
          <Identity
            className="px-4 pt-3 pb-2"
            hasCopyAddressOnClick
          >
            <Avatar />
            <Name />
            <Address className={color.foregroundMuted} />
            <EthBalance />
          </Identity>
          <WalletDropdownLink
            icon="wallet"
            href="https://wallet.coinbase.com"
          >
            Wallet
          </WalletDropdownLink>
          <WalletDropdownLink
            icon={<ConfirmationNumberIcon />}
            href="/ticket"
          >
            My Ticket
          </WalletDropdownLink>
          <WalletDropdownDisconnect />
        </WalletDropdown>
      </Wallet>
    </Box>
  )
}

export default WalletComponents
