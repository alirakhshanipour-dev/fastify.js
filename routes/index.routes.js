import { indexHandler } from "../handlers/index.handler.js"

const indexInstance = {
    type: "object",
    properties: {
        header: {
            type: "object",
            properties: {
                authorization: {
                    type: "string"
                }
            }
        },
        message: { type: "string" }
    }
}

const indexRoute = {
    schema: {
        tags: ["Home"],
        summary: "this route is for index page",
        security: [{ apiKey: [] }],
        response: {
            200: indexInstance
        }
    },
    handler: indexHandler
}




function indexRoutes(fastify, options, done) {
    fastify.get("/", indexRoute)
    done()
}

export { indexRoutes as IndexRoutes }