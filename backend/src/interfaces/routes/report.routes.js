const express = require('express')
const router = express.Router()
const authMiddleware = require('../middlewares/auth.middleware')
const {
  createReport,
  getReports,
  deleteReport
} = require('../controllers/report.controller')

router.get('/', authMiddleware, getReports)
router.post('/', authMiddleware, createReport)
router.delete('/:id', authMiddleware, deleteReport)

module.exports = router