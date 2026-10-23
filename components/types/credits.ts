export type CreditEntryRole = "author" | "speaker" | "specialThanks"

export interface Person {
  name: string
  email?: string
}

export interface CreditEntry extends Person {
  role?: CreditEntryRole | CreditEntryRole[]
}
