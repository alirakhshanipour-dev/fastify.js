import { getOneProduct, getProducts } from "../handlers/product.handler.js"

const productInstance = {
    type: 'object',
    properties: {
        id: { type: 'integer' },
        name: { type: 'string' }
    }
}

const getProductItem = {
    schema: {
        tags: ['Products'],
        summary: "this route is for getting one product",
        params: {
            type: "object",
            properties: {
                id: {
                    type: "string",
                    description: "the id of product"
                }
            }
        },
        response: {
            200: productInstance,
            404: {
                type: "object",
                properties: {
                    code: { type: "integer" },
                    message: { type: "string" }
                }
            }
        }
    },
    handler: getOneProduct
}

const getProductItems = {
    schema: {
        tags: ['Products'],
        summary: "this route is for getting all products",
        response: {
            200: {
                type: 'array',
                items: productInstance
            }
        }
    },
    handler: getProducts
}


function productRoutes(fastify, options, done) {
    // get one product
    fastify.get("/", getProductItems)
    // get all products
    fastify.get("/:id", getProductItem)
    done()
}

export { productRoutes as ProductRoutes }