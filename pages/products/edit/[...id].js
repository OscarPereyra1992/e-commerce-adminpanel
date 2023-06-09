import Layout from "@/components/Layout";
import ProductForm from "@/components/ProductForm";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function EditProductPage() {
  const [productInfo, setProductInfo] = useState(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (!id) {
      return;
    }

    axios.get(`/api/products?id=${id}`).then((response) => {
      console.log(response.data); // Verificar los datos en la consola
      setProductInfo(response.data);
    });
  }, [id]);

  return (
    <Layout>
      <h1>Edit product</h1>
      {productInfo && (
        <ProductForm
          _id={id} // Pasar el _id como prop al componente ProductForm
          title={productInfo.title}
          description={productInfo.description}
          price={productInfo.price}
          images={productInfo.images}
          category={productInfo.category}
          properties={productInfo.properties}
        />
      )}
    </Layout>
  );
}







