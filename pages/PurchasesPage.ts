import { Page } from '@playwright/test'
import { BaseListPage } from './base/BaseListPage'

export class PurchasesPage extends BaseListPage {
  constructor(page: Page) {
    super(page, '/a_purchaseslist.php', /a_purchaseslist\.php/)
  }
}
