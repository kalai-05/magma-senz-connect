import { useAuth } from "../contexts/AuthContext";

export const Dashboard = () => {
  const { profile } = useAuth();

  return (
    <div>
      <h1>Dashboard</h1>
      <div className="card">
        <p>Welcome, {profile?.name}</p>
        <p>Role: {profile?.role}</p>
      </div>
    </div>
  );
};
