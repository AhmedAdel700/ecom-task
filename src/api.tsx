// Define the type for a product
export interface Product {
  product: Product | PromiseLike<Product>;
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

// Define the response type for multiple products
interface ProductsResponse {
  status: string;
  message: string;
  products: Product[];
}

// Define the response type for a single product
type ProductResponse = Product; // Directly use Product type for single product responses

// Fetch all products
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

// Fetch a single product by ID
export async function fetchItem(id: string): Promise<Product> {
  const url = `https://fakestoreapi.in/api/products/${id}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const data: ProductResponse = await response.json();

  return data?.product;
}
