import { Page } from '@playwright/test'
import { BaseListPage } from './base/BaseListPage'

export class HelpCategoriesPage extends BaseListPage {
  constructor(page: Page) {
    super(
      page,
      '/help_categorieslist.php',
      /help_categorieslist\.php/,
    )
  }
}
