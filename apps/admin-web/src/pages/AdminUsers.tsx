import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { apiFetch } from "../services/api";

interface UserItem {
  _id: string;
  name: string;
  email: string;
  role: "buyer" | "farmer" | "ccr" | "admin";
  status: "active" | "disabled";
}

const roles: UserItem["role"][] = ["buyer", "farmer", "ccr", "admin"];
const statuses: UserItem["status"][] = ["active", "disabled"];

export const AdminUsers = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState<UserItem[]>([]);

  const load = async () => {
    if (!user) return;
    const token = await user.getIdToken();
    const data = await apiFetch("/api/users", token);
    setUsers(data);
  };

  useEffect(() => {
    load();
  }, [user]);

  const updateRole = async (id: string, role: UserItem["role"]) => {
    if (!user) return;
    const token = await user.getIdToken();
    await apiFetch(`/api/users/${id}/role`, token, {
      method: "PATCH",
      body: JSON.stringify({ role })
    });
    await load();
  };

  const updateStatus = async (id: string, status: UserItem["status"]) => {
    if (!user) return;
    const token = await user.getIdToken();
    await apiFetch(`/api/users/${id}/status`, token, {
      method: "PATCH",
      body: JSON.stringify({ status })
    });
    await load();
  };

  return (
    <div>
      <h1>User Management</h1>
      <div className="card">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {users.map((userItem) => (
              <tr key={userItem._id}>
                <td>{userItem.name}</td>
                <td>{userItem.email}</td>
                <td>
                  <select
                    value={userItem.role}
                    onChange={(e) =>
                      updateRole(userItem._id, e.target.value as UserItem["role"])
                    }
                  >
                    {roles.map((role) => (
                      <option key={role} value={role}>
                        {role}
                      </option>
                    ))}
                  </select>
                </td>
                <td>
                  <select
                    value={userItem.status}
                    onChange={(e) =>
                      updateStatus(
                        userItem._id,
                        e.target.value as UserItem["status"]
                      )
                    }
                  >
                    {statuses.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
