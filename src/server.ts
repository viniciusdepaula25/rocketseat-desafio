import express from 'express'
import { sequelize } from 'src/db/database'

import { routes } from './routes'

const app = express()
const port = 3000

app.use(express.json())
app.use(routes)
sequelize.sync({ alter: true })
app.listen(port, () => {
  console.log(`HTTP SERVER RUNNING IN PORT: ${port}`)
})
