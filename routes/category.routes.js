import { createCategoryHandler, getCategoryHandler } from "../handlers/category.handler.js"
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
        }
    },
    handler: createCategoryHandler,
    preHandler: getUserMiddleware
}

const updateCategorySchema = {
    schema: {
        tags: ["Category"],
        summary: "this route is for update Category",
        security: [{ apiKey: [] }],
        params: {
            type: "object",
            properties: {
                id: { type: "string" }
            }
        },
        body: {
            type: "object",
            properties: {
                title: {
                    type: "string"
                }
            }
        }
    },
    handler: getCategoryHandler,
    preHandler: getUserMiddleware
}

const getCategorySchema = {
    schema: {
        tags: ["Category"],
        summary: "this route is for get Category",
        security: [{ apiKey: [] }],
        params: {
            type: "object",
            properties: {
                id: { type: "string" }
            }
        }
    },
    handler: getCategoryHandler,
    preHandler: getUserMiddleware
}

const getAllCategorySchema = {
    schema: {
        tags: ["Category"],
        summary: "this route is for get all categories",
        security: [{ apiKey: [] }],
    },
    handler: getCategoryHandler,
    preHandler: getUserMiddleware
}

const deleteCategorySchema = {
    schema: {
        tags: ["Category"],
        summary: "this route is for delete a category",
        security: [{ apiKey: [] }],
        params: {
            type: "object",
            properties: {
                id: { type: "string" }
            }
        }
    },
    handler: getCategoryHandler,
    preHandler: getUserMiddleware
}

const categoryRoutes = (fastify, options, done) => {
    fastify.post("/create", createCategorySchema)
    fastify.patch("/update", updateCategorySchema)
    fastify.get("/list", getAllCategorySchema)
    fastify.get("/:id", getCategorySchema)
    fastify.delete("/:id", deleteCategorySchema)
    done()
}


export { categoryRoutes as CategoryRoutes }