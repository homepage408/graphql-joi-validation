const { UserInputError } = require("apollo-server-errors");
const Joi = require("joi");
const { hashing } = require("./../common/helpers/hashPassword");
const resolvers = {
  Query: {
    findAllUser: async (parent, _, { db }) => {
      const data = await db.users.findAll();
      if (data) {
        return data;
      } else {
        throw new Error("Data kosong");
      }
      // console.log(db.user);
    },
  },

  Mutation: {
    createUser: async (parent, args, { db }) => {
      try {
        const schema = Joi.object({
          fullname: Joi.string().min(3).max(10).required(),
          username: Joi.string().required(),
          email: Joi.string().required(),
          password: Joi.string().required(),
          role: Joi.string().required(),
        });
        const { value, error } = schema.validate(args, { abortEarly: true });
        if (error) {
          throw new UserInputError("failed to create", {
            validatetionError: error.details,
          });
        }
        
        const { salt, hash } = hashing(args.password);
        console.log(hash);
        const data = await db.users.create({
          fullname: args.fullname,
          username: args.username,
          email: args.email,
          password: hash,
          salt: salt,
          role: args.role,
        });
        return data;
      } catch (error) {
        throw new Error(error);
      }
    },
  },
};
module.exports = { resolvers };
