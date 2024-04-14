export const swaggerOptionUi = {
    prefix: "swagger",
    exposeRoute: true,
}

export const swaggerOption = {
    swagger: {
        info: {
            title: "fastify swagger",
            description: "API Documentation",
            version: "1.0.0"
        },
        schema: ['http'],
        host: "localhost:5000",
        tags: [
            { name: "Home", description: "all access" },
            { name: "Auth", description: "all access" },
            { name: "User", description: "user can read and write profile" },
            { name: "Category", description: "admin can write and read and all roles can read categories" },
            { name: "Products", description: "admin can write and user can read products" },
        ],
        securityDefinitions: {
            apiKey: {
                // apiKey means that token sending from header! ["oAuth" , "Basic" , "apiKey"]
                type: "apiKey",
                in: "header",
                name: "authorization"
            }
        }
    }
}