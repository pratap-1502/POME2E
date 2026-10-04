import { Locator, Page } from '@playwright/test'
import { PartyInput } from '../types/record.types'

export class PartyForm {
  readonly nameInput: Locator
  readonly addressInput: Locator
  readonly cityInput: Locator
  readonly countryInput: Locator
  readonly contactPersonInput: Locator
  readonly phoneNumberInput: Locator
  readonly emailInput: Locator
  readonly mobileNumberInput: Locator
  readonly notesInput: Locator

  constructor(page: Page, nameInputSelector: string) {
    this.nameInput = page.locator(nameInputSelector)
    this.addressInput = page.locator('#x_Address')
    this.cityInput = page.locator('#x_City')
    this.countryInput = page.locator('#x_Country')
    this.contactPersonInput = page.locator('#x_Contact_Person')
    this.phoneNumberInput = page.locator('#x_Phone_Number')
    this.emailInput = page.locator('#x__Email')
    this.mobileNumberInput = page.locator('#x_Mobile_Number')
    this.notesInput = page.locator('#x_Notes')
  }

  async fill(data: PartyInput) {
    await this.nameInput.fill(data.name)
    await this.addressInput.fill(data.address)
    await this.cityInput.fill(data.city)
    await this.countryInput.fill(data.country)
    await this.contactPersonInput.fill(data.contactPerson)
    await this.phoneNumberInput.fill(data.phone)
    await this.emailInput.fill(data.email)
    await this.mobileNumberInput.fill(data.mobile)
    await this.notesInput.fill(data.notes)
  }
}
