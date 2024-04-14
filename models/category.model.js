import { DataTypes } from "sequelize";
import { sequelize } from "../config/sequelize.config.js";

export const Category = sequelize.define("Category", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
    }
})