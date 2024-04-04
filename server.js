import fastify from "fastify";
import { products } from "./products.js";
import { getProductItem, getProductItems } from "./schemas.js";

const _F = fastify({ logger: true })
const PORT = 5000


_F.get("/", (req, reply) => {
    reply.send({
        message: "Hello Fastify.Js"
    })
})


_F.get("/products", getProductItems, (req, reply) => {
    return reply.send(products)
})


_F.get("/products/:id", getProductItem, (req, reply) => {
    const { id } = req.params
    const product = products.find(p => p.id == id)
    if (!product) {
        return reply.code(404).send({ code: 404, message: `no product found with id: ${id}` })
    }
    return reply.send(product)
})

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
