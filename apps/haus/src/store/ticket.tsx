"use client"
import { Ticket } from '@/utils/helper'
import React, { createContext, useState, ReactNode } from 'react'

interface SelectedTicket {
  type: string
  quantity: number
  price: number
}

interface TicketContextType {
  selectedTickets: SelectedTicket[]
  addSelectedTicket: (type: string, quantity: number, price: number) => void
  calculateTotalPrice: (tickets: Ticket[]) => number
}

const TicketContext = createContext<TicketContextType | undefined>(undefined)   

const TicketProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedTickets, setSelectedTickets] = useState<SelectedTicket[]>([])

  const addSelectedTicket = (type: string, quantity: number, price: number) => {
    setSelectedTickets(prev => {
      const existing = prev.find(ticket => ticket.type === type)
      if (existing) {
        return prev.map(ticket =>
          ticket.type === type ? { ...ticket, quantity } : ticket
        )
      } else {
        return [...prev, { type, quantity, price }]
      }
    })
  }

  const calculateTotalPrice = (tickets: Ticket[]): number => {
    const ticketPriceMap = new Map<string, number>()
    tickets.forEach(ticket => {
      ticketPriceMap.set(ticket.type, ticket.price)
    })

    return selectedTickets.reduce((total, selected) => {
      const price = ticketPriceMap.get(selected.type)
      if (price !== undefined) {
        return total + price * selected.quantity
      } else {
        console.error(`Ticket type ${selected.type} not found`)
        return total
      }
    }, 0)
  }

  return (
    <TicketContext.Provider value={{ selectedTickets, addSelectedTicket, calculateTotalPrice }}>
      {children}
    </TicketContext.Provider>
  )
}

export { TicketProvider, TicketContext }
