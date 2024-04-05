export const indexHandler = (req, reply) => {
    reply.send({
        header: req.headers,
        message: "Hello Fastify.Js"
    })
}