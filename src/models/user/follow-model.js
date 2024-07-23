const { Model, DataTypes} = require('sequelize')

class Follow extends Model {
    static init(sequelize) {
        super.init({
            user_id: DataTypes.INTEGER(),
            followed_user_id: DataTypes.INTEGER(),
        },      {
            sequelize,
            modelName: 'Follow',
            tableName: 'follows',
          })
    }

    static associate(models){
        this.belongsTo(models.User, {
            foreignKey: 'user_id',
            as: 'following'
        }),
        this.belongsTo(models.User, {
            foreignKey: 'followed_user_id',
            as: 'followers' 
        })
    }
}
module.exports = Follow