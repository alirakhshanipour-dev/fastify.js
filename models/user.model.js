import { BOOLEAN, DATE, Model, STRING } from "sequelize";
import { sequelize } from "../config/sequelize.config";


export class User extends Model { }
User.init({
    id: {
        type: STRING,
        primaryKey: true,
        autoIncrement: true
    },
    first_name: {
        type: STRING,
    },
    last_name: {
        type: STRING
    },
    username: {
        type: STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: STRING,
        allowNull: false
    },
    active: {
        type: BOOLEAN,
        defaultValue: false
    },
    birthday: {
        type: DATE,
        allowNull: true
    }
}, {
    sequelize: sequelize,
    name: "users"
})


User.sync({ force: true })