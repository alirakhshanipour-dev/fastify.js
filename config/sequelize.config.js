import { Sequelize } from "sequelize";
import dbConfig from "./database.config.json" assert {type: "json"}



export const sequelize = new Sequelize(dbConfig.development)
const DBconnection = async () => {
    await sequelize.authenticate()
    console.log("connection is ok");
}
DBconnection()