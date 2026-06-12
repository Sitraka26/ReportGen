const express = require('express')
const router = express.Router()
const authMiddleware = require('../middlewares/auth.middleware')

router.get('/', authMiddleware, (req, res) => {
  res.json({ message: 'Liste des rapports - à implémenter' })
})

module.exports = router