class GetReports {
  constructor(reportRepository) {
    this.reportRepository = reportRepository
  }

  async execute(userId) {
    const reports = await this.reportRepository.findAll(userId)
    return reports.map(r => r.toJSON())
  }
}

module.exports = GetReports