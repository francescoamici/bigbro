export interface Player {
  name: string
  role: string
  number: number
  description: string
  image?: string
}

export const players: Player[] = [
  {
    name: 'Cristian Moscardelli',
    role: 'Attaccante',
    number: 9,
    description: 'Il bomber per eccellenza, esperienza e fiuto del gol. Leader in campo con una carriera leggendaria alle spalle.',
  },
  {
    name: 'Spizzi',
    role: 'Centrocampista',
    number: 10,
    description: 'Creatività e visione di gioco. Il regista che orchestra le azioni offensive con classe e precisione.',
  },
  {
    name: 'Casapieri',
    role: 'Difensore',
    number: 4,
    description: 'Muro difensivo, grinta e determinazione. La sicurezza della retroguardia BigBro.',
  },
  {
    name: 'Fofana',
    role: 'Centrocampista',
    number: 8,
    description: 'Potenza fisica e dinamismo a centrocampo. Instancabile recuperatore di palloni.',
  },
  {
    name: 'Florenzi',
    role: 'Difensore/Centrocampista',
    number: 5,
    description: 'Versatilità e intelligenza tattica. Capace di coprire più ruoli con la stessa efficacia.',
  },
  {
    name: 'Coach Fracci',
    role: 'Allenatore',
    number: 0,
    description: 'La mente tattica dietro BigBro FC. Strategia, disciplina e mentalità vincente.',
  },
]

export const teamStats = {
  position: 3,
  positionLabel: '3° Girone A',
  wins: 2,
  goals: 25,
}

export const LOGO_URL = 'https://kingsleague-cdn.kama.football/account/production/club/eafeeb66-fe5b-4454-8654-f199e95fbdf1/576367545.png'
