import { getProducts } from "@/actions/products";
import { ProductShowcase } from "@/components/galery/product-showcase";

export default async function GaleryPage() {
  const products = await getProducts();
  return <ProductShowcase products={products} />;
}
