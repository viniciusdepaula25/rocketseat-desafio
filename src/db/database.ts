import { Sequelize } from 'sequelize'

const DATABASE_URL =
  'mariadb://vinicius:cidade01@localhost:3306/rocketseatenode'

export const sequelize = new Sequelize(DATABASE_URL)
