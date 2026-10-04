import { Page } from '@playwright/test'

export class SessionKeeper {
  private timer?: NodeJS.Timeout
  private pulseInProgress = false

  constructor(
    private readonly page: Page,
    private readonly intervalMs = 30_000,
  ) {}

  start() {
    if (this.timer) {
      return
    }

    this.timer = setInterval(() => void this.pulse(), this.intervalMs)
    this.timer.unref()
  }

  stop() {
    if (this.timer) {
      clearInterval(this.timer)
      this.timer = undefined
    }
  }

  private async pulse() {
    if (this.pulseInProgress || this.page.isClosed()) {
      return
    }

    this.pulseInProgress = true
    try {
      // The application resets its client-side idle timer on document clicks.
      await this.page.locator('body').dispatchEvent('click')
    } catch {
      // Navigation can temporarily detach the document; the next pulse retries.
    } finally {
      this.pulseInProgress = false
    }
  }
}
