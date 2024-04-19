import { User, UserDetail } from "../models/user.model.js"
import { _F } from "../server.js"

export const getUserMiddleware = async (req, reply, next) => {
    const authorization = req?.headers?.authorization
    if (!authorization) {
        return reply.status(401).send({
            message: "You need to login"
        })
    }

    const [bearer, token] = authorization.split(" ")
    if (bearer && bearer.toLowerCase() === "bearer" && token) {
        try {
            const result = _F.jwt.verify(token)
            const { username } = result

            const user = await User.findOne({
                where: { username },
                include: [
                    {
                        model: UserDetail,
                        as: "profile",
                        attributes: ["id", "address"]
                    },
                ]
            })

            if (!user) {
                return reply.status(401).send({
                    statusCode: 401,
                    message: "User not found, please try to login"
                })
            }

            req.user = user.toJSON() // Convert Sequelize model instance to plain object
            return next()
        } catch (error) {
            console.error("Error verifying token:", error)
            return reply.status(401).send({
                statusCode: 401,
                message: "Your token is not valid"
            })
        }
    }

    return reply.status(401).send({
        statusCode: 401,
        message: "Invalid token format"
    })
}