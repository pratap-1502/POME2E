import { randomUUID } from 'node:crypto'
import {
  CustomerInput,
  SaleInput,
  StockItemInput,
  SupplierInput,
} from '../types/record.types'

function uniqueSuffix() {
  return `${Date.now()}-${randomUUID().slice(0, 8)}`
}

export function buildSupplier(): SupplierInput {
  const suffix = uniqueSuffix()
  return {
    name: `Automation Supplier ${suffix}`,
    address: '100 Test Avenue',
    city: 'Hyderabad',
    country: 'India',
    contactPerson: `Supplier Contact ${suffix}`,
    phone: '04012345678',
    email: `supplier-${suffix}@example.com`,
    mobile: '9876543210',
    notes: `Created by Playwright test ${suffix}`,
  }
}

export function buildCustomer(): CustomerInput {
  const suffix = uniqueSuffix()
  return {
    name: `Automation Customer ${suffix}`,
    address: '200 Test Avenue',
    city: 'Hyderabad',
    country: 'India',
    contactPerson: `Customer Contact ${suffix}`,
    phone: '04087654321',
    email: `customer-${suffix}@example.com`,
    mobile: '9123456780',
    notes: `Created by Playwright test ${suffix}`,
  }
}

export function buildStockItem(): StockItemInput {
  const suffix = uniqueSuffix()
  return {
    name: `Automation Stock ${suffix}`,
    purchasingPrice: '100',
    sellingPrice: '125',
    notes: `Created by Playwright test ${suffix}`,
  }
}

export function buildSale(): SaleInput {
  const suffix = uniqueSuffix()
  return {
    quantity: '1',
    notes: `Created by Playwright test ${suffix}`,
  }
}
