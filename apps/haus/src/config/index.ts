export const EVENTS = [
  {
    id: 'event-001',
    name: 'London Music Festival',
    date: 'September 15, 2024',
    time: '18:00',
    location: 'Hyde Park, London',
    description:
      "Experience an evening filled with music performances by top international artists. Enjoy live bands, solo performances, and DJ sets in the heart of London. The festival will feature food and drink stalls offering a variety of cuisines and beverages. Come and join thousands of music lovers for an unforgettable night of entertainment, excitement, and community spirit. Don't miss out on exclusive merchandise and the chance to meet your favorite artists.",
    tickets: [
      {
        type: 'VVIP',
        price: 0.03,
        available_tickets: 100,
      },
      {
        type: 'VIP',
        price: 0.02,
        available_tickets: 500,
      },
      {
        type: 'General',
        price: 0.01,
        available_tickets: 4400,
      },
    ],
    categories: ['Music', 'Festival'],
    image_url: 'https://example.com/images/london-music-festival.jpg',
  },
  {
    id: 'event-002',
    name: 'New York Fashion Week',
    date: 'September 05, 2024',
    time: '09:00',
    location: 'Spring Studios, New York',
    description:
      'Witness the latest fashion trends and designs from world-renowned designers at New York Fashion Week. This prestigious event features runway shows, presentations, and exclusive parties. Gain insights into the future of fashion with seminars and workshops led by industry experts. Network with fashion influencers, designers, and enthusiasts from around the world. Enjoy access to exclusive showrooms and pop-up shops offering the latest collections and limited-edition items. A must-attend event for anyone passionate about fashion and style.',
    tickets: [
      {
        type: 'VVIP',
        price: 0.06,
        available_tickets: 50,
      },
      {
        type: 'VIP',
        price: 0.04,
        available_tickets: 300,
      },
      {
        type: 'General',
        price: 0.03,
        available_tickets: 650,
      },
    ],
    categories: ['Fashion', 'Exhibition'],
    image_url: 'https://example.com/images/ny-fashion-week.jpg',
  },
  {
    id: 'event-003',
    name: 'Tokyo Game Show',
    date: 'September 23, 2024',
    time: '10:00 - 17:00',
    location: 'Makuhari Messe, Chiba',
    description:
      "Join the largest video game expo in Japan, showcasing the latest games and technology. Explore booths from top game developers and publishers, featuring demos of upcoming games and hardware. Participate in panel discussions, live demos, and e-sports tournaments. Meet and interact with game developers, industry professionals, and fellow gamers. Discover the latest trends in gaming, from VR and AR to indie games and mobile apps. Don't miss out on exclusive merchandise and the opportunity to play games before their official release.",
    tickets: [
      {
        type: 'VVIP',
        price: 0.04,
        available_tickets: 200,
      },
      {
        type: 'VIP',
        price: 0.03,
        available_tickets: 2000,
      },
      {
        type: 'General',
        price: 0.01,
        available_tickets: 7800,
      },
    ],
    categories: ['Gaming', 'Exhibition'],
    image_url: 'https://example.com/images/tokyo-game-show.jpg',
  },
  {
    id: 'event-004',
    name: 'Sydney Opera House Tour',
    date: 'October 01, 2024',
    time: '09:00 - 16:00',
    location: 'Sydney Opera House, Sydney',
    description:
      "Explore the iconic Sydney Opera House with a guided tour that takes you behind the scenes. Learn about the history, architecture, and stories that make this landmark so special. The tour includes access to exclusive areas not open to the general public. Enjoy breathtaking views of Sydney Harbour and take advantage of photo opportunities at one of the most photographed buildings in the world. Ideal for architecture enthusiasts, history buffs, and anyone looking to learn more about one of Australia's most famous landmarks.",
    tickets: [
      {
        type: 'VVIP',
        price: 0.05,
        available_tickets: 20,
      },
      {
        type: 'VIP',
        price: 0.04,
        available_tickets: 80,
      },
      {
        type: 'General',
        price: 0.02,
        available_tickets: 100,
      },
    ],
    categories: ['Tour', 'Cultural'],
    image_url: 'https://example.com/images/sydney-opera-house-tour.jpg',
  },
  {
    id: 'event-005',
    name: 'Berlin Film Festival',
    date: 'October 20, 2024',
    time: '10:00',
    location: 'Berlinale Palast, Berlin',
    description:
      "Attend the prestigious Berlin Film Festival and watch screenings of the latest films from around the world. The festival features a diverse lineup of films, including feature films, documentaries, and short films. Participate in Q&A sessions with directors, actors, and producers. Enjoy panel discussions and workshops on various aspects of filmmaking. Network with industry professionals and fellow film enthusiasts. Experience the vibrant atmosphere of one of the world's leading film festivals and celebrate the art of cinema.",
    tickets: [
      {
        type: 'VVIP',
        price: 0.04,
        available_tickets: 100,
      },
      {
        type: 'VIP',
        price: 0.03,
        available_tickets: 900,
      },
      {
        type: 'General',
        price: 0.02,
        available_tickets: 2000,
      },
    ],
    categories: ['Film', 'Festival'],
    image_url: 'https://example.com/images/berlin-film-festival.jpg',
  },
]

export const EAS_ADDRESS = process.env.EAS_CONTRACT_ADDRESS
export const SCHEMA_UID = process.env.SCHEMA_UID
export const PRIVATE_KEY = process.env.WALLET_PRIVATE_KEY
export const PROVIDER = process.env.EAS_PROVIDER_URL || 'https://sepolia.optimism.io'
