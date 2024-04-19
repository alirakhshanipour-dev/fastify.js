import { Category } from "../models/category.model.js"

export const createCategoryHandler = async (req, reply) => {
    try {
        console.log(req.body);
        const { title } = req.body
        const category = await Category.findOne({ where: { title } })
        if (category) return reply.status(401).send({
            statusCode: 401,
            message: "category already exists"
        })

        const newCategory = await Category.create({ title })

        return reply.status(201).send({
            statusCode: 201,
            message: "Category created successfully",
            newCategory
        })
    } catch (error) {
        console.error("Error creating category:", error)
        return reply.status(500).send({
            statusCode: 500,
            message: "Internal Server Error"
        })
    }
}

