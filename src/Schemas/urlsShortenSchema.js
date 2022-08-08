import joi from "joi";

const urlsShortenSchema = joi.object({
    url: joi.string().required(),
});

export default urlsShortenSchema;
