const Merchant = require("../../models/merchant");
const { createMerchantValidator } = require("../../utils/validator");
const checkAuth = require("../../utils/chechAuth");
const { AuthenticationError, UserInputError } = require("apollo-server");

module.exports = {
  Mutation: {
    createItem: async (_, { itemName, price, merchantId }, context) => {
      const user = checkAuth(context);

      if (itemName.trim() === "") {
        error.itemName = "Name cannot be empty";
        throw new UserInputError("Empty Name", { error });
      }
      const merchant = await Merchant.findById(merchantId);

      if (merchant) {
        merchant.items.unshift({
          itemName,
          price,
          email: user.email,
          username: user.username,
          createdAt: new Date().toISOString(),
        });

        await merchant.save()
        return merchant
      }else throw UserInputError('Merchant not found')
    },
    
    deleteItem: async(_,{merchantId, itemId}, context )=>{
        const user = checkAuth(context)
        
        const merchant = await Merchant.findById(merchantId)

        if(merchant){
            const itemIndex = merchant.items.findIndex(item=> item.id === itemId)

            if(merchant.items[itemIndex].email === user.email){
                merchant.items.splice(itemIndex, 1)
                await merchant.save()
                return merchant
            }else throw new AuthenticationError('Access denied')
        }else throw new Error('Merchant not found')

    }
  },

};
