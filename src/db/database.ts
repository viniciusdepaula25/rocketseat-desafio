import { Sequelize } from 'sequelize'
import { env } from 'src/env'

const DATABASE_LINK = env.DATABASE_URL

export const sequelize = new Sequelize(DATABASE_LINK)
