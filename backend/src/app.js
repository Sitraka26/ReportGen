const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())

// Routes
app.use('/api/auth', require('./interfaces/routes/auth.routes'))
app.use('/api/reports', require('./interfaces/routes/report.routes'))

app.get('/', (req, res) => {
  res.json({ message: 'ReportGem API v1.0 ✅' })
})

module.exports = app