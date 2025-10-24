import express from 'express'
import { sequelize } from 'src/db/database'

import { env } from './env'
import { routes } from './routes'

const app = express()

app.use(express.json())
app.use(routes)
sequelize.sync({ alter: true })
app.listen({ port: env.PORT }, () => {
  console.log(`HTTP Server started on PORT:${env.PORT}`)
})
