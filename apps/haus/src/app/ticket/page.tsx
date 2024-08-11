'use client'
import { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'

import Tickets from '@/components/tickets'
import { LoadingPage } from '@/components/loading-page'

function TicketPage() {
  const { address } = useAccount()
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        const response = await fetch(`/api/attestation?recipient=${address}`)
        const result = await response.json()
        setData(result)
      } catch (error) {
        console.error('Error fetching attestations:', error)
      } finally {
        setLoading(false)
      }
    }

    if (address) {
      fetchData()
    }
  }, [address])

  if (loading) return <LoadingPage />

  return (
    <>
      <Tickets attestations={data ? data.data.attestations : []} />
    </>
  )
}

export default TicketPage
