export interface InventoryItem {
  name: string
  price: number
  cps: number
  amount: number
}

export interface Player {
  discordDisplayName: string
  discordId: string
  balance: string
  cps: number
  inventory: InventoryItem[]
  lastDaily: string
  dailyCount: number
  openedCrates: number
  unopenedCrates: number
  blacklisted: null | { reason: string, started : string}
  blacklistedHistory : { reason: string, started : string, ended: string}[]
  createdAt: string
  updatedAt: string
}