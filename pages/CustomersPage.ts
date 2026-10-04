import { Locator, Page } from '@playwright/test'
import { ConfirmationDialog } from '../components/ConfirmationDialog'
import { FeedbackBanner } from '../components/FeedbackBanner'
import { PartyForm } from '../components/PartyForm'
import { CustomerInput } from '../types/record.types'
import { BaseListPage } from './base/BaseListPage'

export class CustomersPage extends BaseListPage {
  readonly feedback: FeedbackBanner
  readonly confirmationDialog: ConfirmationDialog
  readonly form: PartyForm
  readonly addCustomerLink: Locator
  readonly customerNumberInput: Locator
  readonly submitButton: Locator
  readonly cancelButton: Locator
  readonly customerNumberResult: Locator

  constructor(page: Page) {
    super(page, '/a_customerslist.php', /a_customerslist\.php/)
    this.feedback = new FeedbackBanner(page)
    this.confirmationDialog = new ConfirmationDialog(page)
    this.form = new PartyForm(page, '#x_Customer_Name')
    this.addCustomerLink = page.locator('a[href^="a_customersadd.php?showdetail="]').first()
    this.customerNumberInput = page.locator('#x_Customer_Number')
    this.submitButton = page.locator('#btnAction')
    this.cancelButton = page.locator('#btnCancel')
    this.customerNumberResult = page.locator(
      '#tbl_a_customerslist tbody tr[data-rowindex] td[data-name="Customer_Number"]',
    )
  }

  async openAddForm() {
    await this.addCustomerLink.click()
    await this.page.waitForURL(/a_customersadd\.php/)
    await this.form.nameInput.waitFor({ state: 'visible' })
  }

  async generatedNumber() {
    return this.customerNumberInput.inputValue()
  }

  async fillForm(data: CustomerInput) {
    await this.form.fill(data)
  }

  async submit() {
    await this.submitButton.click()
  }

  async confirmAdd() {
    await this.confirmationDialog.confirm()
  }

  async searchByNumber(customerNumber: string) {
    await this.search(customerNumber)
    await this.customerNumberResult.waitFor({ state: 'visible' })
  }

  async foundCustomerNumber() {
    return (await this.customerNumberResult.innerText()).trim()
  }
}
