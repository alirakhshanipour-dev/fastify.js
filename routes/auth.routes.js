import { loginHandler, registerHandler } from "../handlers/auth.handler.js"

const registerSchema = {
    schema: {
        tags: ["Auth"],
        summary: "this route is for user regiteration",
        body: {
            type: "object",
            properties: {
                first_name: { type: "string" },
                last_name: { type: "string" },
                username: { type: "string" },
                password: { type: "string" },
            }
        },
        response: {
            201: {
                type: "object",
                properties: {
                    code: {
                        type: "integer",
                    },
                    message: {
                        type: "string"
                    }
                }
            }
        }
    },
    handler: registerHandler
}


const loginSchema = {
    schema: {
        tags: ["Auth"],
        summary: "this route is for user login",
        body: {
            type: "object",
            properties: {
                username: { type: "string" },
                password: { type: "string" },
            }
        },
        response: {
            200: {
                type: "object",
                properties: {
                    code: {
                        type: "integer",
                    },
                    message: {
                        type: "string"
                    },
                    token: {
                        type: "string"
                    }
                }
            }
        }
    },
    handler: loginHandler
}

const authRoutes = (fastify, options, done) => {
    fastify.post("/register", registerSchema)
    fastify.post("/login", loginSchema)
    done()
}

export { authRoutes as AuthRoutes }