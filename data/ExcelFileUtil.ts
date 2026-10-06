export class ExcelFileUtil {
  static async getExcelData<T extends object>(
    workbookPath: string,
    sheetName: string,
  ): Promise<T[]> {
    const { readSheet } = await import('read-excel-file/node')
    const rows = await readSheet(workbookPath, sheetName)

    if (rows.length === 0) {
      return []
    }

    const headers = rows[0].map((cell) => String(cell ?? '').trim())
    if (headers.some((header) => !header)) {
      throw new Error(`Sheet "${sheetName}" contains an empty column header.`)
    }

    return rows.slice(1).map((row) => {
      const record: Record<string, unknown> = {}
      headers.forEach((header, index) => {
        record[header] = row[index] ?? null
      })
      return record as T
    })
  }
}
