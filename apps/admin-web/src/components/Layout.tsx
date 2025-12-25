import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const { profile, logout } = useAuth();

  return (
    <div className="layout">
      <aside>
        <h2>Senz Connect</h2>
        <nav>
          <Link to="/dashboard">Dashboard</Link>
          {profile?.role === "ccr" && <Link to="/ccr/matches">Matches</Link>}
          {profile?.role === "admin" && <Link to="/admin/users">Users</Link>}
          {profile?.role === "farmer" && <Link to="/farmer/products">Products</Link>}
          {profile?.role === "buyer" && <Link to="/buyer/demands">Demands</Link>}
        </nav>
        <button onClick={logout}>Logout</button>
      </aside>
      <main>{children}</main>
    </div>
  );
};
