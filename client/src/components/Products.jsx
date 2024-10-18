import styled from "styled-components";
// import { popularProducts } from "../data";
import Product from "./Product";
import { useEffect, useState } from "react";
import axios from "axios";
// import { popularProducts } from "../data";

const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;

const Products = ({cat, sort,filters}) => {

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);


  useEffect(() => {
    // Function to fetch products from the API
    const getProducts = async () => {
      try {
        // If 'cat' (category) is present, fetch products filtered by category
        // Otherwise, fetch all products
        const res = await axios.get(
          cat
            ? `http://localhost:8089/products?category=${cat}` // URL with category filter
            : "http://localhost:8089/products" // URL for fetching all products
        );
        //const result = res.data; // Store the result from API
  // console.log(res.data)
        setProducts(res.data); // Update the state with the fetched products
      } catch (err) {
        console.error("Error fetching products:", err); // Log the error
      }
    };
    getProducts(); // Call the function to fetch products
  }, [cat]); // Dependency array - re-run when 'cat' (category) changes

  // Filter products based on filters
  useEffect(() => {
    cat && setFilteredProducts(
        products.filter((item) =>
          // Ensure every filter's key-value pair matches the product's properties
          Object.entries(filters).every(([key, value]) =>
            item[key]?.includes(value)
          )
        )
      );

  }, [products, cat, filters]); // Filter products based on filters
  // useEffect(() => {
  //   if (cat) {
  //     setFilteredProducts(
  //       products.filter((item) =>
  //         // Ensure every filter's key-value pair matches the product's properties
  //         Object.entries(filters).every(([key, value]) =>
  //           item[key]?.includes(value)
  //         )
  //       )
  //     );
  //   } else {
  //     setFilteredProducts(products); // If no category, display all products
  //   }

  // }, [products, cat, filters]);

  useEffect(() => {
    // Check if the sorting method is "newest"
    if (sort === "newest") {
      // Sort the filtered products by the 'createdAt' field in ascending order (oldest to newest)
      setFilteredProducts((prev) => 
        [...prev].sort((a, b) => a.createdAt - b.createdAt)
      );
    }
    // Check if the sorting method is "asc" (ascending price)
    else if (sort === "asc") {
      // Sort the filtered products by price in ascending order (lowest to highest price)
      setFilteredProducts((prev) => 
        [...prev].sort((a, b) => a.price - b.price)
      );
    } else {
      // Default case: Sort the filtered products by 'createdAt' in descending order (newest to oldest)
      setFilteredProducts((prev) => 
        [...prev].sort((a, b) => b.price - a.price)
      );
    }
  }, [sort]); // Dependency array - re-run when the 'sort' method changes




  return (
    <Container>
      { cat ? filteredProducts.map((item) => (
        <Product item={item} key={item._id} />
      )) : products
      .slice(0,8)    
      .map((item) => (
        <Product item={item} key={item._id} />
      )) }
    </Container>
  );
};

export default Products;


