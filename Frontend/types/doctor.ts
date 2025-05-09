export interface Doctor {
  id: string
  name: string
  specialty: string
  experience: string
  qualification: string
  location: string
  hospital?: string
  fee?: string
  onlineFee?: string
  visitFee?: string
  badge?: string
  cashback?: string
  noBookingFee?: string
  image: string
  languages?: string[]
  consultModes?: string[]
  experienceYears: number
}

export interface FilterParams {
  consultMode: string[]
  experience: string[]
  fees: string[]
  language: string[]
  page: number
  limit: number
}
