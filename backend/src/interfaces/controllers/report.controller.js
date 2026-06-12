const CreateReport = require('../../application/usecases/CreateReport')
const GetReports = require('../../application/usecases/GetReports')
const GenerateReport = require('../../application/usecases/GenerateReport')
const ImportData = require('../../application/usecases/ImportData')
const PrismaReportRepository = require('../../infrastructure/repositories/PrismaReportRepository')

const reportRepository = new PrismaReportRepository()

const createReport = async (req, res) => {
  try {
    const { title, templateId } = req.body
    if (!title) return res.status(400).json({ error: 'Titre requis' })

    const usecase = new CreateReport(reportRepository)
    const report = await usecase.execute({
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
    const usecase = new GetReports(reportRepository)
    const reports = await usecase.execute(req.user.id)
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

const generatePDF = async (req, res) => {
  try {
    const usecase = new GenerateReport(reportRepository)
    await usecase.execute(req.params.id, res)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const importData = async (req, res) => {
  try {
    const { type } = req.body
    const reportId = req.params.id
    let content

    if (req.file) {
      const fileContent = req.file.buffer.toString('utf-8')

      if (type === 'csv') {
        const lines = fileContent.split('\n').filter(l => l.trim())
        const headers = lines[0].split(',').map(h => h.trim())
        content = lines.slice(1).map(line => {
          const values = line.split(',').map(v => v.trim())
          return headers.reduce((obj, header, i) => {
            obj[header] = values[i]
            return obj
          }, {})
        })
      } else if (type === 'json') {
        content = JSON.parse(fileContent)
      } else {
        content = { raw: fileContent }
      }
    } else if (req.body.content) {
      content = JSON.parse(req.body.content)
    } else {
      return res.status(400).json({ error: 'Fichier ou contenu requis' })
    }

    const usecase = new ImportData(reportRepository)
    const dataSource = await usecase.execute({ reportId, type, content })

    res.status(201).json({ message: 'Données importées', dataSource })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

module.exports = { createReport, getReports, deleteReport, generatePDF, importData }