import Layout from "@/components/Layout";
import axios from "axios";
import { set } from "mongoose";
import { useEffect, useState } from "react";

export default function Categories() {
    const [editedCategory, setEditedCategory] = useState(null);
  const [name, setName] = useState("");
  const [parentCategory, setParentCategory] = useState("");
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    fetchCategories();
  }, []);

  function fetchCategories() {
    axios.get("/api/categories").then((result) => {
      setCategories(result.data);
    });
  }

  async function saveCategory(ev) {
    ev.preventDefault();
    const data = {name, parentCategory};
    if(editedCategory){
        await axios.put("/api/categories", {data});
    }else{
        await axios.post("/api/categories", {data });
        setName("");
        fetchCategories();
    }
  }

  function editCategory(category){
    setEditedCategory(category);
    setName(category.name);
    setParentCategory(category.parent?._id)
  }

  return (
    <Layout>
      <h1> Categories</h1>
      <label>{
      editCategory
      ? `Edit category ${editCategory.name}` 
      : 'Create new category '}
      </label>
      <form onSubmit={saveCategory} className="flex gap-1">
        <input
          className="mb-0"
          type="text"
          placeholder={"Category name"}
          onChange={(ev) => setName(ev.target.value)}
          value={name}
        />
        <select
          className="mb-0"
          onChange={(ev) => setParentCategory(ev.target.value)}
          value={parentCategory}
        >
          <option value="">No parent category</option>
          {categories.length > 0 &&
            categories.map((category) => (
              <option value={category._id}>{category.name}</option>
            ))}
        </select>
        <button type="submit" className="btn-blue py-1">
          Save
        </button>
      </form>
      <table className="basic mt-4">
        <thead className="bg-blue-200">
          <tr>
            <td>Categories</td>
            <td>Parent Category</td>
          </tr>
        </thead>
        <tbody>
          {categories.length > 0 &&
            categories.map((category) => (
              <tr>
                <td>{category.name}</td>
                <td>{category?.parent?.name}</td>
                <td>
                <button onClick={() => editCategory(category)} 
                className="btn-default mr-1">
                    Edit
                </button>
                <button className="btn-default">Delete</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </Layout>
  );
}