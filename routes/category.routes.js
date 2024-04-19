import { createCategoryHandler } from "../handlers/category.handler.js"
import { getUserMiddleware } from "../utils/getUser.js"

const createCategorySchema = {
    schema: {
        tags: ["Category"],
        summary: "this route is for create a category",
        security: [{ apiKey: [] }],
        body: {
            type: "object",
            properties: {
                title: {
                    type: "string"
                }
            }
        },
        response: {
            201: {
                type: "object",
                properties: {
                    statusCode: {
                        type: "integer"
                    },
                    message: {
                        type: "string"
                    }
                }
            },
        }

    },
    handler: createCategoryHandler,
    preHandler: getUserMiddleware
}


const categoryRoutes = (fastify, options, done) => {
    fastify.post("/create", createCategorySchema)
    done()
}


export { categoryRoutes as CategoryRoutes }