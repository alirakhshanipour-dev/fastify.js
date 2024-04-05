import fastify from "fastify";
import { ProductRoutes } from "./routes/product.routes.js";
import { IndexRoutes } from "./routes/index.routes.js";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import { swaggerOption, swaggerOptionUi } from "./config/swagger.config.js";
import "./config/sequelize.config.js"

const _F = fastify({ logger: true })
const PORT = 5000

// swagger register route
_F.register(fastifySwagger, swaggerOption)
_F.register(fastifySwaggerUi, swaggerOptionUi)


_F.register(IndexRoutes)
_F.register(ProductRoutes, { prefix: "products" })

const main = () => {
    try {
        _F.listen({ port: PORT }, (err, address) => {
            if (err) throw err
            console.log(`Server listening on ${address}`)
        })
    } catch (error) {
        _F.log(error)
        process.exit(1)
    }
}

main()
