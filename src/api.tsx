// Define the type for a product
interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

// Define the response type for the API
interface ProductsResponse {
  status: string;
  message: string;
  products: Product[];
}

// Fetch function with improved error handling and typing
export async function fetchProducts(): Promise<Product[]> {
  const url = `https://fakestoreapi.in/api/products`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const data: ProductsResponse = await response.json();

  // Check if products are present in the response
  if (Array.isArray(data.products)) {
    return data.products;
  } else {
    throw new Error("Products data is not an array");
  }
}
