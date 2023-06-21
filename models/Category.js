const { Schema, model, default: mongoose } = require("mongoose");

const CategorySchema = new Schema({
  name: { type: String, required: true },
  parent: {type:mongoose.Types.ObjectId, ref:'Category'},
  properties: [{ type: Object }]
});

let Category;

try {
  Category = model("Category");
} catch {
  Category = model("Category", CategorySchema);
}

module.exports = { Category };