import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { apiFetch } from "../services/api";

interface MatchItem {
  _id: string;
  score: number;
  status: string;
  productId: any;
  demandId: any;
}

export const CcrMatches = () => {
  const { user } = useAuth();
  const [matches, setMatches] = useState<MatchItem[]>([]);

  const loadMatches = async () => {
    if (!user) return;
    const token = await user.getIdToken();
    const data = await apiFetch("/api/matches/pending", token);
    setMatches(data);
  };

  useEffect(() => {
    loadMatches();
  }, [user]);

  const handleAction = async (id: string, action: "approve" | "reject") => {
    if (!user) return;
    const token = await user.getIdToken();
    await apiFetch(`/api/matches/${id}/${action}`, token, {
      method: "PATCH",
      body: JSON.stringify({})
    });
    await loadMatches();
  };

  return (
    <div>
      <h1>Pending Matches</h1>
      <div className="card">
        <table className="table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Demand</th>
              <th>Score</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {matches.map((match) => (
              <tr key={match._id}>
                <td>{match.productId?.title}</td>
                <td>{match.demandId?.description}</td>
                <td>{match.score}</td>
                <td>
                  <button
                    className="primary"
                    onClick={() => handleAction(match._id, "approve")}
                  >
                    Approve
                  </button>
                  <button onClick={() => handleAction(match._id, "reject")}>
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
