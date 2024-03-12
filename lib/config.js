const mongoose = require("mongoose");

exports.member_type_enums = ["USER", "ADMIN", "SHOPP"],
exports.member_status_enums = ["ONPAUSE", "ACTIVE", "DELETED"];
exports.member_ordernary_enums = ["Y", "N"];
exports.product_collection_enums = ["Bracelet","Earring","Necklace","Ring","Pendant","Etc"];
exports.product_status_enums = ["PAUSED", "PROCESS", "DELETED"];
exports.order_status_enums = ["PAUSED", "PROCESS", "FINISHED", "CANCELLED"];


exports.like_view_group_list = ["product", "member", "community"];
exports.board_article_status_enums_list = ["active", "deleted"];
/****************************************
 *     MOONGODB RELATED COMMANDS        *
 ****************************************/

exports.shapeIntoMongooseObjectId = (target) => {
  if (typeof target === "string") {
    return new mongoose.Types.ObjectId(target);
  } else return target;
};
