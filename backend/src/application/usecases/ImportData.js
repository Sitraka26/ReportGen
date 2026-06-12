const prisma = require('../../infrastructure/database/prisma.client')

class ImportData {
  constructor(reportRepository) {
    this.reportRepository = reportRepository
  }

  async execute({ reportId, type, content }) {
    const report = await this.reportRepository.findById(reportId)
    if (!report) throw new Error('Rapport introuvable')

    const dataSource = await prisma.dataSource.create({
      data: {
        type,
        content,
        reportId
      }
    })

    return dataSource
  }
}

module.exports = ImportData