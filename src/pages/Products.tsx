import Layout from "@/components/Layout";
import ProductsMini from "@/components/ProductsMini";

const ProductsPage = () => {
  return (
    <Layout>
      <section className="py-12">
        <h1 className="sr-only">Our Products — Eco-Friendly Areca Leaf Plates</h1>
        <ProductsMini />
      </section>
    </Layout>
  );
};

export default ProductsPage;
