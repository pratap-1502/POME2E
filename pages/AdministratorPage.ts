import { Page } from '@playwright/test'
import { BaseListPage } from './base/BaseListPage'

export class AdministratorPage extends BaseListPage {
  constructor(page: Page) {
    super(page, '/userslist.php', /userslist\.php/)
  }
}
