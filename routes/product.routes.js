import { getOneProduct, getProducts } from "../handlers/product.handler.js"
import { getUserMiddleware } from "../utils/getUser.js"


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
        security: [{ apiKey: [] }],
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
    handler: getOneProduct,
    preHandler: getUserMiddleware
}

const getProductItems = {
    schema: {
        tags: ['Products'],
        security: [{ apiKey: [] }],
        summary: "this route is for getting all products",
        response: {
            200: {
                type: 'object',
                properties: {
                    products: {
                        type: "array",
                        items: productInstance
                    },
                    user: {
                        type: "object",
                        properties: {
                            id: { type: "integer" },
                            first_name: { type: "string" },
                            last_name: { type: "string" },
                            username: { type: "string" },
                            accessToken: { type: "string" },
                        }
                    }
                }
            }
        }
    },
    handler: getProducts,
    preHandler: getUserMiddleware
}




function productRoutes(fastify, options, done) {

    // Global error handling using Fastify hooks
    fastify.addHook('onError', (request, reply, error) => {
        console.error('Error occurred:', error);
        reply.code(500).send({ code: 500, message: 'Internal Server Error' });
    });

    // Middleware to verify JWT token on every request
    fastify.addHook("onRequest", async (req, reply) => {
        try {
            await req.jwtVerify(); // Assuming req.jwtVerify() is an async function
        } catch (error) {
            console.error('JWT verification failed:', error);
            reply.code(401).send({ code: 401, message: 'Unauthorized' });
        }
    });

    // get one product
    fastify.get("/", getProductItems)
    // get all products
    fastify.get("/:id", getProductItem)
    done()
}

export { productRoutes as ProductRoutes }
