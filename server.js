import fastify from "fastify";
import { ProductRoutes } from "./routes/product.routes.js";
import { IndexRoutes } from "./routes/index.routes.js";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import { swaggerOption, swaggerOptionUi } from "./config/swagger.config.js";
import "./config/sequelize.config.js"
import { AuthRoutes } from "./routes/auth.routes.js";
import fastifyBcrypt from "fastify-bcrypt"
import { fastifyJwt } from "@fastify/jwt";
import cors from "cors"
import fastifyMiddie from "@fastify/middie";
import { UserRoutes } from "./routes/user.routes.js";
import { CategoryRoutes } from "./routes/category.routes.js";
// import fastifyExpress from "@fastify/express";



export const _F = fastify({ logger: false })
const PORT = 5000


const main = async () => {
    try {
        await _F.register(fastifyMiddie)
        // hash password
        _F.register(fastifyBcrypt, { saltWorkFactor: 12 })

        // fastify jwt
        _F.register(fastifyJwt, {
            secret: "abcd",
        })

        // swagger register route
        _F.register(fastifySwagger, swaggerOption)
        _F.register(fastifySwaggerUi, swaggerOptionUi)

        _F.use(cors())
        _F.register(IndexRoutes)
        _F.register(ProductRoutes, { prefix: "products" })
        _F.register(AuthRoutes, { prefix: "auth" })
        _F.register(UserRoutes, { prefix: "profile" })
        _F.register(CategoryRoutes, { prefix: "category" })

        _F.listen({ port: PORT }, (err, address) => {
            if (err) throw err
            console.log(`Server listening on ${address}`)
        })
    } catch (error) {
        _F.log(error)
        process.exit(1)
    }
}

await main()
