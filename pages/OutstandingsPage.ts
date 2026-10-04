import { Page } from '@playwright/test'
import { BaseListPage } from './base/BaseListPage'

export class OutstandingsPage extends BaseListPage {
  constructor(page: Page) {
    super(page, '/a_outstandingslist.php', /a_outstandingslist\.php/)
  }
}
