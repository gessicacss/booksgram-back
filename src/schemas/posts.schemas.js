import joi from "joi";

const postSchemas = joi.object({
    image: joi.string().uri().required(),
    description: joi.string().trim().required()
})

export default postSchemas;