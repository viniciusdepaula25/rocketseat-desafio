import { Model, DataTypes } from 'sequelize'
import { sequelize } from 'src/db/database'

export class Meal extends Model {}

Meal.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
    dateTimeMeal: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'date_time_meal',
    },
    onDiet: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      field: 'on_diet',
      get() {
        return this.getDataValue('onDiet') === 1
      },
      set(val) {
        this.setDataValue('onDiet', val === true || val === 'S' ? 1 : 0)
      },
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
      field: 'user_id',
    },
  },
  {
    sequelize,
    modelName: 'meals',
    tableName: 'meals',
    timestamps: true,
    paranoid: true,
  },
)
