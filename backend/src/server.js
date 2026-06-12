require('dotenv').config()
const app = require('./app')

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`🚀 ReportGem API démarrée sur http://localhost:${PORT}`)
})