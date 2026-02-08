export interface SponsorTier {
  id: number
  name: string
  tier: string
  features: string[]
  highlighted?: boolean
}

export const sponsorTiers: SponsorTier[] = [
  {
    id: 1,
    name: 'Naming Rights',
    tier: 'Tier 1',
    highlighted: true,
    features: [
      'Nome su maglia e squadra',
      'Massima visibilità streaming',
      'Social dedicati',
      'Eventi esclusivi',
      'Logo su tutti i materiali',
    ],
  },
  {
    id: 2,
    name: 'Team Partner',
    tier: 'Tier 2',
    features: [
      'Logo backdrop/banner',
      'Menzioni social',
      'Accesso eventi team',
      'Visibilità live',
      'Logo sito',
    ],
  },
  {
    id: 3,
    name: 'Digital Supporter',
    tier: 'Tier 3',
    features: [
      'Logo sito',
      'Banner streaming',
      'Visibilità base social',
      'Menzione credits',
    ],
  },
]
