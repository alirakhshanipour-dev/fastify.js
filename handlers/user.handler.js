import { User, UserDetail } from "../models/user.model.js"
import { _F } from "../server.js"


export const changeProfileHandler = async (req, reply) => {
    try {
        const body = { ...req.body }
        const userId = req.user.id

        let profile = await UserDetail.findOne({ where: { UserId: userId } })

        if (profile) {
            for (const key in body) {
                if (body.hasOwnProperty(key) && body[key] !== undefined && body[key] !== "") {
                    profile[key] = body[key]
                }
            }
            await profile.save()
        } else {
            const profileData = { ...body, UserId: userId }
            profile = await UserDetail.create(profileData)
        }

        return reply.status(200).send({
            statusCode: 200,
            message: "User profile updated successfully"
        })
    } catch (error) {
        console.error("Error updating user profile:", error)
        return reply.status(500).send({
            statusCode: 500,
            message: "Internal Server Error"
        })
    }
}

export const getProfileHandler = async (req, reply) => {
    const { id } = req.user
    const user = await User.findOne({
        where: { id },
        include: [
            {
                model: UserDetail,
                as: "profile",
                attributes: ["address", "latitudes", "longitudes"]
            }
        ],
        attributes: ["first_name", "last_name", "username"]
    })
    return reply.status(200).send({
        statusCode: 200,
        user
    })
}
