import sequelize from './../database/index.js';
import {DataTypes, Model} from 'sequelize';
import sha1 from 'sha1'
import Joi from 'joi'
import {ErrorClass} from "../core/index.js";
import {ModelUserSector} from "./index.js";
import ModelSector from "./model.sector.js";

const tableName = "users";

// const queryInterface = sequelize.getQueryInterface();
function isJson(str) {
    try {
        JSON.parse(str);
        return true;
    } catch (error) {
        return false;
    }
}

class ModelUser extends Model {
}

ModelUser.init({
    uid: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
    name: {type: DataTypes.STRING, allowNull: false, unique: true},
    agreeToTerms: {type: DataTypes.BOOLEAN, allowNull: false},
    status: {type: DataTypes.INTEGER, defaultValue: 0},
}, {sequelize, tableName});

ModelUser.Add = async (data) => {
    const transaction = await sequelize.transaction();

    try {
        //validate incoming data
        const schema = Joi.object({
            name: Joi.string().required(),
            sectors: Joi.array().required(),
            agreeToTerms: Joi.boolean().required(),
        });
        await schema.validateAsync(data);

        //update or create new user
        const [user, created] = await ModelUser.upsert(
            {name: data.name, agreeToTerms: data.agreeToTerms},
            {returning: true, transaction}
        );

        //set the sectors
        await user.setSectors(data.sectors, {transaction});

        //commit the changes to db
        await transaction.commit();

        //return user object and created status
        return {user, created};
    } catch (e) {

        //rollback changes if an error occurs
        await transaction.rollback();

        //print error into error handler for response print out
        throw new ErrorClass(e.message);
    }
};

ModelUser.User = async (uid) => {
    try {
        //validate user's id passed
        const schema = Joi.object({
            uid: Joi.number().required(),
        })

        await schema.validateAsync({uid})

        //get user using the given id and attach user's sectors using the defined database relationship
        const user = await ModelUser.findOne({
            where: {uid}, include: [{
                model: ModelSector, as: "Sectors",
                through: {attributes: []}
            }]
        })

        //throw error if no user id found
        if (!user) throw new ErrorClass("User not found")

        //return user object
        return user
    } catch (e) {
        throw new ErrorClass(e.message)
    }
}

/**
 * Run belonging and relationship before sync()
 */

sequelize.sync();
export default ModelUser;
