import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/models/Category";

export default async function handle(req,res) {
    const {method} = req;
    await mongooseConnect();

    if(method === "GET"){
        res.json(await Category.find().populate('parent'));

    }

    if (method === "POST") {
        const { name, parentCategory, _id } = req.body;
        const categoryData = { name };
        if (parentCategory) {
          categoryData.parent = parentCategory;
        }
        const categoryDoc = await Category.create(categoryData);
        res.json(categoryDoc);
      }

    if(method === "PUT"){
        const {name, parentCategory} = req.body;
        const CategoryDoc = await Category.updateOne({
            name,
            parent: parentCategory
        });
        res.json(CategoryDoc);
    }
    
    if(method === "DELETE"){
        const {_id} = req.query;
       await Category.deleteOne({_id});
       res.json('ok')
    }
};
