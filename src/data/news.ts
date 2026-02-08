export interface NewsArticle {
  id: number
  title: string
  excerpt: string
  category: 'mercato' | 'match' | 'lifestyle' | 'team'
  date: string
  image?: string
}

export const news: NewsArticle[] = [
  {
    id: 1,
    title: 'Colpo di Mercato: BigBro punta in alto',
    excerpt: 'La dirigenza lavora per rinforzare il roster in vista della seconda fase della Kings League Italia. Nuovi innesti all\'orizzonte.',
    category: 'mercato',
    date: '5 Feb 2025',
  },
  {
    id: 2,
    title: 'Match Day: BigBro domina il derby',
    excerpt: 'Prestazione maiuscola della squadra di Coach Fracci. Moscardelli devastante, doppietta e assist. Il Gobbo ruggisce.',
    category: 'match',
    date: '2 Feb 2025',
  },
  {
    id: 3,
    title: 'Moonryde: "Vogliamo la finale"',
    excerpt: 'Il presidente BigBro FC alza l\'asticella. "Questa squadra ha fame, il nostro obiettivo è chiaro: arrivare fino in fondo."',
    category: 'lifestyle',
    date: '30 Gen 2025',
  },
  {
    id: 4,
    title: 'La Tatttica di Fracci: il 3-1-2 letale',
    excerpt: 'Analisi dello schema vincente che ha portato BigBro al terzo posto. Pressing alto e ripartenze fulminee.',
    category: 'team',
    date: '28 Gen 2025',
  },
]
