import { Locator, Page } from '@playwright/test'
import { ConfirmationDialog } from '../components/ConfirmationDialog'
import { FeedbackBanner } from '../components/FeedbackBanner'
import { PartyForm } from '../components/PartyForm'
import { SupplierInput } from '../types/record.types'
import { BaseListPage } from './base/BaseListPage'

export class SuppliersPage extends BaseListPage {
  readonly feedback: FeedbackBanner
  readonly confirmationDialog: ConfirmationDialog
  readonly form: PartyForm
  readonly addSupplierLink: Locator
  readonly supplierNumberInput: Locator
  readonly submitButton: Locator
  readonly cancelButton: Locator
  readonly supplierNumberResult: Locator

  constructor(page: Page) {
    super(page, '/a_supplierslist.php', /a_supplierslist\.php/)
    this.feedback = new FeedbackBanner(page)
    this.confirmationDialog = new ConfirmationDialog(page)
    this.form = new PartyForm(page, '#x_Supplier_Name')
    this.addSupplierLink = page.locator('a[href^="a_suppliersadd.php?showdetail="]').first()
    this.supplierNumberInput = page.locator('#x_Supplier_Number')
    this.submitButton = page.locator('#btnAction')
    this.cancelButton = page.locator('#btnCancel')
    this.supplierNumberResult = page.locator(
      '#tbl_a_supplierslist tbody tr[data-rowindex] td[data-name="Supplier_Number"]',
    )
  }

  async openAddForm() {
    await this.addSupplierLink.click()
    await this.page.waitForURL(/a_suppliersadd\.php/)
    await this.form.nameInput.waitFor({ state: 'visible' })
  }

  async generatedNumber() {
    return this.supplierNumberInput.inputValue()
  }

  async fillForm(data: SupplierInput) {
    await this.form.fill(data)
  }

  async submit() {
    await this.submitButton.click()
  }

  async confirmAdd() {
    await this.confirmationDialog.confirm()
  }

  async searchByNumber(supplierNumber: string) {
    await this.search(supplierNumber)
    await this.supplierNumberResult.waitFor({ state: 'visible' })
  }

  async foundSupplierNumber() {
    return (await this.supplierNumberResult.innerText()).trim()
  }
}
