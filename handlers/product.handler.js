import { products } from "../db/products.js"

export const getOneProduct = (req, reply) => {
    const { id } = req.params
    if ([null, undefined, "", 0, " "].includes(id)) {
        return reply.code(401).send({ code: 401, message: "id is invalid" })
    }
    const product = products.find(p => p.id == id)
    if (!product) {
        return reply.code(404).send({ code: 404, message: `no product found with id: ${id}` })
    }
    return reply.send(product)
}


export const getProducts = (req, reply) => {
    return reply.send(products)
}