import { EVENTS } from "@/config";

export interface Ticket {
  type: string;
  price: number;
  available_tickets: number;
}

export interface IEvent {
  id: string;
  name: string;
  date: string;
  time: string;
  location: string;
  description: string;
  tickets: {
      type: string;
      price: number;
      available_tickets: number;
  }[];
  categories: string[];
  image_url: string;
}

export function getEventById(id: string) {
  return EVENTS.find(event => event.id === id)
}

export function formatPriceRange(tickets: Ticket[]): string {
  if (!tickets || tickets.length === 0) {
    return '';
  }
  // Sort tickets by price in ascending order
  tickets.sort((a, b) => a.price - b.price);

  // Get the minimum and maximum price
  const minPrice = tickets[0]?.price ?? 0;
  const maxPrice = tickets[tickets.length - 1]?.price ?? 0;

  // Format the price range
  return `${minPrice.toFixed(2)} - ${maxPrice.toFixed(2)}`;
}