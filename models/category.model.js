import { DataTypes } from 'sequelize';
import { sequelize } from '../config/sequelize.config.js';

export const Category = sequelize.define('Category', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
});

