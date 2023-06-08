import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/models/Category";

export default async function handle(req,res) {
    const {method} = req;
    await mongooseConnect();

    if(method === "GET"){
        res.json(await Category.find().populate('parent'));

    }

    if(method === "POST"){
        const {name, parentCategory} = req.body;
        const CategoryDoc = await Category.create({
            name,
            parent: parentCategory
        });
        res.json(CategoryDoc);
    }

    if(method === "PUT"){
        const {name, parentCategory} = req.body;
        const CategoryDoc = await Category.updateOne({
            name,
            parent: parentCategory
        });
        res.json(CategoryDoc);
    }
    
};
