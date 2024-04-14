import { User } from "../models/user.model.js"
import { _F } from "../server.js"

export const registerHandler = async (req, reply) => {
    const { first_name, last_name, username, password } = req.body

    const user = new User({
        first_name,
        last_name,
        username,
        password: await _F.bcrypt.hash(password)
    })
    await user.save()
    reply.status(201).send({
        code: 201,
        message: "user registed successfully",
        user
    })
}


export const loginHandler = async (req, reply) => {
    const { username, password } = req.body

    const user = await User.findOne({
        where: {
            username
        }
    })
    if (!user) return reply.status(404).send({
        code: 404,
        message: "no user found with this username"
    })
    const comareResult = await _F.bcrypt.compare(password, user.password)
    if (comareResult) {
        user.accessToken = _F.jwt.sign({ username }, { expiresIn: "1d" })
        await user.save()
        return reply.status(200).send({
            code: 200,
            message: "logged in successfully",
            token: user.accessToken
        })
    }
    return reply.status(401).send({
        code: 401,
        message: "username or password is wrong!",
        user
    })
}
