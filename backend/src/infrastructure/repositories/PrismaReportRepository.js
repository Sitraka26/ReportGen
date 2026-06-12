const ReportRepository = require('../../domain/repositories/ReportRepository')
const Report = require('../../domain/entities/Report')
const prisma = require('../database/prisma.client')

class PrismaReportRepository extends ReportRepository {
  async findAll(userId) {
    const reports = await prisma.report.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' }
    })
    return reports.map(r => new Report(r))
  }

  async findById(id) {
  const report = await prisma.report.findUnique({
    where: { id },
    include: { dataSources: true }
  })
  if (!report) return null
  const r = new Report(report)
  r.dataSources = report.dataSources
  return r
}
  async create(reportData) {
    const report = await prisma.report.create({ data: reportData })
    return new Report(report)
  }

  async update(id, reportData) {
    const report = await prisma.report.update({
      where: { id },
      data: reportData
    })
    return new Report(report)
  }

  async delete(id) {
    await prisma.report.delete({ where: { id } })
  }
}

module.exports = PrismaReportRepository