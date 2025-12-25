import { useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";
import { useAuth } from "../contexts/AuthContext";
import { apiFetch } from "../services/api";

export const MyProducts = () => {
  const { user } = useAuth();
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    const load = async () => {
      if (!user) return;
      const token = await user.getIdToken();
      const data = await apiFetch("/api/products/mine", token);
      setItems(data);
    };
    load();
  }, [user]);

  return (
    <View style={{ padding: 24 }}>
      <Text style={{ fontSize: 20, marginBottom: 12 }}>My Products</Text>
      <FlatList
        data={items}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 12 }}>
            <Text style={{ fontWeight: "600" }}>{item.title}</Text>
            <Text>
              {item.qty} {item.unit} • {item.status}
            </Text>
          </View>
        )}
      />
    </View>
  );
};
