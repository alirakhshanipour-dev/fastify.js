import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/sequelize.config.js";




export const User = sequelize.define("User",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        first_name: {
            type: DataTypes.STRING
        },
        last_name: {
            type: DataTypes.STRING
        },
        username: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        active: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        birthday: {
            type: DataTypes.DATE,
            allowNull: true
        },
        accessToken: {
            type: DataTypes.STRING,
            defaultValue: ""
        },
    }
);


export const UserDetail = sequelize.define("UserDetail", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    address: {
        type: DataTypes.STRING
    },
    latitudes: {
        type: DataTypes.DOUBLE
    },
    longitudes: {
        type: DataTypes.DOUBLE
    },
    UserId: {
        type: DataTypes.INTEGER
    }
})

User.hasOne(UserDetail, { as: "profile", foreignKey: "UserId" })
UserDetail.belongsTo(User)

// Sync the model with the database (force:true will drop the table if it already exists)
User.sync({ alter: true })
    .then(() => {
        console.log("User table created successfully.");
    })
    .catch((error) => {
        console.error("Error creating User table:", error);
    });
UserDetail.sync({ alter: true })
    .then(() => {
        console.log("User Detail table created successfully.");
    })
    .catch((error) => {
        console.error("Error creating User Detail table:", error);
    });



