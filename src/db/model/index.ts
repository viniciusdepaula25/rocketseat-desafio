import { Meal } from './meals'
import { User } from './user'

User.hasMany(Meal, {
  foreignKey: 'user_id',
  as: 'meals',
})

Meal.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'user',
})
