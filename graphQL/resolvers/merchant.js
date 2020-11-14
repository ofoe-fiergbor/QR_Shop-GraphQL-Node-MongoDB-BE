const Merchant = require("../../models/merchant");
const { createMerchantValidator } = require("../../utils/validator");
const checkAuth = require("../../utils/chechAuth");
const { AuthenticationError } = require("apollo-server");

// const transformUser = (data) => {
//   return {
//     ...data._doc,
//     _id: data.id,
//   };
// };

module.exports = {
  Query: {
    getMerchants: async () => {
      try {
        const merchant = await Merchant.find();
        return merchant;
      } catch (error) {
        throw new Error(error);
      }
    },

    getMerchant: async (_, { merchantId }) => {
      try {
        const merchant = await Merchant.findById(merchantId);
        if (!merchant) {
          throw new error("Merchant not found");
        }
        return merchant;
      } catch (error) {
        throw new Error(error);
      }
    },
  },

  Mutation: {
    createMerchant: async (_, { name, address }, context) => {
      const user = checkAuth(context);
      const { valid, errors } = createMerchantValidator(name, address);

      if (!valid) {
        throw new Error(errors);
      }

      const newMerchant = new Merchant({
        name,
        address,
        email: user.email,
        username: user.username,
        user: user.id,
        createdAt: new Date().toISOString(),
      });

      const merchant = await newMerchant.save();
      return merchant;
    },

    deleteMerchant: async (_, { merchantId }, context) => {
      const user = checkAuth(context);
      try {
        const merchant = await Merchant.findById(merchantId);
        if (merchant.email === user.email) {
          await merchant.deleteOne();
          return "Post deleted successfully";
        } else throw AuthenticationError("Access denied");
      } catch (error) {
        throw new Error(error);
      }
    },

    updateMerchant: async (_, { name, address, merchantId }, context) => {
      const user = checkAuth(context);

      try {
        let userField = {};
        if (name) {
          userField = { name };
        } else if (address) {
          userField = { address };
        } else if (name && address) {
          userField = { name, address };
        }

        return Merchant.findByIdAndUpdate(merchantId, {$set: userField}, {new:true})
      } catch (error) {
        throw new Error(error)
      }
    },
  },
};
