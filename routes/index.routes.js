function indexRoutes(fastify, options, done) {
    fastify.get("/", (req, reply) => {
        reply.send({
            message: "Hello Fastify.Js"
        })
    })
    done()
}

export { indexRoutes as IndexRoutes }