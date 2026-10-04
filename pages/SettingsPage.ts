import { Page } from '@playwright/test'
import { BaseListPage } from './base/BaseListPage'

export class SettingsPage extends BaseListPage {
  constructor(page: Page) {
    super(page, '/settingslist.php', /settingslist\.php/)
  }
}
