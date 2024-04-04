import fastify from "fastify";
import { ProductRoutes } from "./routes/product.routes.js";
import { IndexRoutes } from "./routes/index.routes.js";

const _F = fastify({ logger: true })
const PORT = 5000




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

await main()
