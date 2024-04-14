import { changeProfileHandler, getProfileHandler } from "../handlers/user.handler.js"
import { getUserMiddleware } from "../utils/getUser.js"


const getProfileSchema = {
    schema: {
        tags: ["User"],
        summary: "this route is for get user profile",
        security: [{ apiKey: [] }],
        response: {
            200: {
                type: "object",
                properties: {
                    statusCode: {
                        type: "integer"
                    },
                    user: {
                        type: "object",
                        properties: {
                            first_name: { type: "string" },
                            last_name: { type: "string" },
                            username: { type: "string" },
                            profile: {
                                type: "object",
                                properties: {
                                    address: { type: "string" },
                                    latitudes: { type: "string" },
                                    longitudes: { type: "string" },
                                }
                            }
                        }
                    },
                }
            }
        }
    },
    handler: getProfileHandler,
    preHandler: getUserMiddleware
}


const changeProfileSchema = {
    schema: {
        tags: ["User"],
        summary: "this route is for user profiles",
        security: [{ apiKey: [] }],
        body: {
            type: "object",
            properties: {
                address: {
                    type: "string",
                },
                latitudes: {
                    type: "string",
                },
                longitudes: {
                    type: "string",
                }
            }
        },
        response: {
            200: {
                type: "object",
                properties: {
                    code: {
                        type: "integer"
                    },
                    message: {
                        type: "string"
                    }
                }
            }
        }
    },
    handler: changeProfileHandler,
    preHandler: getUserMiddleware
}

const userRoutes = (fastify, options, done) => {
    fastify.patch("/change", changeProfileSchema)
    fastify.get("/", getProfileSchema)
    done()
}


export { userRoutes as UserRoutes }