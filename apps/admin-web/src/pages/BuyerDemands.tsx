import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { apiFetch } from "../services/api";

interface Demand {
  _id: string;
  description: string;
  qty: number;
  unit: string;
  status: string;
}

export const BuyerDemands = () => {
  const { user } = useAuth();
  const [demands, setDemands] = useState<Demand[]>([]);

  useEffect(() => {
    const load = async () => {
      if (!user) return;
      const token = await user.getIdToken();
      const data = await apiFetch("/api/demands/mine", token);
      setDemands(data);
    };
    load();
  }, [user]);

  return (
    <div>
      <h1>My Demands</h1>
      <div className="card">
        <table className="table">
          <thead>
            <tr>
              <th>Description</th>
              <th>Qty</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {demands.map((demand) => (
              <tr key={demand._id}>
                <td>{demand.description}</td>
                <td>
                  {demand.qty} {demand.unit}
                </td>
                <td>{demand.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
