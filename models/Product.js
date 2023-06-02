import { model, models, Schema } from "mongoose";

const ProductSchema = new Schema({
  title: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
}, {
  timestamps: true,
});

export const Product = models.Products || model("Products", ProductSchema);