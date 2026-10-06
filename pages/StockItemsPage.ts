import { Locator, Page } from '@playwright/test'
import { ConfirmationDialog } from '../components/ConfirmationDialog'
import { FeedbackBanner } from '../components/FeedbackBanner'
import { StockItemInput } from '../types/record.types'
import { BaseListPage } from './base/BaseListPage'

export class StockItemsPage extends BaseListPage {
  readonly feedback: FeedbackBanner
  readonly confirmationDialog: ConfirmationDialog
  readonly addStockItemLink: Locator
  readonly categorySelect: Locator
  readonly supplierSelect: Locator
  readonly stockNumberInput: Locator
  readonly stockNameInput: Locator
  readonly unitOfMeasurementSelect: Locator
  readonly purchasingPriceInput: Locator
  readonly sellingPriceInput: Locator
  readonly notesInput: Locator
  readonly submitButton: Locator

  constructor(page: Page) {
    super(page, '/a_stock_itemslist.php', /a_stock_itemslist\.php/)
    this.feedback = new FeedbackBanner(page)
    this.confirmationDialog = new ConfirmationDialog(page)
    this.addStockItemLink = page.locator('a[href^="a_stock_itemsadd.php?showdetail="]').first()
    this.categorySelect = page.locator('#x_Category')
    this.supplierSelect = page.locator('#x_Supplier_Number')
    this.stockNumberInput = page.locator('#x_Stock_Number')
    this.stockNameInput = page.locator('#x_Stock_Name')
    this.unitOfMeasurementSelect = page.locator('#x_Unit_Of_Measurement')
    this.purchasingPriceInput = page.locator('#x_Purchasing_Price')
    this.sellingPriceInput = page.locator('#x_Selling_Price')
    this.notesInput = page.locator('#x_Notes')
    this.submitButton = page.locator('#btnAction')
  }

  async openAddForm() {
    await this.addStockItemLink.click()
    await this.page.waitForURL(/a_stock_itemsadd\.php/)
    await this.stockNameInput.waitFor({ state: 'visible' })
  }

  async generatedNumber() {
    return this.stockNumberInput.inputValue()
  }

  async fillForm(data: StockItemInput, supplierName: string) {
    await this.categorySelect.selectOption({ index: 1 })
    await this.supplierSelect.selectOption({ label: supplierName })
    await this.stockNameInput.fill(data.name)
    await this.unitOfMeasurementSelect.selectOption({ index: 1 })
    await this.purchasingPriceInput.fill(data.purchasingPrice)
    await this.sellingPriceInput.fill(data.sellingPrice)
    await this.notesInput.fill(data.notes)
  }

  async submit() {
    await this.submitButton.click()
  }

  async confirmAdd() {
    await this.confirmationDialog.confirm()
  }
}
