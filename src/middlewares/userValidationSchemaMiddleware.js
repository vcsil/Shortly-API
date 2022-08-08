import userSchema from "../Schemas/userSchema.js";

async function userValidationSchema(req, res, next) {
    const validation = userSchema.validate(req.body);

    if (validation.error) {
        return res.status(422).send(validation.error.details[0].message);
    }

    return next();
}

export default userValidationSchema;
