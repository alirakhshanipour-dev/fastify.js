import { Sequelize } from "sequelize";
// import dbConfig from "./database.config.json" assert {type: "json"}



export const sequelize = new Sequelize({
    "username": "alirakhshanipur",
    "password": "",
    "database": "fastify",
    "host": "localhost",
    "dialect": "postgres",
    "logging": false
})
const DBconnection = async () => {
    await sequelize.authenticate()
    console.log("connection is ok");
}
DBconnection()