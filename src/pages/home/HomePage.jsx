import axios from "axios";
import { useEffect, useState } from "react";
import Header from "../../components/Header.jsx";
import ProductContainer from "../../components/ProductContainer.jsx";
import "./HomePage.css";

function HomePage({ cartItems, setCartItems }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      const productRes = await axios.get("/api/products");
      setProducts(productRes.data);
    };
    getProducts();
  }, []);
  return (
    <>
      <title>e-Commerce Project</title>

      <Header cartItems={cartItems} />
      <div className="home-page">
        <div className="products-grid">
          {products.map((product) => {
            return (
              <>
                <ProductContainer key={product.id} product={product} />
              </>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default HomePage;
