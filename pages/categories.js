import Layout from "@/components/Layout";
import axios from "axios";
import { set } from "mongoose";
import { useEffect, useState } from "react";
import { withSwal } from 'react-sweetalert2';


function Categories({swal}){
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
        if (!name) {
          swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Please enter a category name!',
          });
          return;
        }
      
        const data = { name, parentCategory };
        if (editedCategory) {
          data._id = editedCategory._id;
          await axios.put("/api/categories", data);
          setEditedCategory(null);
          setName("");
        } else {
          await axios.post("/api/categories", data);
          setName("");
        }
        
        fetchCategories(); // Obtener la lista actualizada de categorías
      }
  
    function editCategory(category){
      setEditedCategory(category);
      setName(category.name);
      setParentCategory(category.parent?._id)
    }


     function deleteCategory(category){
        swal.fire({
            title: 'Are you sure?',
            text: `Do you want to delete ${category.name} category?`,
            showCancelButton: true,
            cancelButtonText: 'Cancel',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonColor: '#d33',
            confirmButtonColor: '#3085d6',
            reverseButtons: true,
        }).then(async result => {
           if(result.isConfirmed){
            const {_id} = category
             await axios.delete('/api/categories?_id='+_id)
             fetchCategories();
           }
        })
    }
  
    return (
      <Layout>
        <h1> Categories</h1>
        <label>{
        editedCategory
        ? `Edit category ${editedCategory.name}` 
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
                  <button 
                  onClick={() => deleteCategory(category)}
                  className="btn-default">
                    Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </Layout>
    );
  }


export default  withSwal (({swal}, ref) => (
    <Categories swal= {swal}/>
)

   )
