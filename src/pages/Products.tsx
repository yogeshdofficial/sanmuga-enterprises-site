import Layout from "@/components/Layout";
import ProductsMini from "@/components/ProductsMini";

const ProductsPage = () => {
  return (
    <Layout>
      <section className="py-12">
        <ProductsMini />
      </section>
    </Layout>
  );
};

export default ProductsPage;
