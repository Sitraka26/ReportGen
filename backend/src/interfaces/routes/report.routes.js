const express = require('express')
const router = express.Router()
const multer = require('multer')
const authMiddleware = require('../middlewares/auth.middleware')
const {
  createReport,
  getReports,
  deleteReport,
  generatePDF,
  importData
} = require('../controllers/report.controller')

const upload = multer({ storage: multer.memoryStorage() })

router.get('/', authMiddleware, getReports)
router.post('/', authMiddleware, createReport)
router.delete('/:id', authMiddleware, deleteReport)
router.get('/:id/generate', authMiddleware, generatePDF)
router.post('/:id/import', authMiddleware, upload.single('file'), importData)

module.exports = router