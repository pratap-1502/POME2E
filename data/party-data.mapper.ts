import { CustomerInput, SupplierInput } from '../types/record.types'

type DataCell = string | number | boolean | null | undefined

interface CommonPartyRecord {
  readonly Address: DataCell
  readonly City: DataCell
  readonly Country: DataCell
  readonly ContactPerson: DataCell
  readonly PhoneNumber: DataCell
  readonly Email: DataCell
  readonly MobileNumber: DataCell
  readonly Notes?: DataCell
}

export interface SupplierDataRecord extends CommonPartyRecord {
  readonly SupplierName?: DataCell
  readonly Name?: DataCell
}

export interface CustomerDataRecord extends CommonPartyRecord {
  readonly CustomerName?: DataCell
  readonly Name?: DataCell
}

function asText(value: DataCell) {
  return value == null ? '' : String(value)
}

function commonPartyData(record: CommonPartyRecord) {
  return {
    address: asText(record.Address),
    city: asText(record.City),
    country: asText(record.Country),
    contactPerson: asText(record.ContactPerson),
    phone: asText(record.PhoneNumber),
    email: asText(record.Email),
    mobile: asText(record.MobileNumber),
    notes: asText(record.Notes),
  }
}

export function mapSupplierData(record: SupplierDataRecord): SupplierInput {
  return {
    name: asText(record.SupplierName ?? record.Name),
    ...commonPartyData(record),
  }
}

export function mapCustomerData(record: CustomerDataRecord): CustomerInput {
  return {
    name: asText(record.CustomerName ?? record.Name),
    ...commonPartyData(record),
  }
}
