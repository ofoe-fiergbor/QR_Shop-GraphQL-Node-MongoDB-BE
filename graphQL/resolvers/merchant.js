const Merchant = require("../../models/merchant");

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

    getMerchant: async(_, {merchantId})=>{
        try {
            const merchant = await Merchant.findById(merchantId)
            if(!merchant){
                throw new error('Merchant not found')
            }
            return merchant
        } catch (error) {
            throw new Error(error)
        }
    }
  },
};
