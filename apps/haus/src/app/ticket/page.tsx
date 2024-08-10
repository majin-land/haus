'use client'
import { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'
import Tickets from '@/components/tickets'

function TicketPage() {
  const { address } = useAccount()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)

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
  }, [])

  if (loading) return <>Loading...</>
  return (
    <>
      <Tickets />
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </>
  )
}

export default TicketPage
