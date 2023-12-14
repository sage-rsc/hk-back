/**
 * Slantapp code and properties {www.slantapp.io}
 */
import ModelUser from './model.user.js';
import ModelSector from './model.sector.js';
import ModelUserSector from './model.user.sector.js';

ModelUser.belongsToMany(ModelSector, {
    as: 'Sectors',
    foreignKey: "uid",
    through: ModelUserSector,
    constraints: false
});
ModelSector.belongsToMany(ModelUser, {
    as: 'Users',
    foreignKey: "sid",
    through: ModelUserSector,
    constraints: false
});
export {
    ModelUser,
    ModelSector,
    ModelUserSector
}
