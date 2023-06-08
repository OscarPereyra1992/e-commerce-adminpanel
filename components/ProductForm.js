import { useRouter } from "next/router";
import axios from "axios";
import { useState } from "react";
import Spinner from "./Spinner";
import { ReactSortable } from "react-sortablejs";

export default function ProductForm({
  _id,
  title: existingTitle,
  description: existingDescription,
  price: existingPrice,
  images: existingImages,
}) {
  const [title, setTitle] = useState(existingTitle || "");
  const [description, setDescription] = useState(existingDescription || "");
  const [price, setPrice] = useState(existingPrice || "");
  const [images, setImages] = useState(existingImages || []);
  const [goToProducts, setGoToProducts] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const router = useRouter();

  async function saveProduct(ev) {
    ev.preventDefault();
    const dataProducts = { title, description, price, images };
    if (_id) {
      // update
      await axios.put("/api/products", { ...dataProducts, _id });
    } else {
      // create
      await axios.post("/api/products", dataProducts);
    }
    setGoToProducts(true);
  }

  if (goToProducts) {
    router.push("/products");
  }

  async function uploadImages(ev) {
    const files = ev.target?.files;
    if (files?.length > 0) {
      const data = new FormData();
      for (const file of files) {
        data.append("file", file);
      }
      setIsUploading(true);
      const res = await axios.post("/api/upload", data);
      setIsUploading(false);
      setImages((oldImages) => {
        return [...oldImages, ...res.data.links];
      });
    }
  }


  function updateImagesOrder(images){
    setImages(images);
  }

  return (
    <form onSubmit={saveProduct}>
      <label>Product name</label>
      <input
        type="text"
        placeholder="Product name"
        value={title}
        onChange={(ev) => setTitle(ev.target.value)}
      />
      <label>Photos</label>
      <div className="mb-2 flex flex-wrap gap-1">
        <ReactSortable 
        className="flex flex-wrap gap-1"
        list={images} 
        setList={updateImagesOrder
        }>
        {!!images?.length &&
          images.map((link) => (
            <div key={link} className="h-24">
              <img src={link} alt="" className="rounded-lg" />
            </div>
          ))}
          </ReactSortable>
        {isUploading && (
          <div className="p-1 h-24 flex items-center">
            <Spinner />
          </div>
        )}
        <label className="cursor-pointer w-24 h-24 text-center flex flex-col items-center justify-center text-sm gap-1 text-gray-500 rounded-lg bg-gray-200">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
            />
          </svg>
          <div>Upload</div>
          <input type="file" onChange={uploadImages} className="hidden" />
        </label>
      </div>

      <label>Description</label>
      <textarea
        placeholder="Products description"
        value={description}
        onChange={(ev) => setDescription(ev.target.value)}
      />
      <label>Price</label>
      <input
        type="number"
        placeholder="Product price"
        value={price}
        onChange={(ev) => setPrice(ev.target.value)}
      />
      <button type="submit" className="bg-blue-700 rounded-md text-white py-1 px-2">
        Save
      </button>
    </form>
  );
}