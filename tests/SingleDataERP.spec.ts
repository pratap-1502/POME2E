import { environment } from '../config/environment'
import { expect, test } from '../fixtures/erp.fixture'
import { CustomerInput, SupplierInput } from '../types/record.types'
import {
  createAndVerifyCustomer,
  createAndVerifySupplier,
} from './support/partyFlows'

const supplier: SupplierInput = {
  name: 'Ramesh',
  address: 'Hyderabad',
  city: 'Ameerpet',
  country: 'India',
  contactPerson: 'Supplierman',
  phone: '8765432',
  email: 'Test@gmail.com',
  mobile: '765432',
  notes: 'First supplier',
}

const customer: CustomerInput = {
  name: 'Qedge',
  address: 'Srnagar',
  city: 'Kukatpally',
  country: 'India',
  contactPerson: 'Ranga',
  phone: '654322',
  email: 'testgmail.com',
  mobile: '8765498767',
  notes: 'First customer',
}

test.describe('single ERP data @regression @write', () => {
  test.describe.configure({ mode: 'serial' })
  test.skip(
    !environment.runMutatingTests,
    'Set RUN_MUTATING_TESTS=1 because these tests add records to the shared ERP site.',
  )

  test.beforeEach(async ({ dashboardPage }) => {
    await expect(dashboardPage.userName).toContainText('Administrator')
  })

  test.afterEach(async ({ loginPage, sidebar }) => {
    await sidebar.logout()
    await expect(loginPage.loginButton).toBeVisible()
  })

  test('Validate Supplier', async ({ sidebar, suppliersPage }) => {
    await createAndVerifySupplier(suppliersPage, sidebar, supplier)
  })

  test('Validate Customer Module', async ({ customersPage, sidebar }) => {
    await createAndVerifyCustomer(customersPage, sidebar, customer)
  })
})
