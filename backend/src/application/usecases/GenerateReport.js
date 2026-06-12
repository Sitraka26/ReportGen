const PDFDocument = require('pdfkit')

class GenerateReport {
  constructor(reportRepository) {
    this.reportRepository = reportRepository
  }

  async execute(reportId, res) {
    const report = await this.reportRepository.findById(reportId)
    if (!report) throw new Error('Rapport introuvable')

    const doc = new PDFDocument({ margin: 50 })

    res.setHeader('Content-Type', 'application/pdf')
    res.setHeader(
      'Content-Disposition',
      `attachment; filename=rapport_${reportId}.pdf`
    )

    doc.pipe(res)

    // Header
    doc
      .fillColor('#4F46E5')
      .fontSize(28)
      .text('ReportGem', { align: 'center' })

    doc
      .fillColor('#6B7280')
      .fontSize(12)
      .text('Générateur de rapports automatisé', { align: 'center' })

    doc.moveDown()
    doc
      .moveTo(50, doc.y)
      .lineTo(550, doc.y)
      .strokeColor('#4F46E5')
      .stroke()

    doc.moveDown()

    // Infos rapport
    doc
      .fillColor('#111827')
      .fontSize(20)
      .text(report.title, { align: 'left' })

    doc.moveDown(0.5)

    doc
      .fillColor('#6B7280')
      .fontSize(11)
      .text(`Statut : ${report.status}`)
      .text(`Créé le : ${new Date(report.createdAt).toLocaleDateString('fr-FR')}`)
      .text(`ID : ${report.id}`)

    doc.moveDown()

    // Données
    if (report.dataSources && report.dataSources.length > 0) {
      doc
        .fillColor('#4F46E5')
        .fontSize(16)
        .text('Données importées', { underline: true })

      doc.moveDown(0.5)

      report.dataSources.forEach((source, index) => {
        doc
          .fillColor('#111827')
          .fontSize(13)
          .text(`Source ${index + 1} — Type : ${source.type}`)

        doc.moveDown(0.3)

        const content = source.content
        if (Array.isArray(content)) {
          content.slice(0, 10).forEach((row, i) => {
            doc
              .fillColor('#374151')
              .fontSize(10)
              .text(`  ${i + 1}. ${JSON.stringify(row)}`)
          })
        } else {
          doc
            .fillColor('#374151')
            .fontSize(10)
            .text(JSON.stringify(content, null, 2))
        }

        doc.moveDown()
      })
    } else {
      doc
        .fillColor('#9CA3AF')
        .fontSize(12)
        .text('Aucune donnée importée pour ce rapport.', { align: 'center' })
    }

    // Footer
    doc.moveDown(2)
    doc
      .moveTo(50, doc.y)
      .lineTo(550, doc.y)
      .strokeColor('#E5E7EB')
      .stroke()

    doc.moveDown(0.5)
    doc
      .fillColor('#9CA3AF')
      .fontSize(9)
      .text(
        `Généré par ReportGem — ${new Date().toLocaleDateString('fr-FR')}`,
        { align: 'center' }
      )

    doc.end()
  }
}

module.exports = GenerateReport