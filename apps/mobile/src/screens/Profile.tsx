import { View, Text, Button } from "react-native";
import { signOut } from "firebase/auth";
import { auth } from "../services/firebase";
import { useAuth } from "../contexts/AuthContext";

export const Profile = () => {
  const { profile } = useAuth();

  return (
    <View style={{ padding: 24 }}>
      <Text style={{ fontSize: 20, marginBottom: 12 }}>Profile</Text>
      <Text>Name: {profile?.name}</Text>
      <Text>Email: {profile?.email}</Text>
      <Text>Role: {profile?.role}</Text>
      <View style={{ marginTop: 12 }}>
        <Button title="Sign out" onPress={() => signOut(auth)} />
      </View>
    </View>
  );
};
