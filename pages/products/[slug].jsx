import _ from "lodash";
import Head from "next/head";
import ProductCardComponent from "../../components/ProductCardComponent";
import { getEntriesByContentType } from "../../lib/helpers";

const ProductPage = (props) => {
  console.log("static props", props);
  const product = _.get(props, "product.items[0]");
  const contentType = _.get(product, "sys.contentType.sys.id");
  const productId = _.get(product, "sys.id");
  const fields = _.get(product, "fields");
  const title = _.get(product, "fields.title");
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div className="p-20">
        <h1 className="text-3xl mb-4">{title}</h1>
        <ProductCardComponent
          productIndex={0}
          key={productId}
          id={productId}
          fields={fields}
        />
      </div>
    </>
  );
};

export async function getStaticPaths() {
  const productEntries = await getEntriesByContentType("product");

  let paths = [];
  if (productEntries) {
    try {
      paths = productEntries.items.map((entry) => {
        const slugVal = _.get(entry, "fields.slug");
        return { params: { slug: slugVal } };
      });
    } catch (error) {}
  }

  return {
    paths: paths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const slug = _.get(context, "params.slug");
  const product = await getEntriesByContentType("product", slug);

  return {
    props: { product },
  };
}

export default ProductPage;
