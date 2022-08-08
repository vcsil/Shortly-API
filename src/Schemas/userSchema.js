import joi from "joi";

const userSignUpSchema = joi.object({
    name: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().required(),
    confirmPassword: joi.ref("password"),
});

export default userSignUpSchema;
