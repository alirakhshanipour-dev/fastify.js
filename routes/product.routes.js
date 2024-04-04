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
        response: {
            200: productInstance
        }
    },
    handler: getOneProduct
}

const getProductItems = {
    schema: {
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