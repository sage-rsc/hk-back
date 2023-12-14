import sequelize from './../database/index.js';
import {DataTypes, Model} from 'sequelize';

const tableName = "users-sectors";

function isJson(str) {
    try {
        JSON.parse(str);
        return true;
    } catch (error) {
        return false;
    }
}

class ModelUserSector extends Model {
}

ModelUserSector.init({
    usid: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
    uid: {type: DataTypes.INTEGER},
    sid: {type: DataTypes.INTEGER},
    status: {type: DataTypes.INTEGER, defaultValue: 0}
}, {sequelize, tableName});

/**
 * Run belonging and relationship before sync()
 */

sequelize.sync();
export default ModelUserSector;
