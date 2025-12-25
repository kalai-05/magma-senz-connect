import { View, Text, Button } from "react-native";
import { useAuth } from "../contexts/AuthContext";

export const FarmerHome = ({ navigation }: { navigation: any }) => {
  const { profile } = useAuth();
  return (
    <View style={{ padding: 24 }}>
      <Text style={{ fontSize: 22 }}>Welcome {profile?.name}</Text>
      <Text style={{ marginTop: 8 }}>Manage your products and matches.</Text>
      <View style={{ marginTop: 16 }}>
        <Button title="Add Product" onPress={() => navigation.navigate("AddProduct")} />
      </View>
      <View style={{ marginTop: 12 }}>
        <Button title="My Products" onPress={() => navigation.navigate("MyProducts")} />
      </View>
      <View style={{ marginTop: 12 }}>
        <Button title="Approved Matches" onPress={() => navigation.navigate("Matches")} />
      </View>
      <View style={{ marginTop: 12 }}>
        <Button title="Profile" onPress={() => navigation.navigate("Profile")} />
      </View>
    </View>
  );
};
