import { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../services/firebase";

export const Signup = ({ navigation }: { navigation: any }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSignup = async () => {
    setError(null);
    try {
      const credential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(credential.user, { displayName: name });
      navigation.navigate("Login");
    } catch (err) {
      setError("Signup failed");
    }
  };

  return (
    <View style={{ padding: 24 }}>
      <Text style={{ fontSize: 24, marginBottom: 12 }}>Create Account</Text>
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        style={{ borderWidth: 1, padding: 8, marginBottom: 12 }}
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        style={{ borderWidth: 1, padding: 8, marginBottom: 12 }}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ borderWidth: 1, padding: 8, marginBottom: 12 }}
      />
      {error && <Text style={{ color: "red" }}>{error}</Text>}
      <Button title="Sign up" onPress={handleSignup} />
      <View style={{ marginTop: 12 }}>
        <Button title="Back to login" onPress={() => navigation.goBack()} />
      </View>
    </View>
  );
};
