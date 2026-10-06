import { Locator, Page } from '@playwright/test'
import { ConfirmationDialog } from '../components/ConfirmationDialog'
import { FeedbackBanner } from '../components/FeedbackBanner'
import { SaleInput } from '../types/record.types'
import { BaseListPage } from './base/BaseListPage'

type SaleRelations = {
  readonly customerName: string
}

export class SalesPage extends BaseListPage {
  readonly feedback: FeedbackBanner
  readonly confirmationDialog: ConfirmationDialog
  readonly addSaleLink: Locator
  readonly salesNumberInput: Locator
  readonly customerSelect: Locator
  readonly notesInput: Locator
  readonly supplierSelect: Locator
  readonly stockItemSelect: Locator
  readonly quantityInput: Locator
  readonly salesPriceInput: Locator
  readonly totalPaymentInput: Locator
  readonly submitButton: Locator

  constructor(page: Page) {
    super(page, '/a_saleslist.php', /a_saleslist\.php/)
    this.feedback = new FeedbackBanner(page)
    this.confirmationDialog = new ConfirmationDialog(page)
    this.addSaleLink = page.locator('a[href^="a_salesadd.php?showdetail="]').first()
    this.salesNumberInput = page.locator('#x_Sales_Number')
    this.customerSelect = page.locator('#x_Customer_ID')
    this.notesInput = page.locator('#x_Notes')
    this.supplierSelect = page.locator('#x1_Supplier_Number')
    this.stockItemSelect = page.locator('#x1_Stock_Item')
    this.quantityInput = page.locator('#x1_Sales_Quantity')
    this.salesPriceInput = page.locator('#x1_Sales_Price')
    this.totalPaymentInput = page.locator('#x_Total_Payment')
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
    await this.supplierSelect.selectOption({ index: 1 })
    await this.stockItemSelect.locator('option').nth(1).waitFor({
      state: 'attached',
    })
    await this.stockItemSelect.selectOption({ index: 1 })
    await this.quantityInput.click()
    await this.quantityInput.press('ControlOrMeta+A')
    await this.quantityInput.pressSequentially(data.quantity)
    await this.quantityInput.press('Tab')

    const totalPayment = (await this.salesPriceInput.inputValue()).replaceAll(
      ',',
      '',
    )
    await this.totalPaymentInput.fill(totalPayment)
  }

  async submit() {
    await this.submitButton.click()
  }

  async confirmAdd() {
    await this.confirmationDialog.confirm()
  }
}
