export interface PartyInput {
  readonly name: string
  readonly address: string
  readonly city: string
  readonly country: string
  readonly contactPerson: string
  readonly phone: string
  readonly email: string
  readonly mobile: string
  readonly notes: string
}

export type SupplierInput = PartyInput
export type CustomerInput = PartyInput

export interface StockItemInput {
  readonly category: string
  readonly name: string
  readonly unitOfMeasurement: string
  readonly purchasingPrice: string
  readonly sellingPrice: string
  readonly quantity: string
  readonly notes: string
}

export interface SaleInput {
  readonly quantity: string
  readonly notes: string
}
