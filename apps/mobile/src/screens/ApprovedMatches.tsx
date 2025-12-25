import { useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";
import { useAuth } from "../contexts/AuthContext";
import { apiFetch } from "../services/api";

export const ApprovedMatches = () => {
  const { user } = useAuth();
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    const load = async () => {
      if (!user) return;
      const token = await user.getIdToken();
      const data = await apiFetch("/api/matches/mine", token);
      setItems(data);
    };
    load();
  }, [user]);

  return (
    <View style={{ padding: 24 }}>
      <Text style={{ fontSize: 20, marginBottom: 12 }}>Approved Matches</Text>
      <FlatList
        data={items}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 12 }}>
            <Text style={{ fontWeight: "600" }}>
              {item.productId?.title} ↔ {item.demandId?.description}
            </Text>
            <Text>Score: {item.score}</Text>
          </View>
        )}
      />
    </View>
  );
};
