import { Locator, Page } from '@playwright/test'
import { ConfirmationDialog } from '../components/ConfirmationDialog'
import { FeedbackBanner } from '../components/FeedbackBanner'
import { SaleInput } from '../types/record.types'
import { BaseListPage } from './base/BaseListPage'

type SaleRelations = {
  readonly customerName: string
  readonly stockItemName: string
}

export class SalesPage extends BaseListPage {
  readonly feedback: FeedbackBanner
  readonly confirmationDialog: ConfirmationDialog
  readonly addSaleLink: Locator
  readonly salesNumberInput: Locator
  readonly customerSelect: Locator
  readonly notesInput: Locator
  readonly stockItemSelect: Locator
  readonly quantityInput: Locator
  readonly submitButton: Locator

  constructor(page: Page) {
    super(page, '/a_saleslist.php', /a_saleslist\.php/)
    this.feedback = new FeedbackBanner(page)
    this.confirmationDialog = new ConfirmationDialog(page)
    this.addSaleLink = page.locator('a[href^="a_salesadd.php?showdetail="]').first()
    this.salesNumberInput = page.locator('#x_Sales_Number')
    this.customerSelect = page.locator('#x_Customer_ID')
    this.notesInput = page.locator('#x_Notes')
    this.stockItemSelect = page.locator('#x1_Stock_Item')
    this.quantityInput = page.locator('#x1_Quantity')
    this.submitButton = page.locator('#btnAction')
  }

  async openAddForm() {
    await this.addSaleLink.click()
    await this.page.waitForURL(/a_salesadd\.php/)
    await this.customerSelect.waitFor({ state: 'visible' })
  }

  async generatedNumber() {
    return this.salesNumberInput.inputValue()
  }

  async fillForm(data: SaleInput, relations: SaleRelations) {
    await this.customerSelect.selectOption({ label: relations.customerName })
    await this.notesInput.fill(data.notes)
    await this.stockItemSelect.selectOption({ label: relations.stockItemName })
    await this.quantityInput.fill(data.quantity)
  }

  async submit() {
    await this.submitButton.click()
  }

  async confirmAdd() {
    await this.confirmationDialog.confirm()
  }
}
