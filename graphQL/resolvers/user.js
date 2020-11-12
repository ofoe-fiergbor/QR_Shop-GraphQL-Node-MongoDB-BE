const { UserInputError } = require("apollo-server");
const bcrypt = require("bcryptjs");

const User = require("../../models/user");
const { registerValidator } = require("../../utils/validator");
const generateToken = require('../../utils/token')


module.exports = {
  Mutation: {
    register: async (
      _,
      { registerInput: { username, email, password, confirmPassword } }
    ) => {
      const { valid, errors } = registerValidator(
        username,
        email,
        password,
        confirmPassword
      );

      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }
      const user = await User.findOne({ email });

      if (user) {
        throw new UserInputError("Email already exist");
      }
      password = await bcrypt.hash(password, 12);

      const newUser = User({
          username,
          email,
          password,
          createdAt: new Date().toISOString()
      })

      const result = await newUser.save()

       const token = generateToken(result)

       return{
           ...result._doc,
           id: result._id,
           token
       }
    },
  },
};
