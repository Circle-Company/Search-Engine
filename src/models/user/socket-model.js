const { Model, DataTypes} = require('sequelize')

class Socket extends Model {
    static init(sequelize) {
        super.init({
            user_id: DataTypes.INTEGER(),
            socket_id: DataTypes.INTEGER(),
        }, {
            sequelize,
            tableName: 'sockets'
        })
    }

    static associate(models){
        this.belongsTo(models.User, {
            foreignKey: 'user_id',
            as: 'user'
        })
    }
}
module.exports = Socket