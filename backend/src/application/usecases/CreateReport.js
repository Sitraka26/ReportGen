class CreateReport {
  constructor(reportRepository) {
    this.reportRepository = reportRepository
  }

  async execute({ title, userId, templateId }) {
    if (!title) throw new Error('Le titre est requis')

    const report = await this.reportRepository.create({
      title,
      userId,
      templateId: templateId || null
    })

    return report.toJSON()
  }
}

module.exports = CreateReport