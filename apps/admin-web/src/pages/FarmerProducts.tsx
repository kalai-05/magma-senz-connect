import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { apiFetch } from "../services/api";

interface Product {
  _id: string;
  title: string;
  qty: number;
  unit: string;
  status: string;
}

export const FarmerProducts = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const load = async () => {
      if (!user) return;
      const token = await user.getIdToken();
      const data = await apiFetch("/api/products/mine", token);
      setProducts(data);
    };
    load();
  }, [user]);

  return (
    <div>
      <h1>My Products</h1>
      <div className="card">
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Qty</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product.title}</td>
                <td>
                  {product.qty} {product.unit}
                </td>
                <td>{product.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
