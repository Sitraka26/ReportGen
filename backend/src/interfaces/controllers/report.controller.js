const CreateReport = require('../../application/usecases/CreateReport')
const GetReports = require('../../application/usecases/GetReports')
const PrismaReportRepository = require('../../infrastructure/repositories/PrismaReportRepository')

const reportRepository = new PrismaReportRepository()

const createReport = async (req, res) => {
  try {
    const { title, templateId } = req.body
    if (!title) return res.status(400).json({ error: 'Titre requis' })

    const createReport = new CreateReport(reportRepository)
    const report = await createReport.execute({
      title,
      userId: req.user.id,
      templateId
    })

    res.status(201).json({ message: 'Rapport créé', report })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const getReports = async (req, res) => {
  try {
    const getReports = new GetReports(reportRepository)
    const reports = await getReports.execute(req.user.id)
    res.status(200).json({ reports })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const deleteReport = async (req, res) => {
  try {
    await reportRepository.delete(req.params.id)
    res.status(200).json({ message: 'Rapport supprimé' })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

module.exports = { createReport, getReports, deleteReport }