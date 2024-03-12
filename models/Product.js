const { shapeIntoMongooseObjectId, lookup_auth_member_liked } = require("../lib/config");
const Definer = require("../lib/mistake");
const ProductModel = require("../schema/product.model");
const assert = require("assert");
const Member = require("./Member");

class Product {
  constructor() {
    this.productModel = ProductModel;
  }

  async addNewProductData(data,member) {
   try {
      data.shopp_mb_id = shapeIntoMongooseObjectId(member._id)
      console.log(data);
      const new_product = new this.productModel(data)
      const result = await new_product.save()
      assert.ok(result,Definer.product_err1)
      return result
   } catch (err) {
      throw err
   }
   }

   async updateChosenProductData(id, update_data, mb_id) {
      try {
        id = shapeIntoMongooseObjectId(id);
        mb_id = shapeIntoMongooseObjectId(mb_id);
        const result = await this.productModel
          .findOneAndUpdate({ _id: id, shopp_mb_id: mb_id }, update_data, {
            runValidators: true,
            lean: true,
            returnDocument: "after",
          })
          .exec();
        assert.ok(result, Definer.general_err1);
        return result;
      } catch (err) {
        throw err;
      }
    }
}
module.exports = Product;
