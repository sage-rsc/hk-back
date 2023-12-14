import sequelize from './../database/index.js';
import {DataTypes, Model} from 'sequelize';

const tableName = "sectors";

// const queryInterface = sequelize.getQueryInterface();
function isJson(str) {
    try {
        JSON.parse(str);
        return true;
    } catch (error) {
        return false;
    }
}

class ModelSector extends Model {
}

ModelSector.init({
    sid: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
    value: {type: DataTypes.STRING},
    label: {type: DataTypes.STRING},
    status: {type: DataTypes.INTEGER, defaultValue: 0}
}, {sequelize, tableName});

/**
 * Run belonging and relationship before sync()
 */
sequelize.sync({alter:true});
export default ModelSector;
