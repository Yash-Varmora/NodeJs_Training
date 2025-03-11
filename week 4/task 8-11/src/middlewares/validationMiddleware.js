import joiToSwagger from "joi-to-swagger";
import Joi from "joi";

const convert = joiToSwagger;

const userSchema = Joi.object({
    name: Joi.string().min(3).max(30).required().messages({
        "string.empty": "Name is required.",
        "string.min": "Name must be at least {#limit} characters long.",
        "string.max": "Name cannot exceed {#limit} characters.",
    }),
    age: Joi.number().integer().min(1).max(120).required().messages({
        "number.base": "Age must be a valid number.",
        "number.integer": "Age must be an integer.",
        "number.min": "Age must be at least {#limit}.",
        "number.max": "Age cannot be greater than {#limit}.",
    })
})

const { swagger } = convert(userSchema)
export const userSwaggerSchema = swagger

export const validateUser = (req, res, next) => {
    const { error } = userSchema.validate(req.body)
    if (error) {
        return res.status(400).json({message: error.details[0].message})
    }
    next()
}







// export const validateUser = (req, res, next) => {
//     const { name, age } = req.body;

//     if (!name || !age) {
//         return res.status(400).json({
//             message: "Name and age are required"
//         });
//     }
//     if (typeof age !== 'number' || age < 0) {
//         return res.status(400).json({
//             message: "Age must be a positive number"
//         });
//     }
//     if (name.length < 3 || name.length > 30) {
//         return res.status(400).json({
//             message: "Name must be between 3 and 30 characters"
//         });
//     }
//     next();
// }
