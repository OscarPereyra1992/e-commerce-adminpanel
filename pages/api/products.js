import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";

export default async function handle(req, res) {
  const { method } = req;
  await mongooseConnect();

  if (method === "GET") {
    if (req.query?.id) {
      res.json(await Product.findOne({ _id: req.query.id }));
    } else {
      res.json(await Product.find());
    }
  }

  if (method === "POST") {
    try {
      const { title, description, price, images, category, properties } = req.body;
      const productDoc = new Product({
        title,
        description,
        price,
        images,
        category,
        properties,
      });
      const savedProduct = await productDoc.save();

      res.json(savedProduct);
    } catch (error) {
      res.status(500).json({ error: "Failed to save the product." });
    }
  }

  if (method === "PUT") {
    try {
      const { title, description, price, images, category, properties, _id } = req.body;

      await Product.findByIdAndUpdate(_id, {
        title,
        description,
        price,
        images,
        category: category || null,
        properties,
      });

      res.json(true);
    } catch (error) {
      res.status(500).json({ error: "Failed to update the product." });
    }
  }

  if (method === "DELETE") {
    if (req.query?.id) {
      await Product.deleteOne({ _id: req.query?.id });
      res.json(true);
    }
  }
}